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
import { useLocaleContext } from "../../../i18n/LocaleContext";

type ProjectSectionPageProps = {
  sectionNumber: number;
};

export default function ProjectSectionPage({
  sectionNumber,
}: ProjectSectionPageProps) {
  const { darkTheme } = useThemeContext();
  const { localizePath, t } = useLocaleContext();
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
          {`${t("projectSection.headingPrefix")} ${String(normalizedSectionNumber).padStart(2, "0")}`}
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
            text={`${t("projectSection.headingPrefix")} ${String(normalizedSectionNumber).padStart(2, "0")}`}
          />
        </motion.div>

        <motion.div
          className="project-section-helper"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          <p>{t("projectSection.helper")}</p>
          <p>{t("projectSection.helperSecondary")}</p>
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
            sectionLabel={`${t("projects.section")} ${normalizedSectionNumber}`}
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
          <SecondaryBtn text={t("buttons.contactMe")} path="/contact" />
          <NavLink to={localizePath("/projects")} className="catalogue-link">
            <div
              onClick={() => {
                setActiveProjectIndex(0);
                setHorizontalScrollDirection(0);
              }}
            >
              <div>{t("buttons.backToProjects")}</div>
              <AiOutlineRight />
            </div>
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
