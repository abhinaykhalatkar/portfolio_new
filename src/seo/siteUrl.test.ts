import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_URL,
  getSiteUrl,
  normalizeCanonicalPath,
  normalizeSiteUrl,
  toAbsoluteUrl,
} from "./siteUrl";

describe("siteUrl utilities", () => {
  it("normalizes site urls with protocol and trailing slash", () => {
    expect(normalizeSiteUrl("example.com")).toBe("https://example.com/");
    expect(normalizeSiteUrl("https://example.com")).toBe("https://example.com/");
    expect(normalizeSiteUrl("https://example.com/portfolio")).toBe(
      "https://example.com/portfolio/"
    );
  });

  it("falls back to default site url for invalid values", () => {
    expect(normalizeSiteUrl("")).toBe(DEFAULT_SITE_URL);
    expect(normalizeSiteUrl(":::")).toBe(DEFAULT_SITE_URL);
    expect(getSiteUrl("")).toBe(DEFAULT_SITE_URL);
  });

  it("normalizes canonical paths", () => {
    expect(normalizeCanonicalPath("/")).toBe("/");
    expect(normalizeCanonicalPath("/projects/")).toBe("/projects");
    expect(normalizeCanonicalPath("projects//project-1/?foo=1")).toBe(
      "/projects/project-1"
    );
  });

  it("builds absolute urls from path and site", () => {
    const siteUrl = "https://portfolio.example/";
    expect(toAbsoluteUrl("/en", siteUrl)).toBe("https://portfolio.example/en");
    expect(toAbsoluteUrl("/de/about", siteUrl)).toBe(
      "https://portfolio.example/de/about"
    );
  });
});
