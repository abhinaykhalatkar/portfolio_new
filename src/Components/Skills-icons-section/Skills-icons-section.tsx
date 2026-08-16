import "./Skills-icons-section.scss";
import React from "react";
import { motion } from "framer-motion";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import type { IconType } from "react-icons";
import { FaAws, FaPhp } from "react-icons/fa";
import { RiCopilotLine } from "react-icons/ri";
import {
  SiCraftcms,
  SiCypress,
  SiGraphql,
  SiHetzner,
  SiJest,
  SiNextdotjs,
  SiOpenai,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import dockerIcon from "../../Assets/skills-icons/docker.svg";
import gitIcon from "../../Assets/skills-icons/git.svg";
import mysqlIcon from "../../Assets/skills-icons/mysql.svg";
import nodejsIcon from "../../Assets/skills-icons/node-js.svg";
import reactIcon from "../../Assets/skills-icons/react.svg";
import bootStrapIcon from "../../Assets/skills-icons/bootstrap.svg";
import { useLocaleContext } from "../../i18n/LocaleContext";
import type { MessageKey } from "../../i18n/messages";

type SkillIconEntry = {
  title: string;
  iconSrc?: string;
  Icon?: IconType;
};

type SkillGroup = {
  titleKey: MessageKey;
  items: SkillIconEntry[];
};

const skillGroups: SkillGroup[] = [
  {
    titleKey: "skills.group.frontend",
    items: [
      { iconSrc: reactIcon, title: "React 18" },
      { Icon: SiNextdotjs, title: "Next.js" },
      { Icon: SiTypescript, title: "TypeScript (strict)" },
      { Icon: SiTailwindcss, title: "Tailwind CSS" },
      { iconSrc: bootStrapIcon, title: "Bootstrap" },
      { title: "Redux Toolkit" },
      { title: "SCSS" },
      { title: "MUI" },
    ],
  },
  {
    titleKey: "skills.group.backend",
    items: [
      { Icon: FaPhp, title: "PHP 8" },
      { iconSrc: nodejsIcon, title: "Node.js" },
      { Icon: SiGraphql, title: "GraphQL" },
      { title: "REST APIs" },
      { title: "Craft Commerce" },
      { title: "Yii2 modules" },
      { title: "Twig" },
      { title: "Server-Sent Events" },
    ],
  },
  {
    titleKey: "skills.group.cmsData",
    items: [
      { Icon: SiCraftcms, title: "Craft CMS 5" },
      { title: "PIMCORE" },
      { iconSrc: mysqlIcon, title: "MySQL" },
      { title: "Firebase" },
    ],
  },
  {
    titleKey: "skills.group.testing",
    items: [
      { Icon: SiJest, title: "Jest" },
      { Icon: SiCypress, title: "Cypress (E2E)" },
      { title: "pytest" },
      { title: "TDD" },
      { title: "Regression fixtures" },
      { title: "Pre-push quality gates" },
    ],
  },
  {
    titleKey: "skills.group.devopsSecurity",
    items: [
      { iconSrc: gitIcon, title: "Git" },
      { iconSrc: dockerIcon, title: "Docker" },
      { title: "CI/CD pipelines" },
      { title: "Apache hardening" },
      { title: "Linux administration" },
      { title: "rsync deployments" },
      { Icon: SiHetzner, title: "Hetzner" },
      { Icon: FaAws, title: "AWS" },
      { title: "Webpack" },
    ],
  },
  {
    titleKey: "skills.group.aiLlm",
    items: [
      { title: "Ollama" },
      { Icon: SiOpenai, title: "LLM orchestration & routing" },
      { title: "Multi-agent pipelines" },
      { title: "Schema-validated output" },
      { Icon: RiCopilotLine, title: "GitHub Copilot" },
      { title: "OpenAI Codex" },
    ],
  },
  {
    titleKey: "skills.group.practices",
    items: [
      { title: "System design" },
      { title: "Software architecture" },
      { title: "Performance (SSR/CSR)" },
      { title: "Technical SEO" },
      { title: "GDPR-by-design" },
      { title: "Release management" },
    ],
  },
];

export default function SkillIconSection() {
  const { contentVariants } = usePageAnimationContext();
  const { t } = useLocaleContext();

  return (
    <div
      className="skills-icons-section"
      data-wheel-lock="true"
      data-wheel-axis="y"
    >
      {skillGroups.map((group, groupIndex) => (
        <section className="skill-group" key={group.titleKey}>
          <motion.h2
            className="skill-group-title"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={groupIndex * 0.15}
            variants={contentVariants}
          >
            {t(group.titleKey)}
          </motion.h2>
          <div className="skill-group-items">
            {group.items.map((el, ind) => {
              const Glyph = el.Icon;
              return (
                <motion.div
                  className="icon-container"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={groupIndex * 0.15 + ind * 0.05}
                  variants={contentVariants}
                  key={`${el.title}-${ind}`}
                >
                  {el.iconSrc ? (
                    <img
                      className="icons"
                      src={el.iconSrc}
                      alt={`${el.title} icon`}
                    />
                  ) : Glyph ? (
                    <Glyph className="icons icon-glyph" aria-hidden="true" />
                  ) : null}
                  <p>{el.title}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
