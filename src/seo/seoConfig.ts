import { getCaseStudyBySlug } from "../content/portfolioCaseStudies";
import { toLocalizedPath, type Locale } from "../i18n/localeRoutes";
import { normalizeCanonicalPath } from "./siteUrl";

export type SeoKind =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "caseStudy"
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

/** Slug of a per-slide case-study URL (/projects/<slug>), or null. */
export function getCaseStudySlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (!match) return null;
  return getCaseStudyBySlug(match[1]) ? match[1] : null;
}

// Per-slide case-study metadata. Each URL is a real indexable page: the title
// and description carry that project's search intent (what a recruiter or
// engineer would actually type), and the H1 on the page is the project title.
// Facts here mirror the on-page case-study copy — never claim beyond it.
const CASE_STUDY_SEO: Record<
  string,
  Record<Locale, { title: string; description: string }>
> = {
  "doordarshi-newsroom": {
    en: {
      title: "Human-Gated AI Newsroom — 8-Stage Pipeline Case Study",
      description:
        "How I built and run an autonomous EN/DE AI newsroom: 8-stage verification pipeline, local-first LLM routing, ~100 verified articles/month for €5–8.",
    },
    de: {
      title: "KI-Newsroom mit menschlicher Freigabe — Case Study",
      description:
        "Autonomer EN/DE-KI-Newsroom, den ich baue und betreibe: 8-stufige Verifikations-Pipeline, Local-first-LLM-Routing, ~100 geprüfte Artikel/Monat für 5–8 €.",
    },
  },
  "hybrid-headless-ecommerce": {
    en: {
      title: "Headless Craft CMS E-Commerce Platform — Case Study",
      description:
        "Bilingual React + TypeScript SPA on a Craft CMS 5 backend with a server-rendered SEO head and zero-credential GraphQL proxy — organic traffic grew ~6x.",
    },
    de: {
      title: "Headless-Craft-CMS-E-Commerce-Plattform — Case Study",
      description:
        "Zweisprachige React+TypeScript-SPA auf Craft CMS 5 mit serverseitigem SEO-Head und Zero-Credential-GraphQL-Proxy — organischer Traffic ~6x gewachsen.",
    },
  },
  "security-first-deployment-console": {
    en: {
      title: "Security-First PHP Deployment Console — Case Study",
      description:
        "A framework-free PHP 8 deployment console: SSE build streaming, temp-release rsync promotion, hardened auth. New client projects deploy-ready in one day.",
    },
    de: {
      title: "Security-First-PHP-Deployment-Konsole — Case Study",
      description:
        "Framework-freie PHP-8-Deployment-Konsole: SSE-Build-Streaming, Temp-Release-Promotion per rsync, gehärtete Auth. Neue Projekte in einem Tag deploy-ready.",
    },
  },
  "rental-commerce-migration": {
    en: {
      title: "Live Craft CMS 4→5 Migration, Zero Data Loss — Case Study",
      description:
        "Craft Commerce as a rental-inquiry engine, a 30-module page builder, and an in-place Craft CMS 4→5 migration of a live order database with zero data loss.",
    },
    de: {
      title: "Live-Migration Craft CMS 4→5 ohne Datenverlust — Case Study",
      description:
        "Craft Commerce als Mietanfrage-Engine, 30-Modul-Page-Builder und In-Place-Migration einer laufenden Bestelldatenbank von Craft 4 auf 5 ohne Datenverlust.",
    },
  },
};

function getCaseStudyRouteConfig(slug: string, locale: Locale): RouteConfig {
  const seo = CASE_STUDY_SEO[slug][locale];
  return {
    kind: "caseStudy",
    title: seo.title,
    description: seo.description,
    robots: "index,follow",
    ogType: "website",
  };
}

function getIndexableRouteConfig(
  kind: "home" | "about" | "skills" | "projects" | "resume" | "contact",
  locale: Locale
): RouteConfig {
  const configs = {
    en: {
      home: {
        kind: "home" as const,
        title: "Abhinay Khalatkar — Full-Stack Developer (React, Craft CMS)",
        description:
          "Full-stack developer in Germany. React, TypeScript, Next.js, Node.js, PHP, Craft CMS — and an autonomous bilingual AI newsroom. Projects and resume.",
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "About Abhinay Khalatkar — Full-Stack Developer Story",
        description:
          "Full-stack developer in Geilenkirchen, Germany — sole engineer on client platforms from design handoff to go-live, builder of an autonomous AI newsroom.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Skills — React, TypeScript, PHP, Craft CMS, AI/LLM",
        description:
          "Full skill set: React 18, Next.js, TypeScript, Node.js, PHP 8, Craft CMS 5, Jest, Cypress, Docker, rsync deploys, and LLM orchestration with Ollama.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Case Studies — AI Newsroom, E-Commerce, Deploy Tools",
        description:
          "Four production systems: an autonomous bilingual AI newsroom, an e-commerce platform grown ~6x, a deployment console, a zero-data-loss migration.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      resume: {
        kind: "resume" as const,
        title: "Resume — Abhinay Khalatkar, Full-Stack Developer",
        description:
          "Resume of Abhinay Khalatkar, full-stack developer in Germany: React, TypeScript, PHP, Craft CMS, and AI/LLM engineering. View or download the PDF.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Contact Abhinay Khalatkar — Full-Stack Developer",
        description:
          "Open to Full-Stack, Frontend, and Software Engineer roles in NRW and remote Germany. Reach Abhinay Khalatkar directly by email, LinkedIn, or GitHub.",
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
        robots: "index,follow" as const,
        ogType: "profile" as const,
      },
      about: {
        kind: "about" as const,
        title: "Über Abhinay Khalatkar — Full-Stack-Entwickler",
        description:
          "Full-Stack-Entwickler in Geilenkirchen — alleiniger Entwickler auf Kundenplattformen von der Designübergabe bis zum Go-live, Betreiber eines KI-Newsrooms.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      skills: {
        kind: "skills" as const,
        title: "Skills — React, TypeScript, PHP, Craft CMS, KI/LLM",
        description:
          "Komplettes Skill-Set: React 18, Next.js, TypeScript, Node.js, PHP 8, Craft CMS 5, Jest, Cypress, Docker, rsync-Deploys und LLM-Orchestrierung mit Ollama.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      projects: {
        kind: "projects" as const,
        title: "Projekte — KI-Newsroom, E-Commerce, Deploy-Systeme",
        description:
          "Vier Produktionssysteme: autonomer zweisprachiger KI-Newsroom, E-Commerce-Plattform mit ~6x Wachstum, Deployment-Konsole, CMS-Migration ohne Datenverlust.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      resume: {
        kind: "resume" as const,
        title: "Lebenslauf — Abhinay Khalatkar, Full-Stack-Entwickler",
        description:
          "Lebenslauf von Abhinay Khalatkar: Full-Stack-Entwickler in Deutschland — React, TypeScript, PHP, Craft CMS, KI/LLM-Engineering. Als PDF verfügbar.",
        robots: "index,follow" as const,
        ogType: "website" as const,
      },
      contact: {
        kind: "contact" as const,
        title: "Kontakt — Abhinay Khalatkar, Full-Stack-Entwickler",
        description:
          "Offen für Rollen als Full-Stack-, Frontend- und Software-Engineer in NRW sowie remote in Deutschland. Erreichbar per E-Mail, LinkedIn oder GitHub.",
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
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      whatsOnMyMind: {
        kind: "whatsOnMyMind" as const,
        title: "What's on my Mind — Live Experiments at doordarshi.de",
        description:
          "An embedded live view of doordarshi.de — my current side project — surfaced inside the portfolio. Loads only after explicit consent; not indexed because the embedded site is the canonical home for that content.",
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      notFound: {
        kind: "notFound" as const,
        title: "Page Not Found | Abhinay Khalatkar",
        description:
          "The requested page could not be found in Abhinay Khalatkar's portfolio.",
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      generic: {
        kind: "generic" as const,
        title: "Abhinay Khalatkar | Full-Stack Software Developer",
        description:
          "Portfolio of Abhinay Khalatkar, full-stack developer building React, TypeScript, PHP, and Craft CMS platforms with AI-assisted engineering workflows.",
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
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      whatsOnMyMind: {
        kind: "whatsOnMyMind" as const,
        title: "Was mir im Kopf umgeht — Experimente auf doordarshi.de",
        description:
          "Eine eingebettete Live-Ansicht von doordarshi.de — meinem aktuellen Nebenprojekt — direkt im Portfolio. Wird erst nach ausdrücklicher Zustimmung geladen und ist nicht indexiert, da die eingebettete Seite die kanonische Quelle ist.",
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      notFound: {
        kind: "notFound" as const,
        title: "Seite nicht gefunden | Abhinay Khalatkar",
        description:
          "Die angeforderte Seite konnte in Abhinay Khalatkars Portfolio nicht gefunden werden.",
        robots: "noindex,follow" as const,
        ogType: "website" as const,
      },
      generic: {
        kind: "generic" as const,
        title: "Abhinay Khalatkar | Full-Stack-Softwareentwickler",
        description:
          "Portfolio von Abhinay Khalatkar, Full-Stack-Entwickler für React-, TypeScript-, PHP- und Craft-CMS-Plattformen mit KI-gestützten Engineering-Workflows.",
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

  const caseStudySlug = getCaseStudySlugFromPath(normalizedPath);
  if (caseStudySlug) {
    return { ...getCaseStudyRouteConfig(caseStudySlug, locale), canonicalPath };
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
