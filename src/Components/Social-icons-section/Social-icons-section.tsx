import "./Social-icons-section.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { useLocaleContext } from "../../i18n/LocaleContext";
import { BsGit, BsLinkedin } from "react-icons/bs";
import BouncyText from "../Bouncy-text/BouncyText";

export default function SocialIconsSection() {
  const { darkTheme } = useThemeContext();
  const { contentVariants2 } = usePageAnimationContext();
  const { t } = useLocaleContext();
  const contactBtnData = [
    {
      name: "Git",
      icon: <BsGit className={`fa fa-Git`} />,
      link: "https://github.com/abhinaykhalatkar",
    },
    {
      name: "LinkedIn",
      icon: <BsLinkedin className={`fa fa-LinkedIn`} />,
      link: "https://www.linkedin.com/in/abhinay-khalatkar",
    },
  ];

  return (
    <div className={`contact-btn-section ${darkTheme ? "" : "light"}`}>
      <div className="contact-container-Out">
        <ul>
          {contactBtnData.map((el, ind) => {
            return (
              <motion.li
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={ind * 0.2}
                variants={contentVariants2}
                key={ind}
              >
                <a
                  className={`${el.name} ${darkTheme ? "" : "light"}`}
                  href={el.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={el.name}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {el.icon}
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <motion.div
        className="exit-heading-contact-div"
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={0.8}
        variants={contentVariants2}
      >
        <BouncyText
          name_class="exit-heading-contact"
          text={t("social.heading")}
        />
      </motion.div>
    </div>
  );
}
