import { describe, expect, it } from "vitest";
import {
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
});
