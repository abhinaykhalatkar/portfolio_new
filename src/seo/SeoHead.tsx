import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { resolveSeoConfig } from "./seoConfig";
import { buildStructuredDataGraph } from "./structuredData";
import { getSiteUrl, toAbsoluteUrl } from "./siteUrl";

type SeoHeadProps = {
  isNotFoundPage: boolean;
};

export default function SeoHead({ isNotFoundPage }: SeoHeadProps) {
  const location = useLocation();
  const metadata = useMemo(
    () => resolveSeoConfig(location.pathname, isNotFoundPage),
    [isNotFoundPage, location.pathname]
  );

  const siteUrl = getSiteUrl();
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath, siteUrl);
  const ogImageUrl = toAbsoluteUrl("/favicon.ico", siteUrl);
  const structuredData = buildStructuredDataGraph({
    metadata,
    canonicalUrl,
    siteUrl,
  });

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      <meta name="robots" content={metadata.robots} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Abhinay Khalatkar Portfolio" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
