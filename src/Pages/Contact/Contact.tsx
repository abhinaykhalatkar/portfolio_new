import "./Contact.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SocialIconsSection from "../../Components/Social-icons-section/Social-icons-section";

export default function ContactPage() {
  const { darkTheme } = useThemeContext();
  const { pageVariants, pageTransition, contentVariants } =
    usePageAnimationContext();

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
        <h1 className="sr-only">Contact Abhinay Khalatkar</h1>
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
            Need help with a senior full-stack build, architecture decision, or
            delivery acceleration using AI-assisted workflows? Let&apos;s connect.
            Contact me at{" "}
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
