# Case-study architecture diagrams

Anonymized SVG diagrams prepared for the future dedicated case-study pages
(`/projects/<slug>` — deliberately **not built yet**, see the 2026-08 content
overhaul plan). They are intentionally **not wired into the site** and **not in
`public/`**, so they do not ship in any build artifact.

| File | Case study | Diagram |
|------|-----------|---------|
| `doordarshi-8-stage-pipeline.svg` | Doordarshi Newsroom | 8-stage nightly pipeline + self-hosted control plane (orchestrator, workers, model gateway, cloud escalation lane) |
| `hybrid-headless-request-flow.svg` | Hybrid headless e-commerce platform | Request flow: browser → SSR SEO head → SPA body → same-origin GraphQL proxy → Craft CMS |
| `deployment-console-deploy-flow.svg` | Security-first deployment console | Deploy flow: build → temp release → checks → rsync promotion → rollback path |
| `cms-migration-runbook.svg` | Rental & commerce platform | Migration runbook timeline: replica rehearsal → staged go-live → per-stage rollback points |

Rules baked into these files (do not violate when editing):

- **No end-client names** anywhere — clients are only ever "an industrial
  manufacturer" and "an equipment rental and sales company".
- Every metric shown comes verbatim from the portfolio content spec / resume.
- Each SVG carries an accessible `<title>` + `<desc>` with anonymized wording,
  ready to double as alt text when the diagrams are embedded.
- Self-contained: system fonts, no external references, light background.
