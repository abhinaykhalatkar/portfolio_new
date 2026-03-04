export type TimelineEntryType = "experience" | "education";

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
