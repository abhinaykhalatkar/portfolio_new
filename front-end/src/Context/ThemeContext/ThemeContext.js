import React, { useState ,createContext} from "react";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <ThemeContext.Provider value={{darkTheme,toggleTheme}}>
        {props.children}
    </ThemeContext.Provider>
  );
}
