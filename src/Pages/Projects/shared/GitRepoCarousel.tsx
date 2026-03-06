import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineRight } from "react-icons/ai";
import type { RepoLoadState } from "./githubRepos";
import { useLocaleContext } from "../../../i18n/LocaleContext";
import { getIntlLocale } from "../../../i18n/localeRoutes";
import "./GitRepoCarousel.scss";

function techClassName(tech: string): string {
  return `tech-${tech
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

type GitRepoCarouselProps = {
  repoState: RepoLoadState;
  githubUsername: string;
  darkTheme: boolean;
  initialIndex?: number;
  sectionLabel?: string;
};

export default function GitRepoCarousel({
  repoState,
  githubUsername,
  darkTheme,
  initialIndex = 0,
  sectionLabel = "Projects",
}: GitRepoCarouselProps) {
  const { locale, t } = useLocaleContext();
  const repos = repoState.repos;
  const slideCount = repos.length;

  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const clampIndex = useCallback(
    (next: number) => {
      if (slideCount <= 0) return 0;
      const modulo = next % slideCount;
      return modulo < 0 ? modulo + slideCount : modulo;
    },
    [slideCount]
  );

  useEffect(() => {
    if (slideCount <= 0) {
      setActiveSlide(0);
      return;
    }
    setActiveSlide(clampIndex(initialIndex));
  }, [clampIndex, initialIndex, slideCount]);

  const formatUpdated = useCallback((iso: string): string => {
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleDateString(getIntlLocale(locale), {
      year: "numeric",
      month: "short",
    });
  }, [locale]);

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

  const goTo = useCallback(
    (index: number) => {
      if (slideCount <= 0) return;
      const resolved = clampIndex(index);
      if (resolved === activeSlide) return;
      setSlideDirection(resolved > activeSlide ? 1 : -1);
      setActiveSlide(resolved);
    },
    [activeSlide, clampIndex, slideCount]
  );

  const currentRepo = slideCount > 0 ? repos[activeSlide] : null;

  useEffect(() => {
    if (slideCount <= 1) return;

    const activeChip = chipRefs.current[activeSlide];
    if (!activeChip) return;

    activeChip.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSlide, slideCount]);

  const slideVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? "9%" : "-9%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? "-9%" : "9%",
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <div
      className={`repo-carousel ${darkTheme ? "" : "light"}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
      aria-label={`${sectionLabel} ${t("projects.repositoryCarousel")}`}
    >
      <div className="repo-carousel-header">
        <div className="repo-carousel-title">{sectionLabel}</div>
        <div className="repo-carousel-header-right">
          <div className="repo-carousel-count">
            {slideCount > 0 ? `${activeSlide + 1} / ${slideCount}` : "0 / 0"}
          </div>
          <div className="repo-carousel-controls">
            <button
              type="button"
              className="repo-carousel-btn"
              onClick={goPrev}
              aria-label={t("projects.previousRepository")}
              disabled={slideCount <= 0}
            >
              ‹
            </button>
            <button
              type="button"
              className="repo-carousel-btn"
              onClick={goNext}
              aria-label={t("projects.nextRepository")}
              disabled={slideCount <= 0}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {repoState.status === "loading" || repoState.status === "idle" ? (
        <div className={`repo-card ${darkTheme ? "" : "light"}`}>
          <div className="repo-card-title">{t("projects.loadingTitle")}</div>
          <div className="repo-card-summary">{t("projects.loadingBody")}</div>
        </div>
      ) : repoState.status === "error" ? (
        <div className={`repo-card ${darkTheme ? "" : "light"}`}>
          <div className="repo-card-title">{t("projects.errorTitle")}</div>
          <div className="repo-card-summary">{repoState.message}</div>
          <div className="repo-card-footer">
            <a
              className="github-cta"
              href={`https://github.com/${githubUsername}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              {t("buttons.viewOnGitHub")}
              <AiOutlineRight />
            </a>
          </div>
        </div>
      ) : slideCount <= 0 || !currentRepo ? (
        <div className={`repo-card ${darkTheme ? "" : "light"}`}>
          <div className="repo-card-title">{t("projects.emptyTitle")}</div>
          <div className="repo-card-summary">
            {t("projects.emptyBody")}
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.article
            key={currentRepo.id}
            className={`repo-card ${darkTheme ? "" : "light"}`}
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
            <div className="repo-card-meta">
              <div className="repo-card-time">
                {t("projects.updated")} {formatUpdated(currentRepo.updated_at)}
              </div>
              <div className="repo-card-badges">
                {currentRepo.archived ? (
                  <div className="pill subtle">{t("projects.archived")}</div>
                ) : null}
                {currentRepo.fork ? (
                  <div className="pill subtle">{t("projects.fork")}</div>
                ) : null}
              </div>
            </div>

            <div className="repo-card-title">{currentRepo.name}</div>
            <div className="repo-card-summary">
              {currentRepo.description ?? t("projects.repoDescriptionFallback")}
            </div>

            <div className="repo-card-section-title">{t("projects.language")}</div>
            <div className="repo-card-tech">
              <div
                className={`pill subtle tech-pill ${techClassName(
                  currentRepo.language ?? "Unknown"
                )}`}
              >
                {currentRepo.language ?? (locale === "de" ? "Unbekannt" : "Unknown")}
              </div>
            </div>

            <div className="repo-card-section-title">{t("projects.stats")}</div>
            <div className="repo-card-highlights">
              <div className="pill">★ {currentRepo.stargazers_count}</div>
              <div className="pill">⑂ {currentRepo.forks_count}</div>
            </div>

            <div className="repo-card-footer">
              <a
                className="github-cta"
                href={currentRepo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {t("buttons.viewOnGitHub")}
                <AiOutlineRight />
              </a>
            </div>
          </motion.article>
        </AnimatePresence>
      )}

      {slideCount > 1 ? (
        <div
          className="repo-carousel-track"
          role="tablist"
          aria-label={t("projects.repoQuickSelect")}
          data-wheel-lock="true"
          data-wheel-axis="x"
        >
          {repos.map((repo, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={repo.id}
                type="button"
                className={`repo-carousel-chip ${isActive ? "active" : ""}`}
                onClick={() => goTo(index)}
                ref={(el) => {
                  chipRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={isActive}
              >
                {repo.name}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
