import "./Home.scss";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import { FaChevronDown } from "react-icons/fa";
import HomeTimeline from "./components/HomeTimeline";

export default function HomePage() {
  const { darkTheme } = useThemeContext();
  const {
    pageVariants,
    pageTransition,
    contentVariants,
    screenSize,
    setActiveIndex,
    handleSetScrollDirection,
  } = usePageAnimationContext();
  const navigate = useNavigate();

  return (
    <motion.div
      className={`p-Home ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <motion.div
        className="content-block"
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={0.5}
        variants={contentVariants}
      >
        <h1 className="sr-only">Senior Full-Stack Software Developer</h1>
        <BouncyText name_class="home-heading" text="Senior Full-Stack" />
        <BouncyText name_class="home-heading home-heading2" text="Software Developer" />
        <motion.div
          className="heading-para"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          Senior engineer with 10+ years of experience designing and shipping
          scalable web platforms. I build React and Next.js applications with
          Craft CMS, TypeScript, and robust backend APIs, combining system
          design rigor, test-driven development, and agentic AI workflows with
          Copilot and Codex.
        </motion.div>
        {screenSize < 480 ? null : (
          <motion.div
            className="next-page"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.5}
            variants={contentVariants}
            onClick={() => {
              handleSetScrollDirection(0);
              navigate("/about");
              setActiveIndex(1);
            }}
          >
            <div>About me</div>
            <FaChevronDown />
          </motion.div>
        )}
      </motion.div>
      <HomeTimeline darkTheme={darkTheme} />
    </motion.div>
  );
}
