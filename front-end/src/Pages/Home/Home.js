import "./Home.scss";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
export default function HomePage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants, pageTransition, contentVariants } =
    useContext(PageAnimationContext);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <BouncyText
          name_class="home-heading"

          text="Full-Stack Software Developer"
        />
        <motion.div
          className="heading-para"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          Crafting Complete Web Solutions with Expertise, Integrating Design to
          Create Seamless Experiences, Ensuring Data Integrity in Database
          Management, Efficiently Developing and Maintaining APIs, Creating
          User-Friendly Interfaces with Mastery ,Implementing Back-End Logic for
          Robust Applications
        </motion.div>
      </motion.div>
      {isMobile ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
