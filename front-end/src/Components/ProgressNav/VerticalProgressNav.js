import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./VerticalProgressNav.scss";
import ScrollBtn from "./ScrollBtn";
import { TfiLayoutSlider } from "react-icons/tfi";
import { AiOutlineLeft } from "react-icons/ai";

// let isOnMainPageP = true;
export const ProjectsNavData = [
  { Name: "05", Address: "/projects/project-5" },
  { Name: "04", Address: "/projects/project-4" },
  { Name: "03", Address: "/projects/project-3" },
  { Name: "02", Address: "/projects/project-2" },
  { Name: "01", Address: "/projects/project-1" },
];
export function VerticalProgressNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    ProjectsNavData.findIndex((item) => item.Address === location.pathname)
  );
  const activeNavLinkRef = useRef(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(0);
  const {
    handleSetScrollDirection,
    setActiveIndex,
    isProgressBarOpen,
    setIsProgressBarOpen,
    isOnMainPage,
  } = useContext(PageAnimationContext);

  useEffect(() => {
    setIsProgressBarOpen(isOnMainPage);
    const lavalampElement = document.querySelector(".lavalamp");
    const lavalampWidth = lavalampElement
      ? lavalampElement.getBoundingClientRect().width
      : 0;
    if (activeNavLinkRef.current && lavalampElement) {
      setActiveLinkWidth(lavalampWidth);
    }
  }, [location.pathname, activeLinkWidth, isOnMainPage, setIsProgressBarOpen]);

  useEffect(() => {
    if (isOnMainPage) {
      setSquash(isOnMainPage);
    }
  }, [isOnMainPage]);

  const handleSquash = (e) => {
    let curAddress = e.target.getAttribute("address");
    const index = ProjectsNavData.findIndex((item) => item.Address === curAddress);
    setActiveIndex(index);
    navigate(curAddress);
    if (index !== -1) {
      handleSetScrollDirection(prevIndex >= index ? 1 : 0);
      setPrevIndex(index);
    }
    setSquash(true);
    setTimeout(() => {
      setSquash(false);
    }, 1000);
  };

  return (
    <div>
        <motion.div
          className="Vernavigation-progress"
          initial={{ x: "50%", y: "90vh" }}
          animate={{ x: "175%", y: "50vh" , rotate:-90}}
          exit={{ x:  "50%", y: "90vh" , rotate:90}}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            // delay: isOnMainPage ? 0 : 0.5,
          }}
          style={{
            bottom: "95vh",
            right: "50%",
            transform: "translateX(50%)",
            position: "fixed",
          }}
        >
          {ProjectsNavData.map((el, ind) => {
            return (
              <span
                key={`sideNav ${ind}`}
                className={`NavLink ${
                  location.pathname === el.Address ? "NavActive" : ""
                }`}
                address={el.Address}
                onClick={handleSquash}
                ref={location.pathname === el.Address ? activeNavLinkRef : null}
              >
                {el.Name}
              </span>
            );
          })}

          <motion.div
            className={`lavalamp ${squash ? "squash" : ""}`}
            animate={{
              x:
                ProjectsNavData.findIndex((el) => el.Address === location.pathname) *
                  activeLinkWidth -
                activeLinkWidth * 2,
              width: activeLinkWidth,
            }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </motion.div>
    </div>
  );
}
