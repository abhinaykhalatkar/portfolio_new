import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMessages, type MessageKey } from "./messages";
import {
  DEFAULT_LOCALE,
  getPreferredLocale,
  isLocalizablePath,
  parseLocaleFromPath,
  stripLocalePrefix,
  switchLocaleForCurrentPath,
  toPublicLocalizedPath,
  type Locale,
  writeStoredLocale,
} from "./localeRoutes";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  localizePath: (path: string) => string;
  t: (key: MessageKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within <LocaleProvider>");
  }

  return context;
}

export function LocaleProvider(props: { children?: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const detectedLocale = parseLocaleFromPath(location.pathname);
  const locale = detectedLocale ?? getPreferredLocale() ?? DEFAULT_LOCALE;

  useEffect(() => {
    writeStoredLocale(locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => {
    const dictionary = getMessages(locale);

    return {
      locale,
      setLocale: (nextLocale: Locale) => {
        writeStoredLocale(nextLocale);
        navigate(switchLocaleForCurrentPath(location.pathname, nextLocale));
      },
      localizePath: (path: string) => {
        if (!isLocalizablePath(path)) {
          return path;
        }

        return toPublicLocalizedPath(stripLocalePrefix(path), locale);
      },
      t: (key: MessageKey) => dictionary[key],
    };
  }, [locale, location.pathname, navigate]);

  return <LocaleContext.Provider value={value}>{props.children}</LocaleContext.Provider>;
}
