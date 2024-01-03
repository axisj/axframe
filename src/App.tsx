import { ThemeProvider } from "@emotion/react";
import { ConfigProvider } from "antd";
import * as React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { BrowserRouter } from "react-router-dom";
import { useAppStore, usePageTabStore, useUserStore } from "stores";
import { themePalette } from "styles/theme";
import PageRoute from "router/PageRoute";
import { Drawers, Modals, StoreSpinner } from "@core/components";
import "styles/index.less";
import "@core/utils/console";
import "./customizeAntd";
import { getAppData } from "./@core/utils/store";
import { setApiHeader } from "./services/apiWrapper.ts";
import "locales";

const App: React.FC = () => {
  const { switcher, themes } = useThemeSwitcher();
  const [storeLoaded, setStoreLoaded] = React.useState(false);
  const appStoreLoaded = useAppStore((s) => s.loaded);
  const setWidthHeight = useAppStore((s) => s.setWidthHeight);
  const pageStoreLoaded = usePageTabStore((s) => s.loaded);
  const userStoreLoaded = useUserStore((s) => s.loaded);
  const theme = useAppStore((s) => s.theme);

  const handleGetWindowSize = React.useCallback(() => {
    setWidthHeight(window.innerWidth, window.innerHeight);
  }, [setWidthHeight]);

  React.useEffect(() => {
    switcher({ theme: theme === "dark" ? themes.dark : themes.light });
  }, [switcher, theme, themes.dark, themes.light]);

  React.useEffect(() => {
    if (appStoreLoaded && pageStoreLoaded && userStoreLoaded) {
      setStoreLoaded(true);
    }
  }, [appStoreLoaded, pageStoreLoaded, userStoreLoaded]);

  React.useEffect(() => {
    handleGetWindowSize();
    document.body.style.overscrollBehavior = "contain"; // prevent history move by wheel event
    window.addEventListener("resize", handleGetWindowSize);

    const appData = getAppData();
    if (appData) {
      setApiHeader(appData.authorization);
    }

    return () => {
      window.removeEventListener("resize", handleGetWindowSize);
    };
  }, [handleGetWindowSize]);

  return (
    <ThemeProvider theme={themePalette[theme]}>
      <StoreSpinner spinning={!storeLoaded} />
      <ConfigProvider theme={themePalette[theme]}>
        {storeLoaded && (
          <BrowserRouter>
            <PageRoute />
            <Drawers />
            <Modals />
          </BrowserRouter>
        )}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
