import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <ThemeContext.Provider
      value={{ darkTheme, toggleTheme, isSidebarOpen, setIsSidebarOpen }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
