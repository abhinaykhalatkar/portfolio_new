import "./ProgressNav.scss";
import { AiOutlineRight, AiOutlineDoubleLeft } from "react-icons/ai";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { navsData } from "./ProgressNav";
import { useLocaleContext } from "../../i18n/LocaleContext";

export default function ScrollBtn() {
  const navigate = useNavigate();
  const { darkTheme } = useThemeContext();
  const { localizePath, t } = useLocaleContext();
  const {
    handleSetScrollDirection,
    activeIndex,
    setActiveIndex,
    isOnNotFound404Page,
  } = usePageAnimationContext();

  const handlePageNavigation = useCallback(() => {
    if (activeIndex >= 0 && activeIndex <= navsData.length) {
      if (activeIndex >= navsData.length - 1) {
        handleSetScrollDirection(1);
        navigate(localizePath("/"));
        setActiveIndex(0);
      } else {
        handleSetScrollDirection(0);
        navigate(localizePath(navsData[activeIndex + 1].Address));
        setActiveIndex(activeIndex + 1);
      }
    }
  }, [activeIndex, handleSetScrollDirection, localizePath, navigate, setActiveIndex]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePageNavigation();
    }
  };

  const label =
    activeIndex < navsData.length - 1 && !isOnNotFound404Page
      ? t("scroll.next")
      : isOnNotFound404Page
      ? t("scroll.backHome")
      : t("scroll.backStart");

  return (
    <motion.div
      className={`c-ScrollBtn ${darkTheme ? "night" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={handlePageNavigation}
      onKeyDown={handleKeyDown}
    >
      {activeIndex < navsData.length - 1 && !isOnNotFound404Page ? (
        <div>
          <div>{t("scroll.next")}</div>
          <AiOutlineRight aria-hidden="true" />
        </div>
      ) : (
        <div>
          <AiOutlineDoubleLeft aria-hidden="true" />
          <div>{isOnNotFound404Page ? t("scroll.backHome") : t("scroll.backStart")} </div>
        </div>
      )}
    </motion.div>
  );
}
