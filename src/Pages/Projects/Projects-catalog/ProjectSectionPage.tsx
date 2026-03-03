import "./ProjectSectionPage.scss";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import {
  projectsNavData,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import GitRepoCarousel from "../shared/GitRepoCarousel";
import { getGithubUsername, useGithubRepos } from "../shared/githubRepos";

type ProjectSectionPageProps = {
  sectionNumber: 1 | 2 | 3 | 4 | 5;
};

export default function ProjectSectionPage({
  sectionNumber,
}: ProjectSectionPageProps) {
  const { darkTheme } = useThemeContext();
  const {
    setIsVerProgressBarOpen,
    pageVariants,
    subPageVariants,
    contentVariants,
    isOnMainPage,
    setHorizontalScrollDirection,
    setActiveProjectIndex,
  } = usePageAnimationContext();

  useEffect(() => {
    setIsVerProgressBarOpen(!isOnMainPage);
  }, [setIsVerProgressBarOpen, isOnMainPage]);

  const githubUsername = getGithubUsername();
  const repoState = useGithubRepos(githubUsername);

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
          <BouncyText
            name_class="heading"
            text={`PROJECT ${String(sectionNumber).padStart(2, "0")}`}
          />
        </motion.div>

        <motion.div
          className="project-section-subtitle"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          Discover live GitHub repositories in an infinite carousel. Scroll to
          move between project sections.
        </motion.div>

        <motion.div
          className="project-section-carousel"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.55}
          variants={contentVariants}
        >
          <GitRepoCarousel
            repoState={repoState}
            githubUsername={githubUsername}
            darkTheme={darkTheme}
            initialIndex={sectionNumber - 1}
            sectionLabel={`Section ${sectionNumber}`}
          />
        </motion.div>

        <motion.div
          className="catalogue-link-div"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.75}
          variants={contentVariants}
        >
          <NavLink to="/projects" className="catalogue-link">
            <div
              onClick={() => {
                setActiveProjectIndex(projectsNavData.length - 1);
                setHorizontalScrollDirection(0);
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
