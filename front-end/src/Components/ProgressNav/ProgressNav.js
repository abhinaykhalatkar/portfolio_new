import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./ProgressNav.scss";
import ScrollBtn from "./ScrollBtn";
// import { TfiLayoutSlider } from "react-icons/tfi";
// import { AiOutlineLeft } from "react-icons/ai";
// import { VerticalProgressNav } from "./VerticalProgressNav";

// let isOnMainPageP = true;
export const navsData = [
  { Name: "00", Address: "/" },
  { Name: "01", Address: "/about" },
  { Name: "02", Address: "/skills" },
  { Name: "03", Address: "/projects" },
  { Name: "04", Address: "/contact" },
];
export function ProgressNav({ endPosition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    navsData.findIndex((item) => item.Address === location.pathname)
  );
  const activeNavLinkRef = useRef(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(0);
  const {
    handleSetScrollDirection,
    setActiveIndex,
    isOnMainPage,
    isVerProgressBarOpen,
  } = useContext(PageAnimationContext);

  useEffect(() => {
    const lavalampElement = document.querySelector(".lavalamp");
    const lavalampWidth = lavalampElement ? 90 : 0;
    if (activeNavLinkRef.current && lavalampElement) {
      setActiveLinkWidth(lavalampWidth);
    }
  }, [location.pathname, activeLinkWidth, isOnMainPage]);

  useEffect(() => {
    if (isOnMainPage) {
      setSquash(isOnMainPage);
    }
  }, [isOnMainPage]);

  const handleSquash = (e) => {
    let curAddress = e.target.getAttribute("address");
    const index = navsData.findIndex((item) => item.Address === curAddress);

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
        className="navigation-progress"
        initial={{
          x: `${!isVerProgressBarOpen ? "50%" : `${endPosition}`}`,
          y: `${!isVerProgressBarOpen ? "90vh" : "50vh"}`,
          rotate: `${!isVerProgressBarOpen ? 0 : -90}`,
        }}
        animate={{ x: "50%", y: "90vh", rotate: 0 }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0,
        }}
        style={{
          bottom: "95vh",
          right: "50%",
          transform: "translateX(50%)",
          position: "fixed",
        }}
      >
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

        <motion.div
          className={`lavalamp ${squash ? "squash" : ""}`}
          animate={{
            x:
              navsData.findIndex((el) => el.Address === location.pathname) *
                activeLinkWidth -
              activeLinkWidth * 2,
            width: activeLinkWidth,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </motion.div>

      <ScrollBtn />
    </div>
  );
}
