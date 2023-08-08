import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./ProgressNav.scss";

export const navsData = [
  { Name: "HOME", Address: "/" },
  { Name: "ABOUT", Address: "/about" },
  { Name: "SKILLS", Address: "/skills" },
  { Name: "PROJECTS", Address: "/projects" },
];
export function ProgressNav() {
  const location = useLocation();
  const [squash, setSquash] = useState(false);
  const [prevIndex, setCurIndex] = useState(0);
  const activeNavLinkRef = useRef(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(100);
  const { handleSetScrollDirection } = useContext(PageAnimationContext);

  useEffect(() => {
    if (activeNavLinkRef.current) {
      setActiveLinkWidth(100);
    }
  }, []);

  const handleSquash = () => {
    const index = navsData.findIndex(
      (item) => item.Address === location.pathname
    );
    if (index !== -1) {
      handleSetScrollDirection(prevIndex >= index ? 0 : 1);
      setCurIndex(index);
    }
    setSquash(true);
    setTimeout(() => {
      setSquash(false);
    }, 400);
  };

  return (
    <div className="navigation-progress">
      <AnimatePresence mode="wait">
        {navsData.map((el, ind) => {
          return (
            <NavLink
              key={`sideNav ${ind}`}
              className={`NavLink ${
                location.pathname === el.Address ? "NavActive" : ""
              }`}
              to={el.Address}
              onClick={handleSquash}
              ref={location.pathname === el.Address ? activeNavLinkRef : null}
            >
              {el.Name}
            </NavLink>
          );
        })}
      </AnimatePresence>
      <motion.div
        className={`lavalamp ${squash ? "squash" : ""}`}
        initial={{ width: activeLinkWidth }}
        animate={{
          x:
            navsData.findIndex((el) => el.Address === location.pathname) * 100 -
            150,
          width: activeLinkWidth,
        }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      />
    </div>
  );
}
