import React from "react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Minimal smoke test: ensures the app renders without crashing.
// We avoid asserting specific route/page content because the app is animation-heavy
// and may change copy frequently.
describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {}))
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders a navigation element", () => {
    render(<App />);

    // Sidebar nav and the top progress-nav are both <nav> landmarks now.
    // We just need at least one.
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });
});
