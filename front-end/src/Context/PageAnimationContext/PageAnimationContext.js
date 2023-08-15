import React, { useState, useEffect, createContext } from "react";
export const PageAnimationContext = createContext();

export function PageAnimationProvider(props) {
  const [scrollDirection, setScrollDirection] = useState(0);
  const [horizontalScrollDirection, setHorizontalScrollDirection] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState(1000);
  const [isProgressBarOpen, setIsProgressBarOpen] = useState(true);
  const [isOnMainPage, setIsOnMainPage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setScreenSize(screenWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: scrollDirection ? "100%" : "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: scrollDirection ? "-100%" : "100%",
      transition: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
  };
  const subPageVariants = {
    initial: {
      opacity: 0,
      y: horizontalScrollDirection === 0 ? "-100%" : "100%",
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: horizontalScrollDirection === 0 ? "100%" : "-100%",
      transition: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
  };
  const customEase = [0.4, 0.0, 0.2, 1];
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.3,
        ease: customEase,
        duration: 1,
      },
    }),
  };

  const contentVariants2 = {
    hidden: { opacity: 0, x: "20%" },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3 + 0.3,
        ease: customEase,
        duration: 0.6,
      },
    }),
  };

  const pageTransition = {
    duration: 0.5,
    type: "tween",
    ease: "easeInOut",
  };
  function handleSetScrollDirection(val) {
    setScrollDirection(val);
  }

  return (
    <PageAnimationContext.Provider
      value={{
        horizontalScrollDirection,
        setHorizontalScrollDirection,
        subPageVariants,
        screenSize,
        contentVariants2,
        handleSetScrollDirection,
        pageVariants,
        pageTransition,
        activeIndex,
        setActiveIndex,
        contentVariants,
        isProgressBarOpen,
        setIsProgressBarOpen,
        setIsOnMainPage,
        isOnMainPage,
      }}
    >
      {props.children}
    </PageAnimationContext.Provider>
  );
}
