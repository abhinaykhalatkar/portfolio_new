import "./About.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import AnimatedLogo from "../../Components/logoAnimated/AnimatedLogo";
import { SecondaryBtn } from "../../Components/Buttons/Buttons";
import { useLocaleContext } from "../../i18n/LocaleContext";

export default function AboutPage() {
  const { pageVariants, pageTransition, contentVariants2, screenSize } =
    usePageAnimationContext();
  const { darkTheme } = useThemeContext();
  const { t } = useLocaleContext();

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
        <h1 className="sr-only">{t("nav.about")}</h1>
        <motion.div
          className="content-block-heading"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants2}
        >
          <div className="about-heading">
            <BouncyText text={t("about.heading.line1")} />
            <BouncyText text={t("about.heading.line2")} />
            <BouncyText text={t("about.heading.line3")} />
          </div>
          <div className={`heading-foot-text ${darkTheme ? "" : "light"}`}>
            {t("about.foot")}
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
          <p>{t("about.body.1")}</p>
          <p>{t("about.body.2")}</p>
          <p>{t("about.body.3")}</p>
          <div className="about-languages">
            <h2 className="about-languages-heading">
              {t("about.languages.heading")}
            </h2>
            <ul className="about-languages-list">
              <li>{t("about.languages.english")}</li>
              <li>{t("about.languages.german")}</li>
              <li>{t("about.languages.hindi")}</li>
              <li>{t("about.languages.marathi")}</li>
            </ul>
          </div>
          <div className="about-skills-cta">
            <SecondaryBtn text={t("about.skillsCta")} path="/skills" />
          </div>
        </motion.div>
      </div>
      {screenSize < 768 ? null : <AnimatedLogo name_class="logoBack" />}
    </motion.div>
  );
}
