import React, { useState, useContext, useEffect, useCallback } from "react";
import "./App.scss";
import githubDay from "./Assets/github-icon/github-day.svg";
import githubNight from "./Assets/github-icon/github-night.svg";
import RenderRoutes from "./Context/router";
import SideBar from "./Components/SideBar/SideBar";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "./Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "./Context/PageAnimationContext/PageAnimationContext";
import { ProgressNav, navsData } from "./Components/ProgressNav/ProgressNav";
import { SecondaryBtn } from "./Components/Buttons/Buttons";
import {
  VerticalProgressNav,
  projectsNavData,
} from "./Components/ProgressNav/VerticalProgressNav";

function ChildApp1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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
  } = useContext(PageAnimationContext);

  const contactBtnHandler = () => {
    setActiveIndex(4);
  };
  const handleMouseWheel = useCallback(
    (e, swipe = 0) => {
      if (isScrolling) return;
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 400);
      if (activeIndex <= navsData.length && activeIndex >= 0) {
        let newIndex;
        if (swipe === "L" || e.deltaY > 0) {
          if (isOnMainPage) {
            swipe === "L"
              ? handleSetScrollDirection(1)
              : handleSetScrollDirection(0);
            newIndex = Math.min(activeIndex + 1, navsData.length - 1);
          } else {
            setHorizontalScrollDirection(1);
            newIndex = Math.max(activeProjectIndex - 1, 0);
          }
        } else if (swipe === "R" || e.deltaY < 0) {
          if (isOnMainPage) {
            swipe === "R"
              ? handleSetScrollDirection(0)
              : handleSetScrollDirection(1);
            newIndex = Math.max(activeIndex - 1, 0);
          } else {
            setHorizontalScrollDirection(0);
            newIndex = Math.min(
              activeProjectIndex + 1,
              projectsNavData.length - 1
            );
          }
        }
        if (isOnMainPage) {
          setActiveIndex(newIndex);
          navigate(navsData[newIndex].Address);
        } else {
          setActiveProjectIndex(newIndex);
          navigate(projectsNavData[newIndex].Address);
        }
      }
    },
    [
      setHorizontalScrollDirection,
      setActiveProjectIndex,
      activeProjectIndex,
      isOnMainPage,
      activeIndex,
      handleSetScrollDirection,
      isScrolling,
      navigate,
      setActiveIndex,
    ]
  );
  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel);
    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, [handleMouseWheel]);

  function getIsSidebarOpen(val) {
    setIsSidebarOpen(!val);
  }

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleMouseWheel(e, "L");
    } else if (isRightSwipe) {
      handleMouseWheel(e, "R");
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
