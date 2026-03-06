import "./Projects-home.scss";
import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import { SecondaryBtn } from "../../../Components/Buttons/Buttons";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import {
  getProjectAddressByIndex,
  normalizeProjectSectionCount,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import {
  getCaseStudies,
  type ResolvedCaseStudySummary,
} from "../../../content/portfolioCaseStudies";
import { useLocaleContext } from "../../../i18n/LocaleContext";

type CaseStudyCardProps = {
  caseStudy: ResolvedCaseStudySummary;
};

function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { t } = useLocaleContext();

  return (
    <article className="case-study-card">
      <div className="case-study-card-eyebrow">{t("projects.caseStudiesEyebrow")}</div>
      <h2 className="case-study-card-title">{caseStudy.title}</h2>
      <dl className="case-study-card-details">
        <div className="case-study-row">
          <dt>{t("projects.caseStudy.architecture")}</dt>
          <dd>{caseStudy.architecture}</dd>
        </div>
        <div className="case-study-row">
          <dt>{t("projects.caseStudy.delivery")}</dt>
          <dd>{caseStudy.deliveryModel}</dd>
        </div>
        <div className="case-study-row">
          <dt>{t("projects.caseStudy.stack")}</dt>
          <dd>{caseStudy.stack}</dd>
        </div>
        <div className="case-study-row">
          <dt>{t("projects.caseStudy.outcome")}</dt>
          <dd>{caseStudy.outcomeFocus}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function ProjectsHome() {
  const { darkTheme } = useThemeContext();
  const { locale, t } = useLocaleContext();
  const {
    horizontalScrollDirection,
    setHorizontalScrollDirection,
    subPageVariants,
    pageVariants,
    pageTransition,
    contentVariants,
    projectSectionCount,
    setActiveProjectIndex,
  } = usePageAnimationContext();

  const navigate = useNavigate();
  const caseStudies = getCaseStudies(locale);

  const enterProjectSections = useCallback(() => {
    const totalProjectSections = normalizeProjectSectionCount(projectSectionCount);
    const entryIndex = 0;
    setHorizontalScrollDirection(1);
    setActiveProjectIndex(entryIndex);
    navigate(getProjectAddressByIndex(entryIndex, totalProjectSections, locale));
  }, [
    locale,
    navigate,
    projectSectionCount,
    setActiveProjectIndex,
    setHorizontalScrollDirection,
  ]);

  useEffect(() => {
    setHorizontalScrollDirection(2);
  }, [setHorizontalScrollDirection]);

  return (
    <motion.div
      className={`p-Project-home ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={
        horizontalScrollDirection === 0 || horizontalScrollDirection === 1
          ? subPageVariants
          : pageVariants
      }
      transition={pageTransition}
    >
      <div className="project-page-content">
        <h1 className="sr-only">{t("projects.heading")}</h1>
        <BouncyText name_class="heading" text={t("projects.heading")} />

        <motion.div
          className="projects-overview"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.35}
          variants={contentVariants}
        >
          <p className="projects-overview-intro">{t("projects.overviewIntro")}</p>
          <p className="projects-overview-body">{t("projects.overviewBody")}</p>
        </motion.div>

        <motion.div
          className="projects-entry-cta"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          <SecondaryBtn text={t("buttons.openProjectSections")} on_Click={enterProjectSections} />
          <div className="projects-catalog-note">{t("projects.catalogHint")}</div>
        </motion.div>

        <motion.section
          className="case-studies-grid"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.65}
          variants={contentVariants}
          aria-label={t("projects.caseStudiesAria")}
        >
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </motion.section>
      </div>
    </motion.div>
  );
}
