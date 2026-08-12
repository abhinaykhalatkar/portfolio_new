import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ResumePage from "./Resume";

let mockScreenSize = 1280;

vi.mock("framer-motion", () => {
  const MockMotion = ({ children, ...rest }: { children?: ReactNode }) => (
    <div {...rest}>{children}</div>
  );
  const motion = new Proxy(
    {},
    {
      get: () => MockMotion,
    }
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

vi.mock("../../Context/ThemeContext/ThemeContext", () => ({
  useThemeContext: () => ({
    darkTheme: true,
  }),
}));

vi.mock("../../Context/PageAnimationContext/PageAnimationContext", () => ({
  usePageAnimationContext: () => ({
    pageVariants: {},
    pageTransition: {},
    contentVariants: {},
    screenSize: mockScreenSize,
  }),
}));

vi.mock("../../i18n/LocaleContext", () => ({
  useLocaleContext: () => ({
    locale: "en",
    t: (key: string) => key,
    localizePath: (path: string) => path,
  }),
}));

vi.mock("../../Components/Buttons/Buttons", () => ({
  PrimeryBtn: ({ text, path }: { text: string; path?: string }) => (
    <button type="button" data-testid="download-btn" data-path={path}>
      {text}
    </button>
  ),
}));

describe("ResumePage", () => {
  beforeEach(() => {
    mockScreenSize = 1280;
  });

  it("renders heading, crawlable note paragraph, and the download button pointing at the PDF", () => {
    render(<ResumePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "resume.heading" })
    ).toBeInTheDocument();
    expect(screen.getByText("resume.updatedNote")).toBeInTheDocument();

    const download = screen.getByTestId("download-btn");
    expect(download).toHaveTextContent("resume.download");
    expect(download.getAttribute("data-path")).toBe(
      "/RESUME-Abhinay_Khalatkar.pdf"
    );
  });

  it("embeds the PDF inline on desktop with a wheel-locked viewer", () => {
    const { container } = render(<ResumePage />);

    const embed = container.querySelector("object.resume-embed");
    expect(embed).not.toBeNull();
    expect(embed?.getAttribute("type")).toBe("application/pdf");
    expect(embed?.getAttribute("data")).toContain(
      "/RESUME-Abhinay_Khalatkar.pdf"
    );

    const viewer = container.querySelector(".resume-viewer");
    expect(viewer?.getAttribute("data-wheel-lock")).toBe("true");
  });

  it("renders the download fallback card instead of the embed on mobile", () => {
    mockScreenSize = 480;
    const { container } = render(<ResumePage />);

    expect(container.querySelector("object.resume-embed")).toBeNull();
    expect(screen.getByText("resume.fallbackTitle")).toBeInTheDocument();
    expect(screen.getByText("resume.fallbackBody")).toBeInTheDocument();
  });
});
