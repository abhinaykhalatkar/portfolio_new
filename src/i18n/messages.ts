import type { Locale } from "./localeRoutes";

const enMessages = {
  "nav.home": "HOME",
  "nav.about": "ABOUT",
  "nav.skills": "SKILLS",
  "nav.projects": "PROJECTS",
  "nav.resume": "RESUME",
  "nav.contact": "CONTACT",
  "nav.whatsOnMyMind": "WHAT'S ON MY MIND",
  "language.en": "EN",
  "language.de": "DE",
  "language.switcherAria": "Switch language",
  "theme.dark": "Night Mode",
  "theme.light": "Light Mode",
  "social.heading": "Let's Get Social",
  "a11y.skipToContent": "Skip to main content",
  "nav.toggle": "Toggle navigation",
  "nav.sectionAria": "Section navigation",
  "nav.scrollBtnAria": "Page navigation",
  "buttons.contact": "Contact",
  "buttons.contactMe": "Contact Me",
  "buttons.aboutMe": "About me",
  "buttons.openProjectSections": "Open Project Catalog",
  "buttons.myResume": "My Resume",
  "buttons.viewOnGitHub": "View on GitHub",
  "buttons.backToProjects": "Back to Projects",
  "buttons.learnMore": "Learn more",
  "buttons.linkedin": "LinkedIn",
  "scroll.next": "Scroll To Next",
  "scroll.backHome": "Back To Home",
  "scroll.backStart": "Back To Start",
  "home.heading.line1": "Abhinay",
  "home.heading.line2": "Khalatkar",
  "home.tagline":
    "Full-Stack Developer — React · Next.js · TypeScript · Node.js · PHP · Craft CMS",
  "home.intro":
    "Sole engineer on client platforms from design handoff to production. Nights and weekends, I build and operate an autonomous bilingual AI newsroom.",
  "home.stats.1.value": "~6x organic traffic",
  "home.stats.1.label":
    "Technical SEO rebuild grew an e-commerce platform from ~1,000 to ~6,000 organic visitors/month.",
  "home.stats.2.value": "Zero-data-loss migration",
  "home.stats.2.label":
    "Moved a live, order-taking commerce database across a major CMS version. 153 migrations, staged rollbacks.",
  "home.stats.3.value": "~100 articles/month for under €8",
  "home.stats.3.label":
    "Autonomous EN/DE AI newsroom, self-hosted, human-approved before anything publishes.",
  "home.aboutTeaser":
    "At my agency, once a design is approved, everything after that is me: architecture, frontend, backend, database, security, deployment, go-live. On my own time I run a harder version of the same problem — an AI newsroom that verifies, writes, and translates about 100 articles a month and still can't publish a word without a human pressing the button.",
  "about.heading.line1": "Hi, I'm Abhinay.",
  "about.heading.line2": "Designing",
  "about.heading.line3": "Digital Systems",
  "about.foot":
    "Full-Stack Software Developer — React · TypeScript · PHP · Craft CMS",
  "about.body.1":
    "I'm a full-stack developer based in Geilenkirchen, Germany. At scribble Werbeagentur, I'm the only engineer on my client projects: once a design is approved, everything from architecture to go-live and maintenance is mine. Before that I built React frontends and CMS integrations for enterprise B2B clients at wob AG, and completed an M.Sc. in Applied Computer Science at SRH Hochschule Heidelberg with a focus on software architecture, databases, cybersecurity, and UX engineering.",
  "about.body.2":
    "Evenings and weekends go into Doordarshi Newsroom, an autonomous English/German AI newsroom that runs on hardware in my apartment. It has taught me more about reliability engineering than anything else I've built — and it still can't publish a single word without me pressing the button.",
  "about.body.3":
    "The through-line in all of it: making software work once is the easy part. Making it keep working — contracts, tests, circuit breakers, telemetry — is the actual job.",
  "about.languages.heading": "Languages",
  "about.languages.english": "English — fluent (working language)",
  "about.languages.german": "German — A2–B1, actively improving",
  "about.languages.hindi": "Hindi — native",
  "about.languages.marathi": "Marathi — native",
  "about.skillsCta": "See my full skill set",
  "skills.topQuote": "Making software keep working — not just work once",
  "skills.heading": "Skills & Experience",
  "skills.body.1":
    "At scribble Werbeagentur I'm the sole engineer on my client projects: once a design is approved, architecture, frontend, backend, database, security hardening, and deployment are mine through to production.",
  "skills.body.2":
    "My stack centers on React 18, Next.js, TypeScript, Node.js, PHP 8, and Craft CMS 5, deployed to Hetzner and AWS. I work test-driven with Jest, Cypress, and pytest, build GDPR-by-design, and use LLM tooling — Ollama-based orchestration, GitHub Copilot, OpenAI Codex — behind deterministic quality gates.",
  "skills.linkedin.prefix": "Feel free to explore my",
  "skills.linkedin.suffix":
    "for a more comprehensive overview of my skills and experience.",
  "skills.group.frontend": "Frontend",
  "skills.group.backend": "Backend & APIs",
  "skills.group.cmsData": "CMS & Data",
  "skills.group.testing": "Testing & Quality",
  "skills.group.devopsSecurity": "DevOps & Security",
  "skills.group.aiLlm": "AI & LLM Engineering",
  "skills.group.practices": "Practices",
  "projects.heading": "Projects",
  "projects.overviewIntro":
    "Four production systems built end to end as the sole engineer — client platforms at scribble Werbeagentur and an autonomous AI newsroom I run on my own hardware.",
  "projects.overviewBody":
    "Each highlight covers architecture, delivery, stack, and measured outcomes. Client work is anonymized; every number is real.",
  "projects.catalogHint":
    "Public GitHub repositories remain available in the vertical project catalog sections.",
  "projects.professionalEyebrow": "Professional Project",
  "projects.sliderAria": "Professional projects slider",
  "projects.previousHighlight": "Previous professional project",
  "projects.nextHighlight": "Next professional project",
  "projects.goToProject": "Go to project",
  "projects.projectSummary.architecture": "Architecture",
  "projects.projectSummary.delivery": "Delivery Model",
  "projects.projectSummary.stack": "Stack",
  "projects.projectSummary.outcome": "Outcome",
  "projects.loadingTitle": "Loading repositories...",
  "projects.loadingBody": "Fetching the latest repos from GitHub.",
  "projects.errorTitle": "Couldn't load repos",
  "projects.emptyTitle": "No repositories found",
  "projects.emptyBody": "This user doesn't have any public repositories.",
  "projects.language": "Language",
  "projects.stats": "Stats",
  "projects.archived": "Archived",
  "projects.fork": "Fork",
  "projects.updated": "Updated",
  "projects.repoQuickSelect": "Repository quick select",
  "projects.repositoryCarousel": "repository carousel",
  "projects.previousRepository": "Previous repository",
  "projects.nextRepository": "Next repository",
  "projects.repoDescriptionFallback": "No description provided.",
  "projects.section": "Section",
  "projectSection.headingPrefix": "PROJECT",
  "projectSection.helper":
    "This section shows public GitHub repositories in the infinite carousel.",
  "projectSection.helperSecondary":
    "Use the carousel to browse repositories and use the vertical rail or scroll gestures to move between sections.",
  "projectRail.aria": "Projects vertical rail",
  "projectRail.first": "Go to first project section",
  "projectRail.last": "Go to last project section",
  "projectRail.goTo": "Go to project",
  "contact.heading": "Contact",
  "contact.body":
    "Open to Full-Stack, Frontend, and Software Engineer roles in NRW and remote Germany. Reach me at",
  "resume.heading": "Resume",
  "resume.updatedNote":
    "Current as of August 2026. Also available on request as a tailored version per role.",
  "resume.download": "Download PDF",
  "resume.previewTitle": "Resume PDF preview",
  "resume.fallbackTitle": "PDF preview not available on this device",
  "resume.fallbackBody":
    "Your browser can't display the PDF inline. Use the download button to open the resume directly.",
  "timeline.heading": "Experience & Education",
  "timeline.aria": "Experience timeline",
  "timeline.loading": "Loading timeline data...",
  "timeline.error": "Could not load timeline feed.",
  "timeline.empty": "No timeline entries available.",
  "timeline.emptyHint":
    "LinkedIn profile pages cannot be parsed directly in-browser. Add your entries in `public/data/linkedin-timeline.json`.",
  "timeline.learnMore": "Learn more",
  "timeline.drawerToggle": "Timeline",
  "timeline.drawerClose": "Close timeline",
  "timeline.present": "Present",
  "timeline.type.experience": "Experience",
  "timeline.type.education": "Education",
  "timeline.linkedIn": "LinkedIn",
  "whatsOnMyMind.heading": "What's on my Mind",
  "whatsOnMyMind.lede":
    "A live window into my current side project — doordarshi.de — embedded below once you accept third-party content.",
  "whatsOnMyMind.iframeTitle": "Live experiments at doordarshi.de",
  "whatsOnMyMind.consentTitle": "Load content from doordarshi.de?",
  "whatsOnMyMind.consentBody":
    "This page embeds doordarshi.de in a frame. To load it, your browser will contact that site and may share your IP address and user-agent. The site may also set its own cookies. Nothing is loaded until you accept.",
  "whatsOnMyMind.consentAccept": "Accept and load",
  "whatsOnMyMind.consentDecline": "Decline",
  "whatsOnMyMind.placeholderTitle": "Embedded content not loaded",
  "whatsOnMyMind.placeholderBody":
    "doordarshi.de is not loaded yet. Accept to embed it here, or open it directly in a new tab.",
  "whatsOnMyMind.reconsider": "Load content",
  "whatsOnMyMind.blockedTitle": "Embedding blocked by the remote site",
  "whatsOnMyMind.blockedBody":
    "doordarshi.de did not allow inline embedding. Open it in a new tab to view it.",
  "whatsOnMyMind.openInNewTab": "Open doordarshi.de",
} as const;

const deMessages: typeof enMessages = {
  "nav.home": "START",
  "nav.about": "ÜBER MICH",
  "nav.skills": "SKILLS",
  "nav.projects": "PROJEKTE",
  "nav.resume": "LEBENSLAUF",
  "nav.contact": "KONTAKT",
  "nav.whatsOnMyMind": "WAS MIR IM KOPF UMGEHT",
  "language.en": "EN",
  "language.de": "DE",
  "language.switcherAria": "Sprache wechseln",
  "theme.dark": "Nachtmodus",
  "theme.light": "Tagmodus",
  "social.heading": "Lass uns vernetzen",
  "a11y.skipToContent": "Zum Hauptinhalt springen",
  "nav.toggle": "Navigation umschalten",
  "nav.sectionAria": "Bereichsnavigation",
  "nav.scrollBtnAria": "Seitennavigation",
  "buttons.contact": "Kontakt",
  "buttons.contactMe": "Kontakt aufnehmen",
  "buttons.aboutMe": "Mehr über mich",
  "buttons.openProjectSections": "Projektkatalog öffnen",
  "buttons.myResume": "Lebenslauf",
  "buttons.viewOnGitHub": "Auf GitHub ansehen",
  "buttons.backToProjects": "Zur Projektübersicht",
  "buttons.learnMore": "Mehr erfahren",
  "buttons.linkedin": "LinkedIn",
  "scroll.next": "Zum nächsten Bereich",
  "scroll.backHome": "Zur Startseite",
  "scroll.backStart": "Zum Anfang",
  "home.heading.line1": "Abhinay",
  "home.heading.line2": "Khalatkar",
  "home.tagline":
    "Full-Stack-Entwickler — React · Next.js · TypeScript · Node.js · PHP · Craft CMS",
  "home.intro":
    "Alleiniger Entwickler auf Kundenplattformen — von der Designübergabe bis zur Produktion. Abends und am Wochenende baue und betreibe ich einen autonomen zweisprachigen KI-Newsroom.",
  "home.stats.1.value": "~6x organischer Traffic",
  "home.stats.1.label":
    "Ein technischer SEO-Rebuild steigerte eine E-Commerce-Plattform von ~1.000 auf ~6.000 organische Besucher pro Monat.",
  "home.stats.2.value": "Migration ohne Datenverlust",
  "home.stats.2.label":
    "Live-Commerce-Datenbank mit laufenden Bestellungen über eine große CMS-Version migriert — 153 Migrationen, gestufte Rollbacks.",
  "home.stats.3.value": "~100 Artikel/Monat für unter 8 €",
  "home.stats.3.label":
    "Autonomer EN/DE-KI-Newsroom, selbst gehostet — nichts erscheint ohne menschliche Freigabe.",
  "home.aboutTeaser":
    "Sobald in meiner Agentur ein Design freigegeben ist, liegt alles Weitere bei mir: Architektur, Frontend, Backend, Datenbank, Sicherheit, Deployment, Go-live. In meiner freien Zeit betreibe ich eine härtere Variante desselben Problems — einen KI-Newsroom, der rund 100 Artikel im Monat verifiziert, schreibt und übersetzt und trotzdem kein Wort veröffentlichen kann, ohne dass ein Mensch den Knopf drückt.",
  "about.heading.line1": "Hi, ich bin Abhinay.",
  "about.heading.line2": "Ich entwickle",
  "about.heading.line3": "digitale Systeme",
  "about.foot":
    "Full-Stack-Softwareentwickler — React · TypeScript · PHP · Craft CMS",
  "about.body.1":
    "Ich bin Full-Stack-Entwickler in Geilenkirchen. Bei scribble Werbeagentur bin ich der einzige Entwickler auf meinen Kundenprojekten: Sobald ein Design freigegeben ist, liegt alles von der Architektur bis zu Go-live und Wartung bei mir. Davor habe ich bei der wob AG React-Frontends und CMS-Integrationen für Enterprise-B2B-Kunden gebaut und einen M.Sc. in Applied Computer Science an der SRH Hochschule Heidelberg abgeschlossen — mit Schwerpunkt Softwarearchitektur, Datenbanken, Cybersecurity und UX Engineering.",
  "about.body.2":
    "Abende und Wochenenden gehören Doordarshi Newsroom, einem autonomen englisch-deutschen KI-Newsroom, der auf Hardware in meiner Wohnung läuft. Er hat mir mehr über Reliability Engineering beigebracht als alles andere, was ich je gebaut habe — und er kann immer noch kein einziges Wort veröffentlichen, ohne dass ich den Knopf drücke.",
  "about.body.3":
    "Der rote Faden dabei: Software einmal zum Laufen zu bringen ist der einfache Teil. Sie am Laufen zu halten — Contracts, Tests, Circuit Breaker, Telemetrie — ist die eigentliche Arbeit.",
  "about.languages.heading": "Sprachen",
  "about.languages.english": "Englisch — fließend (Arbeitssprache)",
  "about.languages.german": "Deutsch — A2–B1, aktiv im Ausbau",
  "about.languages.hindi": "Hindi — Muttersprache",
  "about.languages.marathi": "Marathi — Muttersprache",
  "about.skillsCta": "Zum vollständigen Skill-Set",
  "skills.topQuote": "Software, die nicht nur einmal funktioniert, sondern dauerhaft läuft",
  "skills.heading": "Skills & Erfahrung",
  "skills.body.1":
    "Bei scribble Werbeagentur bin ich der einzige Entwickler auf meinen Kundenprojekten: Sobald ein Design freigegeben ist, liegen Architektur, Frontend, Backend, Datenbank, Sicherheitshärtung und Deployment bis zur Produktion bei mir.",
  "skills.body.2":
    "Mein Stack konzentriert sich auf React 18, Next.js, TypeScript, Node.js, PHP 8 und Craft CMS 5, ausgeliefert auf Hetzner und AWS. Ich arbeite testgetrieben mit Jest, Cypress und pytest, entwickle GDPR-by-Design und nutze LLM-Tooling — Ollama-basierte Orchestrierung, GitHub Copilot, OpenAI Codex — hinter deterministischen Quality Gates.",
  "skills.linkedin.prefix": "Eine ausführlichere Übersicht meiner Skills und Erfahrungen finden Sie auf meinem",
  "skills.linkedin.suffix": ".",
  "skills.group.frontend": "Frontend",
  "skills.group.backend": "Backend & APIs",
  "skills.group.cmsData": "CMS & Daten",
  "skills.group.testing": "Testing & Qualität",
  "skills.group.devopsSecurity": "DevOps & Sicherheit",
  "skills.group.aiLlm": "KI & LLM-Engineering",
  "skills.group.practices": "Arbeitsweisen",
  "projects.heading": "Projekte",
  "projects.overviewIntro":
    "Vier Produktionssysteme, Ende-zu-Ende als alleiniger Entwickler gebaut — Kundenplattformen bei scribble Werbeagentur und ein autonomer KI-Newsroom auf eigener Hardware.",
  "projects.overviewBody":
    "Jedes Highlight zeigt Architektur, Delivery, Stack und gemessene Ergebnisse. Kundenprojekte sind anonymisiert; jede Zahl ist echt.",
  "projects.catalogHint":
    "Öffentliche GitHub-Repositories bleiben in den vertikalen Projektkatalog-Bereichen verfügbar.",
  "projects.professionalEyebrow": "Professionelles Projekt",
  "projects.sliderAria": "Slider für professionelle Projekte",
  "projects.previousHighlight": "Vorheriges professionelles Projekt",
  "projects.nextHighlight": "Nächstes professionelles Projekt",
  "projects.goToProject": "Zu Projekt",
  "projects.projectSummary.architecture": "Architektur",
  "projects.projectSummary.delivery": "Delivery-Modell",
  "projects.projectSummary.stack": "Stack",
  "projects.projectSummary.outcome": "Ergebnis",
  "projects.loadingTitle": "Repositories werden geladen...",
  "projects.loadingBody": "Die neuesten Repositories werden von GitHub geladen.",
  "projects.errorTitle": "Repositories konnten nicht geladen werden",
  "projects.emptyTitle": "Keine Repositories gefunden",
  "projects.emptyBody": "Dieser Nutzer hat keine öffentlichen Repositories.",
  "projects.language": "Sprache",
  "projects.stats": "Kennzahlen",
  "projects.archived": "Archiviert",
  "projects.fork": "Fork",
  "projects.updated": "Aktualisiert",
  "projects.repoQuickSelect": "Repository-Schnellauswahl",
  "projects.repositoryCarousel": "Repository-Karussell",
  "projects.previousRepository": "Vorheriges Repository",
  "projects.nextRepository": "Nächstes Repository",
  "projects.repoDescriptionFallback": "Keine Beschreibung vorhanden.",
  "projects.section": "Bereich",
  "projectSection.headingPrefix": "PROJEKT",
  "projectSection.helper":
    "Dieser Bereich zeigt öffentliche GitHub-Repositories im unendlichen Karussell.",
  "projectSection.helperSecondary":
    "Nutzen Sie das Karussell zum Durchsehen der Repositories und die vertikale Navigation oder Scroll-Gesten, um zwischen den Bereichen zu wechseln.",
  "projectRail.aria": "Vertikale Projektnavigation",
  "projectRail.first": "Zum ersten Projektbereich",
  "projectRail.last": "Zum letzten Projektbereich",
  "projectRail.goTo": "Zu Projekt",
  "contact.heading": "Kontakt",
  "contact.body":
    "Offen für Rollen als Full-Stack-, Frontend- und Software-Engineer in NRW sowie remote in Deutschland. Erreichbar unter",
  "resume.heading": "Lebenslauf",
  "resume.updatedNote":
    "Stand: August 2026. Auf Anfrage auch als zugeschnittene Version pro Rolle verfügbar.",
  "resume.download": "PDF herunterladen",
  "resume.previewTitle": "Lebenslauf-PDF-Vorschau",
  "resume.fallbackTitle": "PDF-Vorschau auf diesem Gerät nicht verfügbar",
  "resume.fallbackBody":
    "Ihr Browser kann das PDF nicht direkt anzeigen. Nutzen Sie den Download-Button, um den Lebenslauf zu öffnen.",
  "timeline.heading": "Erfahrung & Ausbildung",
  "timeline.aria": "Erfahrungstimeline",
  "timeline.loading": "Timeline-Daten werden geladen...",
  "timeline.error": "Der Timeline-Feed konnte nicht geladen werden.",
  "timeline.empty": "Keine Timeline-Einträge verfügbar.",
  "timeline.emptyHint":
    "LinkedIn-Profilseiten können im Browser nicht direkt geparst werden. Pflegen Sie Ihre Einträge in `public/data/linkedin-timeline.json`.",
  "timeline.learnMore": "Mehr erfahren",
  "timeline.drawerToggle": "Timeline",
  "timeline.drawerClose": "Timeline schließen",
  "timeline.present": "Heute",
  "timeline.type.experience": "Berufserfahrung",
  "timeline.type.education": "Ausbildung",
  "timeline.linkedIn": "LinkedIn",
  "whatsOnMyMind.heading": "Was mir im Kopf umgeht",
  "whatsOnMyMind.lede":
    "Ein Live-Einblick in mein aktuelles Nebenprojekt — doordarshi.de — eingebettet, sobald Sie dem Laden externer Inhalte zustimmen.",
  "whatsOnMyMind.iframeTitle": "Live-Experimente auf doordarshi.de",
  "whatsOnMyMind.consentTitle": "Inhalte von doordarshi.de laden?",
  "whatsOnMyMind.consentBody":
    "Diese Seite bettet doordarshi.de in einem Frame ein. Beim Laden kontaktiert Ihr Browser diese Seite und überträgt ggf. Ihre IP-Adresse und User-Agent. Die Seite kann eigene Cookies setzen. Bis Sie zustimmen, wird nichts geladen.",
  "whatsOnMyMind.consentAccept": "Akzeptieren und laden",
  "whatsOnMyMind.consentDecline": "Ablehnen",
  "whatsOnMyMind.placeholderTitle": "Eingebetteter Inhalt nicht geladen",
  "whatsOnMyMind.placeholderBody":
    "doordarshi.de wurde noch nicht geladen. Stimmen Sie zu, um es hier einzubetten, oder öffnen Sie es direkt in einem neuen Tab.",
  "whatsOnMyMind.reconsider": "Inhalt laden",
  "whatsOnMyMind.blockedTitle": "Einbettung von der Zielseite blockiert",
  "whatsOnMyMind.blockedBody":
    "doordarshi.de hat das Einbetten nicht erlaubt. Bitte in einem neuen Tab öffnen.",
  "whatsOnMyMind.openInNewTab": "doordarshi.de öffnen",
};

export type MessageKey = keyof typeof enMessages;
export type TranslationDictionary = typeof enMessages;

const messages = {
  en: enMessages,
  de: deMessages,
} as const satisfies Record<Locale, TranslationDictionary>;

export function getMessages(locale: Locale): TranslationDictionary {
  return messages[locale];
}
