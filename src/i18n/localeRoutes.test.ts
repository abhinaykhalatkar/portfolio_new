import { describe, expect, it } from "vitest";
import {
  isCaseStudyBasePath,
  isLocalizablePath,
  parseLocaleFromPath,
  stripLocalePrefix,
  switchLocaleForCurrentPath,
  toLocalizedPath,
  toPublicLocalizedPath,
  toPublicRoutePath,
} from "./localeRoutes";

describe("locale route helpers", () => {
  it("parses locale prefixes", () => {
    expect(parseLocaleFromPath("/en/projects")).toBe("en");
    expect(parseLocaleFromPath("/de/contact")).toBe("de");
    expect(parseLocaleFromPath("/projects")).toBeNull();
  });

  it("strips locale prefixes and preserves base paths", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
    expect(stripLocalePrefix("/de/projects/project-2")).toBe("/projects/project-2");
    expect(stripLocalePrefix("/about")).toBe("/about");
  });

  it("builds localized paths and switches locales", () => {
    expect(toLocalizedPath("/", "en")).toBe("/en");
    expect(toLocalizedPath("/projects/project-4", "de")).toBe("/de/projects/project-4");
    expect(toPublicRoutePath("/en/about")).toBe("/en/about/");
    expect(toPublicLocalizedPath("/", "en")).toBe("/en/");
    expect(toPublicLocalizedPath("/projects/project-4", "de")).toBe(
      "/de/projects/project-4/"
    );
    expect(switchLocaleForCurrentPath("/en/contact", "de")).toBe("/de/contact/");
    expect(switchLocaleForCurrentPath("/en/contact/", "de")).toBe("/de/contact/");
  });

  it("marks only app routes as localizable", () => {
    expect(isLocalizablePath("/projects")).toBe(true);
    expect(isLocalizablePath("/de/projects/project-1")).toBe(true);
    expect(isLocalizablePath("/RESUME-Abhinay_Khalatkar.pdf")).toBe(false);
  });

  it("recognises per-slide case-study URLs as main-page routes, but not project sections or unknown slugs", () => {
    expect(isCaseStudyBasePath("/projects/doordarshi-newsroom")).toBe(true);
    expect(isCaseStudyBasePath("/en/projects/doordarshi-newsroom")).toBe(true);
    expect(isCaseStudyBasePath("/de/projects/rental-commerce-migration/")).toBe(true);
    expect(isCaseStudyBasePath("/projects/project-1")).toBe(false);
    expect(isCaseStudyBasePath("/projects/project-catalogue")).toBe(false);
    expect(isCaseStudyBasePath("/projects")).toBe(false);
    expect(isCaseStudyBasePath("/projects/doordarshi-newsroom/extra")).toBe(false);
    expect(toPublicLocalizedPath("/projects/doordarshi-newsroom", "de")).toBe(
      "/de/projects/doordarshi-newsroom/"
    );
  });

  it("treats /resume as a canonical main route in both locales", () => {
    expect(isLocalizablePath("/resume")).toBe(true);
    expect(isLocalizablePath("/en/resume")).toBe(true);
    expect(isLocalizablePath("/de/resume")).toBe(true);
    expect(toPublicLocalizedPath("/resume", "en")).toBe("/en/resume/");
    expect(toPublicLocalizedPath("/resume", "de")).toBe("/de/resume/");
  });

  it("treats /whats-on-my-mind as a canonical main route in both locales", () => {
    expect(isLocalizablePath("/whats-on-my-mind")).toBe(true);
    expect(isLocalizablePath("/en/whats-on-my-mind")).toBe(true);
    expect(isLocalizablePath("/de/whats-on-my-mind")).toBe(true);
    expect(toPublicLocalizedPath("/whats-on-my-mind", "en")).toBe(
      "/en/whats-on-my-mind/"
    );
    expect(toPublicLocalizedPath("/whats-on-my-mind", "de")).toBe(
      "/de/whats-on-my-mind/"
    );
  });
});
