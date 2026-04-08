export type Locale = "en" | "de";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de"];
export const LOCALE_STORAGE_KEY = "portfolio-locale";

export const MAIN_BASE_ROUTES = [
  "/",
  "/about",
  "/skills",
  "/projects",
  "/contact",
] as const;

function normalizeBasePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");
  return collapsed.length > 1 && collapsed.endsWith("/")
    ? collapsed.slice(0, -1)
    : collapsed;
}

export function parseLocaleFromPath(pathname: string): Locale | null {
  const match = normalizeBasePath(pathname).match(/^\/(en|de)(?=\/|$)/);
  if (!match) {
    return null;
  }

  return match[1] as Locale;
}

export function stripLocalePrefix(pathname: string): string {
  const normalizedPath = normalizeBasePath(pathname);
  const locale = parseLocaleFromPath(normalizedPath);
  if (!locale) {
    return normalizedPath;
  }

  const stripped = normalizedPath.replace(/^\/(en|de)(?=\/|$)/, "");
  return stripped.length > 0 ? normalizeBasePath(stripped) : "/";
}

export function toLocalizedPath(basePath: string, locale: Locale): string {
  const normalizedBasePath = stripLocalePrefix(basePath);
  if (normalizedBasePath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedBasePath}`;
}

export function toPublicRoutePath(pathname: string): string {
  const normalizedPath = normalizeBasePath(pathname);
  if (normalizedPath === "/") {
    return "/";
  }

  return `${normalizedPath}/`;
}

export function toPublicLocalizedPath(basePath: string, locale: Locale): string {
  return toPublicRoutePath(toLocalizedPath(basePath, locale));
}

export function switchLocaleForCurrentPath(
  pathname: string,
  nextLocale: Locale
): string {
  return toPublicLocalizedPath(stripLocalePrefix(pathname), nextLocale);
}

export function isMainBaseRoute(basePath: string): boolean {
  return MAIN_BASE_ROUTES.includes(stripLocalePrefix(basePath) as (typeof MAIN_BASE_ROUTES)[number]);
}

export function isProjectBasePath(basePath: string): boolean {
  return stripLocalePrefix(basePath).startsWith("/projects");
}

export function isLocalizablePath(pathname: string): boolean {
  const basePath = stripLocalePrefix(pathname);
  return isMainBaseRoute(basePath) || isProjectBasePath(basePath);
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "en" || stored === "de") {
    return stored;
  }

  return null;
}

export function writeStoredLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function getPreferredLocale(): Locale {
  return readStoredLocale() ?? DEFAULT_LOCALE;
}

export function getIntlLocale(locale: Locale): string {
  return locale === "de" ? "de-DE" : "en-US";
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "de" ? "de_DE" : "en_US";
}
