import "./Home.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import { FaChevronDown } from "react-icons/fa";
import MyTimeline from "../../Components/MyTimeLine/MyTimeline";

export default function HomePage() {
  const { darkTheme } = useContext(ThemeContext);
  const {
    pageVariants,
    pageTransition,
    contentVariants,
    screenSize,
    setActiveIndex,
    handleSetScrollDirection,
  } = useContext(PageAnimationContext);
  const navigate = useNavigate();

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
        <BouncyText name_class="home-heading" text="Full-Stack  Software" />
        <BouncyText name_class="home-heading home-heading2" text="Developer" />
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
        {screenSize < 480 ? null : (
          <motion.div
            className="next-page"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.5}
            variants={contentVariants}
            onClick={() => {
              handleSetScrollDirection(0);
              navigate("/about");
              setActiveIndex(1);
            }}
          >
            <div>About me</div>
            <FaChevronDown />
          </motion.div>
        )}
      </motion.div>
      {/* <motion.div
        className="TimeLineblock"
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={0.5}
        variants={contentVariants}
      >
        <MyTimeline/>
      </motion.div> */}
      {screenSize < 768 ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
