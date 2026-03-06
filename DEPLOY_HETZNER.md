# Hetzner Webhosting S Deployment (Manual Upload)

## Deployment model

- Build locally, upload static files only.
- Domain remains configured to your server subdirectory document root.
- Public localized routes are served from clean URLs such as `/en/about` and `/de/projects`.
- Project catalog routes such as `/en/projects/project-1` are prerendered into the deploy artifact.

## Prerequisites

- Local Node.js `20.19+` and npm installed.
- Hosting access via Hetzner File Manager or SFTP.
- Rewrite rules enabled via `.htaccess` (included in `public/.htaccess`).

## Build and package

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run verification:
   ```bash
   npm test
   npm run build:prerender
   npm run audit:prod
   npm run seo:validate
   ```
3. Optional: create compressed deploy archive:
   ```bash
   npm run package:deploy
   ```
   This generates `build-deploy.zip`.

## Upload steps

1. Backup current server directory contents before replacement.
2. Delete old deploy files in the target web directory, except backup artifacts.
3. Upload all contents of local `build/` into the target directory.
   - Upload file contents, not the `build` folder itself, unless your docroot expects it.
4. Confirm these files exist in target:
   - `index.html`
   - `.htaccess`
    - `assets/*`
   - `en/index.html`
   - `en/about/index.html`
   - `en/projects/index.html`
   - `en/projects/project-1/index.html`
   - `en/projects/project-catalogue/index.html`
   - `de/index.html`
   - `de/about/index.html`
   - `de/projects/project-1/index.html`
   - `favicon.ico`, `manifest.json`, `robots.txt`, `RESUME-Abhinay_Khalatkar.pdf`

## Post-deploy checks

Open each path directly in browser and refresh:

- `/`
- `/en`
- `/en/about`
- `/en/skills`
- `/en/projects`
- `/en/contact`
- `/en/projects/project-1`
- `/en/projects/project-2`
- `/en/projects/project-catalogue`
- `/de`
- `/de/about`
- `/de/projects/project-1`
- invalid route (should show custom 404 page)

Confirm the response is `200 OK` and not Apache `404 Not Found`. If localized deep links fail, verify that:

- the contents of local `build/` were uploaded, not the `build` directory itself
- `.htaccess` exists in the effective document root
- the prerendered localized directories exist on the server

## Rollback

1. Remove newly uploaded files.
2. Restore previous backup snapshot.
3. Re-test primary routes.
