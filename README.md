# portfolio_new

Portfolio single-page app migrated to Vite with production hardening and dependency modernization.

## Requirements

- Node.js `20.19+`
- npm `10+`

## Scripts

- `npm start` or `npm run dev`: start local dev server
- `npm test`: run Vitest tests
- `npm run build`: create production bundle in `build/`
- `npm run preview`: preview production build locally
- `npm run audit`: audit all dependencies
- `npm run audit:prod`: audit production dependency tree only
- `npm run package:deploy`: build and create `build-deploy.zip`

## Base path configuration

Use `.env` (see `.env.example`) only if the app must be served from a URL prefix.

- Default (current setup): `VITE_BASE_PATH=/`

## Deployment

See [DEPLOY_HETZNER.md](DEPLOY_HETZNER.md) for manual Hetzner Webhosting S deployment steps.

## Verification artifacts

Audit/build/test before and after migration are stored in `reports/`.
