import type { Locale } from "../../../i18n/localeRoutes";

export type TimelineEntryType = "experience" | "education";

export type LocalizedText = string | { en: string; de: string };

export type TimelineEntryRecord = {
  id: string;
  type: TimelineEntryType;
  title: LocalizedText;
  organization: LocalizedText;
  start: string;
  end: string;
  location?: LocalizedText;
  description: LocalizedText;
  link?: string;
  skills?: LocalizedText[];
};

export type TimelineEntry = {
  id: string;
  type: TimelineEntryType;
  title: string;
  organization: string;
  start: string;
  end: string;
  location?: string;
  description: string;
  link?: string;
  skills?: string[];
};

export type TimelineLoadState =
  | { status: "idle" | "loading"; items: TimelineEntry[] }
  | { status: "success"; items: TimelineEntry[] }
  | { status: "error"; items: TimelineEntry[]; message: string };

export function resolveLocalizedText(value: LocalizedText, locale: Locale): string {
  if (typeof value === "string") {
    return value;
  }

  return value[locale] ?? value.en;
}
