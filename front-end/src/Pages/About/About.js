import './About.scss';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from '../../Context/PageAnimationContext/PageAnimationContext';

export default function AboutPage() {
  const { pageVariants,pageTransition } = useContext(PageAnimationContext);
  const { darkTheme } = useContext(ThemeContext);


  return (
    <motion.div
      className={`p-About ${darkTheme ? "" : "light"}`}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Hey from the About Page</h1>
      <p>About abhinay</p>
    </motion.div>
  );
}
