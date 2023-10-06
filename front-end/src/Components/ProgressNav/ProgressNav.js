import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./ProgressNav.scss";
import ScrollBtn from "./ScrollBtn";
import { TfiLayoutSlider } from "react-icons/tfi";
import { AiOutlineLeft } from "react-icons/ai";

// let isOnMainPageP = true;
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
      {isProgressBarOpen ? (
        <motion.div
          className="navigation-progress"
          initial={{ x: "-50%", y: "90vh" }}
          animate={{ x: isProgressBarOpen ? "50%" : "-50%", y: "90vh" }}
          exit={{ x: isProgressBarOpen ? "-150%" : "150%", y: "90vh" }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            delay: isProgressBarOpen ? 0 : 0.5,
          }}
          style={{
            bottom: "95vh",
            right: "50%",
            transform: "translateX(50%)",
            position: "fixed",
          }}
        >
          {!isOnMainPage && (
            <AiOutlineLeft
              className="progressBarClose"
              onClick={() => {
                setIsProgressBarOpen(false);
              }}
            />
          )}
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
      ) : console.log('hi1')
      // (
      //   <AnimatePresence>
      //     {!isOnMainPage && (
      //       <motion.div
      //         className="icon"
      //         initial={{ opacity: 0, x: "100%", y: "100%" }}
      //         animate={{ opacity: 1, x: "0%", y: "0%" }}
      //         exit={{ opacity: 0, x: "100%", y: "100%" }}
      //         style={{ position: "fixed", bottom: "5%", left: "5%" }}
      //       >
      //         <TfiLayoutSlider
      //           className="progressSideIcon"
      //           onClick={() => {
      //             setIsProgressBarOpen(true);
      //           }}
      //         />
      //       </motion.div>
      //     )}
      //   </AnimatePresence>
      // )
      }

      <ScrollBtn />
    </div>
  );
}
