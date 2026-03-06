import { useEffect, useMemo, useState } from "react";
import type { Locale } from "../../../i18n/localeRoutes";
import {
  resolveLocalizedText,
  type LocalizedText,
  type TimelineEntry,
  type TimelineEntryRecord,
  type TimelineEntryType,
  type TimelineLoadState,
} from "./timelineTypes";

const timelineCache = new Map<string, TimelineEntryRecord[]>();
const inflightTimeline = new Map<string, Promise<TimelineEntryRecord[]>>();

function isTimelineEntryType(value: unknown): value is TimelineEntryType {
  return value === "experience" || value === "education";
}

function isLocalizedObject(value: unknown): value is { en: string; de: string } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.en === "string" && typeof candidate.de === "string";
}

function normalizeLocalizedText(value: unknown): LocalizedText | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (isLocalizedObject(value)) {
    return {
      en: value.en.trim(),
      de: value.de.trim(),
    };
  }

  return null;
}

function normalizeLocalizedSkillList(value: unknown): LocalizedText[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const skills = value
    .map((entry) => normalizeLocalizedText(entry))
    .filter((entry): entry is LocalizedText => entry !== null);

  return skills.length > 0 ? skills : undefined;
}

function normalizeTimelineEntry(
  value: unknown,
  fallbackIndex: number
): TimelineEntryRecord | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Record<keyof TimelineEntryRecord, unknown>>;
  const title = normalizeLocalizedText(candidate.title);
  const organization = normalizeLocalizedText(candidate.organization);
  const description = normalizeLocalizedText(candidate.description);

  if (
    title === null ||
    organization === null ||
    description === null ||
    typeof candidate.start !== "string" ||
    candidate.start.trim().length === 0
  ) {
    return null;
  }

  const type: TimelineEntryType = isTimelineEntryType(candidate.type)
    ? candidate.type
    : "experience";
  const id =
    typeof candidate.id === "string" && candidate.id.trim().length > 0
      ? candidate.id.trim()
      : `timeline-${fallbackIndex}`;
  const end =
    typeof candidate.end === "string" && candidate.end.trim().length > 0
      ? candidate.end.trim().toLowerCase()
      : "present";
  const location = normalizeLocalizedText(candidate.location);
  const link =
    typeof candidate.link === "string" && candidate.link.trim().length > 0
      ? candidate.link.trim()
      : undefined;
  const skills = normalizeLocalizedSkillList(candidate.skills);

  return {
    id,
    type,
    title,
    organization,
    start: candidate.start.trim(),
    end,
    location: location ?? undefined,
    description,
    link,
    skills,
  };
}

function resolveTimelineEntry(
  entry: TimelineEntryRecord,
  locale: Locale
): TimelineEntry {
  return {
    id: entry.id,
    type: entry.type,
    title: resolveLocalizedText(entry.title, locale),
    organization: resolveLocalizedText(entry.organization, locale),
    start: entry.start,
    end: entry.end,
    location: entry.location
      ? resolveLocalizedText(entry.location, locale)
      : undefined,
    description: resolveLocalizedText(entry.description, locale),
    link: entry.link,
    skills: entry.skills?.map((skill) => resolveLocalizedText(skill, locale)),
  };
}

function getSortableDateValue(raw: string): number {
  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }
  const yearMatch = raw.match(/\d{4}/);
  if (!yearMatch) {
    return Number.MIN_SAFE_INTEGER;
  }
  return Number(yearMatch[0]) * 10_000;
}

async function fetchTimelineItems(sourceUrl: string): Promise<TimelineEntryRecord[]> {
  const response = await fetch(sourceUrl, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Timeline feed error: ${response.status} ${response.statusText}`);
  }

  const raw = (await response.json()) as unknown;
  const rawItems = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as { items?: unknown }).items)
      ? ((raw as { items: unknown[] }).items as unknown[])
      : [];

  return rawItems
    .map((entry, index) => normalizeTimelineEntry(entry, index))
    .filter((entry): entry is TimelineEntryRecord => entry !== null)
    .sort((first, second) => getSortableDateValue(second.start) - getSortableDateValue(first.start));
}

function getCachedState(sourceUrl: string, locale: Locale): TimelineLoadState {
  const cached = timelineCache.get(sourceUrl);
  if (!cached) {
    return { status: "idle", items: [] };
  }

  return {
    status: "success",
    items: cached.map((entry) => resolveTimelineEntry(entry, locale)),
  };
}

export function getTimelineSourceUrl(): string {
  const configured = import.meta.env.VITE_TIMELINE_SOURCE_URL;
  if (typeof configured === "string" && configured.trim().length > 0) {
    return configured.trim();
  }
  return "/data/linkedin-timeline.json";
}

export function useTimelineFeed(
  sourceUrl: string = getTimelineSourceUrl(),
  locale: Locale = "en"
): TimelineLoadState {
  const [state, setState] = useState<TimelineLoadState>(() =>
    getCachedState(sourceUrl, locale)
  );

  useEffect(() => {
    const cached = timelineCache.get(sourceUrl);
    if (cached) {
      setState({
        status: "success",
        items: cached.map((entry) => resolveTimelineEntry(entry, locale)),
      });
      return;
    }

    setState((previous) =>
      previous.status === "loading" ? previous : { status: "loading", items: previous.items }
    );

    let request = inflightTimeline.get(sourceUrl);
    if (!request) {
      request = fetchTimelineItems(sourceUrl);
      inflightTimeline.set(sourceUrl, request);
    }

    let isMounted = true;
    request
      .then((items) => {
        timelineCache.set(sourceUrl, items);
        if (!isMounted) {
          return;
        }
        setState({
          status: "success",
          items: items.map((entry) => resolveTimelineEntry(entry, locale)),
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }
        const message =
          error instanceof Error ? error.message : "Failed to load timeline feed.";
        setState({ status: "error", items: [], message });
      })
      .finally(() => {
        if (inflightTimeline.get(sourceUrl) === request) {
          inflightTimeline.delete(sourceUrl);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [locale, sourceUrl]);

  return useMemo(() => state, [state]);
}
