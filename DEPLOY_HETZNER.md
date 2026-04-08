# Hetzner Webhosting S Deployment

## Deployment model

- This project now deploys through a project-local FTPS pipeline in `util/`.
- The deploy script builds locally, assembles a release, and uploads static files only.
- Deploy the verified prerendered artifact, not plain `npm run build`.
- Public localized routes are canonicalized to trailing-slash URLs such as `/en/about/` and `/de/projects/`.
- Project catalog routes such as `/en/projects/project-1/` are prerendered into the deploy artifact.

## Prerequisites

- Local Node.js `>=20 <25` and npm installed.
- Hetzner FTPS credentials for the portfolio docroot.
- Rewrite rules enabled via `.htaccess`, sourced from `public/.htaccess` and copied into `build/.htaccess` by Vite.
- `.env` filled with the `PORTFOLIO_FTP_*` values from `.env.example`.

## Automated FTPS deployment

1. Install dependencies:
   ```bash
   npm install
   ```
2. Fill the deploy env values in `.env`:
   - `PORTFOLIO_FTP_HOST`
   - `PORTFOLIO_FTP_PORT`
   - `PORTFOLIO_FTP_USER`
   - `PORTFOLIO_FTP_PASSWORD`
   - `PORTFOLIO_FTP_REMOTE_ROOT`
3. Run a dry-run first:
   ```bash
   npm run deploy:prod:dry-run
   ```
   This prints the resolved FTP target, safety flags, and whether a prepared release already exists.
4. Run the real deploy:
   ```bash
   npm run deploy:prod
   ```
   The script will:
   - run `npm run build:prod`
   - run `npm run release:prod`
   - connect to Hetzner over FTPS
   - upload all files from `dist/release/site` into `PORTFOLIO_FTP_REMOTE_ROOT`

## Project-specific FTPS env behavior

- `PORTFOLIO_FTP_REMOTE_ROOT` must point to the dedicated remote directory for this portfolio project.
- Use `PORTFOLIO_FTP_REMOTE_ROOT=/` only when the FTP account root is already this portfolio's docroot.
- `PORTFOLIO_FTP_CLEAN_REMOTE=true` will fully clear the remote target directory before upload.
- Keep `PORTFOLIO_FTP_CLEAN_REMOTE=false` unless the target directory is dedicated to this project and safe to replace.
- The uploader uses FTPS plus `EPSV` mode, matching the working Hetzner behavior from the reference project.

## Manual fallback

If you need to deploy manually, use the verified static artifact:

```bash
npm run verify:prod
npm run package:deploy
```

or upload the contents of local `build/` directly.

## Upload steps

1. Backup current server directory contents before replacement.
2. Delete old deploy files in the target web directory, except backup artifacts.
3. Upload all contents of local `build/` into the target directory.
   - Upload file contents, not the `build` folder itself.
4. Confirm these files exist in target:
   - `index.html`
   - `.htaccess`
   - `assets/*`
   - `en/index.html`
   - `en/about/index.html`
   - `en/skills/index.html`
   - `en/projects/index.html`
   - `en/projects/project-1/index.html`
   - `en/projects/project-catalogue/index.html`
   - `de/index.html`
   - `de/about/index.html`
   - `de/skills/index.html`
   - `de/projects/index.html`
   - `de/projects/project-1/index.html`
   - `favicon.ico`, `manifest.json`, `robots.txt`, `RESUME-Abhinay_Khalatkar.pdf`

## Post-deploy checks

Open each path directly in browser and refresh:

- `/`
- `/en/`
- `/en/about/`
- `/en/skills/`
- `/en/projects/`
- `/en/contact/`
- `/en/projects/project-1/`
- `/en/projects/project-2/`
- `/en/projects/project-catalogue/`
- `/de/`
- `/de/about/`
- `/de/projects/project-1/`
- invalid route (should show custom 404 page)

Confirm the response is `200 OK` and not Apache `404 Not Found`. If localized deep links fail, verify that:

- the contents of local `build/` were uploaded, not the `build` directory itself
- `build/.htaccess` existed before upload and `.htaccess` exists in the effective document root after upload
- `.htaccess` overrides are enabled (`AllowOverride` supports rewrite/header rules)
- the prerendered localized directories exist on the server

## Rollback

1. Remove newly uploaded files.
2. Restore previous backup snapshot.
3. Re-test primary routes.
