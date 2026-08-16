import { getCaseStudyTitles } from "../content/portfolioCaseStudies";
import { toLocalizedPath, type Locale } from "../i18n/localeRoutes";
import { normalizeCanonicalPath } from "./siteUrl";

export type SeoKind =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "projectSection"
  | "resume"
  | "contact"
  | "whatsOnMyMind"
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
  kind: "home" | "about" | "skills" | "projects" | "resume" | "contact",
  locale: Locale
): RouteConfig {
  const caseStudyTitles = getCaseStudyTitles(locale);

  const configs = {
    en: {
      home: {
        kind: "home" as const,
        title: "Abhinay Khalatkar — Full-Stack Developer (React, Craft CMS)",
        description:
          "Full-stack developer in Germany. React, TypeScript, Next.js, Node.js, PHP, Craft CMS — and an autonomous bilingual AI newsroom. Projects and resume.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack Developer Germany",
          "React Developer",
          "Craft CMS Developer",
          "TypeScript",
          "PHP Developer",
          "AI Newsroom",
        ],
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "About Abhinay Khalatkar — Full-Stack Developer Story",
        description:
          "Full-stack developer in Geilenkirchen, Germany — sole engineer on client platforms from design handoff to go-live, builder of an autonomous AI newsroom.",
        keywords: [
          "Abhinay Khalatkar",
          "About",
          "Full-Stack Developer Geilenkirchen",
          "Sole Engineer",
          "Doordarshi Newsroom",
          "Reliability Engineering",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Skills — React, TypeScript, PHP, Craft CMS, AI/LLM",
        description:
          "Full skill set: React 18, Next.js, TypeScript, Node.js, PHP 8, Craft CMS 5, Jest, Cypress, Docker, rsync deploys, and LLM orchestration with Ollama.",
        keywords: [
          "React 18",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PHP 8",
          "Craft CMS 5",
          "Jest",
          "Cypress",
          "LLM Orchestration",
          "Ollama",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Case Studies — AI Newsroom, E-Commerce, Deploy Tools",
        description:
          "Four production systems: an autonomous bilingual AI newsroom, an e-commerce platform grown ~6x, a deployment console, a zero-data-loss migration.",
        keywords: [
          "Engineering Case Studies",
          "Full-Stack Projects",
          ...caseStudyTitles,
          "Technical SEO",
          "CMS Migration",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      resume: {
        kind: "resume" as const,
        title: "Resume — Abhinay Khalatkar, Full-Stack Developer",
        description:
          "Resume of Abhinay Khalatkar, full-stack developer in Germany: React, TypeScript, PHP, Craft CMS, and AI/LLM engineering. View or download the PDF.",
        keywords: [
          "Abhinay Khalatkar Resume",
          "Full-Stack Developer CV",
          "React Developer Resume",
          "Craft CMS",
          "PHP",
          "Germany",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Contact Abhinay Khalatkar — Full-Stack Developer",
        description:
          "Open to Full-Stack, Frontend, and Software Engineer roles in NRW and remote Germany. Reach Abhinay Khalatkar directly by email, LinkedIn, or GitHub.",
        keywords: [
          "Contact Abhinay Khalatkar",
          "Full-Stack Developer NRW",
          "Frontend Engineer Germany",
          "Software Engineer remote Germany",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
    },
    de: {
      home: {
        kind: "home" as const,
        title: "Abhinay Khalatkar — Full-Stack-Entwickler (React, PHP)",
        description:
          "Full-Stack-Entwickler in Deutschland. React, TypeScript, Node.js, PHP, Craft CMS — und ein autonomer zweisprachiger KI-Newsroom. Projekte & Lebenslauf.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack-Entwickler Deutschland",
          "React Entwickler",
          "Craft CMS Entwickler",
          "TypeScript",
          "PHP",
          "KI-Newsroom",
        ],
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "Über Abhinay Khalatkar — Full-Stack-Entwickler",
        description:
          "Full-Stack-Entwickler in Geilenkirchen — alleiniger Entwickler auf Kundenplattformen von der Designübergabe bis zum Go-live, Betreiber eines KI-Newsrooms.",
        keywords: [
          "Abhinay Khalatkar",
          "Über mich",
          "Full-Stack-Entwickler Geilenkirchen",
          "Alleiniger Entwickler",
          "Doordarshi Newsroom",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Skills — React, TypeScript, PHP, Craft CMS, KI/LLM",
        description:
          "Komplettes Skill-Set: React 18, Next.js, TypeScript, Node.js, PHP 8, Craft CMS 5, Jest, Cypress, Docker, rsync-Deploys und LLM-Orchestrierung mit Ollama.",
        keywords: [
          "React 18",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PHP 8",
          "Craft CMS 5",
          "Jest",
          "Cypress",
          "LLM-Orchestrierung",
          "Ollama",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Projekte — KI-Newsroom, E-Commerce, Deploy-Systeme",
        description:
          "Vier Produktionssysteme: autonomer zweisprachiger KI-Newsroom, E-Commerce-Plattform mit ~6x Wachstum, Deployment-Konsole, CMS-Migration ohne Datenverlust.",
        keywords: [
          "Projekt-Highlights",
          "Full-Stack Projekte",
          ...caseStudyTitles,
          "Technisches SEO",
          "CMS-Migration",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      resume: {
        kind: "resume" as const,
        title: "Lebenslauf — Abhinay Khalatkar, Full-Stack-Entwickler",
        description:
          "Lebenslauf von Abhinay Khalatkar: Full-Stack-Entwickler in Deutschland — React, TypeScript, PHP, Craft CMS, KI/LLM-Engineering. Als PDF verfügbar.",
        keywords: [
          "Abhinay Khalatkar Lebenslauf",
          "Full-Stack-Entwickler CV",
          "React Entwickler Lebenslauf",
          "Craft CMS",
          "PHP",
          "Deutschland",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Kontakt — Abhinay Khalatkar, Full-Stack-Entwickler",
        description:
          "Offen für Rollen als Full-Stack-, Frontend- und Software-Engineer in NRW sowie remote in Deutschland. Erreichbar per E-Mail, LinkedIn oder GitHub.",
        keywords: [
          "Kontakt Abhinay Khalatkar",
          "Full-Stack-Entwickler NRW",
          "Frontend Engineer Deutschland",
          "Software Engineer remote",
        ],
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
    },
  } as const;

  return configs[locale][kind];
}

function getNonIndexableRouteConfig(
  kind: "projectSection" | "whatsOnMyMind" | "notFound" | "generic",
  locale: Locale
): RouteConfig {
  const configs = {
    en: {
      projectSection: {
        kind: "projectSection" as const,
        title: "Project Section | Abhinay Khalatkar",
        description:
          "Project catalog section showing public GitHub repositories in a browsable carousel. Crawlable for navigation but excluded from indexing.",
        keywords: [
          "Projects",
          "Portfolio Section",
          "GitHub Repository Catalog",
          "Engineering Delivery",
        ],
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      whatsOnMyMind: {
        kind: "whatsOnMyMind" as const,
        title: "What's on my Mind — Live Experiments at doordarshi.de",
        description:
          "An embedded live view of doordarshi.de — my current side project — surfaced inside the portfolio. Loads only after explicit consent; not indexed because the embedded site is the canonical home for that content.",
        keywords: [
          "What's on my Mind",
          "doordarshi",
          "Side Project",
          "Live Experiment",
          "Embedded Demo",
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
        title: "Abhinay Khalatkar | Full-Stack Software Developer",
        description:
          "Portfolio of Abhinay Khalatkar, full-stack developer building React, TypeScript, PHP, and Craft CMS platforms with AI-assisted engineering workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack Developer",
          "Portfolio",
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
      whatsOnMyMind: {
        kind: "whatsOnMyMind" as const,
        title: "Was mir im Kopf umgeht — Experimente auf doordarshi.de",
        description:
          "Eine eingebettete Live-Ansicht von doordarshi.de — meinem aktuellen Nebenprojekt — direkt im Portfolio. Wird erst nach ausdrücklicher Zustimmung geladen und ist nicht indexiert, da die eingebettete Seite die kanonische Quelle ist.",
        keywords: [
          "Was mir im Kopf umgeht",
          "doordarshi",
          "Nebenprojekt",
          "Live-Experiment",
          "Eingebettete Demo",
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
        title: "Abhinay Khalatkar | Full-Stack-Softwareentwickler",
        description:
          "Portfolio von Abhinay Khalatkar, Full-Stack-Entwickler für React-, TypeScript-, PHP- und Craft-CMS-Plattformen mit KI-gestützten Engineering-Workflows.",
        keywords: [
          "Abhinay Khalatkar",
          "Full-Stack-Entwickler",
          "Portfolio",
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
    case "/resume":
      return { ...getIndexableRouteConfig("resume", locale), canonicalPath };
    case "/contact":
      return { ...getIndexableRouteConfig("contact", locale), canonicalPath };
    case "/whats-on-my-mind":
      return {
        ...getNonIndexableRouteConfig("whatsOnMyMind", locale),
        canonicalPath,
      };
    default:
      return { ...getNonIndexableRouteConfig("generic", locale), canonicalPath };
  }
}
