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
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "About | Abhinay Khalatkar",
        description:
          "Learn about Abhinay Khalatkar: senior full-stack engineer focused on system design, scalable architecture, frontend excellence, and AI-assisted engineering workflows.",
        keywords: [
          "About Abhinay Khalatkar",
          "Software Architect",
          "System Design Engineer",
          "Frontend and Backend Developer",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
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
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Projects | Abhinay Khalatkar",
        description:
          `Explore professional full-stack project highlights by Abhinay Khalatkar, including ${caseStudyTitles.join(
            ", "
          )}. Covers architecture ownership, GraphQL integration, secure deployment orchestration, and reliability-first delivery patterns.`,
        keywords: [
          "Developer Portfolio Projects",
          "Professional Full Stack Projects",
          "GitHub Projects",
          "Architecture Project Highlights",
          ...caseStudyTitles,
          "React Portfolio",
          "API Development",
          "Deployment Reliability",
          "GraphQL Proxy",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Contact | Abhinay Khalatkar",
        description:
          "Connect with Abhinay Khalatkar for senior-level full-stack engineering, system design leadership, Craft CMS implementation, and deployment-focused agentic AI workflows.",
        keywords: [
          "Contact Abhinay Khalatkar",
          "Hire Senior Full Stack Developer",
          "Software Consulting",
          "Craft CMS Expert",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
    },
    de: {
      home: {
        kind: "home" as const,
        title:
          "Abhinay Khalatkar | Senior Full-Stack Softwareentwickler (React, Craft CMS, Agentic AI)",
        description:
          "Senior Full-Stack Softwareentwickler mit über 10 Jahren Erfahrung in skalierbaren Web-Plattformen, Systemdesign, Frontend- und Backend-Architektur sowie deployment-sicheren KI-gestützten Workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Senior Full-Stack Softwareentwickler",
          "React Entwickler",
          "Craft CMS Entwickler",
          "Systemdesign",
          "Agentische KI-Workflows",
          "Copilot",
          "Codex",
          "TypeScript",
          "Testgetriebene Entwicklung",
        ],
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "Über mich | Abhinay Khalatkar",
        description:
          "Mehr über Abhinay Khalatkar: Senior Full-Stack Engineer mit Fokus auf Systemdesign, skalierbare Architektur, Frontend-Qualität und KI-gestützte Engineering-Workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Softwarearchitekt",
          "Systemdesign Engineer",
          "Frontend und Backend Entwickler",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Skills & Erfahrung | Abhinay Khalatkar",
        description:
          "Technische Expertise in TypeScript, React, Node.js, Tailwind CSS, Craft CMS, infrastrukturbewusster Auslieferung und agentischen KI-Workflows mit Copilot und Codex.",
        keywords: [
          "Full-Stack Skills",
          "TypeScript",
          "Tailwind CSS",
          "AWS",
          "Hetzner",
          "Copilot",
          "Agentische Workflows",
          "React",
          "Next.js",
          "Node.js",
          "Craft CMS",
          "TDD",
          "Systemdesign",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Projekte | Abhinay Khalatkar",
        description:
          `Entdecken Sie professionelle Full-Stack-Projekt-Highlights von Abhinay Khalatkar, darunter ${caseStudyTitles.join(
            ", "
          )}. Schwerpunkte sind Architekturverantwortung, GraphQL-Integration, sichere Deployment-Orchestrierung und zuverlässige Delivery-Muster. Öffentliche GitHub-Repositories sind in den Projektkatalog-Bereichen verfügbar.`,
        keywords: [
          "Portfolio Projekte",
          "Professionelle Full-Stack-Projekte",
          "GitHub Projekte",
          "Architektur-Projekt-Highlights",
          ...caseStudyTitles,
          "React Portfolio",
          "API Entwicklung",
          "Deployment Reliability",
          "GraphQL Proxy",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Kontakt | Abhinay Khalatkar",
        description:
          "Kontaktieren Sie Abhinay Khalatkar für Senior-Level Full-Stack Engineering, Systemdesign, Craft-CMS-Implementierung und deployment-orientierte agentische KI-Workflows.",
        keywords: [
          "Kontakt Abhinay Khalatkar",
          "Senior Full Stack Entwickler",
          "Software Beratung",
          "Craft CMS Experte",
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
