import { stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { SITEMAP_LOCALIZED_ROUTES } from "./shared/prerenderRouteManifest.mjs";

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.join(ROOT_DIR, "build");
const DEFAULT_SITE_URL = "https://abhinaykhalatkar.de/";

function normalizeSiteUrl(url) {
  if (!url || typeof url !== "string" || !url.trim()) {
    return DEFAULT_SITE_URL;
  }
  const trimmed = url.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  parsed.search = "";
  parsed.hash = "";
  if (!parsed.pathname.endsWith("/")) {
    parsed.pathname = `${parsed.pathname}/`;
  }
  return parsed.toString();
}

function toTrailingSlashRoute(route) {
  if (route === "/") return "/";
  return `${route.replace(/\/+$/, "")}/`;
}

function priorityFor(route) {
  if (/^\/(en|de)\/$/.test(route)) return "1.0";
  if (/^\/(en|de)\/projects\/$/.test(route)) return "0.9";
  if (/^\/(en|de)\/contact\/$/.test(route)) return "0.8";
  return "0.9";
}

function changefreqFor(route) {
  if (/^\/(en|de)\/$/.test(route)) return "weekly";
  if (/^\/(en|de)\/projects\/$/.test(route)) return "weekly";
  return "monthly";
}

function routeToPrerenderedPath(route) {
  if (route === "/") {
    return path.join(BUILD_DIR, "index.html");
  }
  const stripped = route.replace(/^\//, "").replace(/\/$/, "");
  return path.join(BUILD_DIR, stripped, "index.html");
}

async function lastmodForRoute(route, fallback) {
  const candidate = routeToPrerenderedPath(route);
  try {
    const stats = await stat(candidate);
    return stats.mtime.toISOString().slice(0, 10);
  } catch {
    return fallback;
  }
}

async function buildSitemap(siteUrl) {
  const origin = siteUrl.replace(/\/$/, "");
  const fallbackLastmod = new Date().toISOString().slice(0, 10);

  const urls = await Promise.all(
    SITEMAP_LOCALIZED_ROUTES.map(async (route) => {
      const slashed = toTrailingSlashRoute(route);
      const loc = `${origin}${slashed}`;
      const lastmod = await lastmodForRoute(slashed, fallbackLastmod);
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreqFor(slashed)}</changefreq>`,
        `    <priority>${priorityFor(slashed)}</priority>`,
        "  </url>",
      ].join("\n");
    })
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.join("\n"),
    "</urlset>",
    "",
  ].join("\n");
}

async function generate() {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);
  const sitemap = await buildSitemap(siteUrl);
  const outputPath = path.join(BUILD_DIR, "sitemap.xml");
  await writeFile(outputPath, sitemap, "utf8");
  process.stdout.write(
    `Sitemap generated at ${outputPath} (${SITEMAP_LOCALIZED_ROUTES.length} routes, per-route lastmod from prerendered HTML mtime).\n`
  );
}

generate().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
