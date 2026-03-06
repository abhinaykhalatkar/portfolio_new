import React from "react";
import { motion } from "framer-motion";
import { useLocaleContext } from "../../i18n/LocaleContext";
import type { Locale } from "../../i18n/localeRoutes";
import "./LanguageSwitcher.scss";

type LanguageSwitcherProps = {
  compact?: boolean;
};

const locales: Locale[] = ["en", "de"];

export default function LanguageSwitcher({
  compact = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocaleContext();

  return (
    <div
      className={`language-switcher ${compact ? "compact" : ""}`}
      role="group"
      aria-label={t("language.switcherAria")}
    >
      {locales.map((entry) => {
        const isActive = entry === locale;
        return (
          <motion.button
            key={entry}
            type="button"
            className={`language-switcher-btn ${isActive ? "active" : ""}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocale(entry)}
            aria-pressed={isActive}
          >
            {entry === "en" ? t("language.en") : t("language.de")}
          </motion.button>
        );
      })}
    </div>
  );
}
