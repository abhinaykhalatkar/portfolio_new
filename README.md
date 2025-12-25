# Portfolio (Vite + React + TypeScript)

This project uses **Vite** for dev/build and deploys as a static SPA.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production assets into `build/`
- `npm run preview` - preview the production build locally
- `npm test` - run unit tests (Vitest)

## Deploy to Firebase Hosting (free plan)

### 1) Install Firebase CLI

```zsh
npm i -g firebase-tools
```

### 2) Initialize Firebase Hosting

Run this once in the repo root:

```zsh
firebase login
firebase init hosting
```

Important settings:

- **Public directory**: `build`
- **Configure as a single-page app (rewrite all urls to /index.html)**: **Yes**

This repo already includes a `firebase.json` with the correct SPA rewrite:

```json
{
	"hosting": {
		"public": "build",
		"rewrites": [{ "source": "**", "destination": "/index.html" }]
	}
}
```

### 3) Set your Firebase project id

Update `.firebaserc` and replace the placeholder `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID`.

### 4) Build and deploy

```zsh
npm run build
firebase deploy
```

## Routing note (React Router)

Because this is an SPA using client-side routing, Firebase must rewrite all routes to `index.html`.
That’s handled by the `rewrites` rule in `firebase.json`.
