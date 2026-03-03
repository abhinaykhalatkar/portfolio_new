import React from "react";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import ChildApp1 from "./ChildApp1";
import { BrowserRouter } from "react-router-dom";
import { PageAnimationProvider } from "./Context/PageAnimationContext/PageAnimationContext";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }

  let normalized = value.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (!normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }
  return normalized;
}

function App() {
  const basePath = normalizeBasePath(import.meta.env.VITE_BASE_PATH || "/");
  const routerBaseName = basePath === "/" ? undefined : basePath;

  return (
    <BrowserRouter basename={routerBaseName}>
      <ThemeProvider>
        <PageAnimationProvider>
          <ChildApp1 />
        </PageAnimationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
