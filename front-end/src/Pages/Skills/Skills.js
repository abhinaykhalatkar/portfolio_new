import "./Skills.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SkillIconSection from "../../Components/Skills-icons-section/Skills-icons-section";

export default function SkillsPage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants, pageTransition, contentVariants } =
    useContext(PageAnimationContext);

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
        <motion.div
          className="top-quote"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.1}
          variants={contentVariants}
        >
          Transforming Challenges into Pathways for Achievement
        </motion.div>
        <motion.div
          className="Skills-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.2}
          variants={contentVariants}
        >
          <BouncyText text="Skills & Experience" />
        </motion.div>
        <motion.div
          className="skill-para-head"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants}
        >
          My primary domain of expertise lies in front-end development, the
          dynamic client side of the web.
        </motion.div>
        <motion.div
          className="skill-para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          Proficient in JavaScript, I specialize in crafting responsive,
          user-friendly web applications using Vue or React. My expertise
          extends to building custom plugins, dynamic features, engaging
          animations, and coding interactive layouts. Adding to this, my skill
          set also includes backend development experience in node.js, and I
          have experience with the open-source CMS, Pimcore.
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
            rel="noreferrer"
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
