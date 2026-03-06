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
        ? "Senior Full-Stack Softwareentwickler"
        : "Senior Full-Stack Software Developer",
    url: siteUrl,
    email: "mailto:abhinaykhalatkar@gmail.com",
    image: toAbsoluteUrl("/favicon.ico", siteUrl),
    sameAs: [
      "https://www.linkedin.com/in/abhinay-khalatkar/",
      "https://github.com/abhinaykhalatkar",
      "https://www.instagram.com/abhinaykhalatkar/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "scribble Werbeagentur GmbH",
    },
    knowsAbout: [
      "System Design",
      "Scalable Architecture",
      "Architecture Ownership",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Craft CMS",
      "Tailwind CSS",
      "Infrastructure Reliability",
      "Deployment Orchestration",
      "Hetzner",
      "AWS",
      "Agentic AI Workflow",
      "GitHub Copilot",
      "OpenAI Codex",
      "Test-Driven Development",
      "API Engineering",
    ],
    description:
      locale === "de"
        ? "Senior Full-Stack Engineer mit über 10 Jahren Erfahrung in skalierbaren Web-Systemen, architekturgetriebener Umsetzung und verlässlichen Deployment-Workflows mit KI-gestütztem Engineering."
        : "Senior full-stack engineer with 10+ years of experience delivering scalable web systems, architecture-led execution, and reliability-focused deployment workflows with AI-assisted engineering.",
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
        ? "Senior-Full-Stack-Portfolio mit anonymisierten Architektur-Case-Studies, skalierbaren Web-Systemen, Craft-CMS-Workflows und KI-gestützter Engineering-Delivery."
        : "Senior full-stack portfolio focused on anonymized architecture case studies, scalable web systems, Craft CMS workflows, and AI-assisted engineering delivery.",
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
          ? "Anonymisierte Architektur Case Studies"
          : "Anonymized architecture case studies",
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
