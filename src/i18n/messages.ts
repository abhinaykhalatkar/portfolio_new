import type { Locale } from "./localeRoutes";

const enMessages = {
  "nav.home": "HOME",
  "nav.about": "ABOUT",
  "nav.skills": "SKILLS",
  "nav.projects": "PROJECTS",
  "nav.contact": "CONTACT",
  "language.en": "EN",
  "language.de": "DE",
  "language.switcherAria": "Switch language",
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
  "home.heading.line1": "Senior Full-Stack",
  "home.heading.line2": "Software Developer",
  "home.intro":
    "Senior engineer with 10+ years of experience designing and shipping scalable web platforms. I build React and Next.js applications with Craft CMS, TypeScript, and robust backend APIs, combining system design rigor, test-driven development, and agentic AI workflows with Copilot and Codex.",
  "about.heading.line1": "Hi, I'm Abhinay.",
  "about.heading.line2": "Designing",
  "about.heading.line3": "Digital Systems",
  "about.foot":
    "Senior Full-Stack Engineer / System Design Practitioner / Craft CMS and React Specialist",
  "about.body.1":
    "I design and deliver production-ready web systems from architecture to deployment, balancing business outcomes with clean engineering execution.",
  "about.body.2":
    "My core focus is scalable system design, maintainable full-stack implementation, and high-quality delivery through testing discipline and stable CI-ready workflows.",
  "about.body.3":
    "I actively use agentic AI tools like Copilot and Codex to accelerate delivery while keeping strong engineering standards, code quality, and long-term maintainability.",
  "skills.topQuote": "Engineering Scalable Products with Delivery Rigor",
  "skills.heading": "Skills & Experience",
  "skills.body.1":
    "I lead end-to-end delivery across frontend, backend, and platform layers with a system-design-first mindset and production ownership.",
  "skills.body.2":
    "My stack centers on TypeScript, React, Node.js, Tailwind CSS, Craft CMS, and infrastructure-aware delivery across Hetzner and AWS environments. I have shifted from search-first debugging to LLM-first engineering with GitHub Copilot, Codex, and agentic workflows, while keeping test-driven development and delivery reliability as hard constraints.",
  "skills.linkedin.prefix": "Feel free to explore my",
  "skills.linkedin.suffix":
    "for a more comprehensive overview of my skills and experience.",
  "skills.icon.agentic": "Agentic Workflows",
  "skills.icon.searchToLlm": "From Search to LLMs",
  "projects.heading": "Projects",
  "projects.overviewIntro":
    "A focused selection of professional projects that reflect my architecture ownership across frontend, backend, CMS integration, and deployment delivery.",
  "projects.overviewBody":
    "These project highlights show system boundaries, multilingual routing, GraphQL proxy patterns, deployment safety, reusable boilerplate strategy, and delivery governance without exposing client-sensitive details.",
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
    "Need help with a senior full-stack build, architecture decision, or delivery acceleration using AI-assisted workflows? Let's connect. Contact me at",
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
} as const;

const deMessages: typeof enMessages = {
  "nav.home": "START",
  "nav.about": "ÜBER MICH",
  "nav.skills": "SKILLS",
  "nav.projects": "PROJEKTE",
  "nav.contact": "KONTAKT",
  "language.en": "EN",
  "language.de": "DE",
  "language.switcherAria": "Sprache wechseln",
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
  "home.heading.line1": "Senior Full-Stack",
  "home.heading.line2": "Softwareentwickler",
  "home.intro":
    "Senior Engineer mit über 10 Jahren Erfahrung in Konzeption, Architektur und Auslieferung skalierbarer Web-Plattformen. Ich entwickle React- und Next.js-Anwendungen mit Craft CMS, TypeScript und robusten Backend-APIs und verbinde Systemdesign, testgetriebene Entwicklung sowie agentische KI-Workflows mit Copilot und Codex.",
  "about.heading.line1": "Hi, ich bin Abhinay.",
  "about.heading.line2": "Ich entwickle",
  "about.heading.line3": "digitale Systeme",
  "about.foot":
    "Senior Full-Stack Engineer / Systemdesign / Craft-CMS- und React-Spezialist",
  "about.body.1":
    "Ich konzipiere und liefere produktionsreife Web-Systeme von der Architektur bis zum Deployment und verbinde Business-Ziele mit sauberer technischer Umsetzung.",
  "about.body.2":
    "Mein Fokus liegt auf skalierbarem Systemdesign, wartbarer Full-Stack-Implementierung und verlässlicher Auslieferung durch Testdisziplin und stabile CI-fähige Workflows.",
  "about.body.3":
    "Ich nutze agentische KI-Tools wie Copilot und Codex aktiv, um schneller zu liefern und gleichzeitig hohe technische Standards, Code-Qualität und langfristige Wartbarkeit sicherzustellen.",
  "skills.topQuote": "Skalierbare Produkte mit Lieferdisziplin entwickeln",
  "skills.heading": "Skills & Erfahrung",
  "skills.body.1":
    "Ich verantworte End-to-End-Delivery über Frontend-, Backend- und Plattform-Layer hinweg mit einem systemdesignorientierten Ansatz und echter Produktionsverantwortung.",
  "skills.body.2":
    "Mein Stack konzentriert sich auf TypeScript, React, Node.js, Tailwind CSS, Craft CMS und infrastrukturbewusste Auslieferung auf Hetzner- und AWS-Umgebungen. Ich habe mich von suchbasierter Fehlersuche hin zu LLM-first Engineering mit GitHub Copilot, Codex und agentischen Workflows entwickelt, ohne Testdisziplin und Lieferzuverlässigkeit zu kompromittieren.",
  "skills.linkedin.prefix": "Eine ausführlichere Übersicht meiner Skills und Erfahrungen finden Sie auf meinem",
  "skills.linkedin.suffix": ".",
  "skills.icon.agentic": "Agentische Workflows",
  "skills.icon.searchToLlm": "Vom Suchen zu LLMs",
  "projects.heading": "Projekte",
  "projects.overviewIntro":
    "Eine gezielte Auswahl professioneller Projekte, die meine Architekturverantwortung über Frontend, Backend, CMS-Integration und Deployment hinweg zeigen.",
  "projects.overviewBody":
    "Diese Projekt-Highlights verdeutlichen Systemgrenzen, mehrsprachiges Routing, GraphQL-Proxy-Muster, Deployment-Sicherheit, wiederverwendbare Boilerplate-Strategien und Delivery-Governance, ohne sensible Kundendetails offenzulegen.",
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
    "Sie brauchen Unterstützung bei einem Senior-Full-Stack-Projekt, einer Architekturentscheidung oder schnellerer Lieferung mit KI-gestützten Workflows? Lassen Sie uns sprechen. Kontaktieren Sie mich unter",
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
