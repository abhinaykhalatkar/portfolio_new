# Hetzner Webhosting S Deployment (Manual Upload)

## Deployment model

- Build locally, upload static files only.
- Domain remains configured to your server subdirectory document root.
- App routes remain root-style (`/about`, `/projects`, etc.).

## Prerequisites

- Local Node.js `20.19+` and npm installed.
- Hosting access via Hetzner File Manager or SFTP.
- Rewrite rules enabled via `.htaccess` (included in `public/.htaccess` and copied to `build/.htaccess` on build).

## Build and package

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run verification:
   ```powershell
   npm test
   npm run build
   npm run audit:prod
   ```
3. Optional: create compressed deploy archive:
   ```powershell
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
   - `favicon.ico`, `manifest.json`, `robots.txt`, `RESUME-Abhinay_Khalatkar.pdf`

## Post-deploy checks

Open each path directly in browser and refresh:

- `/`
- `/about`
- `/skills`
- `/projects`
- `/contact`
- invalid route (should show custom 404 page)

## Rollback

1. Remove newly uploaded files.
2. Restore previous backup snapshot.
3. Re-test primary routes.
