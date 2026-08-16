import "./Resume.scss";
import React from "react";
import { motion } from "framer-motion";
import { MdFileDownload } from "react-icons/md";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { usePageAnimationContext } from "../../Context/PageAnimationContext/PageAnimationContext";
import BouncyText from "../../Components/Bouncy-text/BouncyText";
import { PrimeryBtn } from "../../Components/Buttons/Buttons";
import { useLocaleContext } from "../../i18n/LocaleContext";

const RESUME_PDF_PATH = "/RESUME-Abhinay_Khalatkar.pdf";
const MOBILE_EMBED_BREAKPOINT = 768;

export default function ResumePage() {
  const { darkTheme } = useThemeContext();
  const { t } = useLocaleContext();
  const { pageVariants, pageTransition, contentVariants, screenSize } =
    usePageAnimationContext();

  // Mobile browsers claim inline-PDF support but render one page or nothing;
  // below the breakpoint the download card IS the experience.
  const showInlinePreview = screenSize > MOBILE_EMBED_BREAKPOINT;

  const fallbackCard = (
    <div className="resume-fallback">
      <h2 className="resume-fallback-title">{t("resume.fallbackTitle")}</h2>
      <p className="resume-fallback-body">{t("resume.fallbackBody")}</p>
    </div>
  );

  return (
    <motion.div
      className={`p-Resume ${darkTheme ? "" : "light"}`}
      data-wheel-lock="true"
      data-wheel-axis="y"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="resume-content">
        <h1 className="sr-only">{t("resume.heading")}</h1>
        <BouncyText name_class="resume-heading" text={t("resume.heading")} />
        <motion.p
          className="resume-note"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.3}
          variants={contentVariants}
        >
          {t("resume.updatedNote")}
        </motion.p>
        <motion.div
          className="resume-actions"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.45}
          variants={contentVariants}
        >
          <PrimeryBtn
            text={t("resume.download")}
            path={RESUME_PDF_PATH}
            icon={<MdFileDownload />}
          />
        </motion.div>
        <motion.div
          className="resume-viewer"
          data-wheel-lock="true"
          data-wheel-axis="y"
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0.6}
          variants={contentVariants}
        >
          {showInlinePreview ? (
            <object
              className="resume-embed"
              data={`${RESUME_PDF_PATH}#view=FitH`}
              type="application/pdf"
              aria-label={t("resume.previewTitle")}
            >
              {fallbackCard}
            </object>
          ) : (
            fallbackCard
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
