import "./Skills.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SkillIconSection from "../../Components/Skills-icons-section/Skills-icons-section";
import { useLocaleContext } from "../../i18n/LocaleContext";

export default function SkillsPage() {
  const { darkTheme } = useThemeContext();
  const { t } = useLocaleContext();
  const { pageVariants, pageTransition, contentVariants } =
    usePageAnimationContext();

  return (
    <motion.div
      className={`p-Skills ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <h1 className="sr-only">{t("skills.heading")}</h1>
        <motion.div
          className="top-quote"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.1}
          variants={contentVariants}
        >
          {t("skills.topQuote")}
        </motion.div>
        <motion.div
          className="Skills-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.2}
          variants={contentVariants}
        > 
        <div className="Skills-heading1">
        <BouncyText text={t("skills.heading")} />
        </div>
          
        </motion.div>
        <motion.div
          className="skill-para-head"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants}
        >
          {t("skills.body.1")}
        </motion.div>
        <motion.div
          className="skill-para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          {t("skills.body.2")}
        </motion.div>
        <motion.div
          className="linkedInPara"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={3}
          variants={contentVariants}
        >
          {t("skills.linkedin.prefix")}{" "}
          <a
            className="linkedInLink"
            href="https://www.linkedin.com/in/abhinay-khalatkar/"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("buttons.linkedin")}
          </a>{" "}
          {t("skills.linkedin.suffix")}
        </motion.div>
        <SkillIconSection />
      </div>
    </motion.div>
  );
}
