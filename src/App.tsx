import React from "react";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import ChildApp1 from "./ChildApp1";
import { BrowserRouter } from "react-router-dom";
import { PageAnimationProvider } from "./Context/PageAnimationContext/PageAnimationContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <PageAnimationProvider>
            <ChildApp1 />
          </PageAnimationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
