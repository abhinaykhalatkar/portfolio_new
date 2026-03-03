import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./ProgressNav.scss";
import ScrollBtn from "./ScrollBtn";

export const navsData = [
  { Name: "00", Address: "/" },
  { Name: "01", Address: "/about" },
  { Name: "02", Address: "/skills" },
  { Name: "03", Address: "/projects" },
  { Name: "04", Address: "/contact" },
];

type ProgressNavProps = {
  endPosition: string;
};

export function ProgressNav({ endPosition }: ProgressNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [squash, setSquash] = useState(false);
  const [prevIndex, setPrevIndex] = useState(
    navsData.findIndex((item) => item.Address === location.pathname)
  );

  const activeNavLinkRef = useRef<HTMLSpanElement | null>(null);
  const squashTimerRef = useRef<number | null>(null);
  const [activeLinkWidth, setActiveLinkWidth] = useState(0);

  const {
    handleSetScrollDirection,
    setActiveIndex,
    isOnMainPage,
    isVerProgressBarOpen,
  } = usePageAnimationContext();

  useEffect(() => {
    if (activeNavLinkRef.current) {
      setActiveLinkWidth(activeNavLinkRef.current.offsetWidth);
    }
  }, [isOnMainPage, location.pathname]);

  useEffect(() => {
    if (isOnMainPage) {
      setSquash(true);
    }
  }, [isOnMainPage]);

  useEffect(() => {
    return () => {
      if (squashTimerRef.current !== null) {
        window.clearTimeout(squashTimerRef.current);
      }
    };
  }, []);

  const handleSquash = (event: React.MouseEvent<HTMLSpanElement>) => {
    const currentAddress = event.currentTarget.getAttribute("data-address") || "";
    const index = navsData.findIndex((item) => item.Address === currentAddress);

    if (!currentAddress || index === -1) {
      return;
    }

    setActiveIndex(index);
    navigate(currentAddress);

    handleSetScrollDirection(prevIndex >= index ? 1 : 0);
    setPrevIndex(index);

    setSquash(true);
    if (squashTimerRef.current !== null) {
      window.clearTimeout(squashTimerRef.current);
    }

    squashTimerRef.current = window.setTimeout(() => {
      setSquash(false);
      squashTimerRef.current = null;
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
        {navsData.map((item, index) => {
          const isActive = location.pathname === item.Address;
          return (
            <span
              key={`main-nav-${index}`}
              className={`NavLink ${isActive ? "NavActive" : ""}`}
              data-address={item.Address}
              onClick={handleSquash}
              ref={isActive ? activeNavLinkRef : null}
            >
              {item.Name}
            </span>
          );
        })}

        <motion.div
          className={`lavalamp ${squash ? "squash" : ""}`}
          animate={{
            x:
              navsData.findIndex((item) => item.Address === location.pathname) *
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
