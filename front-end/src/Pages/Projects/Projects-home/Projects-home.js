import "./Projects-home.scss";
import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../../Components/Bouncy-text/BouncyText";
import { AiOutlineRight } from "react-icons/ai";

export default function ProjectsHome() {
  const { darkTheme } = useContext(ThemeContext);
  const {
    horizontalScrollDirection,
    setHorizontalScrollDirection,
    subPageVariants,
    pageVariants,
    pageTransition,
    contentVariants,
  } = useContext(PageAnimationContext);

  useEffect(() => {
    setHorizontalScrollDirection(2);
  }, [setHorizontalScrollDirection]);
  return (
    <motion.div
      className={`p-Project-home ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={
        horizontalScrollDirection === 0 || horizontalScrollDirection === 1
          ? subPageVariants
          : pageVariants
      }
      transition={pageTransition}
    >
      <div className="project-page-content">
        <BouncyText name_class="heading" text="Portfolio & Previous Projects" />
        <motion.div
          className="para-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.5}
          variants={contentVariants}
        >
          I've worked on various projects, both within professional settings and
          during my university journey. Explore a selection of these endeavors
          on my{" "}
          <a
            className="gitLink"
            href="https://github.com/abhinaykhalatkar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile
          </a>
          . Should you seek further insights into my portfolio beyond what's
          presented here, feel free to
          <Link className="contactLink" to={"/contact"}>
            {" "}
            reach out and Connect !
          </Link>
        </motion.div>
        <NavLink to="project-catalogue" className="catalogue-link">
          <div
            onClick={() => {
              setHorizontalScrollDirection(0);
            }}
          >
            <div>Projects catalogue </div>
            <AiOutlineRight />
          </div>
        </NavLink>
      </div>
    </motion.div>
  );
}
