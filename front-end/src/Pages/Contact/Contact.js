import "./Contact.scss";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { PageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SocialIconsSection from "../../Components/Social-icons-section/Social-icons-section";

export default function ContactPage() {
  const { darkTheme } = useContext(ThemeContext);
  const { pageVariants, pageTransition, contentVariants } =
    useContext(PageAnimationContext);

  return (
    <motion.div
      className={`p-Contact ${darkTheme ? "" : "light"}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="contact-container-Out">
        <BouncyText name_class="contact-heading" text={"Contact"} />
        <div className="contact-container">
          <motion.div
            className="contact-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1}
            variants={contentVariants}
          >
            Got questions or a project idea? With a software developer at your
            fingertips, I'm here to assist. Let's connect and explore
            possibilities. contact at
            <a href="mailto:abhinaykhalatkar@gmail.com">
              abhinaykhalatkar@gmail.com
            </a>
          </motion.div>
          <SocialIconsSection />
        </div>
      </div>
    </motion.div>
  );
}
