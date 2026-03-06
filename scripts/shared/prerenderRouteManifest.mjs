const LOCALES = ["en", "de"];
const CORE_ROUTE_SUFFIXES = ["", "/about", "/skills", "/projects", "/contact"];
const PROJECT_SECTION_COUNT = 5;
const PROJECT_CATALOGUE_ALIAS = "/projects/project-catalogue";

function toLocalizedRoute(locale, suffix) {
  return `/${locale}${suffix}`;
}

function buildProjectSectionRoutes(locale) {
  const sectionRoutes = Array.from(
    { length: PROJECT_SECTION_COUNT },
    (_, index) => toLocalizedRoute(locale, `/projects/project-${index + 1}`)
  );

  return [...sectionRoutes, toLocalizedRoute(locale, PROJECT_CATALOGUE_ALIAS)];
}

export const CORE_LOCALIZED_ROUTES = LOCALES.flatMap((locale) =>
  CORE_ROUTE_SUFFIXES.map((suffix) => toLocalizedRoute(locale, suffix))
);

export const PROJECT_LOCALIZED_ROUTES = LOCALES.flatMap((locale) =>
  buildProjectSectionRoutes(locale)
);

export const ALL_PRERENDER_ROUTES = [
  ...CORE_LOCALIZED_ROUTES,
  ...PROJECT_LOCALIZED_ROUTES,
];

