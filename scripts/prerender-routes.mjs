import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import process from "node:process";
import puppeteer from "puppeteer";

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, "build");
const HOST = "127.0.0.1";
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const BASE_URL = `http://${HOST}:${PORT}`;
const ROUTES = ["/", "/about", "/skills", "/projects", "/contact"];

function getNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function routeToOutputPath(route) {
  if (route === "/") {
    return path.join(BUILD_DIR, "index.html");
  }
  return path.join(BUILD_DIR, route.replace(/^\//, ""), "index.html");
}

async function waitForPreviewServer() {
  const maxAttempts = 80;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
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

    await waitForPreviewServer();

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
