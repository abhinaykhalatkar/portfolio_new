import { normalizeCanonicalPath } from "./siteUrl";
import { getCaseStudyTitles } from "../content/portfolioCaseStudies";

const caseStudyTitles = getCaseStudyTitles();

export type SeoKind =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "projectSection"
  | "contact"
  | "notFound"
  | "generic";

export type SeoRouteConfig = {
  kind: SeoKind;
  title: string;
  description: string;
  keywords: string[];
  robots: "index,follow" | "noindex,follow";
  canonicalPath: string;
  ogType: "website" | "profile";
};

export function isProjectSectionPath(pathname: string): boolean {
  return /^\/projects\/project-\d+\/?$/.test(pathname);
}

export function isProjectAliasPath(pathname: string): boolean {
  return pathname === "/projects/project-catalogue";
}

const HOME_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "home",
  title:
    "Abhinay Khalatkar | Senior Full-Stack Software Developer (React, Craft CMS, Agentic AI)",
  description:
    "Senior Full-Stack Software Developer with 10+ years of experience architecting scalable web platforms across frontend, backend, and deployment systems. Delivering with Craft CMS, React, TypeScript, Copilot, Codex, and test-driven engineering rigor.",
  keywords: [
    "Abhinay Khalatkar",
    "Senior Full-Stack Developer",
    "React Developer",
    "Craft CMS Developer",
    "System Design",
    "Agentic AI Workflow",
    "Copilot",
    "Codex",
    "TypeScript",
    "Test-Driven Development",
  ],
  robots: "index,follow",
  ogType: "profile",
};

const ABOUT_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "about",
  title: "About | Abhinay Khalatkar",
  description:
    "Learn about Abhinay Khalatkar: senior full-stack engineer focused on system design, scalable architecture, frontend excellence, and AI-assisted engineering workflows.",
  keywords: [
    "About Abhinay Khalatkar",
    "Software Architect",
    "System Design Engineer",
    "Frontend and Backend Developer",
  ],
  robots: "index,follow",
  ogType: "website",
};

const SKILLS_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "skills",
  title: "Skills & Experience | Abhinay Khalatkar",
  description:
    "Technical expertise across TypeScript, React, Node.js, Tailwind CSS, Craft CMS, infrastructure-aware delivery, and agentic AI workflows with Copilot and Codex.",
  keywords: [
    "Full Stack Skills",
    "TypeScript",
    "Tailwind CSS",
    "AWS",
    "Hetzner",
    "Copilot",
    "Agentic Workflow",
    "React",
    "Next.js",
    "Node.js",
    "Craft CMS",
    "TDD",
    "System Design",
  ],
  robots: "index,follow",
  ogType: "website",
};

const PROJECTS_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "projects",
  title: "Projects | Abhinay Khalatkar",
  description:
    `Explore anonymized full-stack case studies and GitHub projects by Abhinay Khalatkar, including ${caseStudyTitles.join(
      ", "
    )}. Covers architecture ownership, GraphQL integration, secure deployment orchestration, and reliability-first delivery patterns.`,
  keywords: [
    "Developer Portfolio Projects",
    "Anonymized Architecture Case Studies",
    "GitHub Projects",
    "Full Stack Case Studies",
    ...caseStudyTitles,
    "React Portfolio",
    "API Development",
    "Deployment Reliability",
    "GraphQL Proxy",
  ],
  robots: "index,follow",
  ogType: "website",
};

const CONTACT_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "contact",
  title: "Contact | Abhinay Khalatkar",
  description:
    "Connect with Abhinay Khalatkar for senior-level full-stack engineering, system design leadership, Craft CMS implementation, and deployment-focused agentic AI workflows.",
  keywords: [
    "Contact Abhinay Khalatkar",
    "Hire Senior Full Stack Developer",
    "Software Consulting",
    "Craft CMS Expert",
  ],
  robots: "index,follow",
  ogType: "website",
};

const NOT_FOUND_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "notFound",
  title: "Page Not Found | Abhinay Khalatkar",
  description:
    "The requested page could not be found in Abhinay Khalatkar's portfolio.",
  keywords: ["404", "Page Not Found"],
  robots: "noindex,follow",
  ogType: "website",
};

const PROJECT_SECTION_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "projectSection",
  title: "Project Section | Abhinay Khalatkar",
  description:
    "Deep project section featuring anonymized architecture implementation details across frontend-backend integration and deployment reliability. Crawlable for navigation but excluded from indexing.",
  keywords: [
    "Projects",
    "Portfolio Section",
    "Architecture Snapshot",
    "Engineering Delivery",
  ],
  robots: "noindex,follow",
  ogType: "website",
};

const GENERIC_SEO: Omit<SeoRouteConfig, "canonicalPath"> = {
  kind: "generic",
  title: "Abhinay Khalatkar | Senior Full-Stack Software Developer",
  description:
    "Portfolio of Abhinay Khalatkar, senior full-stack engineer specializing in scalable systems, modern web architecture, and AI-assisted engineering workflows.",
  keywords: [
    "Abhinay Khalatkar",
    "Senior Developer",
    "Full Stack Portfolio",
  ],
  robots: "noindex,follow",
  ogType: "website",
};

export function resolveSeoConfig(
  pathname: string,
  isNotFoundPage: boolean
): SeoRouteConfig {
  const normalizedPath = normalizeCanonicalPath(pathname);

  if (isNotFoundPage) {
    return { ...NOT_FOUND_SEO, canonicalPath: normalizedPath };
  }

  if (isProjectSectionPath(normalizedPath) || isProjectAliasPath(normalizedPath)) {
    return { ...PROJECT_SECTION_SEO, canonicalPath: normalizedPath };
  }

  switch (normalizedPath) {
    case "/":
      return { ...HOME_SEO, canonicalPath: "/" };
    case "/about":
      return { ...ABOUT_SEO, canonicalPath: "/about" };
    case "/skills":
      return { ...SKILLS_SEO, canonicalPath: "/skills" };
    case "/projects":
      return { ...PROJECTS_SEO, canonicalPath: "/projects" };
    case "/contact":
      return { ...CONTACT_SEO, canonicalPath: "/contact" };
    default:
      return { ...GENERIC_SEO, canonicalPath: normalizedPath };
  }
}
