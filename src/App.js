import React from "react";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import ChildApp1 from "./ChildApp1";
import { BrowserRouter } from "react-router-dom";
import { PageAnimationProvider } from "./Context/PageAnimationContext/PageAnimationContext";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PageAnimationProvider>
          <ChildApp1 />
        </PageAnimationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
