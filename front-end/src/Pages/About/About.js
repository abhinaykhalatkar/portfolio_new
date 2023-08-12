import "./About.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";

export default function AboutPage() {
  const { pageVariants, pageTransition, contentVariants2, screenSize } =
    useContext(PageAnimationContext);
  const { darkTheme } = useContext(ThemeContext);

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
              text={`Decoding the ${screenSize < 1000 ? "" : "Digital"}`}
            />
            <BouncyText
              text={`${screenSize < 1000 ? "Digital " : ""}Symphony`}
            />
          </div>
          <div className="heading-foot-text">
            Full-Stack Jedi / JavaScript Sorcerer / API Composer and React
            Fanboy
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
            Passionate about web development and also a bit into culinary arts,
            I excel in unraveling complex backend challenges and sculpting
            elegant frontend designs.
          </div>
          <div>
            Crafting seamless user experiences is my forte, guided by the mantra
            "In code we trust." This philosophy propels me toward ambitious
            projects, where each line of code becomes purposeful brushstrokes in
            a digital canvas.{" "}
          </div>
          <div>
            Just as flavors harmonize in cooking, ideas converge in code,
            transforming concepts into vibrant realities.
          </div>
        </motion.div>
      </div>
      {screenSize < 768 ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
