import "./ProjectSectionPage.scss";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import { SecondaryBtn } from "../../../Components/Buttons/Buttons";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import {
  normalizeProjectSectionCount,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import GitRepoCarousel from "../shared/GitRepoCarousel";
import { getGithubUsername, useGithubRepos } from "../shared/githubRepos";
import { getCaseStudyBySection } from "../../../content/portfolioCaseStudies";

type ProjectSectionPageProps = {
  sectionNumber: number;
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
    projectSectionCount,
    setProjectSectionCount,
    setHorizontalScrollDirection,
    setActiveProjectIndex,
  } = usePageAnimationContext();

  useEffect(() => {
    setIsVerProgressBarOpen(!isOnMainPage);
  }, [setIsVerProgressBarOpen, isOnMainPage]);

  const githubUsername = getGithubUsername();
  const repoState = useGithubRepos(githubUsername);
  const totalSections = normalizeProjectSectionCount(
    Math.max(projectSectionCount, sectionNumber)
  );
  const normalizedSectionNumber = Math.min(
    Math.max(sectionNumber, 1),
    totalSections
  );
  const caseStudy = getCaseStudyBySection(normalizedSectionNumber);
  const subtitleText = caseStudy
    ? `Case Study: ${caseStudy.title}. ${caseStudy.architecture} ${caseStudy.deliveryModel} ${caseStudy.outcomeFocus}`
    : "Additional architecture implementation section covering full-stack platform design, infrastructure hardening, and delivery governance patterns.";

  useEffect(() => {
    if (sectionNumber > projectSectionCount) {
      setProjectSectionCount((previous) =>
        normalizeProjectSectionCount(Math.max(previous, sectionNumber))
      );
    }
  }, [projectSectionCount, sectionNumber, setProjectSectionCount]);

  useEffect(() => {
    if (repoState.status !== "success") return;

    setProjectSectionCount((previous) =>
      Math.max(previous, normalizeProjectSectionCount(repoState.repos.length))
    );
  }, [repoState, setProjectSectionCount]);

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
        <h1 className="sr-only">
          Project Section {String(normalizedSectionNumber).padStart(2, "0")}
        </h1>
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
            text={`PROJECT ${String(normalizedSectionNumber).padStart(2, "0")}`}
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
          {subtitleText}
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
            initialIndex={normalizedSectionNumber - 1}
            sectionLabel={`Section ${normalizedSectionNumber}`}
          />
        </motion.div>

        <motion.div
          className="project-section-actions"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.75}
          variants={contentVariants}
        >
          <SecondaryBtn text="Contact Me" path="/contact" />
          <NavLink to="/projects" className="catalogue-link">
            <div
              onClick={() => {
                setActiveProjectIndex(0);
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
