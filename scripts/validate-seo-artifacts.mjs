import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  ALL_PRERENDER_ROUTES,
  CORE_LOCALIZED_ROUTES,
} from "./shared/prerenderRouteManifest.mjs";

const ROOT_DIR = process.cwd();

function normalizeSiteUrl(url) {
  const fallback = "https://abhinaykhalatkar.de/";
  if (!url || typeof url !== "string") {
    return fallback;
  }
  const trimmed = url.trim();
  if (!trimmed) {
    return fallback;
  }
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  parsed.search = "";
  parsed.hash = "";
  if (!parsed.pathname.endsWith("/")) {
    parsed.pathname = `${parsed.pathname}/`;
  }
  return parsed.toString();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readPublicFile(relativePath) {
  const fullPath = path.join(ROOT_DIR, "public", relativePath);
  await access(fullPath);
  return readFile(fullPath, "utf8");
}

function routeToBuildPath(route) {
  if (route === "/") {
    return path.join(ROOT_DIR, "build", "index.html");
  }

  return path.join(ROOT_DIR, "build", route.replace(/^\//, ""), "index.html");
}

async function validate() {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);

  const robotsTxt = await readPublicFile("robots.txt");
  assert(
    /sitemap:\s*https?:\/\/\S+\/sitemap\.xml/i.test(robotsTxt),
    "robots.txt must include an absolute sitemap declaration."
  );

  const sitemapXml = await readPublicFile("sitemap.xml");
  for (const route of CORE_LOCALIZED_ROUTES) {
    const expectedLoc = `${siteUrl.replace(/\/$/, "")}${route}`;
    assert(
      sitemapXml.includes(expectedLoc),
      `sitemap.xml is missing core route: ${expectedLoc}`
    );
  }

  const llmsTxt = await readPublicFile("llms.txt");
  const llmsFullTxt = await readPublicFile("llms-full.txt");
  assert(
    llmsTxt.toLowerCase().includes("canonical"),
    "llms.txt must include a canonical reference."
  );
  assert(
    llmsTxt.includes(`${siteUrl.replace(/\/$/, "")}/en`),
    "llms.txt canonical value does not match configured site URL."
  );
  assert(
    llmsFullTxt.toLowerCase().includes("linkedin"),
    "llms-full.txt should reference LinkedIn profile."
  );

  const buildHtaccess = path.join(ROOT_DIR, "build", ".htaccess");
  await access(buildHtaccess).catch(() => {
    throw new Error("build/.htaccess is missing. Run npm run build:prerender before deploy.");
  });

  for (const route of ALL_PRERENDER_ROUTES) {
    const outputPath = routeToBuildPath(route);
    await access(outputPath).catch(() => {
      throw new Error(`Prerendered route is missing from build output: ${outputPath}`);
    });
  }

  process.stdout.write("SEO artifact validation passed.\n");
}

validate().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
