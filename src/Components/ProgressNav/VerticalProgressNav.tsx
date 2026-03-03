import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import "./VerticalProgressNav.scss";

export const PROJECTS_CATALOGUE_ALIAS = "/projects/project-catalogue";

export const projectsNavData = [
  { Name: "05", Address: "/projects/project-5" },
  { Name: "04", Address: "/projects/project-4" },
  { Name: "03", Address: "/projects/project-3" },
  { Name: "02", Address: "/projects/project-2" },
  { Name: "01", Address: "/projects/project-1" },
];

export function resolveProjectNavIndex(pathname: string): number {
  const directIndex = projectsNavData.findIndex((item) => item.Address === pathname);
  if (directIndex !== -1) {
    return directIndex;
  }

  if (pathname === PROJECTS_CATALOGUE_ALIAS) {
    return 0;
  }

  return -1;
}

type VerticalProgressNavProps = {
  setEndPosition: React.Dispatch<React.SetStateAction<string>>;
  endPosition: string;
};

export function VerticalProgressNav({
  setEndPosition,
  endPosition,
}: VerticalProgressNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [squash, setSquash] = useState(false);
  const currentIndex = resolveProjectNavIndex(location.pathname);

  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const activeNavLinkRef = useRef<HTMLSpanElement | null>(null);
  const squashTimerRef = useRef<number | null>(null);
  const [activeVerLinkWidth, setActiveVerLinkWidth] = useState(0);

  const { setActiveProjectIndex, setHorizontalScrollDirection, isOnMainPage } =
    usePageAnimationContext();

  useEffect(() => {
    if (activeNavLinkRef.current) {
      setActiveVerLinkWidth(activeNavLinkRef.current.offsetWidth);
    }
  }, [currentIndex, isOnMainPage]);

  useEffect(() => {
    if (!isOnMainPage) {
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
    const index = resolveProjectNavIndex(currentAddress);

    if (!currentAddress || index === -1) {
      return;
    }

    setActiveProjectIndex(index);
    navigate(currentAddress);

    setHorizontalScrollDirection(prevIndex >= index ? 0 : 1);
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

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const xPositionValue =
        windowWidth < 1000
          ? 67
          : windowWidth < 1200
          ? 63
          : windowWidth < 1600
          ? 60
          : windowWidth < 2500
          ? 57
          : 53;
      setEndPosition(`${xPositionValue}vw`);
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
        {projectsNavData.map((item, index) => {
          const isActive = currentIndex === index;
          return (
            <span
              key={`project-nav-${index}`}
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
          className={`lavalamp1 ${squash ? "squash" : ""}`}
          animate={{
            x:
              currentIndex === -1
                ? 0
                : currentIndex * activeVerLinkWidth - activeVerLinkWidth * 2,
            width: activeVerLinkWidth,
            opacity: currentIndex === -1 ? 0 : 1,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
