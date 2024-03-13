import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./@core/components/ErrorFallback";

const themes = {
  dark: `/app-dark.css`,
  light: `/app-light.css`,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeSwitcherProvider themeMap={themes} defaultTheme='light'>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </ThemeSwitcherProvider>,
);
