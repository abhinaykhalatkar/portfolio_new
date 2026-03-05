import "./Projects-home.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import { SecondaryBtn } from "../../../Components/Buttons/Buttons";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import { AiOutlineRight } from "react-icons/ai";
import {
  getProjectAddressByIndex,
  normalizeProjectSectionCount,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import { getGithubUsername, useGithubRepos } from "../shared/githubRepos";
import { getCaseStudyTitles } from "../../../content/portfolioCaseStudies";

function techClassName(tech: string): string {
  return `tech-${tech
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export default function ProjectsHome() {
  const { darkTheme } = useThemeContext();
  const {
    horizontalScrollDirection,
    setHorizontalScrollDirection,
    subPageVariants,
    pageVariants,
    pageTransition,
    contentVariants,
    projectSectionCount,
    setProjectSectionCount,
    setActiveProjectIndex,
  } = usePageAnimationContext();

  const navigate = useNavigate();
  const githubUsername = getGithubUsername();
  const repoState = useGithubRepos(githubUsername);

  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const repos = repoState.repos;
  const slideCount = repos.length;
  const caseStudyTitles = getCaseStudyTitles().join(" • ");

  useEffect(() => {
    if (repoState.status !== "success") return;

    setProjectSectionCount((previous) =>
      Math.max(previous, normalizeProjectSectionCount(repoState.repos.length))
    );
  }, [repoState, setProjectSectionCount]);

  useEffect(() => {
    setActiveSlide(0);
  }, [slideCount]);

  const formatUpdated = useCallback((iso: string): string => {
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  }, []);

  const clampIndex = useCallback(
    (next: number) => {
      if (slideCount <= 0) return 0;
      const modulo = next % slideCount;
      return modulo < 0 ? modulo + slideCount : modulo;
    },
    [slideCount]
  );

  const goTo = useCallback(
    (next: number) => {
      if (slideCount <= 0) return;
      const resolved = clampIndex(next);
      if (resolved === activeSlide) return;
      setSlideDirection(resolved > activeSlide ? 1 : -1);
      setActiveSlide(resolved);
    },
    [activeSlide, clampIndex, slideCount]
  );

  const goNext = useCallback(() => {
    if (slideCount <= 0) return;
    setSlideDirection(1);
    setActiveSlide((previous) => clampIndex(previous + 1));
  }, [clampIndex, slideCount]);

  const goPrev = useCallback(() => {
    if (slideCount <= 0) return;
    setSlideDirection(-1);
    setActiveSlide((previous) => clampIndex(previous - 1));
  }, [clampIndex, slideCount]);

  const enterProjectSections = useCallback(() => {
    const totalProjectSections = normalizeProjectSectionCount(projectSectionCount);
    const entryIndex = 0;
    setHorizontalScrollDirection(1);
    setActiveProjectIndex(entryIndex);
    navigate(getProjectAddressByIndex(entryIndex, totalProjectSections));
  }, [
    navigate,
    projectSectionCount,
    setActiveProjectIndex,
    setHorizontalScrollDirection,
  ]);

  useEffect(() => {
    setHorizontalScrollDirection(2);
  }, [setHorizontalScrollDirection]);

  const slideVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? "8%" : "-8%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? "-8%" : "8%",
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
        <h1 className="sr-only">Projects and Engineering Case Studies</h1>
        <BouncyText name_class="heading" text="Projects" />

        <motion.div
          className="projects-toolbar"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.2}
          variants={contentVariants}
          aria-label="Projects timeline toolbar"
        >
          <button
            type="button"
            className="toolbar-btn"
            onClick={goPrev}
            aria-label="Previous project"
            disabled={slideCount <= 0}
          >
            ‹
          </button>
          <div
            className="toolbar-track"
            role="tablist"
            aria-label="Projects"
            data-wheel-lock="true"
            data-wheel-axis="x"
          >
            {repos.map((repo, index) => {
              const isActive = index === activeSlide;
              return (
                <button
                  key={repo.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`toolbar-item ${isActive ? "active" : ""}`}
                  onClick={() => goTo(index)}
                >
                  <div className="toolbar-time">
                    Updated {formatUpdated(repo.updated_at)}
                  </div>
                  <div className="toolbar-title">{repo.name}</div>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="toolbar-btn"
            onClick={goNext}
            aria-label="Next project"
            disabled={slideCount <= 0}
          >
            ›
          </button>
        </motion.div>

        <motion.div
          className="para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          This portfolio includes anonymized architecture case studies from
          enterprise delivery work: {caseStudyTitles}. The implementations focus
          on frontend-backend boundaries, secure GraphQL proxying, CI/CD safety,
          and multi-environment deployment orchestration with agentic
          engineering workflows. Browse all public repositories below, visit my{" "}
          <a
            className="gitLink"
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub profile
          </a>
          , jump into section-based browsing, or{" "}
          <Link className="contactLink" to="/contact">
            reach out and connect.
          </Link>
        </motion.div>

        <motion.div
          className="projects-entry-cta"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.62}
          variants={contentVariants}
        >
          <SecondaryBtn text="Open Project Sections" on_Click={enterProjectSections} />
        </motion.div>

        <motion.div
          className="projects-slider"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.72}
          variants={contentVariants}
        >
          {repoState.status === "loading" || repoState.status === "idle" ? (
            <div className={`project-card ${darkTheme ? "" : "light"}`}>
              <div className="project-card-title">Loading repositories…</div>
              <div className="project-card-summary">
                Fetching the latest repos from GitHub.
              </div>
            </div>
          ) : repoState.status === "error" ? (
            <div className={`project-card ${darkTheme ? "" : "light"}`}>
              <div className="project-card-title">Couldn’t load repos</div>
              <div className="project-card-summary">{repoState.message}</div>
              <div className="project-card-footer">
                <a
                  className="github-cta"
                  href={`https://github.com/${githubUsername}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                  <AiOutlineRight />
                </a>
              </div>
            </div>
          ) : slideCount <= 0 ? (
            <div className={`project-card ${darkTheme ? "" : "light"}`}>
              <div className="project-card-title">No repositories found</div>
              <div className="project-card-summary">
                This user doesn’t have any public repositories.
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={repos[activeSlide].id}
                className={`project-card ${darkTheme ? "" : "light"}`}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  const threshold = 60;
                  if (info.offset.x > threshold) {
                    goPrev();
                  } else if (info.offset.x < -threshold) {
                    goNext();
                  }
                }}
              >
                <div className="project-card-top">
                  <div className="project-card-meta">
                    <div className="project-card-time">
                      Updated {formatUpdated(repos[activeSlide].updated_at)}
                    </div>
                    <div className="project-card-badges">
                      {repos[activeSlide].archived ? (
                        <div className="pill subtle">Archived</div>
                      ) : null}
                      {repos[activeSlide].fork ? (
                        <div className="pill subtle">Fork</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="project-card-title">{repos[activeSlide].name}</div>
                  <div className="project-card-summary">
                    {repos[activeSlide].description ?? "No description provided."}
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-section-title">Language</div>
                  <div className="project-card-tech">
                    <div
                      className={`pill subtle tech-pill ${techClassName(
                        repos[activeSlide].language ?? "Unknown"
                      )}`}
                      title={repos[activeSlide].language ?? "Unknown"}
                    >
                      {repos[activeSlide].language ?? "Unknown"}
                    </div>
                  </div>

                  <div className="project-card-section-title">Stats</div>
                  <div className="project-card-highlights">
                    <div className="pill">★ {repos[activeSlide].stargazers_count}</div>
                    <div className="pill">⑂ {repos[activeSlide].forks_count}</div>
                  </div>
                </div>

                <div className="project-card-footer">
                  <a
                    className="github-cta"
                    href={repos[activeSlide].html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub
                    <AiOutlineRight />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          <div className="projects-bottom-gradient" aria-hidden="true" />
        </motion.div>
      </div>
    </motion.div>
  );
}
