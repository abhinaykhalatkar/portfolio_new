import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import process from "node:process";
import puppeteer from "puppeteer";
import { ALL_PRERENDER_ROUTES } from "./shared/prerenderRouteManifest.mjs";

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, "build");
const HOST = "127.0.0.1";
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const BASE_URL = `http://${HOST}:${PORT}`;
const ROUTES = ALL_PRERENDER_ROUTES;

/**
 * Refuse to start if something already listens on the prerender port.
 * Otherwise `vite preview` (strictPort) fails, but our poll below could still
 * get a 200 from the STALE process on that port and snapshot the wrong build.
 * Root cause of the 2026-08-17 `deploy:prod` failure: a preview server left
 * over from an earlier prerender still held 4173.
 */
async function assertPortFree(port) {
  await new Promise((resolve, reject) => {
    const probe = net
      .createServer()
      .once("error", (error) => {
        if (error.code === "EADDRINUSE") {
          reject(
            new Error(
              `Prerender port ${port} is already in use (a stale \`vite preview\` from an earlier ` +
                `run, or another server). Stop it first, e.g. \`kill $(lsof -ti :${port})\`, or set ` +
                `PRERENDER_PORT to a free port. Refusing to prerender against an unknown server.`
            )
          );
          return;
        }
        reject(error);
      })
      .once("listening", () => {
        probe.close(() => resolve(undefined));
      })
      .listen(port, HOST);
  });
}

function getNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function routeToOutputPath(route) {
  if (route === "/") {
    return path.join(BUILD_DIR, "index.html");
  }
  const stripped = route.replace(/^\//, "").replace(/\/$/, "");
  return path.join(BUILD_DIR, stripped, "index.html");
}

async function waitForPreviewServer(previewProcess) {
  const maxAttempts = 80;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    // If the preview process died (e.g. strictPort refused the busy port),
    // stop polling immediately with the real reason instead of timing out
    // 20s later with a misleading "not reachable".
    if (previewProcess.exitCode !== null) {
      throw new Error(
        `\`vite preview\` exited with code ${previewProcess.exitCode} before serving ${BASE_URL}. ` +
          `See the [preview] output above (usually: port ${PORT} already in use).`
      );
    }
    try {
      const response = await fetch(BASE_URL, { redirect: "follow" });
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the preview server is up.
    }
    await wait(250);
  }
  throw new Error(`Preview server was not reachable at ${BASE_URL}`);
}

async function stopPreviewServer(previewProcess) {
  if (!previewProcess || previewProcess.killed) {
    return;
  }
  previewProcess.kill("SIGTERM");
  await new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(undefined), 3_000);
    previewProcess.once("exit", () => {
      clearTimeout(timeout);
      resolve(undefined);
    });
  });
}

async function run() {
  let previewProcess;
  let browser;
  try {
    await assertPortFree(PORT);

    previewProcess = spawn(
      getNpmCommand(),
      ["run", "preview", "--", "--host", HOST, "--port", String(PORT)],
      {
        cwd: ROOT_DIR,
        stdio: "pipe",
      }
    );

    previewProcess.stdout.on("data", (chunk) => {
      process.stdout.write(`[preview] ${chunk}`);
    });
    previewProcess.stderr.on("data", (chunk) => {
      process.stderr.write(`[preview] ${chunk}`);
    });

    await waitForPreviewServer(previewProcess);

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });
      await wait(250);
      const html = await page.content();
      const outputPath = routeToOutputPath(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, "utf8");
      process.stdout.write(`prerendered ${route} -> ${outputPath}\n`);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    if (previewProcess) {
      await stopPreviewServer(previewProcess);
    }
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
