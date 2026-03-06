import React, { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { useLocaleContext } from "../../i18n/LocaleContext";
import {
  stripLocalePrefix,
  toLocalizedPath,
  type Locale,
} from "../../i18n/localeRoutes";
import "./VerticalProgressNav.scss";

export const PROJECTS_CATALOGUE_ALIAS = "/projects/project-catalogue";
export const MIN_PROJECT_SECTIONS = 5;
const FULL_DOT_LIST_MAX = 14;
const WINDOW_RADIUS = 3;

export type ProjectNavItem = {
  Name: string;
  Address: string;
};

export function normalizeProjectSectionCount(rawCount: number): number {
  if (!Number.isFinite(rawCount)) {
    return MIN_PROJECT_SECTIONS;
  }

  return Math.max(MIN_PROJECT_SECTIONS, Math.floor(rawCount));
}

export function getProjectsNavData(sectionCount: number): ProjectNavItem[] {
  const totalSections = normalizeProjectSectionCount(sectionCount);
  return Array.from({ length: totalSections }, (_, index) => {
    const sectionNumber = index + 1;
    return {
      Name: String(sectionNumber).padStart(2, "0"),
      Address: `/projects/project-${sectionNumber}`,
    };
  });
}

export function getProjectAddressByIndex(
  index: number,
  sectionCount: number,
  locale?: Locale
): string {
  const navData = getProjectsNavData(sectionCount);
  const safeIndex = Math.min(Math.max(index, 0), navData.length - 1);
  const address = navData[safeIndex].Address;
  return locale ? toLocalizedPath(address, locale) : address;
}

export function parseProjectSectionFromPathname(pathname: string): number | null {
  const basePath = stripLocalePrefix(pathname);
  const match = basePath.match(/^\/projects\/project-(\d+)$/);
  if (!match) {
    return null;
  }

  const sectionNumber = Number(match[1]);
  if (!Number.isFinite(sectionNumber)) {
    return null;
  }

  return Math.floor(sectionNumber);
}

export function parseProjectSlug(slug: string | undefined): number | null {
  if (!slug) {
    return null;
  }

  const match = slug.match(/^project-(\d+)$/);
  if (!match) {
    return null;
  }

  const sectionNumber = Number(match[1]);
  if (!Number.isFinite(sectionNumber)) {
    return null;
  }

  const normalized = Math.floor(sectionNumber);
  if (normalized < 1) {
    return null;
  }

  return normalized;
}

export function resolveProjectNavIndex(
  pathname: string,
  sectionCount: number
): number {
  const basePath = stripLocalePrefix(pathname);
  const totalSections = normalizeProjectSectionCount(sectionCount);
  if (basePath === PROJECTS_CATALOGUE_ALIAS) {
    return totalSections - 1;
  }

  const sectionNumber = parseProjectSectionFromPathname(basePath);
  if (sectionNumber === null) {
    return -1;
  }

  if (sectionNumber < 1 || sectionNumber > totalSections) {
    return -1;
  }

  return sectionNumber - 1;
}

type VerticalProgressNavProps = {
  setEndPosition?: React.Dispatch<React.SetStateAction<string>>;
  endPosition?: string;
};

export function VerticalProgressNav({
  setEndPosition,
  endPosition = "67vw",
}: VerticalProgressNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, t } = useLocaleContext();

  const {
    setActiveProjectIndex,
    setHorizontalScrollDirection,
    isOnMainPage,
    projectSectionCount,
  } = usePageAnimationContext();

  const parsedSectionFromPath = parseProjectSectionFromPathname(location.pathname);
  const totalSections = normalizeProjectSectionCount(
    Math.max(projectSectionCount, parsedSectionFromPath ?? projectSectionCount)
  );
  const navData = useMemo(() => getProjectsNavData(totalSections), [totalSections]);
  const currentIndex = resolveProjectNavIndex(location.pathname, totalSections);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimerRef = useRef<number | null>(null);

  const safeIndex =
    currentIndex === -1
      ? Math.min(Math.max(totalSections - 1, 0), totalSections - 1)
      : currentIndex;
  const activeProgress = totalSections <= 1 ? 0 : safeIndex / (totalSections - 1);
  const topLabel = "00";
  const bottomLabel = String(Math.max(totalSections - 1, 0)).padStart(2, "0");
  const activeDisplayLabel = String(safeIndex).padStart(2, "0");

  const visibleDotIndices = useMemo(() => {
    if (totalSections <= FULL_DOT_LIST_MAX) {
      return Array.from({ length: totalSections }, (_, index) => index);
    }

    const visible = new Set<number>();
    visible.add(0);
    visible.add(totalSections - 1);

    const minWindow = Math.max(0, safeIndex - WINDOW_RADIUS);
    const maxWindow = Math.min(totalSections - 1, safeIndex + WINDOW_RADIUS);
    for (let index = minWindow; index <= maxWindow; index += 1) {
      visible.add(index);
    }

    return Array.from(visible).sort((a, b) => a - b);
  }, [safeIndex, totalSections]);

  const pulseInteraction = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      interactionTimerRef.current = null;
    }, 320);
  };

  React.useEffect(() => {
    return () => {
      if (interactionTimerRef.current !== null) {
        window.clearTimeout(interactionTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!setEndPosition) {
      return;
    }
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const xPositionValue =
        windowWidth < 1000
          ? 67
          : windowWidth < 1200
          ? 63
          : windowWidth < 1600
          ? 60
          : windowWidth < 2500
          ? 57
          : 53;
      setEndPosition(`${xPositionValue}vw`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setEndPosition]);

  const goToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= navData.length) {
      return;
    }

    const nextPath = getProjectAddressByIndex(nextIndex, totalSections, locale);
    setActiveProjectIndex(nextIndex);
    setHorizontalScrollDirection(nextIndex > safeIndex ? 1 : 0);
    pulseInteraction();
    navigate(nextPath);
  };

  return (
    <motion.aside
      className={`project-rail ${isOnMainPage ? "" : "visible"}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ ease: "easeOut", duration: 0.35 }}
      style={{ "--project-rail-end-position": endPosition } as React.CSSProperties}
      aria-label={t("projectRail.aria")}
    >
      <div className="project-rail-track">
        <button
          type="button"
          className="project-rail-anchor top"
          onClick={() => goToIndex(0)}
          aria-label={t("projectRail.first")}
        >
          {topLabel}
        </button>

        <div className="project-rail-markers" role="tablist" aria-orientation="vertical">
          {visibleDotIndices.map((dotIndex) => {
            const dotProgress = totalSections <= 1 ? 0 : dotIndex / (totalSections - 1);
            const isActive = dotIndex === safeIndex;
            return (
              <button
                key={`rail-dot-${dotIndex}`}
                type="button"
                className={`project-rail-dot ${isActive ? "active" : ""}`}
                style={{ top: `${dotProgress * 100}%` }}
                role="tab"
                aria-selected={isActive}
                aria-label={`${t("projectRail.goTo")} ${dotIndex + 1}`}
                onClick={() => goToIndex(dotIndex)}
              />
            );
          })}

          <motion.div
            className={`project-rail-current ${isInteracting ? "pulse" : ""}`}
            animate={{ top: `${activeProgress * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.65 }}
          >
            {activeDisplayLabel}
          </motion.div>
        </div>

        <button
          type="button"
          className="project-rail-anchor bottom"
          onClick={() => goToIndex(totalSections - 1)}
          aria-label={t("projectRail.last")}
        >
          {bottomLabel}
        </button>
      </div>
    </motion.aside>
  );
}
