const fs = require("node:fs");
const path = require("node:path");
const {
  BUILD_DIR,
  RELEASE_ROOT,
  RELEASE_SITE_DIR,
  ensureBuildArtifacts,
  buildReleaseManifest,
  listLocalFiles,
} = require("./deploy-utils");

function assembleRelease({
  buildDir = BUILD_DIR,
  releaseRoot = RELEASE_ROOT,
  releaseSiteDir = RELEASE_SITE_DIR,
  remoteRoot = "/",
} = {}) {
  ensureBuildArtifacts(buildDir);

  console.log("📦 Assembling portfolio FTP release...");
  fs.rmSync(releaseRoot, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(releaseSiteDir), { recursive: true });
  fs.cpSync(buildDir, releaseSiteDir, { recursive: true, force: true });

  const manifest = buildReleaseManifest({
    remoteRoot,
    fileCount: listLocalFiles(releaseSiteDir).length,
    buildDir,
  });
  const manifestPath = path.join(releaseRoot, "release-manifest.json");
  fs.writeFileSync(`${manifestPath}`, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log("✅ Portfolio release assembled into dist/release.");
  return {
    releaseRoot,
    releaseSiteDir,
    manifestPath,
    manifest,
  };
}

if (require.main === module) {
  assembleRelease();
}

module.exports = {
  assembleRelease,
};
