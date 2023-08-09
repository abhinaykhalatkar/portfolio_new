import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./ProgressNav.scss";
import ScrollBtn from "./ScrollBtn";

export const navsData = [
  { Name: "00", Address: "/" },
  { Name: "01", Address: "/about" },
  { Name: "02", Address: "/skills" },
  { Name: "03", Address: "/projects" },
  { Name: "04", Address: "/contact" },
];
export function ProgressNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    navsData.findIndex((item) => item.Address === location.pathname)
  );
  const activeNavLinkRef = useRef(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(0);
  const { handleSetScrollDirection, setActiveIndex } =
    useContext(PageAnimationContext);

  useEffect(() => {
      const lavalampElement = document.querySelector(".lavalamp");
      const lavalampWidth = lavalampElement.getBoundingClientRect().width;
      if (activeNavLinkRef.current && lavalampElement) {
        setActiveLinkWidth(lavalampWidth);
      }
  }, [location.pathname,activeLinkWidth]);

  const handleSquash = (e) => {
    let curAddress = e.target.getAttribute("address");
    const index = navsData.findIndex((item) => item.Address === curAddress);
    setActiveIndex(index);
    navigate(curAddress);
    if (index !== -1) {
      handleSetScrollDirection(prevIndex >= index ? 1 : 0);
      setPrevIndex(index);
    }
    // setSquash(true);
    // setTimeout(() => {
    //   setSquash(false);
    // }, 1000);
  };

  return (
    <div>
      <div className="navigation-progress">
        <AnimatePresence>
          {navsData.map((el, ind) => {
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
        </AnimatePresence>
        <motion.div
          className={`lavalamp ${squash ? "squash" : ""}`}
          animate={{
            x:
              navsData.findIndex((el) => el.Address === location.pathname) *
               activeLinkWidth -
              activeLinkWidth*2,
            width: activeLinkWidth,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      <ScrollBtn />
    </div>
  );
}
