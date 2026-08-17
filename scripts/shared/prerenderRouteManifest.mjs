const LOCALES = ["en", "de"];
// Per-slide case-study URLs: each renders the Projects carousel with that slide
// active and is a real indexable page (own title/description/canonical/H1).
// MUST stay in carousel order and in sync with `portfolioCaseStudies.ts` ids
// (src/content/contentPolicy.test.ts guards the pairing).
const CASE_STUDY_SLUGS = [
  "doordarshi-newsroom",
  "hybrid-headless-ecommerce",
  "security-first-deployment-console",
  "rental-commerce-migration",
];
const CORE_ROUTE_SUFFIXES = [
  "/",
  "/about/",
  "/skills/",
  "/projects/",
  ...CASE_STUDY_SLUGS.map((slug) => `/projects/${slug}/`),
  "/resume/",
  "/contact/",
  "/whats-on-my-mind/",
];
// Routes that are prerendered + crawlable but should NOT appear in sitemap.xml
// (they carry a `noindex,follow` robots policy in seoConfig.ts).
const NOINDEX_CORE_ROUTE_SUFFIXES = new Set(["/whats-on-my-mind/"]);
const PROJECT_SECTION_COUNT = 5;
const PROJECT_CATALOGUE_ALIAS = "/projects/project-catalogue/";

function toLocalizedRoute(locale, suffix) {
  return `/${locale}${suffix}`;
}

function buildProjectSectionRoutes(locale) {
  const sectionRoutes = Array.from(
    { length: PROJECT_SECTION_COUNT },
    (_, index) => toLocalizedRoute(locale, `/projects/project-${index + 1}/`)
  );

  return [...sectionRoutes, toLocalizedRoute(locale, PROJECT_CATALOGUE_ALIAS)];
}

export const CORE_LOCALIZED_ROUTES = LOCALES.flatMap((locale) =>
  CORE_ROUTE_SUFFIXES.map((suffix) => toLocalizedRoute(locale, suffix))
);

export const SITEMAP_LOCALIZED_ROUTES = LOCALES.flatMap((locale) =>
  CORE_ROUTE_SUFFIXES
    .filter((suffix) => !NOINDEX_CORE_ROUTE_SUFFIXES.has(suffix))
    .map((suffix) => toLocalizedRoute(locale, suffix))
);

export const PROJECT_LOCALIZED_ROUTES = LOCALES.flatMap((locale) =>
  buildProjectSectionRoutes(locale)
);

export const ALL_PRERENDER_ROUTES = [
  ...CORE_LOCALIZED_ROUTES,
  ...PROJECT_LOCALIZED_ROUTES,
];

export { CASE_STUDY_SLUGS };

