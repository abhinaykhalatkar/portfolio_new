import "./Projects-home.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import { AiOutlineRight } from "react-icons/ai";

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
};

type RepoLoadState =
  | { status: "idle" | "loading"; repos: GithubRepo[] }
  | { status: "success"; repos: GithubRepo[] }
  | { status: "error"; repos: GithubRepo[]; message: string };

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
  } = usePageAnimationContext();

  const githubUsername = useMemo(() => {
    const configured = import.meta.env.VITE_GITHUB_USERNAME;
    return typeof configured === "string" && configured.trim().length > 0
      ? configured.trim()
      : "abhinaykhalatkar";
  }, []);

  const [repoState, setRepoState] = useState<RepoLoadState>({
    status: "idle",
    repos: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    setRepoState({ status: "loading", repos: [] });

    const url = `https://api.github.com/users/${encodeURIComponent(
      githubUsername
    )}/repos?per_page=100&sort=updated`;

    void fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }
        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected GitHub API response");
        }
        return data as GithubRepo[];
      })
      .then((repos) => {
        const safeRepos = repos
          .filter((r) => !r.private)
          .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
        setRepoState({ status: "success", repos: safeRepos });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : "Failed to load repos";
        setRepoState({ status: "error", repos: [], message });
      });

    return () => controller.abort();
  }, [githubUsername]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const repos = repoState.repos;
  const slideCount = repos.length;

  useEffect(() => {
    setActiveSlide(0);
  }, [slideCount]);

  const formatUpdated = useCallback((iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  }, []);

  const clampIndex = useCallback(
    (next: number) => {
      if (slideCount <= 0) return 0;
      const m = next % slideCount;
      return m < 0 ? m + slideCount : m;
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
    setActiveSlide((prev) => clampIndex(prev + 1));
  }, [clampIndex, slideCount]);

  const goPrev = useCallback(() => {
    if (slideCount <= 0) return;
    setSlideDirection(-1);
    setActiveSlide((prev) => clampIndex(prev - 1));
  }, [clampIndex, slideCount]);

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
          <div className="toolbar-track" role="tablist" aria-label="Projects">
            {repos.map((r, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`toolbar-item ${isActive ? "active" : ""}`}
                  onClick={() => goTo(idx)}
                >
                  <div className="toolbar-time">
                    Updated {formatUpdated(r.updated_at)}
                  </div>
                  <div className="toolbar-title">{r.name}</div>
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
          Browse all my public GitHub repositories using the slider below. You
          can also explore more on my{" "}
          <a
            className="gitLink"
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile
          </a>
          . If you want to collaborate, feel free to
          <Link className="contactLink" to={"/contact"}>
            {" "}
            reach out and Connect !
          </Link>
        </motion.div>

        <motion.div
          className="projects-slider"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.7}
          variants={contentVariants}
        >
          {repoState.status === "loading" ? (
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
