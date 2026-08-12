import { getCaseStudyTitles } from "../content/portfolioCaseStudies";
import type { Locale } from "../i18n/localeRoutes";
import type { SeoRouteConfig } from "./seoConfig";
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
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geilenkirchen",
      addressCountry: "DE",
    },
    worksFor: {
      "@type": "Organization",
      name: "scribble Werbeagentur GmbH",
    },
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

  if (metadata.kind === "home") {
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

export function buildStructuredDataGraph(
  payload: StructuredDataPayload
): Record<string, unknown> {
  const { siteUrl, locale } = payload;
  const person = buildPersonSchema(siteUrl, locale);
  const website = buildWebSiteSchema(siteUrl, locale);
  const page = buildPageSchema(payload);

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, page],
  };
}
