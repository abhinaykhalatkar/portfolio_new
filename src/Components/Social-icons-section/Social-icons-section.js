import "./Social-icons-section.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import { BsGit, BsLinkedin, BsWhatsapp, BsInstagram } from "react-icons/bs";
import BouncyText from "../Bouncy-text/BouncyText";

export default function SocialIconsSection() {
  const { darkTheme } = useContext(ThemeContext);
  const { contentVariants2 } = useContext(PageAnimationContext);
  const contactBtnData = [
    {
      name: "Git",
      icon: <BsGit className={`fa fa-Git`} />,
      link: "https://github.com/abhinaykhalatkar",
    },
    {
      name: "LinkedIn",
      icon: <BsLinkedin className={`fa fa-LinkedIn`} />,
      link: "https://www.linkedin.com/in/abhinay-khalatkar/",
    },
    {
      name: "Whatsapp",
      icon: <BsWhatsapp className={`fa fa-Whatsapp`} />,
      link: "https://wa.me/+4917677947889",
    },
    {
      name: "Instagram",
      icon: <BsInstagram className={`fa fa-Instagram`} />,
      link: "https://www.instagram.com/abhinaykhalatkar/",
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
                  rel="noreferrer"
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
          text={"Let's Get Social"}
        />
      </motion.div>
    </div>
  );
}
