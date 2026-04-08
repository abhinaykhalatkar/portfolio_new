const path = require("node:path");
const { execSync } = require("node:child_process");

const rootDir = path.resolve(__dirname, "..");

function main() {
  console.log("🏗️ Building and validating the portfolio production artifact...");
  execSync("npm run verify:prod", {
    cwd: rootDir,
    stdio: "inherit",
  });
  console.log("✅ Portfolio production artifact is ready.");
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
