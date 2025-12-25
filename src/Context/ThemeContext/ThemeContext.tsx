import React, {
  createContext,
  useContext,
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

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within <ThemeProvider>");
  }
  return ctx;
}

export function ThemeProvider(props: { children?: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme);
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
