import { getCaseStudyTitles } from "../content/portfolioCaseStudies";
import { toLocalizedPath, type Locale } from "../i18n/localeRoutes";
import { normalizeCanonicalPath } from "./siteUrl";

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

type RouteConfig = Omit<SeoRouteConfig, "canonicalPath">;

export function isProjectSectionPath(pathname: string): boolean {
  return /^\/projects\/project-\d+\/?$/.test(pathname);
}

export function isProjectAliasPath(pathname: string): boolean {
  return pathname === "/projects/project-catalogue";
}

function getIndexableRouteConfig(
  kind: "home" | "about" | "skills" | "projects" | "contact",
  locale: Locale
): RouteConfig {
  const caseStudyTitles = getCaseStudyTitles(locale);

  const configs = {
    en: {
      home: {
        kind: "home" as const,
        title:
          "Abhinay Khalatkar — Full-Stack Engineer (React, Craft CMS)",
        description:
          "Senior full-stack engineer in Germany. 10+ years building scalable React, TypeScript, and Craft CMS platforms with agentic AI workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack Engineer Germany",
          "React Developer",
          "Craft CMS Developer",
          "TypeScript",
          "Agentic AI",
          "System Design",
        ],
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "About Abhinay Khalatkar — Engineering Approach & Story",
        description:
          "Senior engineer focused on system design, frontend rigor, and AI-assisted delivery. Background, current role at scribble Werbeagentur, and how I work.",
        keywords: [
          "Abhinay Khalatkar",
          "About",
          "Engineering Approach",
          "System Design",
          "scribble Werbeagentur",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Engineering Skills — TypeScript, React, Craft CMS, AI",
        description:
          "Tech stack and methodology: TypeScript, React, Node.js, Craft CMS, Tailwind, Hetzner/AWS deploys, and agentic AI workflows with Copilot and Codex.",
        keywords: [
          "TypeScript",
          "React",
          "Node.js",
          "Craft CMS",
          "Tailwind CSS",
          "Hetzner",
          "AWS",
          "Copilot",
          "Codex",
          "Agentic AI",
          "TDD",
          "System Design",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Engineering Case Studies — Commerce, CMS, Deploy Systems",
        description:
          "Selected full-stack case studies: enterprise commerce on Craft + React, deployment orchestration with rollback, modular CMS, and reusable boilerplates.",
        keywords: [
          "Engineering Case Studies",
          "Full-Stack Projects",
          ...caseStudyTitles,
          "React Architecture",
          "GraphQL Proxy",
          "Deployment Orchestration",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Contact Abhinay Khalatkar — Senior Engineering Inquiries",
        description:
          "Available for senior full-stack engineering, system design leadership, and Craft CMS / AI workflow consulting. Reply within 1–2 business days.",
        keywords: [
          "Contact Abhinay Khalatkar",
          "Senior Full-Stack Engineering",
          "Craft CMS Consulting",
          "AI Workflow Consulting",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
    },
    de: {
      home: {
        kind: "home" as const,
        title:
          "Abhinay Khalatkar — Full-Stack Engineer (React, Craft CMS)",
        description:
          "Senior Full-Stack Engineer in Deutschland. 10+ Jahre skalierbare React-, TypeScript- und Craft-CMS-Plattformen mit agentischen KI-Workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack Engineer Deutschland",
          "React Entwickler",
          "Craft CMS Entwickler",
          "TypeScript",
          "Agentische KI",
          "Systemdesign",
        ],
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "Über Abhinay Khalatkar — Engineering-Ansatz & Werdegang",
        description:
          "Senior Engineer mit Fokus auf Systemdesign, Frontend-Qualität und KI-gestützte Lieferung. Werdegang, aktuelle Rolle bei scribble Werbeagentur, Arbeitsweise.",
        keywords: [
          "Abhinay Khalatkar",
          "Über mich",
          "Engineering-Ansatz",
          "Systemdesign",
          "scribble Werbeagentur",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Engineering-Skills — TypeScript, React, Craft CMS, KI",
        description:
          "Stack und Methodik: TypeScript, React, Node.js, Craft CMS, Tailwind, Hetzner/AWS-Deploys, agentische KI-Workflows mit Copilot und Codex.",
        keywords: [
          "TypeScript",
          "React",
          "Node.js",
          "Craft CMS",
          "Tailwind CSS",
          "Hetzner",
          "AWS",
          "Copilot",
          "Codex",
          "Agentische KI",
          "TDD",
          "Systemdesign",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Projekt-Highlights — Commerce, CMS, Deployment-Systeme",
        description:
          "Ausgewählte Full-Stack-Projekte: Enterprise-Commerce auf Craft + React, sichere Deployment-Orchestrierung mit Rollback, modulares CMS, Boilerplates.",
        keywords: [
          "Projekt-Highlights",
          "Full-Stack Projekte",
          ...caseStudyTitles,
          "React-Architektur",
          "GraphQL-Proxy",
          "Deployment-Orchestrierung",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Kontakt — Abhinay Khalatkar | Senior-Engineering",
        description:
          "Verfügbar für Senior Full-Stack Engineering, Systemdesign-Leitung und Craft-CMS / KI-Workflow-Beratung. Antwort in 1–2 Werktagen.",
        keywords: [
          "Kontakt Abhinay Khalatkar",
          "Senior Full-Stack Engineering",
          "Craft-CMS-Beratung",
          "KI-Workflow-Beratung",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
    },
  } as const;

  return configs[locale][kind];
}

function getNonIndexableRouteConfig(
  kind: "projectSection" | "notFound" | "generic",
  locale: Locale
): RouteConfig {
  const configs = {
    en: {
      projectSection: {
        kind: "projectSection" as const,
        title: "Project Section | Abhinay Khalatkar",
        description:
          "Deep project section featuring anonymized architecture implementation details across frontend-backend integration and deployment reliability. Crawlable for navigation but excluded from indexing.",
        keywords: [
          "Projects",
          "Portfolio Section",
          "Architecture Snapshot",
          "Engineering Delivery",
        ],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      notFound: {
        kind: "notFound" as const,
        title: "Page Not Found | Abhinay Khalatkar",
        description:
          "The requested page could not be found in Abhinay Khalatkar's portfolio.",
        keywords: ["404", "Page Not Found"],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      generic: {
        kind: "generic" as const,
        title: "Abhinay Khalatkar | Senior Full-Stack Software Developer",
        description:
          "Portfolio of Abhinay Khalatkar, senior full-stack engineer specializing in scalable systems, modern web architecture, and AI-assisted engineering workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Senior Developer",
          "Full Stack Portfolio",
        ],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
    },
    de: {
      projectSection: {
        kind: "projectSection" as const,
        title: "Projektbereich | Abhinay Khalatkar",
        description:
          "Projektkatalog-Bereich mit öffentlichen GitHub-Repositories und Repository-Navigation. Crawlbar für Navigation, aber nicht indexierbar.",
        keywords: [
          "Projekte",
          "Portfolio Bereich",
          "GitHub Repository Katalog",
          "Engineering Delivery",
        ],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      notFound: {
        kind: "notFound" as const,
        title: "Seite nicht gefunden | Abhinay Khalatkar",
        description:
          "Die angeforderte Seite konnte in Abhinay Khalatkars Portfolio nicht gefunden werden.",
        keywords: ["404", "Seite nicht gefunden"],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      generic: {
        kind: "generic" as const,
        title: "Abhinay Khalatkar | Senior Full-Stack Softwareentwickler",
        description:
          "Portfolio von Abhinay Khalatkar, Senior Full-Stack Engineer mit Fokus auf skalierbare Systeme, moderne Web-Architektur und KI-gestützte Engineering-Workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Senior Entwickler",
          "Full-Stack Portfolio",
        ],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
    },
  } as const;

  return configs[locale][kind];
}

export function resolveSeoConfig(
  pathname: string,
  locale: Locale,
  isNotFoundPage: boolean
): SeoRouteConfig {
  const normalizedPath = normalizeCanonicalPath(pathname);
  const canonicalPath = toLocalizedPath(normalizedPath, locale);

  if (isNotFoundPage) {
    return { ...getNonIndexableRouteConfig("notFound", locale), canonicalPath };
  }

  if (isProjectSectionPath(normalizedPath) || isProjectAliasPath(normalizedPath)) {
    return { ...getNonIndexableRouteConfig("projectSection", locale), canonicalPath };
  }

  switch (normalizedPath) {
    case "/":
      return { ...getIndexableRouteConfig("home", locale), canonicalPath };
    case "/about":
      return { ...getIndexableRouteConfig("about", locale), canonicalPath };
    case "/skills":
      return { ...getIndexableRouteConfig("skills", locale), canonicalPath };
    case "/projects":
      return { ...getIndexableRouteConfig("projects", locale), canonicalPath };
    case "/contact":
      return { ...getIndexableRouteConfig("contact", locale), canonicalPath };
    default:
      return { ...getNonIndexableRouteConfig("generic", locale), canonicalPath };
  }
}
