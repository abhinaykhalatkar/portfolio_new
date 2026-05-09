import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useThemeContext } from "./ThemeContext";

const STORAGE_KEY = "portfolio-theme";

function ThemeProbe({ onMount }: { onMount: (ctx: ReturnType<typeof useThemeContext>) => void }) {
  const ctx = useThemeContext();
  onMount(ctx);
  return null;
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("ThemeContext initialization", () => {
  it("falls back to dark when nothing is stored and the OS does not prefer light", () => {
    let captured: ReturnType<typeof useThemeContext> | null = null;
    render(
      <ThemeProvider>
        <ThemeProbe onMount={(c) => (captured = c)} />
      </ThemeProvider>
    );
    expect(captured?.darkTheme).toBe(true);
  });

  it("respects a stored 'light' preference even when the OS prefers dark", () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    let captured: ReturnType<typeof useThemeContext> | null = null;
    render(
      <ThemeProvider>
        <ThemeProbe onMount={(c) => (captured = c)} />
      </ThemeProvider>
    );
    expect(captured?.darkTheme).toBe(false);
  });

  it("uses prefers-color-scheme: light when nothing is stored", () => {
    const matchMediaSpy = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: light)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }));
    let captured: ReturnType<typeof useThemeContext> | null = null;
    render(
      <ThemeProvider>
        <ThemeProbe onMount={(c) => (captured = c)} />
      </ThemeProvider>
    );
    expect(captured?.darkTheme).toBe(false);
    matchMediaSpy.mockRestore();
  });

  it("persists toggle changes to localStorage", () => {
    let captured: ReturnType<typeof useThemeContext> | null = null;
    render(
      <ThemeProvider>
        <ThemeProbe onMount={(c) => (captured = c)} />
      </ThemeProvider>
    );

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");

    act(() => {
      captured?.toggleTheme();
    });

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
  });
});
