import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getMessages } from "../i18n/messages";
import { portfolioCaseStudies } from "./portfolioCaseStudies";
import timelineFeed from "../../public/data/linkedin-timeline.json";

// Content-policy guards from the 2026-08 content spec:
// - honest framing only ("Full-Stack Developer", 4+ years — never "Senior",
//   never "10+ years" in any language)
// - no phone number anywhere; contact = email + LinkedIn + GitHub only
// - the rental platform is German-only; only the industrial-manufacturer
//   platform is bilingual
// - site copy is about the person, not the employer: no employer names in any
//   site-facing content (resume PDF is exempt — it is a document, not site copy)
// - no lines-of-code / file-count metrics (skill rule 9, 2026-08-17): they say
//   nothing about quality; specificity must measure outcomes or scope instead
// Real client names are deliberately NOT asserted here (that would embed them
// in the repo); the pre-deploy build grep covers them manually.
const FORBIDDEN =
  /Senior|10\+|10 Jahre|über 10 Jahre|instagram|wa\.me|17677947889|scribble|wob AG|AK Advertising|\b\d[\d.,]*k?\s*(lines|Zeilen|LOC)\b|\bLOC\b|203 (source )?(files|Dateien)/i;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((entry) => collectStrings(entry, out));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((entry) => collectStrings(entry, out));
  }
  return out;
}

describe("content policy — messages", () => {
  it("keeps EN and DE dictionaries key-identical (tsc does not enforce this at build time)", () => {
    const enKeys = Object.keys(getMessages("en")).sort();
    const deKeys = Object.keys(getMessages("de")).sort();
    expect(deKeys).toEqual(enKeys);
  });

  it("contains no retired framing, phone number, or removed social channels", () => {
    for (const locale of ["en", "de"] as const) {
      for (const [key, value] of Object.entries(getMessages(locale))) {
        expect(
          FORBIDDEN.test(value),
          `${locale} message "${key}" violates content policy: "${value}"`
        ).toBe(false);
      }
    }
  });

  it("states the honest German level A2–B1 in both locales", () => {
    expect(getMessages("en")["about.languages.german"]).toContain("A2–B1");
    expect(getMessages("de")["about.languages.german"]).toContain("A2–B1");
  });
});

describe("content policy — case studies", () => {
  it("ships exactly 4 case studies with Doordarshi Newsroom first (PROJECT_SECTION_COUNT invariant)", () => {
    expect(portfolioCaseStudies).toHaveLength(4);
    expect(portfolioCaseStudies[0].id).toBe("doordarshi-newsroom");
  });

  it("keeps case-study slugs in sync with the prerender manifest (per-slide URLs must all be prerendered + in the sitemap)", async () => {
    // The manifest is a plain .mjs (no TS imports) so the slug list is duplicated
    // there on purpose; this test is the drift guard for the 5-file URL contract.
    const manifest = await import("../../scripts/shared/prerenderRouteManifest.mjs");
    expect(manifest.CASE_STUDY_SLUGS).toEqual(portfolioCaseStudies.map((s) => s.id));
    for (const slug of manifest.CASE_STUDY_SLUGS) {
      expect(manifest.SITEMAP_LOCALIZED_ROUTES).toContain(`/en/projects/${slug}/`);
      expect(manifest.SITEMAP_LOCALIZED_ROUTES).toContain(`/de/projects/${slug}/`);
    }
  });

  it("gives every case study a non-generic Problem statement in both locales (skill template: Problem → role → approach → outcome)", () => {
    for (const study of portfolioCaseStudies) {
      for (const locale of ["en", "de"] as const) {
        const problem = study.problem[locale];
        expect(problem.length, `${study.id} ${locale} problem too short`).toBeGreaterThan(80);
        // Must name a concrete constraint, not a buzzword — every Problem here
        // mentions at least one specific noun from the system it introduces.
        expect(problem).toMatch(/SEO|CMS|newsroom|Newsroom|deploy|Deploy|order|Bestell|credential|Credential|LLM|rollback|Rollback/i);
      }
    }
  });

  it("leads the newsroom claim with human gating, not volume (quality-first ordering)", () => {
    for (const locale of ["en", "de"] as const) {
      const value = getMessages(locale)["home.stats.3.value"];
      expect(value.toLowerCase()).toMatch(/human-gated|menschlich freigegeben/);
      expect(value).not.toMatch(/^~?100 /);
    }
    const doordarshi = portfolioCaseStudies[0];
    expect(doordarshi.outcomeFocus.en.startsWith("100% human-gated")).toBe(true);
    expect(doordarshi.outcomeFocus.de.startsWith("100 % menschlich freigegeben")).toBe(true);
  });

  it("contains no retired framing or forbidden channels in any locale field", () => {
    for (const study of portfolioCaseStudies) {
      for (const text of collectStrings(study)) {
        expect(
          FORBIDDEN.test(text),
          `case study "${study.id}" violates content policy: "${text}"`
        ).toBe(false);
      }
    }
  });

  it("never describes the rental platform as bilingual — only the e-commerce platform is", () => {
    const rental = portfolioCaseStudies.find(
      (study) => study.id === "rental-commerce-migration"
    );
    const ecommerce = portfolioCaseStudies.find(
      (study) => study.id === "hybrid-headless-ecommerce"
    );
    expect(rental).toBeDefined();
    expect(ecommerce).toBeDefined();

    const rentalText = collectStrings(rental).join(" ");
    expect(rentalText).not.toMatch(/bilingual|multilingual|zweisprachig|mehrsprachig/i);
    expect(rentalText).toMatch(/German-language|deutschsprachig/i);

    const ecommerceText = collectStrings(ecommerce).join(" ");
    expect(ecommerceText).toMatch(/bilingual|zweisprachig/i);
  });
});

describe("content policy — timeline feed", () => {
  it("keeps every localized field bilingual and free of policy violations", () => {
    expect(timelineFeed.items.length).toBeGreaterThanOrEqual(6);

    for (const item of timelineFeed.items) {
      expect(item.title).toHaveProperty("en");
      expect(item.title).toHaveProperty("de");
      expect(item.description).toHaveProperty("en");
      expect(item.description).toHaveProperty("de");

      for (const text of collectStrings(item)) {
        expect(
          FORBIDDEN.test(text),
          `timeline item "${item.id}" violates content policy: "${text}"`
        ).toBe(false);
      }
    }
  });

  it("leads with the Doordarshi Newsroom entry per the spec timeline", () => {
    expect(timelineFeed.items[0].id).toBe("exp-doordarshi-newsroom");
    expect(timelineFeed.items[0].end).toBe("present");
  });
});

describe("content policy — public discovery files", () => {
  const publicFiles = ["llms.txt", "llms-full.txt", "manifest.json"];

  it.each(publicFiles)("%s contains no retired framing, phone, or Instagram", (file) => {
    const content = readFileSync(
      path.join(process.cwd(), "public", file),
      "utf-8"
    );
    expect(
      FORBIDDEN.test(content),
      `public/${file} violates content policy`
    ).toBe(false);
  });

  it("llms files point at the canonical LinkedIn URL without trailing slash", () => {
    for (const file of ["llms.txt", "llms-full.txt"]) {
      const content = readFileSync(
        path.join(process.cwd(), "public", file),
        "utf-8"
      );
      expect(content).toContain("https://www.linkedin.com/in/abhinay-khalatkar");
      expect(content).not.toContain("linkedin.com/in/abhinay-khalatkar/");
    }
  });
});
