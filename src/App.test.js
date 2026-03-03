import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App shell", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders core navigation links", async () => {
    render(<App />);
    expect(await screen.findByRole("link", { name: "HOME" })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: "ABOUT" })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: "CONTACT" })).toBeInTheDocument();
  });

  it("renders 404 navigation state on unknown route", async () => {
    window.history.pushState({}, "", "/does-not-exist");
    render(<App />);
    expect(await screen.findByTitle("404")).toBeInTheDocument();
  });

  it("supports deep-link project routes", async () => {
    window.history.pushState({}, "", "/projects/project-1");
    render(<App />);
    expect(
      await screen.findByRole("link", { name: /github profile/i })
    ).toBeInTheDocument();
  });
});
