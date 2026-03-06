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
});
