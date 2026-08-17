import {
  getCaseStudyBySlug,
  getCaseStudyTitles,
} from "../content/portfolioCaseStudies";
import {
  stripLocalePrefix,
  toPublicLocalizedPath,
  type Locale,
} from "../i18n/localeRoutes";
import { getCaseStudySlugFromPath, type SeoRouteConfig } from "./seoConfig";
import { toAbsoluteUrl } from "./siteUrl";

export type StructuredDataPayload = {
  metadata: SeoRouteConfig;
  canonicalUrl: string;
  siteUrl: string;
  locale: Locale;
};

function buildPersonSchema(siteUrl: string, locale: Locale) {
  return {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Abhinay Khalatkar",
    jobTitle:
      locale === "de"
        ? "Full-Stack-Softwareentwickler"
        : "Full-Stack Software Developer",
    url: siteUrl,
    email: "mailto:abhinaykhalatkar@gmail.com",
    image: toAbsoluteUrl("/og-image.png", siteUrl),
    sameAs: [
      "https://www.linkedin.com/in/abhinay-khalatkar",
      "https://github.com/abhinaykhalatkar",
      "https://doordarshi.de/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geilenkirchen",
      addressCountry: "DE",
    },
    // Education is visible on the Home timeline (and About story) — schema
    // describes only on-page content.
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "SRH Hochschule Heidelberg",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Nagpur University",
      },
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PHP",
      "Craft CMS",
      "Craft Commerce",
      "GraphQL",
      "MySQL",
      "Technical SEO",
      "GDPR-by-design Development",
      "LLM Orchestration",
      "Ollama",
      "Multi-Agent Pipelines",
      "Test-Driven Development",
      "Jest",
      "Cypress",
      "Linux Server Administration",
      "Docker",
    ],
    description:
      locale === "de"
        ? "Full-Stack-Softwareentwickler mit 4+ Jahren Berufserfahrung in Deutschland — alleiniger Entwickler auf Kundenplattformen von der Designübergabe bis zur Produktion und Betreiber eines autonomen zweisprachigen KI-Newsrooms."
        : "Full-stack software developer with 4+ years of professional experience in Germany — sole engineer on client platforms from design handoff to production, and builder of an autonomous bilingual AI newsroom.",
  };
}

function buildWebSiteSchema(siteUrl: string, locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Abhinay Khalatkar Portfolio",
    description:
      locale === "de"
        ? "Portfolio von Abhinay Khalatkar: Full-Stack-Projekt-Highlights mit React, TypeScript, PHP und Craft CMS sowie ein autonomer zweisprachiger KI-Newsroom."
        : "Portfolio of Abhinay Khalatkar: full-stack project highlights across React, TypeScript, PHP, and Craft CMS, plus an autonomous bilingual AI newsroom.",
    inLanguage: ["en", "de"],
    publisher: {
      "@id": `${siteUrl}#person`,
    },
  };
}

function buildPageSchema({
  metadata,
  canonicalUrl,
  siteUrl,
  locale,
}: StructuredDataPayload) {
  const caseStudyTitles = getCaseStudyTitles(locale);

  // Home and About are both profile pages for the same Person (About is the
  // long-form story; Home is the pitch).
  if (metadata.kind === "home" || metadata.kind === "about") {
    return {
      "@type": "ProfilePage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: locale,
      mainEntity: {
        "@id": `${siteUrl}#person`,
      },
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
    };
  }

  if (metadata.kind === "caseStudy") {
    return {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: locale,
      author: { "@id": `${siteUrl}#person` },
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
    };
  }

  if (metadata.kind === "projects") {
    return {
      "@type": "CollectionPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: locale,
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
      about: [
        locale === "de"
          ? "Professionelle Full-Stack-Projekt-Highlights"
          : "Professional full-stack project highlights",
        locale === "de"
          ? "Frontend-Backend-Integration"
          : "Frontend-backend integration",
        "GraphQL proxy architecture",
        "Deployment reliability",
        locale === "de"
          ? "Agentische KI-Workflows"
          : "Agentic engineering workflows",
        ...caseStudyTitles,
      ],
    };
  }

  if (metadata.kind === "contact") {
    return {
      "@type": "ContactPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: locale,
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
    };
  }

  return {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
  };
}

/**
 * BreadcrumbList for per-slide case-study URLs: Home › Projects › <title>.
 * Only emitted for the caseStudy kind; item URLs are absolute canonicals.
 */
function buildCaseStudyBreadcrumb({
  metadata,
  canonicalUrl,
  siteUrl,
  locale,
}: StructuredDataPayload) {
  const slug = getCaseStudySlugFromPath(
    stripLocalePrefix(new URL(canonicalUrl).pathname)
  );
  const study = slug ? getCaseStudyBySlug(slug, locale) : null;
  const homeUrl = toAbsoluteUrl(toPublicLocalizedPath("/", locale), siteUrl);
  const projectsUrl = toAbsoluteUrl(
    toPublicLocalizedPath("/projects", locale),
    siteUrl
  );

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "de" ? "Start" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "de" ? "Projekte" : "Projects",
        item: projectsUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study?.title ?? metadata.title,
        item: canonicalUrl,
      },
    ],
  };
}

export function buildStructuredDataGraph(
  payload: StructuredDataPayload
): Record<string, unknown> {
  const { siteUrl, locale, metadata } = payload;
  const person = buildPersonSchema(siteUrl, locale);
  const website = buildWebSiteSchema(siteUrl, locale);
  const page = buildPageSchema(payload);
  const graph: Record<string, unknown>[] = [website, person, page];

  if (metadata.kind === "caseStudy") {
    graph.push(buildCaseStudyBreadcrumb(payload));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
