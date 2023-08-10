import "./Buttons.scss";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";


function useSharedFunctionality() {
    const { darkTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        if (path) {
            navigate(path)
        }
    };
    return {
        darkTheme,
        handleButtonClick,
    };
}
export function PrimeryBtn({text, path = 0}) {
    const { darkTheme, handleButtonClick } = useSharedFunctionality();
    return (
        <motion.button
            className={`primeryBtn btn ${darkTheme ? "" : "light"}`}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.98 }}
            onClick={() => { handleButtonClick(path) }}
        >
            {text}
        </motion.button>
    );
}
export function SecondaryBtn({text, path = 0}) {
    const { darkTheme, handleButtonClick } = useSharedFunctionality();
    return (
        <motion.button
            className={`secondaryBtn btn ${darkTheme ? "" : "light"}`}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.98 }}
            onClick={() => { handleButtonClick(path) }}
        >
            {text}
        </motion.button>
    );
}
export function DangerBtn({text, path = 0}) {
    const { darkTheme, handleButtonClick } = useSharedFunctionality();
    return (
        <motion.button
            className={`DangerBtn btn ${darkTheme ? "" : "light"}`}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.98 }}
            onClick={() => { handleButtonClick(path) }}
        >
            {text}
        </motion.button>
    );
}
