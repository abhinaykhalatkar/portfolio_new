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
- `VITE_TIMELINE_SOURCE_URL` (default `/data/linkedin-timeline.json`) to configure the Home page timeline feed

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
