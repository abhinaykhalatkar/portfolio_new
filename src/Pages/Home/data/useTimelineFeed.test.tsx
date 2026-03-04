import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimelineFeed } from "./useTimelineFeed";

describe("useTimelineFeed", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("transitions from loading to success", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [
            {
              id: "entry-1",
              type: "experience",
              title: "Engineer",
              organization: "Acme",
              start: "2024-01",
              end: "Present",
              description: "Building software systems",
              skills: ["React"],
            },
          ],
        }),
        { status: 200 }
      )
    );

    const { result } = renderHook(() => useTimelineFeed("/timeline-success.json"));
    expect(["idle", "loading", "success"]).toContain(result.current.status);

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].title).toBe("Engineer");
  });

  it("returns error when feed request fails", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(
      new Response("Not Found", {
        status: 404,
        statusText: "Not Found",
      })
    );

    const { result } = renderHook(() => useTimelineFeed("/timeline-error.json"));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.message).toContain("Timeline feed error");
    }
  });

  it("handles empty feed response", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ items: [] }), { status: 200 })
    );

    const { result } = renderHook(() => useTimelineFeed("/timeline-empty.json"));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
    expect(result.current.items).toHaveLength(0);
  });
});
