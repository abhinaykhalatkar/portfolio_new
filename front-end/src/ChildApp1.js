import React, { useState, useContext, useEffect, useCallback } from "react";
import "./App.scss";
import githubDay from "./Assets/github-icon/github-day.svg";
import githubNight from "./Assets/github-icon/github-night.svg";
import RenderRoutes from "./Context/router";
import SideBar from "./Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "./Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "./Context/PageAnimationContext/PageAnimationContext";
import { ProgressNav, navsData } from "./Components/ProgressNav/ProgressNav";
import { SecondaryBtn } from "./Components/Buttons/Buttons";

function ChildApp1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const { handleSetScrollDirection, activeIndex, setActiveIndex } =
    useContext(PageAnimationContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const navigate = useNavigate();

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
          swipe === "L"
            ? handleSetScrollDirection(1)
            : handleSetScrollDirection(0);
          newIndex = Math.min(activeIndex + 1, navsData.length - 1);
        } else if (swipe === "R" || e.deltaY < 0) {
          swipe === "R"
            ? handleSetScrollDirection(0)
            : handleSetScrollDirection(1);
          newIndex = Math.max(activeIndex - 1, 0);
        }
        setActiveIndex(newIndex);
        navigate(navsData[newIndex].Address);
      }
    },
    [
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
        <motion.div
          className={`page-content ${
            isSidebarOpen ? "page-content-collapsed" : ""
          }`}
          initial={false}
          animate={{ marginLeft: isSidebarOpen ? 250 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeIndex !== navsData.length - 1 ? (
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
          <AnimatePresence mode="wait">
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <RenderRoutes />
            </div>
          </AnimatePresence>
          {activeIndex!==3 && (
            <a
              className="gitIcon"
              href="https://github.com/abhinaykhalatkar"
              target="_blank"
              rel="noreferrer"
            >
              <img src={darkTheme ? githubNight : githubDay} alt="github" />
            </a>
          )}
          <ProgressNav />
        </motion.div>
      </div>
    </div>
  );
}
export default ChildApp1;
