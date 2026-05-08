# Architecture

Deep-dive companion to [../CLAUDE.md](../CLAUDE.md) and [../AGENTS.md](../AGENTS.md). For the URL contract specifically, see [route-policy.md](route-policy.md).

## Runtime model

portfolio_new is a **client-rendered React SPA** built with Vite, prerendered to static HTML, and served from Hetzner Webhosting S over Apache + `.htaccess`. There is no Node runtime in production, no server-side API, and no in-repo backend.

Tech stack:

- Vite 6 (build + dev server, `strictPort: true` on 3000)
- React 18 + TypeScript
- React Router v6 (`BrowserRouter`)
- `react-helmet-async` for `<head>` management
- Framer Motion for transitions
- MUI + Emotion for chrome
- SCSS for global styles

## Provider stack

`src/main.tsx` mounts `src/App.tsx`. The provider order is **fixed** — change it only with a clear reason:

```
HelmetProvider
  └─ BrowserRouter
       └─ LocaleProvider
            └─ ThemeProvider
                 └─ PageAnimationProvider
                      └─ ChildApp1   (the global shell)
                           └─ <Routes>
```

`HelmetProvider` must wrap routing so SEO `<head>` tags are scoped per route. `LocaleProvider` reads from the URL first, then `localStorage`. `ThemeProvider` is MUI's. `PageAnimationProvider` exposes the page-transition hook used by the shell.

## Global shell — `src/ChildApp1.tsx`

The shell owns:

- Route enter/exit transitions (Framer Motion)
- Wheel + touch full-page navigation
- Sidebar (locale switch, theme switch, primary nav)
- Vertical progress rails (`src/Components/ProgressNav/VerticalProgressNav.tsx`)
- SEO `<head>` rendering via `src/seo/SeoHead.tsx`

Pages are mounted children of the shell. They do not own navigation chrome, transition logic, or scroll observers — those are the shell's responsibility.

## Routing and locale state

Three coupled files define the URL contract — see [route-policy.md](route-policy.md) for the full breakdown:

- `src/Context/router.tsx` — `<Routes>` definitions
- `src/i18n/localeRoutes.ts` — locale prefix helpers, redirect rules, trailing-slash enforcement
- `scripts/shared/prerenderRouteManifest.mjs` — Puppeteer's prerender targets

Locale derivation order:

1. URL prefix (`/en/...` or `/de/...`)
2. `localStorage` (last user choice)
3. Default `en`

A locale switch updates the URL and persists the new choice. A user landing on a bare route (`/about`) is redirected to the persisted locale's localized version (`/<locale>/about/`). Root `/` redirects to `/en/`.

## SEO pipeline

Route metadata is **route-driven, not page-owned**. The flow:

```
seoConfig.ts (per-route metadata)
   │
   ├─► SeoHead.tsx (emits <title>, <meta>, canonical, hreflang at runtime via Helmet)
   │
   ├─► structuredData.ts (emits JSON-LD: Person, WebSite, ProfilePage / CollectionPage / ContactPage / WebPage)
   │
   ▼
prerender-routes.mjs (Puppeteer captures the rendered DOM into static HTML in build/)
   │
   ▼
validate-seo-artifacts.mjs (cross-checks robots/sitemap/llms/.htaccess/canonicals)
```

`VITE_SITE_URL` is the canonical host. Falls back to `https://abhinaykhalatkar.de/` when unset. Every canonical URL is locale-prefixed and trailing-slashed.

**Route-level robots policy:**

- Localized canonical routes: indexable, in sitemap.
- Bare aliases (`/about`, `/projects/...`): redirect-only, never canonical.
- Project section routes (`/<locale>/projects/project-N/`) and the catalogue alias: crawlable but `noindex,follow`.

## Data sources (no backend)

Three external sources, all fetched client-side:

1. **Timeline feed** — static JSON at `public/data/linkedin-timeline.json`, loaded via `src/Pages/Home/data/useTimelineFeed.ts`. Override URL with `VITE_TIMELINE_SOURCE_URL`. Schema: top-level `{items: [...]}` or top-level array. Localized fields (`title`, `organization`, `location`, `description`, `skills[]`) accept either `string` or `{en, de}`. Invalid entries drop during normalization.
2. **GitHub project catalogue** — public GitHub REST API (`/users/:username/repos?per_page=100&sort=updated`), via `src/Pages/Projects/shared/githubRepos.ts`. `VITE_GITHUB_USERNAME` overrides the user. Subject to GitHub anonymous rate limiting.
3. **Curated case studies** — source-controlled TS in `src/content/portfolioCaseStudies.ts`. Currently 4 entries.

Do **not** introduce a server contract. The static-site model is the architecture, not a temporary state.

## Build artifact pipeline

```
vite build                    →  build/
   (Vite asset hashing,            (assets, index.html, .htaccess copied from public/)
    chunk splits: mui /
    motion / icons / router /
    vendor)
        │
        ▼
prerender-routes.mjs          →  build/<locale>/.../index.html
   (Puppeteer over Vite           (one prerendered HTML per route in the manifest)
    preview, captures full
    rendered DOM)
        │
        ▼
util/build.js                 →  (project-specific build wrapper, used by deploy)
        │
        ▼
util/assemble-release.js      →  dist/release/site/
   (copies build/ + writes
    a release manifest)
        │
        ▼
util/deploy-prod.js           →  Hetzner FTPS
   (FTPS + EPSV upload to
    PORTFOLIO_FTP_REMOTE_ROOT)
```

Production hosting depends on `public/.htaccess` (copied to `build/.htaccess` by Vite). It owns:

- HTTPS canonicalization
- `www`→apex redirect
- Root `/` → `/en/` redirect
- Trailing-slash normalization for directories
- SPA fallback routing

`.htaccess` must remain in the deploy artifact.

## Vite chunk strategy

`vite.config.js` declares manual chunks to keep the main bundle small:

- `mui` — `@mui/*`, `@emotion/*`, `@popperjs/*`
- `motion` — `framer-motion`
- `icons` — `react-icons`
- `router` — `react-router*`, `@remix-run/router`
- `vendor` — everything else from `node_modules`

When adding heavy deps, check the bundle delta (`npm run build` reports chunk sizes).

## Environment

Vite-exposed (must be `VITE_*` to leak to the client):

| Var | Purpose | Falls back to |
|-----|---------|---------------|
| `VITE_BASE_PATH` | Vite base for subdirectory deploys | `/` |
| `VITE_SITE_URL` | Canonical site URL | `https://abhinaykhalatkar.de/` |
| `VITE_GITHUB_USERNAME` | GitHub catalog user | (hardcoded fallback in `githubRepos.ts`) |
| `VITE_TIMELINE_SOURCE_URL` | Timeline feed URL | `public/data/linkedin-timeline.json` |

Deploy-only (must **not** be `VITE_*`):

| Var | Purpose |
|-----|---------|
| `PORTFOLIO_FTP_HOST` | Hetzner FTPS host |
| `PORTFOLIO_FTP_PORT` | FTPS port |
| `PORTFOLIO_FTP_USER` | Dedicated portfolio FTP user |
| `PORTFOLIO_FTP_PASSWORD` | (never logged) |
| `PORTFOLIO_FTP_REMOTE_ROOT` | Remote target directory |
| `PORTFOLIO_FTP_CLEAN_REMOTE` | If `true`, wipe target before upload (dangerous) |

When changing env behavior, update `.env.example`, `README.md`, and `DEPLOY_HETZNER.md` in the same pass.

## Test layout

Vitest with jsdom. Tests live next to the code they cover:

- `src/App.test.tsx`
- `src/Components/Buttons/Buttons.test.tsx`
- `src/Components/ProgressNav/VerticalProgressNav.test.ts`
- `src/Pages/Home/Home.test.tsx`
- `src/Pages/Home/data/useTimelineFeed.test.tsx`
- `src/Pages/Projects/Projects-home/Projects-home.test.tsx`
- `src/i18n/localeRoutes.test.ts` — load-bearing (URL-contract policy tests)
- `src/seo/seoConfig.test.ts` — load-bearing (per-route metadata)
- `src/seo/siteUrl.test.ts`
- `util/assemble-release.test.js`
- `util/deploy-utils.test.js`

`vitest.setup.js` configures jsdom + testing-library.

## Quality gates

Husky-driven:

- **pre-commit** — `npm test` (Vitest)
- **pre-push** — `npm run verify:prod` (test + prerender + SEO validation)

The deploy script also runs the verify chain before uploading.

## Known technical debt

- **Project-section count split** — `PROJECT_SECTION_COUNT = 5` in the prerender manifest, 4 case studies in `portfolioCaseStudies.ts`, navigation minimums in `src/Components/`. The asymmetry is intentional (more prerendered routes than curated case studies) but the coupling is implicit. Skill `/prerender-sync-check` exists to flag drift.
- **React Router v7 future warnings** — surface in the test suite. Address when routing is next modernized.
- **Framer Motion test mocks** — leak motion props into DOM output, creating warning noise. Tests pass, but the noise hides real warnings.

## See also

- [route-policy.md](route-policy.md) — the 5-file URL contract
- [../AGENTS.md](../AGENTS.md) — ownership matrix and handoff contract
- [../CLAUDE.md](../CLAUDE.md) — entry point + commands + hard rules
- [../DEPLOY_HETZNER.md](../DEPLOY_HETZNER.md) — deploy runbook
- [../README.md](../README.md) — public-facing project overview
