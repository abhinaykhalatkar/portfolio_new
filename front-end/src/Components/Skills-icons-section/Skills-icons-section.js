import "./Skills-icons-section.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import dockerIcon from "../../Assets/skills-icons/docker.svg";
import figmaIcon from "../../Assets/skills-icons/figma.svg";
import gitIcon from "../../Assets/skills-icons/git.svg";
import googleIcon from "../../Assets/skills-icons/google.svg";
import javascriptIcon from "../../Assets/skills-icons/javascript.svg";
import mysqlIcon from "../../Assets/skills-icons/mysql.svg";
import nodejsIcon from "../../Assets/skills-icons/node-js.svg";
import reactIcon from "../../Assets/skills-icons/react.svg";
import sassIcon from "../../Assets/skills-icons/sass.svg";
import vscodeIcon from "../../Assets/skills-icons/vs-code.svg";
import vueIcon from "../../Assets/skills-icons/vue.svg";
import bootStrapIcon from "../../Assets/skills-icons/bootstrap.svg";
import firebaseIcon from "../../Assets/skills-icons/firebase.svg";
import mongodbIcon from "../../Assets/skills-icons/mongodb.svg";

export default function SkillIconSection() {
  const { contentVariants } = useContext(PageAnimationContext);
  const iconsArray = [
    { icon: javascriptIcon, title: "JavaScript" },
    { icon: reactIcon, title: "React" },
    { icon: nodejsIcon, title: "Node.js" },
    { icon: vueIcon, title: "Vue" },
    { icon: gitIcon, title: "Git" },
    { icon: mongodbIcon, title: "Mongo DB" },
    { icon: firebaseIcon, title: "Firebase" },
    { icon: sassIcon, title: "Sass" },
    { icon: bootStrapIcon, title: "Bootstrap" },
    { icon: dockerIcon, title: "Docker" },
    { icon: figmaIcon, title: "Figma" },
    { icon: googleIcon, title: "How to Google" },
    { icon: mysqlIcon, title: "mySql" },
    { icon: vscodeIcon, title: "VS Code" },
  ];

  return (
    <div className="skills-icons-section">
      {iconsArray.map((el, ind) => {
        return (
          <motion.div
            className="icon-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={ind*0.2}
            variants={contentVariants}
            key={ind}
          >
            <img  className="icons" src={el.icon} alt="github" />
            <p>{el.title}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
