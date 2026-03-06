import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrimeryBtn } from "./Buttons";

const navigateMock = vi.fn();
const windowOpenMock = vi.fn();

vi.mock("framer-motion", () => {
  const MockMotion = ({
    children,
    whileHover: _whileHover,
    whileTap: _whileTap,
    ...rest
  }: {
    children?: ReactNode;
    whileHover?: unknown;
    whileTap?: unknown;
  }) => <button {...rest}>{children}</button>;

  const motion = new Proxy(
    {},
    {
      get: () => MockMotion,
    }
  );

  return { motion };
});

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("../../Context/ThemeContext/ThemeContext", () => ({
  useThemeContext: () => ({
    darkTheme: true,
  }),
}));

vi.mock("../../i18n/LocaleContext", () => ({
  useLocaleContext: () => ({
    localizePath: (path: string) => `/en${path === "/" ? "" : path}`,
  }),
}));

describe("Buttons", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    windowOpenMock.mockReset();
    vi.stubGlobal("open", windowOpenMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens static assets in a new tab instead of routing through the SPA", () => {
    render(<PrimeryBtn text="Resume" path="/RESUME-Abhinay_Khalatkar.pdf" />);

    fireEvent.click(screen.getByRole("button", { name: "Resume" }));

    expect(windowOpenMock).toHaveBeenCalledWith(
      "/RESUME-Abhinay_Khalatkar.pdf",
      "_blank",
      "noopener,noreferrer"
    );
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("uses localized SPA navigation for app routes", () => {
    render(<PrimeryBtn text="Contact" path="/contact" />);

    fireEvent.click(screen.getByRole("button", { name: "Contact" }));

    expect(navigateMock).toHaveBeenCalledWith("/en/contact");
    expect(windowOpenMock).not.toHaveBeenCalled();
  });
});
