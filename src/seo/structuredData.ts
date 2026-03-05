import type { SeoRouteConfig } from "./seoConfig";
import { toAbsoluteUrl } from "./siteUrl";
import { getCaseStudyTitles } from "../content/portfolioCaseStudies";

export type StructuredDataPayload = {
  metadata: SeoRouteConfig;
  canonicalUrl: string;
  siteUrl: string;
};

function buildPersonSchema(siteUrl: string) {
  return {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Abhinay Khalatkar",
    jobTitle: "Senior Full-Stack Software Developer",
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
      "Senior full-stack engineer with 10+ years of experience delivering scalable web systems, architecture-led execution, and reliability-focused deployment workflows with AI-assisted engineering.",
  };
}

function buildWebSiteSchema(siteUrl: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Abhinay Khalatkar Portfolio",
    description:
      "Senior full-stack portfolio focused on anonymized architecture case studies, scalable web systems, Craft CMS workflows, and AI-assisted engineering delivery.",
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}#person`,
    },
  };
}

function buildPageSchema({ metadata, canonicalUrl, siteUrl }: StructuredDataPayload) {
  const caseStudyTitles = getCaseStudyTitles();

  if (metadata.kind === "home") {
    return {
      "@type": "ProfilePage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
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
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
      about: [
        "Anonymized architecture case studies",
        "Frontend-backend integration",
        "GraphQL proxy architecture",
        "Deployment reliability",
        "Agentic engineering workflows",
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
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
  };
}

export function buildStructuredDataGraph(
  payload: StructuredDataPayload
): Record<string, unknown> {
  const { siteUrl } = payload;
  const person = buildPersonSchema(siteUrl);
  const website = buildWebSiteSchema(siteUrl);
  const page = buildPageSchema(payload);

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, page],
  };
}
