import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const setActiveIndexMock = vi.fn();
const setScrollDirectionMock = vi.fn();
let mockActiveIndex = 0;
let mockIsOnNotFound404Page = false;

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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../../Context/ThemeContext/ThemeContext", () => ({
  useThemeContext: () => ({ darkTheme: true }),
}));

vi.mock("../../Context/PageAnimationContext/PageAnimationContext", () => ({
  usePageAnimationContext: () => ({
    handleSetScrollDirection: setScrollDirectionMock,
    activeIndex: mockActiveIndex,
    setActiveIndex: setActiveIndexMock,
    isOnNotFound404Page: mockIsOnNotFound404Page,
  }),
}));

vi.mock("../../i18n/LocaleContext", () => ({
  useLocaleContext: () => ({
    t: (key: string) => key,
    localizePath: (path: string) =>
      path === "/" ? "/en/" : `/en${path}/`,
  }),
}));

import ScrollBtn from "./ScrollBtn";
import { navsData } from "./ProgressNav";

beforeEach(() => {
  navigateMock.mockReset();
  setActiveIndexMock.mockReset();
  setScrollDirectionMock.mockReset();
  mockActiveIndex = 0;
  mockIsOnNotFound404Page = false;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ScrollBtn handler", () => {
  it("advances from Home (index 0) to About (index 1)", () => {
    mockActiveIndex = 0;
    render(<ScrollBtn />);

    expect(screen.getByText("scroll.next")).toBeInTheDocument();
    fireEvent.click(screen.getByText("scroll.next").parentElement!);

    expect(navigateMock).toHaveBeenCalledWith("/en/about/");
    expect(setActiveIndexMock).toHaveBeenCalledWith(1);
    expect(setScrollDirectionMock).toHaveBeenCalledWith(0);
  });

  it("advances from Contact to /whats-on-my-mind/ — fixes the 'goes home' regression", () => {
    mockActiveIndex = navsData.findIndex((n) => n.Address === "/contact");
    render(<ScrollBtn />);

    expect(screen.getByText("scroll.next")).toBeInTheDocument();
    fireEvent.click(screen.getByText("scroll.next").parentElement!);

    expect(navigateMock).toHaveBeenCalledWith("/en/whats-on-my-mind/");
    expect(setActiveIndexMock).toHaveBeenCalledWith(navsData.length - 1);
    expect(setScrollDirectionMock).toHaveBeenCalledWith(0);
  });

  it("advances from Projects (index 3) to /resume/", () => {
    mockActiveIndex = 3;
    render(<ScrollBtn />);

    fireEvent.click(screen.getByText("scroll.next").parentElement!);

    expect(navigateMock).toHaveBeenCalledWith("/en/resume/");
    expect(setActiveIndexMock).toHaveBeenCalledWith(4);
  });

  it("loops home from the last page (index = navsData.length - 1) and shows the back-to-start label", () => {
    mockActiveIndex = navsData.length - 1;
    render(<ScrollBtn />);

    expect(screen.getByText("scroll.backStart")).toBeInTheDocument();
    expect(screen.queryByText("scroll.next")).toBeNull();

    fireEvent.click(screen.getByText("scroll.backStart").parentElement!);

    expect(navigateMock).toHaveBeenCalledWith("/en/");
    expect(setActiveIndexMock).toHaveBeenCalledWith(0);
    expect(setScrollDirectionMock).toHaveBeenCalledWith(1);
  });

  it("shows the back-to-home label and still loops home on the 404 page", () => {
    mockActiveIndex = navsData.length - 1;
    mockIsOnNotFound404Page = true;
    render(<ScrollBtn />);

    expect(screen.getByText("scroll.backHome")).toBeInTheDocument();
  });
});
