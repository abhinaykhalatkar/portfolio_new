import "./Projects-home.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import { SecondaryBtn } from "../../../Components/Buttons/Buttons";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import {
  getProjectAddressByIndex,
  normalizeProjectSectionCount,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import {
  getCaseStudyBasePath,
  getCaseStudyIndexBySlug,
  getProfessionalProjects,
} from "../../../content/portfolioCaseStudies";
import { useLocaleContext } from "../../../i18n/LocaleContext";
import { toPublicLocalizedPath } from "../../../i18n/localeRoutes";

const AUTOPLAY_DELAY_MS = 10_000;

type ProjectsHomeProps = {
  /**
   * When rendered at a per-slide URL (/projects/<slug>), the slug whose slide
   * starts active. Undefined at the /projects index (slide 0). The carousel UI
   * is identical either way; only the starting slide, the H1, and the URL
   * that follows slide changes differ.
   */
  caseStudySlug?: string;
};

export default function ProjectsHome({ caseStudySlug }: ProjectsHomeProps) {
  const { darkTheme } = useThemeContext();
  const { locale, t } = useLocaleContext();
  const {
    horizontalScrollDirection,
    setHorizontalScrollDirection,
    subPageVariants,
    pageVariants,
    pageTransition,
    contentVariants,
    projectSectionCount,
    setActiveProjectIndex,
  } = usePageAnimationContext();

  const navigate = useNavigate();
  const projects = useMemo(() => getProfessionalProjects(locale), [locale]);
  const projectCount = projects.length;

  const initialSlide = Math.max(0, getCaseStudyIndexBySlug(caseStudySlug));
  const [activeSlide, setActiveSlide] = useState(initialSlide);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  // True once the user (or autoplay) has moved the carousel in this mount —
  // only then does the URL start following the active slide.
  const [hasNavigatedSlides, setHasNavigatedSlides] = useState(false);

  const resolveIndex = useCallback(
    (next: number) => {
      if (projectCount <= 0) {
        return 0;
      }
      const mod = next % projectCount;
      return mod < 0 ? mod + projectCount : mod;
    },
    [projectCount]
  );

  const goToSlide = useCallback(
    (next: number) => {
      if (projectCount <= 0) {
        return;
      }
      const resolved = resolveIndex(next);
      if (resolved === activeSlide) {
        return;
      }
      setSlideDirection(resolved > activeSlide ? 1 : -1);
      setActiveSlide(resolved);
      setHasNavigatedSlides(true);
    },
    [activeSlide, projectCount, resolveIndex]
  );

  const goToNextSlide = useCallback(() => {
    if (projectCount <= 0) {
      return;
    }
    setSlideDirection(1);
    setActiveSlide((previous) => resolveIndex(previous + 1));
    setHasNavigatedSlides(true);
  }, [projectCount, resolveIndex]);

  const goToPrevSlide = useCallback(() => {
    if (projectCount <= 0) {
      return;
    }
    setSlideDirection(-1);
    setActiveSlide((previous) => resolveIndex(previous - 1));
    setHasNavigatedSlides(true);
  }, [projectCount, resolveIndex]);

  // Re-sync when the URL slug changes underneath us (browser back/forward,
  // language switch, in-app link) without remounting.
  useEffect(() => {
    setActiveSlide(Math.max(0, getCaseStudyIndexBySlug(caseStudySlug)));
    setHasNavigatedSlides(false);
  }, [caseStudySlug, projectCount]);

  // Per-slide URLs: once the carousel has moved, keep the address bar on the
  // active slide's canonical URL. `replace` so flipping slides never floods
  // browser history; each URL is also a real prerendered page for crawlers.
  useEffect(() => {
    if (!hasNavigatedSlides || projectCount <= 0) {
      return;
    }
    const target = toPublicLocalizedPath(
      getCaseStudyBasePath(projects[activeSlide].id),
      locale
    );
    if (window.location.pathname !== target) {
      navigate(target, { replace: true });
    }
  }, [activeSlide, hasNavigatedSlides, locale, navigate, projectCount, projects]);

  useEffect(() => {
    if (projectCount <= 1 || isAutoplayPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setActiveSlide((previous) => resolveIndex(previous + 1));
      setHasNavigatedSlides(true);
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoplayPaused, projectCount, resolveIndex]);

  const enterProjectSections = useCallback(() => {
    const totalProjectSections = normalizeProjectSectionCount(projectSectionCount);
    const entryIndex = 0;
    setHorizontalScrollDirection(1);
    setActiveProjectIndex(entryIndex);
    navigate(getProjectAddressByIndex(entryIndex, totalProjectSections, locale));
  }, [
    locale,
    navigate,
    projectSectionCount,
    setActiveProjectIndex,
    setHorizontalScrollDirection,
  ]);

  useEffect(() => {
    setHorizontalScrollDirection(2);
  }, [setHorizontalScrollDirection]);

  const currentProject = projectCount > 0 ? projects[activeSlide] : null;
  const slideVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? "10%" : "-10%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? "-10%" : "10%",
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      className={`p-Project-home ${darkTheme ? "" : "light"}`}
      data-wheel-lock="true"
      data-wheel-axis="y"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={
        horizontalScrollDirection === 0 || horizontalScrollDirection === 1
          ? subPageVariants
          : pageVariants
      }
      transition={pageTransition}
    >
      <div className="project-page-content">
        {/* Per-slide URLs get the project title as the page H1 (unique per URL
            for search); the /projects index keeps "Projects". The visible
            heading below is identical either way. */}
        <h1 className="sr-only">
          {caseStudySlug && currentProject
            ? currentProject.title
            : t("projects.heading")}
        </h1>
        <BouncyText name_class="heading" text={t("projects.heading")} />

        <motion.div
          className="projects-overview"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants}
        >
          <p className="projects-overview-intro">{t("projects.overviewIntro")}</p>
        </motion.div>

        <motion.div
          className="projects-entry-cta"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.45}
          variants={contentVariants}
        >
          <SecondaryBtn text={t("buttons.openProjectSections")} on_Click={enterProjectSections} />
        </motion.div>

        <motion.section
          className="project-slider"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.6}
          variants={contentVariants}
          aria-label={t("projects.sliderAria")}
          tabIndex={0}
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onFocusCapture={() => setIsAutoplayPaused(true)}
          onBlurCapture={(event) => {
            const nextFocused = event.relatedTarget as Node | null;
            if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
              setIsAutoplayPaused(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goToPrevSlide();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goToNextSlide();
            }
          }}
        >
          <div className="project-slider-header">
            <div className="project-slider-count">
              {projectCount > 0 ? `${activeSlide + 1} / ${projectCount}` : "0 / 0"}
            </div>
            <div className="project-slider-controls">
              <button
                type="button"
                className="project-slider-btn"
                onClick={goToPrevSlide}
                aria-label={t("projects.previousHighlight")}
                disabled={projectCount <= 0}
              >
                ‹
              </button>
              <button
                type="button"
                className="project-slider-btn"
                onClick={goToNextSlide}
                aria-label={t("projects.nextHighlight")}
                disabled={projectCount <= 0}
              >
                ›
              </button>
            </div>
          </div>

          <div className="project-slider-stage">
            {/* SEO: emit all slide bodies into static HTML so prerender + crawlers
                see every case study, not just the active carousel slide.
                The pool is visually hidden and removed from the a11y tree —
                the active slide below is the user-facing one. */}
            <div className="project-slide-prerender-pool" aria-hidden="true" hidden>
              {projects.map((project) => (
                <article key={`seo-${project.id}`} className="project-slide-seo">
                  <h2 className="project-slide-title">{project.title}</h2>
                  <dl className="project-slide-details">
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.architecture")}</dt>
                      <dd>{project.architecture}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.delivery")}</dt>
                      <dd>{project.deliveryModel}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.stack")}</dt>
                      <dd>{project.stack}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.outcome")}</dt>
                      <dd>{project.outcomeFocus}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            {currentProject ? (
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.article
                  key={currentProject.id}
                  className="project-slide-card"
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="project-slide-eyebrow">
                    {t("projects.professionalEyebrow")}
                  </div>
                  <h2 className="project-slide-title">{currentProject.title}</h2>
                  <dl
                    className="project-slide-details"
                    data-wheel-lock="true"
                    data-wheel-axis="y"
                  >
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.architecture")}</dt>
                      <dd>{currentProject.architecture}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.delivery")}</dt>
                      <dd>{currentProject.deliveryModel}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.stack")}</dt>
                      <dd>{currentProject.stack}</dd>
                    </div>
                    <div className="project-slide-row">
                      <dt>{t("projects.projectSummary.outcome")}</dt>
                      <dd>{currentProject.outcomeFocus}</dd>
                    </div>
                  </dl>
                </motion.article>
              </AnimatePresence>
            ) : (
              <div className="project-slide-card">
                <h2 className="project-slide-title">{t("projects.emptyTitle")}</h2>
                <p className="project-slide-empty">{t("projects.emptyBody")}</p>
              </div>
            )}
          </div>

          <div className="project-slider-pagination" role="tablist">
            {projects.map((project, index) => {
              const isActive = index === activeSlide;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`project-slider-dot ${isActive ? "active" : ""}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${t("projects.goToProject")} ${index + 1}`}
                  onClick={() => goToSlide(index)}
                />
              );
            })}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
