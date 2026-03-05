import "./Skills.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SkillIconSection from "../../Components/Skills-icons-section/Skills-icons-section";

export default function SkillsPage() {
  const { darkTheme } = useThemeContext();
  const { pageVariants, pageTransition, contentVariants } =
    usePageAnimationContext();

  return (
    <motion.div
      className={`p-Skills ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <h1 className="sr-only">Skills and Experience</h1>
        <motion.div
          className="top-quote"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.1}
          variants={contentVariants}
        >
          Engineering Scalable Products with Delivery Rigor
        </motion.div>
        <motion.div
          className="Skills-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.2}
          variants={contentVariants}
        > 
        <div className="Skills-heading1">
        <BouncyText text="Skills & Experience" />
        </div>
          
        </motion.div>
        <motion.div
          className="skill-para-head"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants}
        >
          I lead end-to-end delivery across frontend, backend, and platform
          layers with a system-design-first mindset and production ownership.
        </motion.div>
        <motion.div
          className="skill-para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          My stack centers on TypeScript, React, Node.js, Tailwind CSS, Craft
          CMS, and infrastructure-aware delivery across Hetzner and AWS
          environments. I have shifted from search-first debugging to LLM-first
          engineering with GitHub Copilot, Codex, and agentic workflows, while
          keeping test-driven development and delivery reliability as hard
          constraints.
        </motion.div>
        <motion.div
          className="linkedInPara"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={3}
          variants={contentVariants}
        >
          Feel free to explore my{" "}
          <a
            className="linkedInLink"
            href="https://www.linkedin.com/in/abhinay-khalatkar/"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>{" "}
          for a more comprehensive overview of my skills and experiences.
        </motion.div>
        <SkillIconSection />
      </div>
    </motion.div>
  );
}
