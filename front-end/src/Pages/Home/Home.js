import "./Home.scss";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
export default function HomePage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants, pageTransition } = useContext(PageAnimationContext);
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
      <BouncyText
        name_class="home-heading"
        font_size="4rem"
        text="Full-Stack Software Developer"
      />
      {isMobile ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
