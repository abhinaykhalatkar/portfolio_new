import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "./Home";

const navigateMock = vi.fn();
let mockScreenSize = 700;

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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
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
    setActiveIndex: vi.fn(),
    handleSetScrollDirection: vi.fn(),
  }),
}));

vi.mock("../../i18n/LocaleContext", () => ({
  useLocaleContext: () => ({
    locale: "en",
    t: (key: string) => key,
    localizePath: (path: string) => path,
  }),
}));

vi.mock("./components/HomeTimeline", () => ({
  default: (props: { variant?: "desktop" | "drawer"; onClose?: () => void }) => (
    <div data-testid={`home-timeline-${props.variant ?? "desktop"}`}>
      <button type="button" onClick={props.onClose}>
        close
      </button>
    </div>
  ),
}));

describe("Home mobile timeline drawer", () => {
  beforeEach(() => {
    mockScreenSize = 700;
    navigateMock.mockReset();
  });

  it("opens and closes timeline drawer via sticky button", () => {
    render(<HomePage />);

    const toggleButton = screen.getByRole("button", { name: "timeline.drawerToggle" });
    if (screen.queryByTestId("home-timeline-drawer")) {
      fireEvent.click(toggleButton);
    }

    fireEvent.click(toggleButton);
    expect(screen.getByTestId("home-timeline-drawer")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByTestId("home-timeline-drawer")).not.toBeInTheDocument();
  });

  it("does not render sticky timeline button on desktop", () => {
    mockScreenSize = 1280;
    render(<HomePage />);

    expect(
      screen.queryByRole("button", { name: "timeline.drawerToggle" })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("home-timeline-desktop")).toBeInTheDocument();
  });
});
