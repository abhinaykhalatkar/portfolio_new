import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Minimal smoke test: ensures the app renders without crashing.
// We avoid asserting specific route/page content because the app is animation-heavy
// and may change copy frequently.
describe("App", () => {
  it("renders a navigation element", () => {
    render(<App />);

    // The sidebar/navigation uses a <nav> element.
    const nav = screen.getByRole("navigation");
    expect(nav).not.toBeNull();
  });
});
