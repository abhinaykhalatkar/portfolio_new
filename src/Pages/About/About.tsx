import "./About.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";

export default function AboutPage() {
  const { pageVariants, pageTransition, contentVariants2, screenSize } =
    usePageAnimationContext();
  const { darkTheme } = useThemeContext();

  return (
    <motion.div
      className={`p-About ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="about-content">
        <h1 className="sr-only">About Abhinay Khalatkar</h1>
        <motion.div
          className="content-block-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants2}
        >
          <div className="about-heading">
            <BouncyText text="Hi, I'm Abhinay." />
            <BouncyText
              text={`Decoding the ${screenSize < 1114 ? "" : "Digital"}`}
            />
            <BouncyText
              text={`${screenSize < 1114 ? "Digital " : ""}Symphony`}
            />
          </div>
          <div className={`heading-foot-text ${darkTheme ? "" : "light"}`}>
            Senior Full-Stack Engineer / System Design Practitioner / Craft CMS
            and React Specialist
          </div>
        </motion.div>
        <motion.div
          className="sidePara"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.8}
          variants={contentVariants2}
        >
          <div>
            I design and deliver production-ready web systems from architecture
            to deployment, balancing business outcomes with clean engineering
            execution.
          </div>
          <div>
            My core focus is scalable system design, maintainable full-stack
            implementation, and high-quality delivery through testing discipline
            and stable CI-ready workflows.
          </div>
          <div>
            I actively use agentic AI tools like Copilot and Codex to accelerate
            delivery while keeping strong engineering standards, code quality,
            and long-term maintainability.
          </div>
        </motion.div>
      </div>
      {screenSize < 768 ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
