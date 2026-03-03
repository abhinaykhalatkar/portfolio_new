# Portfolio (Vite + React + TypeScript)

Portfolio single-page application built with Vite and React, with animated route transitions and GitHub-backed project sections.

## Requirements

- Node.js `20+`
- npm `10+`

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production assets into `build/`
- `npm run preview` - preview the production build locally
- `npm test` - run unit tests (Vitest)
- `npm run test:watch` - run tests in watch mode
- `npm run audit` - run dependency audit
- `npm run audit:prod` - run production-only dependency audit
- `npm run package:deploy` - build and create `build-deploy.zip`

## Environment

Copy `.env.example` to `.env` if you need custom values:

- `VITE_BASE_PATH` (default `/`) for sub-path deployments
- `VITE_GITHUB_USERNAME` to override the GitHub account used in project carousels

## Deployment

### Hetzner Webhosting S

Use the manual deployment guide in [DEPLOY_HETZNER.md](DEPLOY_HETZNER.md).

### Firebase Hosting

If you deploy to Firebase, keep SPA rewrites enabled so all routes resolve to `index.html`.
