import "./Home.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import logo from "../../Assets/logoAK.svg";

export default function HomePage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants,pageTransition } = useContext(PageAnimationContext);

  return (
    <motion.div
      className={`p-Home ${darkTheme ? "" : "light"}`}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Hey from HomePage</h1>
      <img src={logo} alt="hi"/>
    </motion.div>
  );
}
