import "./Projects-catalogue.scss";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";

export default function ProjectscataloguePage() {
  const { darkTheme } = useContext(ThemeContext);
  const {
    setIsVerProgressBarOpen,
    pageVariants,
    subPageVariants,
    contentVariants,
    isOnMainPage,
    setHorizontalScrollDirection,
    setActiveProjectIndex,
  } = useContext(PageAnimationContext);
  //0-down 1-up

  useEffect(() => {
    setIsVerProgressBarOpen(!isOnMainPage);
  }, [setIsVerProgressBarOpen, isOnMainPage]);
  return (
    <motion.div
      className={`p-Project-catalogue ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={subPageVariants}
      transition={pageVariants}
    >
      <div className="project-page-content">
        <motion.div
          className="heading-div"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.2}
          variants={contentVariants}
        >
          <BouncyText name_class="heading" text="Catalogue Coming" />
        </motion.div>

        <motion.div
          className="heading-div"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          <BouncyText name_class="heading" text="Soon" />
        </motion.div>

        <motion.div
          className="para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.6}
          variants={contentVariants}
        >
          Currently in the process of curating a catalogue section to feature
          some of my standout projects for your exploration. In the meantime,
          feel welcome to navigate my GitHub repositories at your convenience.
          <div className="gitLink-div">
            <a
              className="gitLink"
              href="https://github.com/abhinaykhalatkar?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
            </a>
            <AiOutlineRight />
          </div>
        </motion.div>
        <motion.div
          className="catalogue-link-div"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.8}
          variants={contentVariants}
        >
          <NavLink to="/projects" className="catalogue-link">
            <div
              onClick={() => {
                setActiveProjectIndex(4);
                setHorizontalScrollDirection(1);
              }}
            >
              <div>Back to Projects</div>
              <AiOutlineRight />
            </div>
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
