# Portfolio (Vite + React + TypeScript)

Abhinay Khalatkar's bilingual portfolio is a client-rendered React SPA built with Vite. It combines animated localized routing, route-aware SEO metadata, a static timeline feed, and a GitHub-backed project catalog for static hosting.

## Requirements

- Node.js `>=20 <25`
- npm `10+`

## Architecture

- Frontend-only monolith. There is no in-repo backend service.
- Canonical public routes are locale-prefixed: `/en/*` and `/de/*`.
- Bare routes such as `/about` redirect to the preferred localized route.
- SEO metadata is generated per route with `react-helmet-async` and captured into prerendered HTML for deployment.
- Timeline content is loaded from local JSON in `public/data/linkedin-timeline.json`.
- Project pages combine:
  - curated static case-study copy from `src/content/portfolioCaseStudies.ts`
  - live public repository data from the GitHub REST API

## Scripts

- `npm run dev` - start the Vite development server on port `3000`
- `npm run start` - backward-compatible alias for the dev server
- `npm run build` - create the production bundle in `build/`
- `npm run preview` - serve the built artifact locally with Vite preview
- `npm run build:prerender` - build the app, start preview, and prerender localized deployment routes into `build/`
- `npm test` - run the Vitest suite
- `npm run seo:validate` - validate `robots.txt`, `sitemap.xml`, `llms` artifacts, `.htaccess`, and prerendered canonicals
- `npm run package:deploy` - generate `build-deploy.zip` from the finished deploy artifact

## Environment

Copy `.env.example` to `.env` only when you need overrides:

- `VITE_BASE_PATH` - optional Vite base path for subdirectory deployments; current root-domain production assumes `/`
- `VITE_GITHUB_USERNAME` - optional GitHub username override for project catalog repo fetching
- `VITE_SITE_URL` - canonical site URL for canonical tags, Open Graph URLs, JSON-LD, and sitemap validation
- `VITE_TIMELINE_SOURCE_URL` - optional timeline feed URL override for the Home page

## Build and Deployment

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Optional: preview the built production artifact locally:
   ```bash
   npm run build
   npm run preview
   ```

### Production Artifact

Use the prerendered artifact for static deployment:

```bash
npm test
npm run build:prerender
npm run seo:validate
```

This produces a deployable `build/` directory containing:

- Vite production assets
- prerendered localized HTML routes
- static SEO artifacts from `public/`
- `.htaccess` copied from `public/.htaccess`

### Hetzner Webhosting S

Use the manual deployment guide in [DEPLOY_HETZNER.md](DEPLOY_HETZNER.md). Upload the contents of `build/`, not the `build` folder itself.

## SEO / GEO Artifacts

The app serves crawl and AI-discovery artifacts from `public/`:

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`
- route-level meta tags and JSON-LD emitted at runtime and captured by prerendering

Structured data includes:

- `Person`
- `WebSite`
- route-aware page schema such as `ProfilePage`, `CollectionPage`, `ContactPage`, and `WebPage`

## Timeline Feed Schema

Default source:

- `public/data/linkedin-timeline.json`

Supported shapes:

- a top-level object with `items`
- a top-level array of timeline entries

Supported localized fields:

- `title`
- `organization`
- `location`
- `description`
- `skills[]`

Each localized field may be either a string or an object shaped like `{ "en": "...", "de": "..." }`.

Example:

```json
{
  "items": [
    {
      "id": "exp-1",
      "type": "experience",
      "title": {
        "en": "Role Title",
        "de": "Rollenbezeichnung"
      },
      "organization": "Company Name",
      "start": "2023-01",
      "end": "present",
      "location": {
        "en": "City, Country",
        "de": "Stadt, Land"
      },
      "description": {
        "en": "What you worked on.",
        "de": "Woran Sie gearbeitet haben."
      },
      "link": "https://example.com",
      "skills": [
        "React",
        {
          "en": "System Design",
          "de": "Systemdesign"
        }
      ]
    }
  ]
}
```

Notes:

- `type` must be `experience` or `education`
- `start` must be a non-empty string
- `id`, `title`, `organization`, and `description` are required for valid entries
- invalid entries are dropped during normalization

## Canonical URL Strategy

- Canonical URLs are built from `VITE_SITE_URL` and fall back to `https://abhinaykhalatkar.de/`
- Localized canonical routes use trailing slashes, for example `/en/about/`
- Root `/` redirects to `/en/`
- Bare routes are redirect-only, not canonical
- Dynamic project section routes and `/projects/project-catalogue` remain crawlable but intentionally use `noindex,follow`
