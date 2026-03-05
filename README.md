# Portfolio (Vite + React + TypeScript)

Portfolio single-page application built with Vite and React, with animated route transitions, GitHub-backed project sections, and production-grade SEO/GEO hardening.

## Requirements

- Node.js `20+`
- npm `10+`

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production assets into `build/`
- `npm run build:prerender` - build and prerender core routes (`/`, `/about`, `/skills`, `/projects`, `/contact`)
- `npm run preview` - preview the production build locally
- `npm test` - run unit tests (Vitest)
- `npm run test:watch` - run tests in watch mode
- `npm run seo:validate` - validate `robots.txt`, `sitemap.xml`, and `llms` artifacts
- `npm run audit` - run dependency audit
- `npm run audit:prod` - run production-only dependency audit
- `npm run package:deploy` - build and create `build-deploy.zip`

## Environment

Copy `.env.example` to `.env` if you need custom values:

- `VITE_BASE_PATH` (default `/`) for sub-path deployments
- `VITE_GITHUB_USERNAME` to override the GitHub account used in project carousels
- `VITE_SITE_URL` (default `https://abhinay-portfolio.web.app/`) used for canonical URLs, Open Graph URLs, and JSON-LD
- `VITE_TIMELINE_SOURCE_URL` (default `/data/linkedin-timeline.json`) to configure the Home page timeline feed

## SEO / GEO Artifacts

Public crawl and AI-discovery artifacts are served from `public/`:

- `robots.txt` with crawl directives and sitemap declaration
- `sitemap.xml` with core indexable routes
- `llms.txt` and `llms-full.txt` for agent-oriented discoverability
- route-level metadata + JSON-LD at runtime via `react-helmet-async` (includes `noindex,follow` for dynamic project section routes)

## Structured Data

Runtime JSON-LD includes:

- `Person`
- `WebSite`
- route-aware page schema (`ProfilePage`, `CollectionPage`, `ContactPage`, `WebPage`)

## Deployment

### Hetzner Webhosting S

Use the manual deployment guide in [DEPLOY_HETZNER.md](DEPLOY_HETZNER.md).

### Firebase Hosting

If you deploy to Firebase, keep SPA rewrites enabled so all routes resolve to `index.html`.

## Timeline Feed Schema

The Home page reads timeline data from JSON and renders it dynamically with animations.

Default path:

- `public/data/linkedin-timeline.json`

Supported format:

```json
{
  "items": [
    {
      "id": "exp-1",
      "type": "experience",
      "title": "Role Title",
      "organization": "Company Name",
      "start": "2023-01",
      "end": "Present",
      "location": "City, Country",
      "description": "What you worked on.",
      "link": "https://example.com",
      "skills": ["React", "TypeScript"]
    }
  ]
}
```

Notes:

- `type` must be `experience` or `education`
- `id`, `title`, `organization`, `start`, and `description` are required
- You can also provide a top-level array instead of `{ "items": [] }`

## Canonical Strategy

- Canonical URLs are built from `VITE_SITE_URL`.
- If not set, fallback canonical root is `https://abhinay-portfolio.web.app/`.
- Dynamic project section routes (`/projects/project-*` and `/projects/project-catalogue`) are crawlable but intentionally marked `noindex,follow`.
