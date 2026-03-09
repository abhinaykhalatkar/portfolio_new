import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_LOCALE,
  getOpenGraphLocale,
  parseLocaleFromPath,
  stripLocalePrefix,
  toLocalizedPath,
} from "../i18n/localeRoutes";
import { resolveSeoConfig } from "./seoConfig";
import { buildStructuredDataGraph } from "./structuredData";
import {
  getSiteUrl,
  toCanonicalRouteAbsoluteUrl,
  toAbsoluteUrl,
} from "./siteUrl";

type SeoHeadProps = {
  isNotFoundPage: boolean;
};

export default function SeoHead({ isNotFoundPage }: SeoHeadProps) {
  const location = useLocation();
  const locale = parseLocaleFromPath(location.pathname) ?? DEFAULT_LOCALE;
  const basePath = stripLocalePrefix(location.pathname);
  const metadata = useMemo(
    () => resolveSeoConfig(basePath, locale, isNotFoundPage),
    [basePath, isNotFoundPage, locale]
  );

  const siteUrl = getSiteUrl();
  const canonicalUrl = toCanonicalRouteAbsoluteUrl(metadata.canonicalPath, siteUrl);
  const alternateEnglishUrl = toCanonicalRouteAbsoluteUrl(
    toLocalizedPath(basePath, "en"),
    siteUrl
  );
  const alternateGermanUrl = toCanonicalRouteAbsoluteUrl(
    toLocalizedPath(basePath, "de"),
    siteUrl
  );
  const xDefaultUrl = alternateEnglishUrl;
  const ogImageUrl = toAbsoluteUrl("/favicon.ico", siteUrl);
  const structuredData = buildStructuredDataGraph({
    metadata,
    canonicalUrl,
    siteUrl,
    locale,
  });

  return (
    <Helmet prioritizeSeoTags>
      <html lang={locale} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      <meta name="robots" content={metadata.robots} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={alternateEnglishUrl} />
      <link rel="alternate" hrefLang="de" href={alternateGermanUrl} />
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Abhinay Khalatkar Portfolio" />
      <meta property="og:locale" content={getOpenGraphLocale(locale)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
