import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeContextValue = {
  darkTheme: boolean;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "portfolio-theme";

function readInitialTheme(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    // localStorage may be blocked; fall through to system preference.
  }
  if (typeof window.matchMedia === "function") {
    // No stored preference: respect the OS-level setting on first visit.
    return !window.matchMedia("(prefers-color-scheme: light)").matches;
  }
  return true;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within <ThemeProvider>");
  }
  return ctx;
}

export function ThemeProvider(props: { children?: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(readInitialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, darkTheme ? "dark" : "light");
    } catch {
      // ignore — storage may be blocked
    }
  }, [darkTheme]);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  const value = useMemo<ThemeContextValue>(
    () => ({ darkTheme, toggleTheme, isSidebarOpen, setIsSidebarOpen }),
    [darkTheme, isSidebarOpen]
  );

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}
