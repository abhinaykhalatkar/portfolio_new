import "./Contact.scss";
import React from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import SocialIconsSection from "../../Components/Social-icons-section/Social-icons-section";
import { useLocaleContext } from "../../i18n/LocaleContext";

export default function ContactPage() {
  const { darkTheme } = useThemeContext();
  const { t } = useLocaleContext();
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
        <h1 className="sr-only">{t("contact.heading")}</h1>
        <BouncyText name_class="contact-heading" text={t("contact.heading")} />
        <div className="contact-container">
          <motion.p
            className="contact-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1}
            variants={contentVariants}
          >
            {t("contact.body")}{" "}
            <a href="mailto:abhinaykhalatkar@gmail.com">
              abhinaykhalatkar@gmail.com
            </a>
          </motion.p>
          <motion.section
            className="contact-extended"
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1.2}
            variants={contentVariants}
          >
            <h2 className="contact-subheading">{t("contact.intro.heading")}</h2>
            <p className="contact-subbody">{t("contact.intro.body")}</p>
            <h2 className="contact-subheading">{t("contact.process.heading")}</h2>
            <p className="contact-subbody">{t("contact.process.body")}</p>
            <p className="contact-locale-note">{t("contact.locale.note")}</p>
          </motion.section>
          <SocialIconsSection />
        </div>
      </div>
    </motion.div>
  );
}
