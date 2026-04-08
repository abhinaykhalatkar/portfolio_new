/** @vitest-environment node */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { afterEach, describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const {
  normalizeRemoteRoot,
  joinRemote,
  listLocalFiles,
  buildUploadPlan,
  buildConnection,
  buildDeployTarget,
} = require("./deploy-utils");

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-deploy-utils-"));
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

describe("deploy-utils", () => {
  it("normalizes remote roots predictably", () => {
    expect(normalizeRemoteRoot("")).toBe("/");
    expect(normalizeRemoteRoot("/")).toBe("/");
    expect(normalizeRemoteRoot("public_html/")).toBe("/public_html");
    expect(normalizeRemoteRoot("/public_html//portfolio/")).toBe(
      "/public_html/portfolio"
    );
  });

  it("joins remote paths without duplicate slashes", () => {
    expect(joinRemote("/", "assets/app.js")).toBe("/assets/app.js");
    expect(joinRemote("/public_html", "en/about/index.html")).toBe(
      "/public_html/en/about/index.html"
    );
  });

  it("lists local files including dotfiles in stable order", () => {
    const dir = makeTempDir();
    tempDirs.push(dir);

    writeFile(path.join(dir, ".DS_Store"));
    writeFile(path.join(dir, ".htaccess"));
    writeFile(path.join(dir, "index.html"));
    writeFile(path.join(dir, "en", "about", "index.html"));

    expect(listLocalFiles(dir)).toEqual([
      ".htaccess",
      "en/about/index.html",
      "index.html",
    ]);
  });

  it("builds upload plans against the remote root", () => {
    const dir = makeTempDir();
    tempDirs.push(dir);

    writeFile(path.join(dir, "robots.txt"));
    writeFile(path.join(dir, "de", "projects", "index.html"));

    expect(buildUploadPlan(dir, "/")).toEqual([
      {
        relativePath: "de/projects/index.html",
        localPath: path.join(dir, "de", "projects", "index.html"),
        remotePath: "/de/projects/index.html",
      },
      {
        relativePath: "robots.txt",
        localPath: path.join(dir, "robots.txt"),
        remotePath: "/robots.txt",
      },
    ]);
  });

  it("parses FTP env config for this project", () => {
    const env = {
      PORTFOLIO_FTP_HOST: "example.com",
      PORTFOLIO_FTP_USER: "user",
      PORTFOLIO_FTP_PASSWORD: "secret",
      PORTFOLIO_FTP_PORT: "21",
      PORTFOLIO_FTP_SECURE: "true",
      PORTFOLIO_FTP_TIMEOUT_MS: "90000",
      PORTFOLIO_FTP_FORCE_IPV4: "false",
      PORTFOLIO_FTP_VERBOSE: "true",
      PORTFOLIO_FTP_REMOTE_ROOT: "/public_html/portfolio/",
      PORTFOLIO_FTP_CLEAN_REMOTE: "true",
    };

    expect(buildConnection(env)).toEqual({
      host: "example.com",
      user: "user",
      password: "secret",
      port: 21,
      secure: true,
      timeoutMs: 90000,
      forceIPv4: false,
      verbose: true,
    });

    expect(buildDeployTarget(env)).toEqual({
      remoteRoot: "/public_html/portfolio",
      cleanRemote: true,
    });
  });
});
