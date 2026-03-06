import "./Home.scss";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import { FaChevronDown } from "react-icons/fa";
import HomeTimeline from "./components/HomeTimeline";
import { useLocaleContext } from "../../i18n/LocaleContext";

export default function HomePage() {
  const { darkTheme } = useThemeContext();
  const { localizePath, t } = useLocaleContext();
  const {
    pageVariants,
    pageTransition,
    contentVariants,
    screenSize,
    setActiveIndex,
    handleSetScrollDirection,
  } = usePageAnimationContext();
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
        <h1 className="sr-only">
          {`${t("home.heading.line1")} ${t("home.heading.line2")}`}
        </h1>
        <BouncyText name_class="home-heading" text={t("home.heading.line1")} />
        <BouncyText
          name_class="home-heading home-heading2"
          text={t("home.heading.line2")}
        />
        <motion.div
          className="heading-para"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          {t("home.intro")}
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
              navigate(localizePath("/about"));
              setActiveIndex(1);
            }}
          >
            <div>{t("buttons.aboutMe")}</div>
            <FaChevronDown />
          </motion.div>
        )}
      </motion.div>
      <HomeTimeline darkTheme={darkTheme} />
    </motion.div>
  );
}
