import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WhatsOnMyMindPage from "./WhatsOnMyMind";

vi.mock("framer-motion", () => {
  const MockMotion = ({ children, ...rest }: { children?: ReactNode }) => (
    <div {...rest}>{children}</div>
  );
  const motion = new Proxy({}, { get: () => MockMotion });
  return {
    motion,
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

vi.mock("../../Context/ThemeContext/ThemeContext", () => ({
  useThemeContext: () => ({ darkTheme: true }),
}));

vi.mock("../../Context/PageAnimationContext/PageAnimationContext", () => ({
  usePageAnimationContext: () => ({
    pageVariants: {},
    pageTransition: {},
    contentVariants: {},
  }),
}));

vi.mock("../../i18n/LocaleContext", () => ({
  useLocaleContext: () => ({
    locale: "en",
    t: (key: string) => key,
    localizePath: (path: string) => path,
  }),
}));

const CONSENT_KEY = "portfolio-whats-on-my-mind-consent";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
  vi.useRealTimers();
});

describe("WhatsOnMyMind consent gate", () => {
  it("shows the consent dialog and renders no iframe before consent is given", () => {
    render(<WhatsOnMyMindPage />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "whatsOnMyMind.consentAccept" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "whatsOnMyMind.consentDecline" })
    ).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("mounts the iframe with src=https://doordarshi.de only after the user accepts", () => {
    render(<WhatsOnMyMindPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "whatsOnMyMind.consentAccept" })
    );

    const iframe = document.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toBe("https://doordarshi.de");
    expect(iframe?.getAttribute("sandbox")).toContain("allow-scripts");
    expect(iframe?.getAttribute("title")).toBe("whatsOnMyMind.iframeTitle");
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders the placeholder card and never mounts an iframe after Decline", () => {
    render(<WhatsOnMyMindPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "whatsOnMyMind.consentDecline" })
    );

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("declined");
    expect(document.querySelector("iframe")).toBeNull();
    expect(screen.getByText("whatsOnMyMind.placeholderTitle")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "whatsOnMyMind.reconsider" })
    ).toBeInTheDocument();
  });

  it("re-opens the consent dialog from the placeholder when the user reconsiders", () => {
    render(<WhatsOnMyMindPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "whatsOnMyMind.consentDecline" })
    );
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "whatsOnMyMind.reconsider" })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("loads the iframe directly without showing the dialog when consent is already accepted", () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");

    render(<WhatsOnMyMindPage />);

    expect(screen.queryByRole("dialog")).toBeNull();
    const iframe = document.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toBe("https://doordarshi.de");
  });

  it("renders the placeholder without a dialog when consent is already declined", () => {
    window.localStorage.setItem(CONSENT_KEY, "declined");

    render(<WhatsOnMyMindPage />);

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.querySelector("iframe")).toBeNull();
    expect(screen.getByText("whatsOnMyMind.placeholderTitle")).toBeInTheDocument();
  });

  it("focuses the Accept button when the dialog opens", () => {
    render(<WhatsOnMyMindPage />);
    const accept = screen.getByRole("button", {
      name: "whatsOnMyMind.consentAccept",
    });
    expect(document.activeElement).toBe(accept);
  });

  it("traps Tab focus inside the dialog (cycles between Accept and Decline)", () => {
    render(<WhatsOnMyMindPage />);
    const accept = screen.getByRole("button", {
      name: "whatsOnMyMind.consentAccept",
    });
    const decline = screen.getByRole("button", {
      name: "whatsOnMyMind.consentDecline",
    });

    expect(document.activeElement).toBe(accept);

    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(accept);

    decline.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(accept);

    accept.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(decline);
  });

  it("swaps to the blocked-fallback card when the iframe never finishes loading", () => {
    vi.useFakeTimers();
    window.localStorage.setItem(CONSENT_KEY, "accepted");

    render(<WhatsOnMyMindPage />);
    expect(document.querySelector("iframe")).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(document.querySelector("iframe")).toBeNull();
    expect(screen.getByText("whatsOnMyMind.blockedTitle")).toBeInTheDocument();
  });
});
