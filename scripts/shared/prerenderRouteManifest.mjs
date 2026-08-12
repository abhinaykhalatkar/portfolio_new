const LOCALES = ["en", "de"];
const CORE_ROUTE_SUFFIXES = ["/", "/about/", "/skills/", "/projects/", "/resume/", "/contact/", "/whats-on-my-mind/"];
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

