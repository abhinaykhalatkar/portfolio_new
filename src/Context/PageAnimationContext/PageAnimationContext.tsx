import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Variants } from "framer-motion";
import { projectsNavData } from "../../Components/ProgressNav/VerticalProgressNav";

export type PageAnimationContextValue = {
  // navigation / page state
  scrollDirection: number;
  setScrollDirection: React.Dispatch<React.SetStateAction<number>>;
  handleSetScrollDirection: (val: number) => void;

  horizontalScrollDirection: number;
  setHorizontalScrollDirection: React.Dispatch<React.SetStateAction<number>>;

  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;

  activeProjectIndex: number;
  setActiveProjectIndex: React.Dispatch<React.SetStateAction<number>>;

  screenSize: number;

  isVerProgressBarOpen: boolean;
  setIsVerProgressBarOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isOnMainPage: boolean;
  setIsOnMainPage: React.Dispatch<React.SetStateAction<boolean>>;

  isOnNotFound404Page: boolean;
  setIsOnNotFound404Page: React.Dispatch<React.SetStateAction<boolean>>;

  // animation variants
  pageVariants: Variants;
  subPageVariants: Variants;
  contentVariants: Variants;
  contentVariants2: Variants;
  pageTransition: {
    duration: number;
    type: string;
    ease: string;
  };
};

export const PageAnimationContext = createContext<PageAnimationContextValue | null>(null);

export function usePageAnimationContext(): PageAnimationContextValue {
  const ctx = useContext(PageAnimationContext);
  if (!ctx) {
    throw new Error(
      "usePageAnimationContext must be used within <PageAnimationProvider>"
    );
  }
  return ctx;
}

export function PageAnimationProvider(props: { children?: ReactNode }) {
  const [scrollDirection, setScrollDirection] = useState(0);
  const [horizontalScrollDirection, setHorizontalScrollDirection] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(
    projectsNavData.length - 1
  );
  const [screenSize, setScreenSize] = useState(1000);
  const [isVerProgressBarOpen, setIsVerProgressBarOpen] = useState(false);
  const [isOnMainPage, setIsOnMainPage] = useState(true);
  const [isOnNotFound404Page, setIsOnNotFound404Page] = useState(false);

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
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.3,
        ease: customEase,
        duration: 1,
      },
    }),
  };

  const contentVariants2: Variants = {
    hidden: { opacity: 0, x: "20%" },
    visible: (i: number) => ({
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

  function handleSetScrollDirection(val: number) {
    setScrollDirection(val);
  }

  const value = useMemo<PageAnimationContextValue>(
    () => ({
      scrollDirection,
      setScrollDirection,
      handleSetScrollDirection,
      horizontalScrollDirection,
      setHorizontalScrollDirection,
      activeIndex,
      setActiveIndex,
      activeProjectIndex,
      setActiveProjectIndex,
      screenSize,
      isVerProgressBarOpen,
      setIsVerProgressBarOpen,
      isOnMainPage,
      setIsOnMainPage,
      isOnNotFound404Page,
      setIsOnNotFound404Page,
      pageVariants,
      subPageVariants,
      contentVariants,
      contentVariants2,
      pageTransition,
    }),
    [
      activeIndex,
      activeProjectIndex,
      contentVariants,
      contentVariants2,
      horizontalScrollDirection,
      isOnMainPage,
      isOnNotFound404Page,
      isVerProgressBarOpen,
      pageTransition,
      pageVariants,
      screenSize,
      scrollDirection,
      subPageVariants,
    ]
  );

  return (
    <PageAnimationContext.Provider value={value}>
      {props.children}
    </PageAnimationContext.Provider>
  );
}
