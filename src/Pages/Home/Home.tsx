import "./Home.scss";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import HomeTimeline from "./components/HomeTimeline";
import { useLocaleContext } from "../../i18n/LocaleContext";

const MOBILE_TIMELINE_BREAKPOINT = 900;

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

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const isMobileTimeline = screenSize <= MOBILE_TIMELINE_BREAKPOINT;

  useEffect(() => {
    if (!isMobileTimeline) {
      setIsTimelineOpen(false);
    }
  }, [isMobileTimeline]);

  useEffect(() => {
    if (!isTimelineOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTimelineOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [isTimelineOpen]);

  useEffect(() => {
    if (!isTimelineOpen) {
      return;
    }

    const panel = window.document.getElementById("home-timeline-drawer");
    panel?.focus();
  }, [isTimelineOpen]);

  return (
    <motion.div
      className={`p-Home ${darkTheme ? "" : "light"}`}
      data-wheel-lock="true"
      data-wheel-axis="y"
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
        <motion.p
          className="home-tagline"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.4}
          variants={contentVariants}
        >
          {t("home.tagline")}
        </motion.p>
        <motion.p
          className="heading-para"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          {t("home.intro")}
        </motion.p>
        <motion.div
          className="home-stats"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.6}
          variants={contentVariants}
        >
          <div className="home-stat">
            <strong className="home-stat-value">{t("home.stats.1.value")}</strong>
            <span className="home-stat-label">{t("home.stats.1.label")}</span>
          </div>
          <div className="home-stat">
            <strong className="home-stat-value">{t("home.stats.2.value")}</strong>
            <span className="home-stat-label">{t("home.stats.2.label")}</span>
          </div>
          <div className="home-stat">
            <strong className="home-stat-value">{t("home.stats.3.value")}</strong>
            <span className="home-stat-label">{t("home.stats.3.label")}</span>
          </div>
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

      {isMobileTimeline ? (
        <>
          <button
            type="button"
            className="timeline-toggle-btn"
            aria-controls="home-timeline-drawer"
            aria-expanded={isTimelineOpen}
            onClick={() => setIsTimelineOpen((previous) => !previous)}
          >
            <AiOutlineCalendar />
            {t("timeline.drawerToggle")}
          </button>

          <AnimatePresence>
            {isTimelineOpen ? (
              <motion.div
                className="timeline-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onClick={() => setIsTimelineOpen(false)}
              >
                <HomeTimeline
                  darkTheme={darkTheme}
                  variant="drawer"
                  panelId="home-timeline-drawer"
                  onClose={() => setIsTimelineOpen(false)}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      ) : (
        <HomeTimeline darkTheme={darkTheme} />
      )}
    </motion.div>
  );
}
