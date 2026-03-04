import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.scss";
import githubDay from "./Assets/github-icon/github-day.svg";
import githubNight from "./Assets/github-icon/github-night.svg";
import RenderRoutes from "./Context/router";
import SideBar from "./Components/SideBar/SideBar";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "./Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "./Context/PageAnimationContext/PageAnimationContext";
import { ProgressNav, navsData } from "./Components/ProgressNav/ProgressNav";
import { SecondaryBtn } from "./Components/Buttons/Buttons";
import {
  VerticalProgressNav,
  getProjectAddressByIndex,
  normalizeProjectSectionCount,
  parseProjectSectionFromPathname,
  resolveProjectNavIndex,
} from "./Components/ProgressNav/VerticalProgressNav";

type Direction = "next" | "prev";

const PROJECTS_HOME_PATH = "/projects";
const WHEEL_GUARD_TOLERANCE = 1;

function canScrollVertically(node: HTMLElement, deltaY: number): boolean {
  if (Math.abs(deltaY) < WHEEL_GUARD_TOLERANCE) {
    return false;
  }
  if (node.scrollHeight <= node.clientHeight + WHEEL_GUARD_TOLERANCE) {
    return false;
  }
  if (deltaY > 0) {
    return node.scrollTop + node.clientHeight < node.scrollHeight - WHEEL_GUARD_TOLERANCE;
  }
  return node.scrollTop > WHEEL_GUARD_TOLERANCE;
}

function canScrollHorizontally(node: HTMLElement, deltaX: number): boolean {
  if (Math.abs(deltaX) < WHEEL_GUARD_TOLERANCE) {
    return false;
  }
  if (node.scrollWidth <= node.clientWidth + WHEEL_GUARD_TOLERANCE) {
    return false;
  }
  if (deltaX > 0) {
    return node.scrollLeft + node.clientWidth < node.scrollWidth - WHEEL_GUARD_TOLERANCE;
  }
  return node.scrollLeft > WHEEL_GUARD_TOLERANCE;
}

function shouldBypassGlobalRouteWheel(event: WheelEvent): boolean {
  const eventTarget = event.target;
  if (!(eventTarget instanceof HTMLElement)) {
    return false;
  }

  const lockNode = eventTarget.closest<HTMLElement>("[data-wheel-lock='true']");
  if (!lockNode) {
    return false;
  }

  const axis = lockNode.dataset.wheelAxis ?? "both";
  const primaryIsVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);

  if (axis === "y") {
    return canScrollVertically(lockNode, event.deltaY);
  }
  if (axis === "x") {
    return canScrollHorizontally(lockNode, event.deltaX);
  }

  if (primaryIsVertical && canScrollVertically(lockNode, event.deltaY)) {
    return true;
  }
  if (!primaryIsVertical && canScrollHorizontally(lockNode, event.deltaX)) {
    return true;
  }
  if (canScrollVertically(lockNode, event.deltaY)) {
    return true;
  }
  return canScrollHorizontally(lockNode, event.deltaX);
}

function ChildApp1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useThemeContext();

  const wheelAccumulatorRef = useRef(0);
  const lastWheelEventAtRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [endPosition, setEndPosition] = useState("67vw");

  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSetScrollDirection,
    activeIndex,
    setActiveIndex,
    activeProjectIndex,
    setActiveProjectIndex,
    projectSectionCount,
    isOnMainPage,
    setHorizontalScrollDirection,
  } = usePageAnimationContext();

  const contactBtnHandler = () => {
    setActiveIndex(4);
  };

  useEffect(() => {
    const inferredSectionFromPath = parseProjectSectionFromPathname(location.pathname);
    const routeAwareSectionCount = normalizeProjectSectionCount(
      Math.max(projectSectionCount, inferredSectionFromPath ?? projectSectionCount)
    );

    const mainRouteIndex = navsData.findIndex(
      (item) => item.Address === location.pathname
    );
    if (mainRouteIndex !== -1 && mainRouteIndex !== activeIndex) {
      setActiveIndex(mainRouteIndex);
    }

    const projectRouteIndex = resolveProjectNavIndex(
      location.pathname,
      routeAwareSectionCount
    );
    if (projectRouteIndex !== -1 && projectRouteIndex !== activeProjectIndex) {
      setActiveProjectIndex(projectRouteIndex);
    }
  }, [
    activeIndex,
    activeProjectIndex,
    location.pathname,
    projectSectionCount,
    setActiveIndex,
    setActiveProjectIndex,
  ]);

  const resetWheelAccumulator = useCallback(() => {
    wheelAccumulatorRef.current = 0;
    lastWheelEventAtRef.current = 0;
  }, []);

  const navigateByDirection = useCallback(
    (direction: Direction) => {
      const inferredSectionFromPath = parseProjectSectionFromPathname(location.pathname);
      const totalProjectSections = normalizeProjectSectionCount(
        Math.max(projectSectionCount, inferredSectionFromPath ?? projectSectionCount)
      );

      if (isOnMainPage) {
        if (location.pathname === PROJECTS_HOME_PATH && direction === "next") {
          const entryProjectIndex = 0;
          setHorizontalScrollDirection(1);
          setActiveProjectIndex(entryProjectIndex);
          navigate(getProjectAddressByIndex(entryProjectIndex, totalProjectSections));
          return true;
        }

        const routeIndex = navsData.findIndex(
          (item) => item.Address === location.pathname
        );
        const currentIndex =
          routeIndex !== -1
            ? routeIndex
            : Math.min(Math.max(activeIndex, 0), navsData.length - 1);

        const nextIndex =
          direction === "next"
            ? Math.min(currentIndex + 1, navsData.length - 1)
            : Math.max(currentIndex - 1, 0);

        if (nextIndex === currentIndex) {
          return false;
        }

        handleSetScrollDirection(direction === "next" ? 0 : 1);
        setActiveIndex(nextIndex);
        navigate(navsData[nextIndex].Address);
        return true;
      }

      const routeProjectIndex = resolveProjectNavIndex(
        location.pathname,
        totalProjectSections
      );
      const currentProjectIndex =
        routeProjectIndex !== -1
          ? routeProjectIndex
          : Math.min(Math.max(activeProjectIndex, 0), totalProjectSections - 1);

      const firstProjectIndex = 0;
      if (currentProjectIndex === firstProjectIndex && direction === "prev") {
        const projectsMainIndex = navsData.findIndex(
          (item) => item.Address === PROJECTS_HOME_PATH
        );
        setHorizontalScrollDirection(0);
        if (projectsMainIndex !== -1) {
          setActiveIndex(projectsMainIndex);
        }
        navigate(PROJECTS_HOME_PATH);
        return true;
      }

      const nextProjectIndex =
        direction === "next"
          ? Math.min(currentProjectIndex + 1, totalProjectSections - 1)
          : Math.max(currentProjectIndex - 1, 0);

      if (nextProjectIndex === currentProjectIndex) {
        return false;
      }

      setHorizontalScrollDirection(direction === "next" ? 1 : 0);
      setActiveProjectIndex(nextProjectIndex);
      navigate(getProjectAddressByIndex(nextProjectIndex, totalProjectSections));
      return true;
    },
    [
      activeIndex,
      activeProjectIndex,
      handleSetScrollDirection,
      isOnMainPage,
      location.pathname,
      navigate,
      projectSectionCount,
      setActiveIndex,
      setActiveProjectIndex,
      setHorizontalScrollDirection,
    ]
  );

  useEffect(() => {
    const MIN_NOISE_DELTA = 4;
    const TRIGGER_DELTA = 68;
    const ACCUMULATOR_RESET_MS = 180;
    const NAVIGATION_COOLDOWN_MS = 420;

    const listener = (event: WheelEvent) => {
      const now = Date.now();

      if (now < wheelCooldownUntilRef.current) {
        return;
      }
      if (shouldBypassGlobalRouteWheel(event)) {
        return;
      }

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);

      let effectiveDelta = 0;
      if (isOnMainPage) {
        const useVertical = absY >= absX * 1.1;
        effectiveDelta = useVertical ? event.deltaY : event.deltaY + event.deltaX * 0.45;
      } else {
        const preferX = absX > absY * 1.2;
        effectiveDelta = preferX ? event.deltaX : event.deltaY;
      }

      if (Math.abs(effectiveDelta) < MIN_NOISE_DELTA) {
        return;
      }

      if (now - lastWheelEventAtRef.current > ACCUMULATOR_RESET_MS) {
        wheelAccumulatorRef.current = 0;
      }

      lastWheelEventAtRef.current = now;

      if (
        wheelAccumulatorRef.current !== 0 &&
        Math.sign(wheelAccumulatorRef.current) !== Math.sign(effectiveDelta)
      ) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += effectiveDelta;

      if (Math.abs(wheelAccumulatorRef.current) < TRIGGER_DELTA) {
        return;
      }

      const direction: Direction =
        wheelAccumulatorRef.current > 0 ? "next" : "prev";

      resetWheelAccumulator();

      const didNavigate = navigateByDirection(direction);
      if (didNavigate) {
        wheelCooldownUntilRef.current = now + NAVIGATION_COOLDOWN_MS;
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", listener, { passive: false });
    return () => {
      window.removeEventListener("wheel", listener);
    };
  }, [isOnMainPage, navigateByDirection, resetWheelAccumulator]);

  useEffect(() => {
    return () => {
      resetWheelAccumulator();
      wheelCooldownUntilRef.current = 0;
    };
  }, [resetWheelAccumulator]);

  function getIsSidebarOpen(value: boolean) {
    setIsSidebarOpen(value);
  }

  const minSwipeDistance = 50;

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateByDirection("next");
    } else if (isRightSwipe) {
      navigateByDirection("prev");
    }
  };

  return (
    <div className={`c-app ${darkTheme ? "dark-theme" : "white-theme"}`}>
      <div className={`p-app  ${darkTheme ? "" : "b-white"}`}>
        <SideBar passIsSidebarOpen={getIsSidebarOpen} />
        <AnimatePresence mode="wait">
          <motion.div
            className={`page-content ${
              isSidebarOpen ? "page-content-collapsed" : ""
            }`}
            initial={false}
            animate={{ marginLeft: isSidebarOpen ? 250 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeIndex !== navsData.length - 1 &&
            isOnMainPage &&
            location.pathname !== "/" ? (
              <motion.div
                className="button-contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SecondaryBtn
                  text="Contact"
                  path="/contact"
                  on_Click={contactBtnHandler}
                />
              </motion.div>
            ) : null}

            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <RenderRoutes />
            </div>

            {activeIndex !== 3 &&
              location.pathname !== "/projects/project-catalogue" &&
              !isSidebarOpen &&
              isOnMainPage && (
                <motion.a
                  className="gitIcon"
                  href="https://github.com/abhinaykhalatkar"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img src={darkTheme ? githubNight : githubDay} alt="github" />
                </motion.a>
              )}

            {isOnMainPage ? (
              <ProgressNav endPosition={endPosition} />
            ) : (
              <VerticalProgressNav
                setEndPosition={setEndPosition}
                endPosition={endPosition}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ChildApp1;
