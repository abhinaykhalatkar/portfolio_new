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
  projectsNavData,
} from "./Components/ProgressNav/VerticalProgressNav";

type SwipeDirection = "L" | "R";

function ChildApp1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useThemeContext();
  // Use refs for throttling so we don't re-render on every wheel event.
  const isScrollingRef = useRef(false);
  const scrollUnlockTimerRef = useRef<number | null>(null);
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
    isOnMainPage,
    setHorizontalScrollDirection,
  } = usePageAnimationContext();

  const contactBtnHandler = () => {
    setActiveIndex(4);
  };
  const unlockScroll = useCallback(() => {
    isScrollingRef.current = false;
    if (scrollUnlockTimerRef.current !== null) {
      window.clearTimeout(scrollUnlockTimerRef.current);
      scrollUnlockTimerRef.current = null;
    }
  }, []);

  const scheduleUnlock = useCallback(() => {
    if (scrollUnlockTimerRef.current !== null) {
      window.clearTimeout(scrollUnlockTimerRef.current);
    }
    scrollUnlockTimerRef.current = window.setTimeout(unlockScroll, 450);
  }, [unlockScroll]);

  const handleWheelOrSwipe = useCallback(
    (e: WheelEvent | React.TouchEvent, swipe?: SwipeDirection) => {
      if (isScrollingRef.current) return;

      const deltaY = "deltaY" in e ? (e as WheelEvent).deltaY : 0;
      const deltaX = "deltaX" in e ? (e as WheelEvent).deltaX : 0;

      // Ignore tiny trackpad noise so we don't "bounce back".
      const MIN_DELTA = 18;
      const hasSwipe = swipe === "L" || swipe === "R";
      const meaningfulWheel =
        Math.abs(deltaY) > MIN_DELTA || Math.abs(deltaX) > MIN_DELTA;
      if (!hasSwipe && !meaningfulWheel) return;

      // Determine intent:
      // - On main pages: vertical wheel.
      // - On project pages: horizontal wheel (deltaX) is preferred, but we still allow deltaY.
      let direction: "next" | "prev" | null = null;

      if (swipe === "L") direction = "next";
      if (swipe === "R") direction = "prev";

      if (!direction) {
        // Prefer deltaX when it dominates (trackpad horizontal).
        const preferX = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
        const effective = preferX ? deltaX : deltaY;
        if (effective > 0) direction = "next";
        if (effective < 0) direction = "prev";
      }

      if (!direction) return;

      isScrollingRef.current = true;
      scheduleUnlock();

      if (isOnMainPage) {
        const cur = Math.min(Math.max(activeIndex, 0), navsData.length - 1);
        const nextIndex =
          direction === "next"
            ? Math.min(cur + 1, navsData.length - 1)
            : Math.max(cur - 1, 0);

        // Animation direction: 0 = forward/down, 1 = back/up (existing app convention)
        handleSetScrollDirection(direction === "next" ? 0 : 1);
        setActiveIndex(nextIndex);
        navigate(navsData[nextIndex].Address);
      } else {
        const cur = Math.min(
          Math.max(activeProjectIndex, 0),
          projectsNavData.length - 1
        );
        const nextIndex =
          direction === "next"
            ? Math.max(cur - 1, 0)
            : Math.min(cur + 1, projectsNavData.length - 1);

        // Project pages render vertically but represent horizontal navigation.
        // Keep existing direction semantics:
        //  - 1 means "down" in the current animation, which corresponds to going to a lower index.
        //  - 0 means "up".
        setHorizontalScrollDirection(direction === "next" ? 1 : 0);
        setActiveProjectIndex(nextIndex);
        navigate(projectsNavData[nextIndex].Address);
      }
    },
    [
      activeProjectIndex,
      isOnMainPage,
      activeIndex,
      handleSetScrollDirection,
      navigate,
      scheduleUnlock,
      setActiveIndex,
      setActiveProjectIndex,
      setHorizontalScrollDirection,
    ]
  );

  useEffect(() => {
    const listener = (e: WheelEvent) => handleWheelOrSwipe(e);
    window.addEventListener("wheel", listener, { passive: true });
    return () => {
      window.removeEventListener("wheel", listener);
    };
  }, [handleWheelOrSwipe]);

  // Cleanup any pending timers.
  useEffect(() => {
    return () => {
      if (scrollUnlockTimerRef.current !== null) {
        window.clearTimeout(scrollUnlockTimerRef.current);
      }
    };
  }, []);

  function getIsSidebarOpen(val: boolean) {
    // SideBar passes the *next* open state. Keep it as-is (no inversion),
    // otherwise the page-content margin can get stuck and leave a blank gap.
    setIsSidebarOpen(val);
  }

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleWheelOrSwipe(e, "L");
    } else if (isRightSwipe) {
      handleWheelOrSwipe(e, "R");
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
            {activeIndex !== navsData.length - 1 && isOnMainPage ? (
              <motion.div
                className="button-contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SecondaryBtn
                  text="Contact"
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
