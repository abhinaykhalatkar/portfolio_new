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
import { getProfessionalProjects } from "../../../content/portfolioCaseStudies";
import { useLocaleContext } from "../../../i18n/LocaleContext";

const AUTOPLAY_DELAY_MS = 10_000;

export default function ProjectsHome() {
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

  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

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
    },
    [activeSlide, projectCount, resolveIndex]
  );

  const goToNextSlide = useCallback(() => {
    if (projectCount <= 0) {
      return;
    }
    setSlideDirection(1);
    setActiveSlide((previous) => resolveIndex(previous + 1));
  }, [projectCount, resolveIndex]);

  const goToPrevSlide = useCallback(() => {
    if (projectCount <= 0) {
      return;
    }
    setSlideDirection(-1);
    setActiveSlide((previous) => resolveIndex(previous - 1));
  }, [projectCount, resolveIndex]);

  useEffect(() => {
    setActiveSlide(0);
  }, [projectCount]);

  useEffect(() => {
    if (projectCount <= 1 || isAutoplayPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setActiveSlide((previous) => resolveIndex(previous + 1));
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
        <h1 className="sr-only">{t("projects.heading")}</h1>
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
          <p className="projects-overview-body">{t("projects.overviewBody")}</p>
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
                  <dl className="project-slide-details">
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
