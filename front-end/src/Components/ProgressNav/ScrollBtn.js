import "./ProgressNav.scss";
import { AiOutlineRight, AiOutlineDoubleLeft } from "react-icons/ai";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { navsData } from "./ProgressNav";

export default function ScrollBtn() {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const { handleSetScrollDirection, activeIndex, setActiveIndex } =
    useContext(PageAnimationContext);

  const handlePageNavigation = useCallback(() => {
    if (activeIndex >= 0 && activeIndex <= navsData.length) {
      if (activeIndex >= 4) {
        handleSetScrollDirection(1);
        navigate("/");
        setActiveIndex(0);
      } else {
        handleSetScrollDirection(0);
        navigate(navsData[activeIndex + 1].Address);
        setActiveIndex(activeIndex + 1);
      }
    }
  }, [activeIndex, handleSetScrollDirection, navigate, setActiveIndex]);
  return (
    <motion.div
      className={`c-ScrollBtn ${darkTheme ? "night" : ""}`}
      onClick={handlePageNavigation}
    >
      {activeIndex < navsData.length - 1 ? (
        <div>
          <div>Scroll To Next</div>
          <AiOutlineRight />
        </div>
      ) : (
        <div>
          <AiOutlineDoubleLeft />
          <div>Back To Start</div>
        </div>
      )}
    </motion.div>
  );
}
