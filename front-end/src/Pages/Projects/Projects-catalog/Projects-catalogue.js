import "./Projects-catalogue.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";

export default function ProjectscataloguePage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants, subPageVariants ,setHorizontalScrollDirection} = useContext(PageAnimationContext);
 

  return (
    <motion.div
      className={`p-Project-catalogue ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={subPageVariants}
      transition={pageVariants}
    >
      <div className="project-page-content">
        <BouncyText
          name_class="heading"
          text="Catalog Coming"
        />
        <BouncyText
          name_class="heading"
          text="Soon"
        />
        <motion.div className="para-content">
          Currently in the process of curating a catalog section to feature some
          of my standout projects for your exploration. In the meantime, feel
          welcome to navigate my GitHub repositories at your convenience.
          <div className="gitLink-div">
            <a className="gitLink"
              href="https://github.com/abhinaykhalatkar"
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
             
            </a>
            <AiOutlineRight />
          </div>
        </motion.div>
        <NavLink to="/projects" className="catalogue-link">
          <div onClick={()=>{
            setHorizontalScrollDirection(1)
          }}>
            <div>Back to Projects</div>
            <AiOutlineRight />
          </div>
        </NavLink>
      </div>
    </motion.div>
  );
}
