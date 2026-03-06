export const DEFAULT_SITE_URL = "https://abhinaykhalatkar.de/";

function ensureProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
}

export function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  try {
    const withProtocol = ensureProtocol(trimmed);
    const parsed = new URL(withProtocol);

    // Always keep trailing slash for site root and remove hash/query noise.
    parsed.hash = "";
    parsed.search = "";
    if (!parsed.pathname.endsWith("/")) {
      parsed.pathname = `${parsed.pathname}/`;
    }

    return parsed.toString();
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl(
  explicitValue?: string,
  fallback: string = DEFAULT_SITE_URL
): string {
  const envValue =
    explicitValue ??
    (typeof import.meta !== "undefined" &&
    import.meta.env &&
    typeof import.meta.env.VITE_SITE_URL === "string"
      ? import.meta.env.VITE_SITE_URL
      : "");

  if (typeof envValue === "string" && envValue.trim().length > 0) {
    return normalizeSiteUrl(envValue);
  }

  return normalizeSiteUrl(fallback);
}

export function normalizeCanonicalPath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const pathOnly = pathname.split("#")[0].split("?")[0];
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsed !== "/" && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1);
  }
  return collapsed;
}

export function toAbsoluteUrl(
  pathname: string,
  siteUrl: string = getSiteUrl()
): string {
  const normalizedPath = normalizeCanonicalPath(pathname);
  const absolute = new URL(normalizedPath, normalizeSiteUrl(siteUrl));
  return absolute.toString();
}
