import { describe, expect, it } from "vitest";
import {
  getProjectAddressByIndex,
  normalizeProjectSectionCount,
  parseProjectSlug,
  resolveProjectNavIndex,
} from "./VerticalProgressNav";

describe("VerticalProgressNav helpers", () => {
  it("parses valid project slugs", () => {
    expect(parseProjectSlug("project-1")).toBe(1);
    expect(parseProjectSlug("project-001")).toBe(1);
    expect(parseProjectSlug("project-10")).toBe(10);
  });

  it("rejects invalid project slugs", () => {
    expect(parseProjectSlug("project-a")).toBeNull();
    expect(parseProjectSlug("abc")).toBeNull();
    expect(parseProjectSlug("")).toBeNull();
    expect(parseProjectSlug(undefined)).toBeNull();
  });

  it("maps project index and address consistently", () => {
    const sectionCount = normalizeProjectSectionCount(5);
    expect(getProjectAddressByIndex(0, sectionCount)).toBe("/projects/project-1");
    expect(getProjectAddressByIndex(4, sectionCount)).toBe("/projects/project-5");
    expect(resolveProjectNavIndex("/projects/project-1", sectionCount)).toBe(0);
    expect(resolveProjectNavIndex("/projects/project-5", sectionCount)).toBe(4);
  });

  it("resolves alias and invalid project paths", () => {
    const sectionCount = normalizeProjectSectionCount(5);
    expect(resolveProjectNavIndex("/projects/project-catalogue", sectionCount)).toBe(4);
    expect(resolveProjectNavIndex("/projects/project-99", sectionCount)).toBe(-1);
    expect(resolveProjectNavIndex("/projects/foo", sectionCount)).toBe(-1);
  });
});
