import { useEffect, useState } from "react";
import type { TimelineEntry, TimelineEntryType, TimelineLoadState } from "./timelineTypes";

const timelineCache = new Map<string, TimelineEntry[]>();
const inflightTimeline = new Map<string, Promise<TimelineEntry[]>>();

function isTimelineEntryType(value: unknown): value is TimelineEntryType {
  return value === "experience" || value === "education";
}

function normalizeTimelineEntry(value: unknown, fallbackIndex: number): TimelineEntry | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<TimelineEntry>;
  if (
    typeof candidate.title !== "string" ||
    typeof candidate.organization !== "string" ||
    typeof candidate.start !== "string" ||
    typeof candidate.description !== "string"
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
      ? candidate.end.trim()
      : "Present";
  const location =
    typeof candidate.location === "string" && candidate.location.trim().length > 0
      ? candidate.location.trim()
      : undefined;
  const link =
    typeof candidate.link === "string" && candidate.link.trim().length > 0
      ? candidate.link.trim()
      : undefined;
  const skills = Array.isArray(candidate.skills)
    ? candidate.skills.filter((entry): entry is string => typeof entry === "string")
    : undefined;

  return {
    id,
    type,
    title: candidate.title.trim(),
    organization: candidate.organization.trim(),
    start: candidate.start.trim(),
    end,
    location,
    description: candidate.description.trim(),
    link,
    skills: skills && skills.length > 0 ? skills : undefined,
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

async function fetchTimelineItems(sourceUrl: string): Promise<TimelineEntry[]> {
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

  const items = rawItems
    .map((entry, index) => normalizeTimelineEntry(entry, index))
    .filter((entry): entry is TimelineEntry => entry !== null)
    .sort((first, second) => getSortableDateValue(second.start) - getSortableDateValue(first.start));

  return items;
}

function getCachedState(sourceUrl: string): TimelineLoadState {
  const cached = timelineCache.get(sourceUrl);
  if (!cached) {
    return { status: "idle", items: [] };
  }
  return { status: "success", items: cached };
}

export function getTimelineSourceUrl(): string {
  const configured = import.meta.env.VITE_TIMELINE_SOURCE_URL;
  if (typeof configured === "string" && configured.trim().length > 0) {
    return configured.trim();
  }
  return "/data/linkedin-timeline.json";
}

export function useTimelineFeed(
  sourceUrl: string = getTimelineSourceUrl()
): TimelineLoadState {
  const [state, setState] = useState<TimelineLoadState>(() => getCachedState(sourceUrl));

  useEffect(() => {
    const cached = timelineCache.get(sourceUrl);
    if (cached) {
      setState({ status: "success", items: cached });
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
        setState({ status: "success", items });
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
  }, [sourceUrl]);

  return state;
}
