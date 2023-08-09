import React, { useState, useContext, useEffect, useCallback } from "react";
import "./App.scss";
import githubDay from "./Assets/github-icon/github-day.svg"
import githubNight from "./Assets/github-icon/github-night.svg"
import RenderRoutes from "./Context/router";
import SideBar from "./Components/SideBar/SideBar";
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "./Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "./Context/PageAnimationContext/PageAnimationContext";
import { ProgressNav, navsData } from "./Components/ProgressNav/ProgressNav";

function ChildApp1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const {handleSetScrollDirection,activeIndex,setActiveIndex}=useContext(PageAnimationContext)
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();

  const handleMouseWheel = useCallback(
    (e) => {
      if (isScrolling) return;
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500);

 if(activeIndex<=navsData.length && activeIndex>=0){
  if (e.deltaY > 0) {
    handleSetScrollDirection(0);
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, navsData.length - 1)
    );
    navigate(navsData[activeIndex].Address);
  } else if (e.deltaY < 0) {
    handleSetScrollDirection(1);
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    navigate(navsData[activeIndex].Address);
  }
   console.log(activeIndex)
 }
    },
    [activeIndex,handleSetScrollDirection,isScrolling,navigate,setActiveIndex]
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

  return (
    <div className={`c-app ${darkTheme ? "dark-theme" : "white-theme"}`}>
      <div className={`p-app  ${darkTheme ? "" : "b-white"}`}>
        <SideBar passIsSidebarOpen={getIsSidebarOpen} />
        <motion.div
          className={`page-content ${
            isSidebarOpen ? "page-content-collapsed" : ""
          }`}
          initial={false}
          animate={{ marginLeft: isSidebarOpen ? 250 :0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait" >
            <RenderRoutes/>
          </AnimatePresence>
          <a className="gitIcon" href="https://github.com/abhinaykhalatkar" target="_blank" rel="noreferrer"><img src={darkTheme?githubNight:githubDay} alt="github"/></a>
          <ProgressNav />
        </motion.div>
      </div>
    </div>
  );
}
export default ChildApp1;
