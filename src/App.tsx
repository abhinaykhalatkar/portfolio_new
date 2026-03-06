import React from "react";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import ChildApp1 from "./ChildApp1";
import { BrowserRouter } from "react-router-dom";
import { PageAnimationProvider } from "./Context/PageAnimationContext/PageAnimationContext";
import { HelmetProvider } from "react-helmet-async";
import { LocaleProvider } from "./i18n/LocaleContext";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LocaleProvider>
          <ThemeProvider>
            <PageAnimationProvider>
              <ChildApp1 />
            </PageAnimationProvider>
          </ThemeProvider>
        </LocaleProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
