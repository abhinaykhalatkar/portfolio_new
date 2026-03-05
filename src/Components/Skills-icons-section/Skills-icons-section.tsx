import "./Skills-icons-section.scss";
import React from "react";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import { RiCopilotLine } from "react-icons/ri";
import {
  SiCraftcms,
  SiHetzner,
  SiOpenai,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import dockerIcon from "../../Assets/skills-icons/docker.svg";
import gitIcon from "../../Assets/skills-icons/git.svg";
import googleIcon from "../../Assets/skills-icons/google.svg";
import mysqlIcon from "../../Assets/skills-icons/mysql.svg";
import nodejsIcon from "../../Assets/skills-icons/node-js.svg";
import reactIcon from "../../Assets/skills-icons/react.svg";
import bootStrapIcon from "../../Assets/skills-icons/bootstrap.svg";
import mongodbIcon from "../../Assets/skills-icons/mongodb.svg";

type SkillIconEntry = {
  title: string;
  iconSrc?: string;
  Icon?: IconType;
};

export default function SkillIconSection() {
  const { contentVariants } = usePageAnimationContext();
  const iconsArray: SkillIconEntry[] = [
    { Icon: SiTypescript, title: "TypeScript" },
    { iconSrc: reactIcon, title: "React" },
    { iconSrc: nodejsIcon, title: "Node.js" },
    { Icon: SiTailwindcss, title: "Tailwind CSS" },
    { iconSrc: gitIcon, title: "Git" },
    { Icon: SiCraftcms, title: "Craft CMS" },
    { iconSrc: mongodbIcon, title: "Mongo DB" },
    { iconSrc: bootStrapIcon, title: "Bootstrap" },
    { iconSrc: dockerIcon, title: "Docker" },
    { Icon: FaAws, title: "AWS" },
    { Icon: SiHetzner, title: "Hetzner" },
    { Icon: RiCopilotLine, title: "GitHub Copilot" },
    { Icon: SiOpenai, title: "Agentic Workflows" },
    { iconSrc: googleIcon, title: "From Search to LLMs" },
    { iconSrc: mysqlIcon, title: "MySQL" },
  ];

  return (
    <div className="skills-icons-section">
      {iconsArray.map((el, ind) => {
        const Glyph = el.Icon;
        return (
          <motion.div
            className="icon-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={ind * 0.2}
            variants={contentVariants}
            key={`${el.title}-${ind}`}
          >
            {el.iconSrc ? (
              <img className="icons" src={el.iconSrc} alt={`${el.title} icon`} />
            ) : Glyph ? (
              <Glyph className="icons icon-glyph" aria-hidden="true" />
            ) : null}
            <p>{el.title}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
