import type { Locale } from "../i18n/localeRoutes";

type LocalizedCopy = Record<Locale, string>;

export type CaseStudySummary = {
  id: string;
  title: LocalizedCopy;
  architecture: LocalizedCopy;
  deliveryModel: LocalizedCopy;
  stack: LocalizedCopy;
  outcomeFocus: LocalizedCopy;
};

export type ResolvedCaseStudySummary = {
  id: string;
  title: string;
  architecture: string;
  deliveryModel: string;
  stack: string;
  outcomeFocus: string;
};

export const portfolioCaseStudies: CaseStudySummary[] = [
  {
    id: "doordarshi-newsroom",
    title: {
      en: "Doordarshi Newsroom — Autonomous Bilingual AI Newsroom",
      de: "Doordarshi Newsroom — Autonomer zweisprachiger KI-Newsroom",
    },
    architecture: {
      en: "An eight-stage nightly pipeline — intake, claim verification, editorial standards, growth, original writing, media, EU/DE compliance, and a human approval gate — on a self-hosted multi-agent control plane: a Unix-domain-socket orchestrator with lease/heartbeat semantics, schema-validated JSON contracts between stages, and policy-driven retries, so a failed stage never corrupts a batch.",
      de: "Eine achtstufige nächtliche Pipeline — Intake, Claim-Verifikation, redaktionelle Standards, Growth, eigenständiges Schreiben, Medien, EU/DE-Compliance und ein menschliches Freigabe-Gate — auf einer selbst gehosteten Multi-Agent-Control-Plane: ein Unix-Socket-Orchestrator mit Lease/Heartbeat-Semantik, schema-validierte JSON-Contracts zwischen den Stufen und richtliniengesteuerte Retries — eine fehlgeschlagene Stufe korrumpiert nie einen Batch.",
    },
    deliveryModel: {
      en: "Personal project, in production since 2025. Cost- and privacy-aware LLM routing keeps it viable: a local-first model gateway (Ollama plus an external GPU node), deterministic quality gates, escalation-only cloud lanes, and a self-healing circuit breaker proven in production against unstable hardware. Compliance by construction: GDPR data minimization, fail-closed protection gates, synthetic-content labeling, and German press-code checks.",
      de: "Persönliches Projekt, seit 2025 in Produktion. Kosten- und datenschutzbewusstes LLM-Routing hält es tragfähig: ein Local-first-Model-Gateway (Ollama plus externer GPU-Node), deterministische Quality Gates, Cloud nur zur Eskalation und ein selbstheilender Circuit Breaker, in Produktion gegen instabile Hardware erprobt. Compliance eingebaut: DSGVO-Datenminimierung, fail-closed Schutz-Gates, Kennzeichnung synthetischer Inhalte und Pressekodex-Prüfungen.",
    },
    stack: {
      en: "Python, pytest with regression fixtures, Ollama with local + cloud LLM routing, multi-agent orchestration over Unix sockets, Google News sitemaps, Atom/RSS with WebSub push, IndexNow, bilingual hreflang, JSON-LD structured data.",
      de: "Python, pytest mit Regression-Fixtures, Ollama mit lokalem + Cloud-LLM-Routing, Multi-Agent-Orchestrierung über Unix-Sockets, Google-News-Sitemaps, Atom/RSS mit WebSub-Push, IndexNow, zweisprachiges hreflang, JSON-LD.",
    },
    outcomeFocus: {
      en: "~100 verified bilingual articles/month · €5–8/month total operating cost · 8 pipeline stages · 2 languages · 100% human-gated publishing.",
      de: "~100 verifizierte zweisprachige Artikel/Monat · 5–8 € Gesamtbetriebskosten/Monat · 8 Pipeline-Stufen · 2 Sprachen · 100 % menschlich freigegebene Veröffentlichung.",
    },
  },
  {
    id: "hybrid-headless-ecommerce",
    title: {
      en: "Hybrid Headless E-Commerce Platform",
      de: "Hybride Headless-E-Commerce-Plattform",
    },
    architecture: {
      en: "A bilingual e-commerce platform for an industrial manufacturer: the Craft CMS 5 / PHP 8.2 backend server-renders the SEO-critical document head — canonical and hreflang tags, Open Graph, four JSON-LD schema types, per-language XML sitemaps — while a React 18 + TypeScript SPA owns the body. A staged client-side URL resolver with in-flight request cancellation and a queue-based product catalog import complete the platform.",
      de: "Eine zweisprachige E-Commerce-Plattform für einen Industriehersteller: Das Craft-CMS-5/PHP-8.2-Backend rendert den SEO-kritischen Dokumentkopf serverseitig — Canonical- und hreflang-Tags, Open Graph, vier JSON-LD-Schema-Typen, XML-Sitemaps pro Sprache — während eine React-18+TypeScript-SPA den Body übernimmt. Ein gestufter clientseitiger URL-Resolver mit Request-Abbruch und ein queue-basierter Produktkatalog-Import runden die Plattform ab.",
    },
    deliveryModel: {
      en: "Built as the sole engineer from design handoff to production. A zero-credential API boundary — a same-origin GraphQL proxy — keeps schema tokens server-side, enforces CSRF on mutations only, and stamps API responses noindex; no API credentials ever reach the browser. GDPR consent gates all storage writes, DOMPurify sanitizes all CMS content, hCaptcha protects public forms.",
      de: "Als alleiniger Entwickler von der Designübergabe bis zur Produktion gebaut. Eine Zero-Credential-API-Grenze — ein Same-Origin-GraphQL-Proxy — hält Schema-Tokens serverseitig, erzwingt CSRF nur auf Mutationen und stempelt API-Antworten mit noindex; Credentials erreichen den Browser nie. DSGVO-Consent schützt alle Storage-Zugriffe, DOMPurify bereinigt alle CMS-Inhalte, hCaptcha sichert öffentliche Formulare.",
    },
    stack: {
      en: "Craft CMS 5, PHP 8.2 (~7,100 lines across 2 custom modules), GraphQL, React 18, strict-mode TypeScript (~29k lines, 203 files, 47 components, 8 Redux slices), 48 GraphQL query files — with 91 Jest test files and 23 Cypress E2E specs behind a pre-push gate.",
      de: "Craft CMS 5, PHP 8.2 (~7.100 Zeilen in 2 eigenen Modulen), GraphQL, React 18, Strict-Mode-TypeScript (~29k Zeilen, 203 Dateien, 47 Komponenten, 8 Redux-Slices), 48 GraphQL-Query-Dateien — mit 91 Jest-Testdateien und 23 Cypress-E2E-Specs hinter einem Pre-Push-Gate.",
    },
    outcomeFocus: {
      en: "Organic visitors grew ~6x after the technical SEO rebuild: from ~1,000 to ~6,000/month; search impressions from ~64,000 to ~105,000. Two live languages, a third scaffolded.",
      de: "Organische Besucher wuchsen nach dem technischen SEO-Rebuild ~6x: von ~1.000 auf ~6.000 pro Monat; Suchimpressionen von ~64.000 auf ~105.000. Zwei Sprachen live, eine dritte vorbereitet.",
    },
  },
  {
    id: "security-first-deployment-console",
    title: {
      en: "Security-First Deployment Console",
      de: "Security-First-Deployment-Konsole",
    },
    architecture: {
      en: "~7,700 lines of framework-free PHP 8 and vanilla JavaScript with a single dependency (symfony/yaml). Live build output streams over Server-Sent Events into an in-browser xterm.js terminal; isolated temp-release builds are promoted via rsync only on success, with automatic protection of production-only content and fast, testable rollbacks.",
      de: "~7.700 Zeilen framework-freies PHP 8 und Vanilla JavaScript mit einer einzigen Abhängigkeit (symfony/yaml). Live-Build-Ausgabe streamt über Server-Sent Events in ein xterm.js-Terminal im Browser; isolierte Temp-Release-Builds werden nur bei Erfolg per rsync promotet — mit automatischem Schutz produktionsspezifischer Inhalte und schnellen, testbaren Rollbacks.",
    },
    deliveryModel: {
      en: "An internal tool I designed and built at my agency, now part of the standard workflow on every project. Hardened by default: bcrypt auth, per-IP rate limiting (5 failures/60s triggers a 5-minute lockout), one-time action-bound run tokens valid for 90 seconds — CSRF protection designed for EventSource — a 'self'-only Content-Security-Policy with zero CDN assets, and a web/CLI privilege split.",
      de: "Ein internes Tool, das ich in meiner Agentur konzipiert und gebaut habe — inzwischen Standard-Workflow in jedem Projekt. Standardmäßig gehärtet: bcrypt-Auth, Rate-Limiting pro IP (5 Fehlversuche/60 s lösen 5 Minuten Sperre aus), einmalige, aktionsgebundene Run-Tokens mit 90 Sekunden Gültigkeit — CSRF-Schutz für EventSource — eine 'self'-only Content-Security-Policy ohne CDN-Assets und eine Web/CLI-Rechtetrennung.",
    },
    stack: {
      en: "PHP 8 (framework-free), vanilla JavaScript, Server-Sent Events, xterm.js, rsync, symfony/yaml, Apache hardening.",
      de: "PHP 8 (framework-frei), Vanilla JavaScript, Server-Sent Events, xterm.js, rsync, symfony/yaml, Apache-Härtung.",
    },
    outcomeFocus: {
      en: "Paired with the reusable React + Craft CMS boilerplate I architected, new client projects reach deploy-ready in one day. ~7,700 LOC · 1 dependency · 90-second run tokens.",
      de: "Zusammen mit dem von mir entworfenen wiederverwendbaren React+Craft-CMS-Boilerplate sind neue Kundenprojekte in einem Tag deploy-ready. ~7.700 LOC · 1 Abhängigkeit · 90-Sekunden-Run-Tokens.",
    },
  },
  {
    id: "rental-commerce-migration",
    title: {
      en: "Rental & Commerce Platform + Live CMS Migration",
      de: "Miet- & Commerce-Plattform + Live-CMS-Migration",
    },
    architecture: {
      en: "A German-language product, rental-inquiry, and e-commerce platform for an equipment rental and sales company, on templated Craft CMS 5 with Twig and Bootstrap 5. Craft Commerce is repurposed as a rental-inquiry engine (no online payment): date-bounded rental options attached to cart line items in a 3-step CSRF-protected flow, plus a 30-module page builder whose full content schema — 47 entry types, 103 fields, 12 sections — lives in version-controlled Project Config YAML, locked against production drift.",
      de: "Eine deutschsprachige Produkt-, Mietanfrage- und E-Commerce-Plattform für ein Unternehmen für Gerätevermietung und -verkauf, auf templated Craft CMS 5 mit Twig und Bootstrap 5. Craft Commerce dient als Mietanfrage-Engine (ohne Online-Zahlung): datumsgebundene Mietoptionen an Warenkorb-Positionen in einem 3-stufigen CSRF-geschützten Flow, dazu ein Page-Builder mit 30 Modulen, dessen komplettes Content-Schema — 47 Entry-Types, 103 Felder, 12 Sektionen — in versioniertem Project-Config-YAML liegt, gesichert gegen Produktions-Drift.",
    },
    deliveryModel: {
      en: "Built and maintained as the sole engineer. The headline delivery: an in-place Craft CMS 4→5 migration of the live, order-taking commerce database with zero data loss — 153 database migrations rehearsed on a production replica, then a staged go-live runbook with per-stage rollbacks. Server-side form hardening with honeypots and mandatory GDPR consent validation; tracker-free, cookie-minimal build.",
      de: "Als alleiniger Entwickler gebaut und betreut. Kernstück: eine In-Place-Migration der live laufenden, Bestellungen entgegennehmenden Commerce-Datenbank von Craft CMS 4 auf 5 ohne Datenverlust — 153 Datenbankmigrationen auf einer Produktionsreplik geprobt, dann ein gestuftes Go-live-Runbook mit Rollbacks pro Stufe. Serverseitige Formular-Härtung mit Honeypots und DSGVO-Pflicht-Consent; tracker-frei und cookie-minimal.",
    },
    stack: {
      en: "Craft CMS 5, Craft Commerce, Twig (100 templates, ~7,300 lines), Bootstrap 5, MySQL, one environment-aware .htaccess handling canonical 301s, ~25 preserved legacy redirects, and an origin-fallback serving ~540 MB of media across 3 environments without duplication.",
      de: "Craft CMS 5, Craft Commerce, Twig (100 Templates, ~7.300 Zeilen), Bootstrap 5, MySQL, eine umgebungsbewusste .htaccess für kanonische 301s, ~25 erhaltene Legacy-Redirects und ein Origin-Fallback, der ~540 MB Medien ohne Duplizierung über 3 Umgebungen bereitstellt.",
    },
    outcomeFocus: {
      en: "153 migrations, zero data loss · 100 Twig templates (~7,300 lines) · 30 builder modules · 47 entry types · 103 fields · ~540 MB media across 3 environments · ~25 legacy redirects preserved.",
      de: "153 Migrationen, kein Datenverlust · 100 Twig-Templates (~7.300 Zeilen) · 30 Builder-Module · 47 Entry-Types · 103 Felder · ~540 MB Medien über 3 Umgebungen · ~25 Legacy-Redirects erhalten.",
    },
  },
];

function resolveCaseStudy(
  study: CaseStudySummary,
  locale: Locale
): ResolvedCaseStudySummary {
  return {
    id: study.id,
    title: study.title[locale],
    architecture: study.architecture[locale],
    deliveryModel: study.deliveryModel[locale],
    stack: study.stack[locale],
    outcomeFocus: study.outcomeFocus[locale],
  };
}

export function getCaseStudies(
  locale: Locale = "en"
): ResolvedCaseStudySummary[] {
  return portfolioCaseStudies.map((study) => resolveCaseStudy(study, locale));
}

export function getProfessionalProjects(
  locale: Locale = "en"
): ResolvedCaseStudySummary[] {
  return getCaseStudies(locale);
}

export function getCaseStudyBySection(
  sectionNumber: number,
  locale: Locale = "en"
): ResolvedCaseStudySummary | null {
  if (!Number.isFinite(sectionNumber) || sectionNumber < 1) {
    return null;
  }

  const index = Math.floor(sectionNumber) - 1;
  if (index < 0 || index >= portfolioCaseStudies.length) {
    return null;
  }

  return resolveCaseStudy(portfolioCaseStudies[index], locale);
}

export function getCaseStudyTitles(locale: Locale = "en"): string[] {
  return portfolioCaseStudies.map((study) => study.title[locale]);
}
