import "./ProgressNav.scss";
import { AiOutlineRight, AiOutlineDoubleLeft } from "react-icons/ai";
import React, { useCallback, useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { navsData } from "./ProgressNav";

export default function ScrollBtn(curIndex) {
    const navigate =useNavigate()
    const location = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const { handleSetScrollDirection, activeIndex ,setActiveIndex} =
    useContext(PageAnimationContext);

    const handlePageNavigation =useCallback(()=>
{ 
        if (activeIndex >= 0 && activeIndex <= navsData.length) {
            if(activeIndex>=4){
                handleSetScrollDirection(1)
                navigate('/')
                setActiveIndex(0)
            }else{
                handleSetScrollDirection(0)
                navigate(navsData[activeIndex+1].Address)
                setActiveIndex(activeIndex+1)
                console.log(activeIndex,navsData[activeIndex+1].Address)
            }
           
        }
      
    },[activeIndex,handleSetScrollDirection,navigate,setActiveIndex])
// back to start bug on page 3 scroll
  return (
    <motion.div
      className={`c-ScrollBtn ${darkTheme ? "night" : ""}`}
      onClick={handlePageNavigation}
    >
      {activeIndex+1 < navsData.length ? (
        <div>
          <div>Scroll To Next</div>
          <AiOutlineRight />
        </div>
      ) : (
        <div>
          <AiOutlineDoubleLeft/>
          <div>Back To Start</div>
        </div>
      )}
    </motion.div>
  );
}
