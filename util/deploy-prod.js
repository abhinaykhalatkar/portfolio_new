const fs = require("node:fs");
const path = require("node:path");
const net = require("node:net");
const { execSync } = require("node:child_process");
const ftp = require("basic-ftp");
const dotenv = require("dotenv");
const {
  ROOT_DIR,
  RELEASE_SITE_DIR,
  buildConnection,
  buildDeployTarget,
  buildDryRunConfig,
  buildUploadPlan,
} = require("./deploy-utils");

dotenv.config({ path: path.join(ROOT_DIR, ".env") });

function tcpProbe(host, port, { timeoutMs, localAddress } = {}) {
  return new Promise((resolve) => {
    const socket = net.createConnection({
      host,
      port,
      ...(localAddress ? { localAddress } : {}),
    });

    let settled = false;
    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish({ ok: true }));
    socket.once("timeout", () => finish({ ok: false, reason: "timeout" }));
    socket.once("error", (error) => {
      finish({
        ok: false,
        reason: error && error.code ? error.code : String(error || "unknown_error"),
      });
    });
  });
}

async function assertFtpReachable(connection) {
  const timeoutMs = Math.min(connection.timeoutMs, 15000);
  const attempts = [{ label: "default-route" }];

  if (connection.forceIPv4) {
    attempts.push({ label: "ipv4-bind", localAddress: "0.0.0.0" });
  }

  const results = [];
  for (const attempt of attempts) {
    const result = await tcpProbe(connection.host, connection.port, {
      timeoutMs,
      localAddress: attempt.localAddress,
    });
    results.push({ ...attempt, ...result });
    if (result.ok) {
      return;
    }
  }

  const reasons = results.map((result) => `${result.label}:${result.reason}`).join(", ");
  throw new Error(
    `FTP preflight failed for ${connection.host}:${connection.port} before login (${reasons}). ` +
      `This machine cannot currently open the Hetzner FTP control connection. ` +
      `Check local network/VPN/firewall access for ports 21/990 before retrying.`
  );
}

async function resetToRemoteRoot(client, remoteRoot) {
  await client.cd("/");
  if (remoteRoot !== "/") {
    await client.ensureDir(remoteRoot);
  }
}

async function clearRemoteRoot(client, remoteRoot) {
  await resetToRemoteRoot(client, remoteRoot);
  await client.clearWorkingDir();
}

async function uploadPlan(client, plan) {
  for (const entry of plan) {
    const remoteDir = path.posix.dirname(entry.remotePath);
    const remoteFileName = path.posix.basename(entry.remotePath);

    await client.cd("/");
    if (remoteDir !== "/") {
      await client.ensureDir(remoteDir);
    }
    await client.uploadFrom(entry.localPath, remoteFileName);
  }
}

async function uploadRelease(connection, target) {
  const plan = buildUploadPlan(RELEASE_SITE_DIR, target.remoteRoot);
  if (plan.length === 0) {
    throw new Error(
      `No files found in ${RELEASE_SITE_DIR}. Run npm run release:prod before deploying.`
    );
  }

  const client = new ftp.Client(connection.timeoutMs);
  client.ftp.verbose = connection.verbose;
  client.prepareTransfer = ftp.enterPassiveModeIPv6;

  try {
    await client.access({
      host: connection.host,
      user: connection.user,
      password: connection.password,
      port: connection.port,
      secure: connection.secure,
      secureOptions: {
        minVersion: "TLSv1.2",
        servername: connection.host,
      },
      ...(connection.forceIPv4 ? { family: 4 } : {}),
    });

    if (target.cleanRemote) {
      console.log(`🧹 Clearing remote directory ${target.remoteRoot} before upload...`);
      await clearRemoteRoot(client, target.remoteRoot);
    } else {
      await resetToRemoteRoot(client, target.remoteRoot);
    }

    console.log(`⬆️ Uploading ${plan.length} files to ${target.remoteRoot}...`);
    await uploadPlan(client, plan);
    console.log("✅ FTP upload completed.");
  } finally {
    client.close();
  }
}

function printDryRun() {
  const summary = buildDryRunConfig();
  const releaseExists = fs.existsSync(RELEASE_SITE_DIR);
  const plan = releaseExists
    ? buildUploadPlan(RELEASE_SITE_DIR, summary.target.remoteRoot)
    : [];

  console.log(
    JSON.stringify(
      {
        mode: "dry-run",
        ...summary,
        releaseReady: releaseExists,
        plannedFileCount: plan.length,
        sampleRemotePaths: plan.slice(0, 8).map((entry) => entry.remotePath),
      },
      null,
      2
    )
  );
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) {
    printDryRun();
    return;
  }

  const connection = buildConnection();
  const target = buildDeployTarget();

  await assertFtpReachable(connection);

  execSync("npm run build:prod", {
    cwd: ROOT_DIR,
    stdio: "inherit",
  });
  execSync("npm run release:prod", {
    cwd: ROOT_DIR,
    stdio: "inherit",
  });

  await uploadRelease(connection, target);
  console.log("✅ Portfolio production release uploaded successfully.");
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ deploy:prod failed");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

module.exports = {
  tcpProbe,
  assertFtpReachable,
  uploadPlan,
  uploadRelease,
  printDryRun,
};
