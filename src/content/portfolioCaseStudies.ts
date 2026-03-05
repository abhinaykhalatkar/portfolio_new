export type CaseStudySummary = {
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
    title: "Enterprise Commerce Platform",
    architecture:
      "Designed a hybrid architecture that combines Craft CMS and Commerce with a React + TypeScript SPA, using a secure GraphQL proxy boundary between frontend and backend services.",
    deliveryModel:
      "Implemented multilingual route resolution, canonical URL validation, and a shared state model that kept server-rendered entry points and client navigation in sync.",
    stack:
      "Craft CMS, Craft Commerce, PHP, MySQL, React, TypeScript, Redux Toolkit, GraphQL, Tailwind CSS.",
    outcomeFocus:
      "Improved platform maintainability, route correctness, and SEO-safe page delivery for large catalog navigation flows.",
  },
  {
    id: "secure-deployment-orchestrator",
    title: "Secure Deployment Orchestration Service",
    architecture:
      "Built a hardened deployment control plane with authenticated workflows, server-sent event streaming, and CLI-runner isolation for Git, build, and release operations.",
    deliveryModel:
      "Introduced staged rollouts with staging-to-production promotion, host key verification, guarded command execution, and operational lock/rollback safety controls.",
    stack:
      "PHP, Symfony YAML, SSE, Git automation, Composer, npm, Apache security controls.",
    outcomeFocus:
      "Standardized release governance and reduced deployment risk through observable, repeatable, and security-first automation pipelines.",
  },
  {
    id: "modular-cms-workflow",
    title: "Modular Content Platform",
    architecture:
      "Engineered a modular Craft CMS setup with custom service modules, structured project configuration, and a dedicated frontend asset pipeline for maintainable growth.",
    deliveryModel:
      "Separated concerns across CMS configuration, module services, template routing, and build tooling to support long-term extensibility and controlled feature delivery.",
    stack:
      "Craft CMS, PHP modules, Composer, Webpack/Gulp asset pipeline, SCSS, Bootstrap.",
    outcomeFocus:
      "Enabled predictable releases and cleaner extension patterns for multi-team content and feature development.",
  },
  {
    id: "reusable-craft-boilerplate",
    title: "Reusable Full-Stack Boilerplate System",
    architecture:
      "Developed a reusable boilerplate foundation that unifies Craft CMS backend patterns with TypeScript and React frontend standards across environments.",
    deliveryModel:
      "Defined template update strategies, branch-safe merge workflows, and environment-aware build/deploy steps for faster project setup and upgrades.",
    stack:
      "Craft CMS, TypeScript, React, Webpack, Node.js tooling, CI-ready deployment scripts.",
    outcomeFocus:
      "Accelerated project kickoffs while preserving consistency, upgrade paths, and engineering governance at scale.",
  },
];

export function getCaseStudyBySection(
  sectionNumber: number
): CaseStudySummary | null {
  if (!Number.isFinite(sectionNumber) || sectionNumber < 1) {
    return null;
  }

  const index = Math.floor(sectionNumber) - 1;
  if (index < 0 || index >= portfolioCaseStudies.length) {
    return null;
  }

  return portfolioCaseStudies[index];
}

export function getCaseStudyTitles(): string[] {
  return portfolioCaseStudies.map((study) => study.title);
}
