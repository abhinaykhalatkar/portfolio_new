const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const PROJECT_NAME = "portfolio_new";
const ROOT_DIR = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT_DIR, "build");
const RELEASE_ROOT = path.join(ROOT_DIR, "dist", "release");
const RELEASE_SITE_DIR = path.join(RELEASE_ROOT, "site");
const REQUIRED_BUILD_ENTRIES = ["index.html", ".htaccess", "robots.txt"];
const IGNORED_UPLOAD_BASENAMES = new Set([".DS_Store", "Thumbs.db"]);

function requireEnv(name, env = process.env) {
  const value = String(env[name] || "").trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name, fallback = "", env = process.env) {
  const value = String(env[name] || "").trim();
  return value || fallback;
}

function optionalBoolEnv(name, fallback = false, env = process.env) {
  const value = String(env[name] || "").trim().toLowerCase();
  if (!value) {
    return fallback;
  }

  return !["false", "0", "no", "off"].includes(value);
}

function positiveIntEnv(name, fallback, env = process.env) {
  const parsed = Number.parseInt(String(env[name] || ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeRemoteRoot(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  return collapsed.length > 1 && collapsed.endsWith("/")
    ? collapsed.slice(0, -1)
    : collapsed;
}

function joinRemote(...segments) {
  const [firstSegment = "/", ...restSegments] = segments;
  const base = normalizeRemoteRoot(firstSegment);
  const suffix = restSegments
    .map((segment) => String(segment || "").trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

  if (!suffix) {
    return base;
  }

  if (base === "/") {
    return `/${suffix}`;
  }

  const normalized = `${base}/${suffix}`.replace(/\/{2,}/g, "/");
  if (!normalized || normalized === "/") {
    return "/";
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function ensureBuildArtifacts(buildDir = BUILD_DIR) {
  for (const entry of REQUIRED_BUILD_ENTRIES) {
    const fullPath = path.join(buildDir, entry);
    if (!fs.existsSync(fullPath)) {
      throw new Error(
        `Expected build artifact missing: ${fullPath}. Run npm run build:prerender first.`
      );
    }
  }
}

function safeGitSha(rootDir = ROOT_DIR) {
  try {
    return execSync("git rev-parse --short HEAD", {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

function toPosixRelative(baseDir, fullPath) {
  return path.relative(baseDir, fullPath).split(path.sep).join("/");
}

function listLocalFiles(localDir, baseDir = localDir) {
  if (!fs.existsSync(localDir)) {
    return [];
  }

  const entries = fs
    .readdirSync(localDir, { withFileTypes: true })
    .sort((first, second) => first.name.localeCompare(second.name));

  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(localDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listLocalFiles(entryPath, baseDir));
      continue;
    }

    if (entry.isFile()) {
      if (IGNORED_UPLOAD_BASENAMES.has(entry.name)) {
        continue;
      }
      files.push(toPosixRelative(baseDir, entryPath));
    }
  }

  return files;
}

function buildUploadPlan(localDir, remoteRoot) {
  const normalizedRemoteRoot = normalizeRemoteRoot(remoteRoot);
  return listLocalFiles(localDir).map((relativePath) => ({
    relativePath,
    localPath: path.join(localDir, relativePath),
    remotePath: joinRemote(normalizedRemoteRoot, relativePath),
  }));
}

function buildConnection(env = process.env) {
  return {
    host: requireEnv("PORTFOLIO_FTP_HOST", env),
    user: requireEnv("PORTFOLIO_FTP_USER", env),
    password: requireEnv("PORTFOLIO_FTP_PASSWORD", env),
    port: positiveIntEnv("PORTFOLIO_FTP_PORT", 21, env),
    secure: optionalBoolEnv("PORTFOLIO_FTP_SECURE", true, env),
    timeoutMs: positiveIntEnv("PORTFOLIO_FTP_TIMEOUT_MS", 120000, env),
    forceIPv4: optionalBoolEnv("PORTFOLIO_FTP_FORCE_IPV4", true, env),
    verbose: optionalBoolEnv("PORTFOLIO_FTP_VERBOSE", false, env),
  };
}

function buildDeployTarget(env = process.env) {
  return {
    remoteRoot: normalizeRemoteRoot(
      requireEnv("PORTFOLIO_FTP_REMOTE_ROOT", env)
    ),
    cleanRemote: optionalBoolEnv("PORTFOLIO_FTP_CLEAN_REMOTE", false, env),
  };
}

function buildDryRunConfig(env = process.env) {
  const remoteRootRaw = optionalEnv("PORTFOLIO_FTP_REMOTE_ROOT", "/", env);
  return {
    project: PROJECT_NAME,
    connection: {
      host: optionalEnv("PORTFOLIO_FTP_HOST", "<missing>", env),
      user: optionalEnv("PORTFOLIO_FTP_USER", "<missing>", env),
      password: env.PORTFOLIO_FTP_PASSWORD ? "***" : "<missing>",
      port: positiveIntEnv("PORTFOLIO_FTP_PORT", 21, env),
      secure: optionalBoolEnv("PORTFOLIO_FTP_SECURE", true, env),
      timeoutMs: positiveIntEnv("PORTFOLIO_FTP_TIMEOUT_MS", 120000, env),
      forceIPv4: optionalBoolEnv("PORTFOLIO_FTP_FORCE_IPV4", true, env),
      verbose: optionalBoolEnv("PORTFOLIO_FTP_VERBOSE", false, env),
    },
    target: {
      remoteRoot: normalizeRemoteRoot(remoteRootRaw),
      cleanRemote: optionalBoolEnv("PORTFOLIO_FTP_CLEAN_REMOTE", false, env),
    },
    paths: {
      buildDir: BUILD_DIR,
      releaseRoot: RELEASE_ROOT,
      releaseSiteDir: RELEASE_SITE_DIR,
    },
  };
}

function buildReleaseManifest({
  remoteRoot = "/",
  fileCount = 0,
  buildDir = BUILD_DIR,
} = {}) {
  return {
    project: PROJECT_NAME,
    builtAt: new Date().toISOString(),
    gitSha: safeGitSha(ROOT_DIR),
    sourceBuildDir: buildDir,
    releaseLayout: {
      site: "Static portfolio site for Hetzner FTP deployment",
    },
    deployTarget: {
      remoteRoot: normalizeRemoteRoot(remoteRoot),
      expectedRequiredEntries: REQUIRED_BUILD_ENTRIES,
    },
    fileCount,
  };
}

module.exports = {
  PROJECT_NAME,
  ROOT_DIR,
  BUILD_DIR,
  RELEASE_ROOT,
  RELEASE_SITE_DIR,
  REQUIRED_BUILD_ENTRIES,
  IGNORED_UPLOAD_BASENAMES,
  requireEnv,
  optionalEnv,
  optionalBoolEnv,
  positiveIntEnv,
  normalizeRemoteRoot,
  joinRemote,
  ensureBuildArtifacts,
  safeGitSha,
  listLocalFiles,
  buildUploadPlan,
  buildConnection,
  buildDeployTarget,
  buildDryRunConfig,
  buildReleaseManifest,
};
