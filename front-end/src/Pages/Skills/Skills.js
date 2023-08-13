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
          custom={2}
          variants={contentVariants}
        >
          Transforming Challenges into Pathways for Achievement
        </motion.div>
        <motion.div
          className="Skills-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={4}
          variants={contentVariants}
        >
          <BouncyText text="Skills & Experience" />
        </motion.div>
        <motion.div
          className="skill-para-head"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={6}
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
          custom={8}
          variants={contentVariants}
        >
          Proficient in HTML, CSS, and JS, I specialize in crafting compact to
          midsize web applications using Vue or React. My repertoire extends to
          building custom plugins, dynamic features, engaging animations, and
          coding interactive layouts. Adding to this, my skill-set also includes
          a backend development experience in node.js, and I've experience with
          open-source CMS, Pimcore.
        </motion.div>
        <motion.div
          className="linkedInLink"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={10}
          variants={contentVariants}
        >
          Feel free to explore my LinkedIn for a more comprehensive overview of
          my skills and experiences.
        </motion.div>
        <SkillIconSection />
      </div>
    </motion.div>
  );
}
