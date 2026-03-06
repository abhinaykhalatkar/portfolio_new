import "./Buttons.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { useLocaleContext } from "../../i18n/LocaleContext";

type ButtonPath = string | 0 | null | undefined;

type PrimaryBtnProps = {
  text: string;
  path?: ButtonPath;
  icon?: React.ReactNode;
};

type SecondaryBtnProps = {
  text: string;
  path?: ButtonPath;
  on_Click?: (() => void) | null;
};

type DangerBtnProps = {
  text: string;
  path?: ButtonPath;
};

function useSharedFunctionality() {
  const { darkTheme } = useThemeContext();
  const { localizePath } = useLocaleContext();
  const navigate = useNavigate();

  const handleButtonClick = (path: ButtonPath) => {
    if (typeof path === "string" && path.length) {
      navigate(localizePath(path));
    }
  };
  return {
    darkTheme,
    handleButtonClick,
  };
}
export function PrimeryBtn({ text, path = 0, icon }: PrimaryBtnProps) {
  const { darkTheme, handleButtonClick } = useSharedFunctionality();
  return (
    <motion.button
      className={`primeryBtn btn ${darkTheme ? "" : "light"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        handleButtonClick(path);
      }}
    >
      {icon}
      {text}
    </motion.button>
  );
}
export function SecondaryBtn({ text, path = 0, on_Click = null }: SecondaryBtnProps) {
  const { darkTheme, handleButtonClick } = useSharedFunctionality();
  return (
    <motion.button
      className={`secondaryBtn btn ${darkTheme ? "" : "light"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        handleButtonClick(path);
        on_Click?.();
      }}
    >
      {text}
    </motion.button>
  );
}
export function DangerBtn({ text, path = 0 }: DangerBtnProps) {
  const { darkTheme, handleButtonClick } = useSharedFunctionality();
  return (
    <motion.button
      className={`DangerBtn btn ${darkTheme ? "" : "light"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        handleButtonClick(path);
      }}
    >
      {text}
    </motion.button>
  );
}
