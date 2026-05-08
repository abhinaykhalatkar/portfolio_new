// One-shot generator for public/og-image.png (1200x630 social-card asset).
// Run manually after design changes: `node scripts/generate-og-image.mjs`.
// Not wired into build:prerender — the PNG is committed to public/ and copied
// to build/ by Vite during the standard build.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer";

const ROOT_DIR = process.cwd();
const OUTPUT_PATH = path.join(ROOT_DIR, "public", "og-image.png");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        --bg: #131313;
        --bg-edge: #1b1b1b;
        --ink: #faf3f3;
        --ink-soft: rgba(250, 243, 243, 0.62);
        --rule: rgba(250, 243, 243, 0.18);
        --accent: #2A9D8F;
        --accent-warm: #E9C46A;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1200px; height: 630px; }
      body {
        font-family: "Helvetica Neue", "Inter", system-ui, -apple-system, sans-serif;
        background:
          radial-gradient(ellipse at 85% 15%, rgba(42, 157, 143, 0.18), transparent 55%),
          radial-gradient(ellipse at 12% 90%, rgba(233, 196, 106, 0.10), transparent 60%),
          linear-gradient(180deg, var(--bg) 0%, var(--bg-edge) 100%);
        color: var(--ink);
        position: relative;
        overflow: hidden;
      }
      .grid-overlay {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(var(--rule) 1px, transparent 1px),
          linear-gradient(90deg, var(--rule) 1px, transparent 1px);
        background-size: 80px 80px;
        opacity: 0.10;
        pointer-events: none;
      }
      .frame {
        position: absolute; inset: 56px;
        display: flex; flex-direction: column; justify-content: space-between;
        z-index: 1;
      }
      .top-row {
        display: flex; align-items: center; justify-content: space-between;
      }
      .kicker {
        font-family: "JetBrains Mono", "SF Mono", "Menlo", monospace;
        font-size: 18px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: var(--ink-soft);
      }
      .kicker .accent-dot {
        display: inline-block;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--accent);
        margin: 0 14px 2px 0;
        vertical-align: middle;
      }
      .domain {
        font-family: "JetBrains Mono", "SF Mono", "Menlo", monospace;
        font-size: 16px;
        color: var(--ink-soft);
        letter-spacing: 0.06em;
      }
      .center {
        display: flex; flex-direction: column; gap: 28px;
        max-width: 980px;
      }
      .rule {
        width: 96px; height: 2px;
        background: var(--accent);
      }
      h1 {
        font-family: "Georgia", "Source Serif 4", serif;
        font-size: 96px;
        line-height: 1.0;
        letter-spacing: -0.025em;
        font-weight: 400;
      }
      h1 .accent {
        font-style: italic;
        color: var(--accent-warm);
      }
      .subtitle {
        font-family: "Helvetica Neue", "Inter", sans-serif;
        font-size: 30px;
        line-height: 1.35;
        color: var(--ink-soft);
        font-weight: 400;
        max-width: 880px;
      }
      .subtitle strong { color: var(--ink); font-weight: 500; }
      .bottom-row {
        display: flex; align-items: end; justify-content: space-between;
      }
      .stack {
        display: flex; gap: 22px;
        font-family: "JetBrains Mono", "SF Mono", "Menlo", monospace;
        font-size: 18px;
        color: var(--ink-soft);
        letter-spacing: 0.04em;
      }
      .stack span:not(:last-child)::after {
        content: "·";
        margin-left: 22px;
        color: var(--accent);
      }
      .corner-tag {
        font-family: "Georgia", serif;
        font-size: 22px;
        font-style: italic;
        color: var(--ink-soft);
      }
    </style>
  </head>
  <body>
    <div class="grid-overlay"></div>
    <div class="frame">
      <div class="top-row">
        <div class="kicker">
          <span class="accent-dot"></span>Senior Engineering · DE
        </div>
        <div class="domain">abhinaykhalatkar.de</div>
      </div>

      <div class="center">
        <div class="rule"></div>
        <h1>Abhinay <span class="accent">Khalatkar</span></h1>
        <p class="subtitle">
          <strong>Senior Full-Stack Engineer.</strong>
          10+ years building scalable React, TypeScript, and Craft CMS
          platforms with agentic AI workflows.
        </p>
      </div>

      <div class="bottom-row">
        <div class="stack">
          <span>React</span>
          <span>TypeScript</span>
          <span>Craft CMS</span>
          <span>Agentic AI</span>
        </div>
        <div class="corner-tag">portfolio</div>
      </div>
    </div>
  </body>
</html>
`;

async function generate() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    const buffer = await page.screenshot({
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    await writeFile(OUTPUT_PATH, buffer);
    process.stdout.write(`OG image written to ${OUTPUT_PATH} (1200x630 PNG).\n`);
  } finally {
    await browser.close();
  }
}

generate().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
