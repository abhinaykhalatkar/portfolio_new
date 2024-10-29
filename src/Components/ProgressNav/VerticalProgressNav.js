import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./VerticalProgressNav.scss";

// let isOnMainPageP = true;
export const projectsNavData = [
  { Name: "05", Address: "/projects/project-5" },
  { Name: "04", Address: "/projects/project-4" },
  { Name: "03", Address: "/projects/project-3" },
  { Name: "02", Address: "/projects/project-2" },
  { Name: "01", Address: "/projects/project-1" },
];
export function VerticalProgressNav({ setEndPosition, endPosition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    projectsNavData.findIndex((item) => item.Address === location.pathname)
  );
  const activeNavLinkRef = useRef(null);
  const [activeVerLinkWidth, setActiveVerLinkWidth] = useState(0);
  const { setActiveProjectIndex, setHorizontalScrollDirection, isOnMainPage } =
    useContext(PageAnimationContext);

  useEffect(() => {
    const lavalampElement = document.querySelector(".lavalamp1");
    const lavalampWidth = lavalampElement ? 90 : 0;
    if (activeNavLinkRef.current && lavalampElement) {
      setActiveVerLinkWidth(lavalampWidth);
    }
  }, [location.pathname, activeVerLinkWidth, isOnMainPage]);

  useEffect(() => {
    if (!isOnMainPage) {
      setSquash(!isOnMainPage);
    }
  }, [isOnMainPage]);

  const handleSquash = (e) => {
    let curAddress = e.target.getAttribute("address");
    const index = projectsNavData.findIndex(
      (item) => item.Address === curAddress
    );
    setActiveProjectIndex(index);
    navigate(curAddress);
    if (index !== -1) {
      setHorizontalScrollDirection(prevIndex >= index ? 0 : 1);
      setPrevIndex(index);
    }
    setSquash(true);
    setTimeout(() => {
      setSquash(false);
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      let windowWidth = window.innerWidth;
      let xPositionVal =
        windowWidth < 1000
          ? 67
          : windowWidth < 1200
          ? 63
          : windowWidth < 1600
          ? 60
          : windowWidth < 2500
          ? 57
          : 53;
      setEndPosition(`${xPositionVal}vw`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setEndPosition]);

  return (
    <div>
      <motion.div
        className="Vernavigation-progress"
        initial={{ x: "50%", y: "90vh", rotate: 0 }}
        animate={{ x: `${endPosition}`, y: "50vh", rotate: -90 }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        style={{
          position: "fixed",
          bottom: "95vh",
          right: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {projectsNavData.map((el, ind) => {
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
          className={`lavalamp1 ${squash ? "squash" : ""}`}
          animate={{
            x:
              projectsNavData.findIndex(
                (el) => el.Address === location.pathname
              ) *
                activeVerLinkWidth -
              activeVerLinkWidth * 2,
            width: activeVerLinkWidth,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
