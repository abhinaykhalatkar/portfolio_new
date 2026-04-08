/** @vitest-environment node */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { afterEach, describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const { assembleRelease } = require("./assemble-release");

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-release-"));
}

function writeFile(filePath, contents = "x") {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, "utf8");
}

const tempDirs = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("assembleRelease", () => {
  it("copies the build artifact into a single-site release folder and writes a manifest", () => {
    const root = makeTempDir();
    tempDirs.push(root);

    const buildDir = path.join(root, "build");
    const releaseRoot = path.join(root, "dist", "release");
    const releaseSiteDir = path.join(releaseRoot, "site");

    writeFile(path.join(buildDir, "index.html"), "<html></html>");
    writeFile(path.join(buildDir, ".htaccess"), "RewriteEngine On");
    writeFile(path.join(buildDir, "robots.txt"), "User-agent: *");
    writeFile(path.join(buildDir, "en", "index.html"), "<html>en</html>");

    const result = assembleRelease({
      buildDir,
      releaseRoot,
      releaseSiteDir,
      remoteRoot: "/",
    });

    expect(fs.existsSync(path.join(releaseSiteDir, "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(releaseSiteDir, ".htaccess"))).toBe(true);
    expect(fs.existsSync(path.join(releaseSiteDir, "en", "index.html"))).toBe(true);
    expect(fs.existsSync(result.manifestPath)).toBe(true);

    const manifest = JSON.parse(fs.readFileSync(result.manifestPath, "utf8"));
    expect(manifest.project).toBe("portfolio_new");
    expect(manifest.deployTarget.remoteRoot).toBe("/");
    expect(manifest.fileCount).toBeGreaterThanOrEqual(4);
  });
});
