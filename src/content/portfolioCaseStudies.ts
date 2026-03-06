import type { Locale } from "../i18n/localeRoutes";

type LocalizedCopy = Record<Locale, string>;

export type CaseStudySummary = {
  id: string;
  title: LocalizedCopy;
  architecture: LocalizedCopy;
  deliveryModel: LocalizedCopy;
  stack: LocalizedCopy;
  outcomeFocus: LocalizedCopy;
};

export type ResolvedCaseStudySummary = {
  id: string;
  title: string;
  architecture: string;
  deliveryModel: string;
  stack: string;
  outcomeFocus: string;
};

export const portfolioCaseStudies: CaseStudySummary[] = [
  {
    id: "enterprise-commerce-spa",
    title: {
      en: "Enterprise Commerce Platform",
      de: "Enterprise-Commerce-Plattform",
    },
    architecture: {
      en: "Designed a hybrid architecture that combines Craft CMS and Commerce with a React + TypeScript SPA, using a secure GraphQL proxy boundary between frontend and backend services.",
      de: "Entwickelte eine hybride Architektur aus Craft CMS, Commerce und einer React- plus TypeScript-SPA mit einer sicheren GraphQL-Proxy-Grenze zwischen Frontend- und Backend-Services.",
    },
    deliveryModel: {
      en: "Implemented multilingual route resolution, canonical URL validation, and a shared state model that kept server-rendered entry points and client navigation in sync.",
      de: "Implementierte mehrsprachige Routenauflösung, Canonical-Validierung und ein gemeinsames State-Modell, das serverseitige Entry-Points und Client-Navigation synchron hielt.",
    },
    stack: {
      en: "Craft CMS, Craft Commerce, PHP, MySQL, React, TypeScript, Redux Toolkit, GraphQL, Tailwind CSS.",
      de: "Craft CMS, Craft Commerce, PHP, MySQL, React, TypeScript, Redux Toolkit, GraphQL, Tailwind CSS.",
    },
    outcomeFocus: {
      en: "Improved platform maintainability, route correctness, and SEO-safe page delivery for large catalog navigation flows.",
      de: "Verbesserte Wartbarkeit, Routing-Korrektheit und SEO-sichere Seitenauslieferung für umfangreiche Katalognavigation.",
    },
  },
  {
    id: "secure-deployment-orchestrator",
    title: {
      en: "Secure Deployment Orchestration Service",
      de: "Sicherer Deployment-Orchestrierungsdienst",
    },
    architecture: {
      en: "Built a hardened deployment control plane with authenticated workflows, server-sent event streaming, and CLI-runner isolation for Git, build, and release operations.",
      de: "Baute eine gehärtete Deployment-Control-Plane mit authentifizierten Workflows, Server-Sent-Event-Streaming und isolierten CLI-Runnern für Git-, Build- und Release-Prozesse.",
    },
    deliveryModel: {
      en: "Introduced staged rollouts with staging-to-production promotion, host key verification, guarded command execution, and operational lock/rollback safety controls.",
      de: "Führte gestufte Rollouts mit Promotion von Staging zu Produktion, Host-Key-Verifikation, geschützter Kommandoausführung sowie Lock- und Rollback-Sicherungen ein.",
    },
    stack: {
      en: "PHP, Symfony YAML, SSE, Git automation, Composer, npm, Apache security controls.",
      de: "PHP, Symfony YAML, SSE, Git-Automatisierung, Composer, npm, Apache-Sicherheitskontrollen.",
    },
    outcomeFocus: {
      en: "Standardized release governance and reduced deployment risk through observable, repeatable, and security-first automation pipelines.",
      de: "Standardisierte Release-Governance und reduzierte Deployment-Risiken durch beobachtbare, wiederholbare und sicherheitsorientierte Automationspipelines.",
    },
  },
  {
    id: "modular-cms-workflow",
    title: {
      en: "Modular Content Platform",
      de: "Modulare Content-Plattform",
    },
    architecture: {
      en: "Engineered a modular Craft CMS setup with custom service modules, structured project configuration, and a dedicated frontend asset pipeline for maintainable growth.",
      de: "Entwickelte ein modulares Craft-CMS-Setup mit kundenspezifischen Service-Modulen, strukturierter Projektkonfiguration und einer dedizierten Frontend-Asset-Pipeline für nachhaltiges Wachstum.",
    },
    deliveryModel: {
      en: "Separated concerns across CMS configuration, module services, template routing, and build tooling to support long-term extensibility and controlled feature delivery.",
      de: "Trennte Verantwortlichkeiten zwischen CMS-Konfiguration, Modul-Services, Template-Routing und Build-Tooling, um Erweiterbarkeit und kontrollierte Feature-Auslieferung zu sichern.",
    },
    stack: {
      en: "Craft CMS, PHP modules, Composer, Webpack/Gulp asset pipeline, SCSS, Bootstrap.",
      de: "Craft CMS, PHP-Module, Composer, Webpack/Gulp-Asset-Pipeline, SCSS, Bootstrap.",
    },
    outcomeFocus: {
      en: "Enabled predictable releases and cleaner extension patterns for multi-team content and feature development.",
      de: "Ermöglichte planbare Releases und sauberere Erweiterungsmuster für Content- und Feature-Entwicklung über mehrere Teams hinweg.",
    },
  },
  {
    id: "reusable-craft-boilerplate",
    title: {
      en: "Reusable Full-Stack Boilerplate System",
      de: "Wiederverwendbares Full-Stack-Boilerplate-System",
    },
    architecture: {
      en: "Developed a reusable boilerplate foundation that unifies Craft CMS backend patterns with TypeScript and React frontend standards across environments.",
      de: "Entwickelte ein wiederverwendbares Boilerplate-Fundament, das Craft-CMS-Backend-Muster mit TypeScript- und React-Standards über mehrere Umgebungen hinweg vereinheitlicht.",
    },
    deliveryModel: {
      en: "Defined template update strategies, branch-safe merge workflows, and environment-aware build/deploy steps for faster project setup and upgrades.",
      de: "Definierte Template-Update-Strategien, branch-sichere Merge-Workflows und umgebungsbewusste Build- und Deploy-Schritte für schnellere Projektstarts und Upgrades.",
    },
    stack: {
      en: "Craft CMS, TypeScript, React, Webpack, Node.js tooling, CI-ready deployment scripts.",
      de: "Craft CMS, TypeScript, React, Webpack, Node.js-Tooling, CI-fähige Deployment-Skripte.",
    },
    outcomeFocus: {
      en: "Accelerated project kickoffs while preserving consistency, upgrade paths, and engineering governance at scale.",
      de: "Beschleunigte Projektstarts und bewahrte gleichzeitig Konsistenz, Upgrade-Pfade und Engineering-Governance im größeren Maßstab.",
    },
  },
];

function resolveCaseStudy(
  study: CaseStudySummary,
  locale: Locale
): ResolvedCaseStudySummary {
  return {
    id: study.id,
    title: study.title[locale],
    architecture: study.architecture[locale],
    deliveryModel: study.deliveryModel[locale],
    stack: study.stack[locale],
    outcomeFocus: study.outcomeFocus[locale],
  };
}

export function getCaseStudies(
  locale: Locale = "en"
): ResolvedCaseStudySummary[] {
  return portfolioCaseStudies.map((study) => resolveCaseStudy(study, locale));
}

export function getProfessionalProjects(
  locale: Locale = "en"
): ResolvedCaseStudySummary[] {
  return getCaseStudies(locale);
}

export function getCaseStudyBySection(
  sectionNumber: number,
  locale: Locale = "en"
): ResolvedCaseStudySummary | null {
  if (!Number.isFinite(sectionNumber) || sectionNumber < 1) {
    return null;
  }

  const index = Math.floor(sectionNumber) - 1;
  if (index < 0 || index >= portfolioCaseStudies.length) {
    return null;
  }

  return resolveCaseStudy(portfolioCaseStudies[index], locale);
}

export function getCaseStudyTitles(locale: Locale = "en"): string[] {
  return portfolioCaseStudies.map((study) => study.title[locale]);
}
