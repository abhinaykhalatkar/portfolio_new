import "./Skills.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";

export default function SkillsPage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants,pageTransition } = useContext(PageAnimationContext);

  return (
    <motion.div
      className={`p-Skills ${darkTheme ? "" : "light"}`}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Hey from SKills</h1>
      <p>This is your awesome HomePage subtitle</p>
    </motion.div>
  );
}
