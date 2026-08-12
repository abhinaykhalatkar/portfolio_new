import { describe, expect, it } from "vitest";
import {
  isProjectAliasPath,
  isProjectSectionPath,
  resolveSeoConfig,
} from "./seoConfig";

describe("seoConfig route mapping", () => {
  it("maps core routes to indexable metadata", () => {
    const home = resolveSeoConfig("/", "en", false);
    const projects = resolveSeoConfig("/projects", "de", false);

    expect(home.kind).toBe("home");
    expect(home.robots).toBe("index,follow");
    expect(home.canonicalPath).toBe("/en");

    expect(projects.kind).toBe("projects");
    expect(projects.robots).toBe("index,follow");
    expect(projects.canonicalPath).toBe("/de/projects");
  });

  it("marks project section routes as noindex", () => {
    const projectSection = resolveSeoConfig("/projects/project-2", "en", false);
    const projectAlias = resolveSeoConfig("/projects/project-catalogue", "de", false);

    expect(projectSection.kind).toBe("projectSection");
    expect(projectSection.robots).toBe("noindex,follow");

    expect(projectAlias.kind).toBe("projectSection");
    expect(projectAlias.robots).toBe("noindex,follow");
    expect(projectAlias.canonicalPath).toBe("/de/projects/project-catalogue");
  });

  it("marks not-found pages as noindex", () => {
    const missing = resolveSeoConfig("/missing-page", "de", true);
    expect(missing.kind).toBe("notFound");
    expect(missing.robots).toBe("noindex,follow");
  });

  it("keeps unknown routes non-indexed by default", () => {
    const unknown = resolveSeoConfig("/unknown/path", "en", false);
    expect(unknown.kind).toBe("generic");
    expect(unknown.robots).toBe("noindex,follow");
    expect(unknown.canonicalPath).toBe("/en/unknown/path");
  });

  it("detects project route helper patterns", () => {
    expect(isProjectSectionPath("/projects/project-1")).toBe(true);
    expect(isProjectSectionPath("/projects/project-catalogue")).toBe(false);
    expect(isProjectAliasPath("/projects/project-catalogue")).toBe(true);
  });

  it("maps /resume to an indexable resume config in both locales", () => {
    const en = resolveSeoConfig("/resume", "en", false);
    const de = resolveSeoConfig("/resume", "de", false);

    expect(en.kind).toBe("resume");
    expect(en.robots).toBe("index,follow");
    expect(en.canonicalPath).toBe("/en/resume");

    expect(de.kind).toBe("resume");
    expect(de.robots).toBe("index,follow");
    expect(de.canonicalPath).toBe("/de/resume");
  });

  it("keeps every indexable title ≤ 60 chars and description within 140–155 chars", () => {
    const indexablePaths = [
      "/",
      "/about",
      "/skills",
      "/projects",
      "/resume",
      "/contact",
    ];
    for (const locale of ["en", "de"] as const) {
      for (const path of indexablePaths) {
        const config = resolveSeoConfig(path, locale, false);
        expect(
          config.title.length,
          `${locale} ${path} title too long: "${config.title}"`
        ).toBeLessThanOrEqual(60);
        expect(
          config.description.length,
          `${locale} ${path} description length ${config.description.length}: "${config.description}"`
        ).toBeGreaterThanOrEqual(140);
        expect(config.description.length).toBeLessThanOrEqual(155);
      }
    }
  });

  it("never emits the retired 'Senior' / '10+ years' framing in any config", () => {
    const paths = [
      "/",
      "/about",
      "/skills",
      "/projects",
      "/resume",
      "/contact",
      "/whats-on-my-mind",
      "/projects/project-1",
      "/some-unknown-route",
    ];
    const forbidden = /Senior|10\+|10 Jahre/;
    for (const locale of ["en", "de"] as const) {
      for (const path of paths) {
        const config = resolveSeoConfig(path, locale, false);
        const serialized = JSON.stringify(config);
        expect(
          forbidden.test(serialized),
          `${locale} ${path} contains retired framing: ${serialized}`
        ).toBe(false);
      }
    }
  });

  it("marks /whats-on-my-mind as noindex in both locales with locale-prefixed canonical", () => {
    const en = resolveSeoConfig("/whats-on-my-mind", "en", false);
    const de = resolveSeoConfig("/whats-on-my-mind", "de", false);

    expect(en.kind).toBe("whatsOnMyMind");
    expect(en.robots).toBe("noindex,follow");
    expect(en.canonicalPath).toBe("/en/whats-on-my-mind");
    expect(en.title).toContain("doordarshi");

    expect(de.kind).toBe("whatsOnMyMind");
    expect(de.robots).toBe("noindex,follow");
    expect(de.canonicalPath).toBe("/de/whats-on-my-mind");
    expect(de.title).toContain("doordarshi");
  });
});
