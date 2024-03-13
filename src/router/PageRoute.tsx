import React from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import { useAppStore, usePageTabStore, useUserStore } from "stores";
import RequireAuth from "./RequireAuth";
import RestrictAuth from "./RestrictAuth";
import { ROUTES, ROUTES_LIST } from "./Routes";
import { useAppMenu } from "./useAppMenu";
import { EXAMPLE_ROUTERS } from "../@core/router/exampleRouter";
import { StoreSpinner } from "../@core/components";

const FrameDefault = React.lazy(() => import("pageFrame/FrameDefault"));
const FrameProgram = React.lazy(() => import("pageFrame/FrameProgram"));

const ExampleList = React.lazy(() => import("@core/pages/LIST/App"));
const ExampleForm = React.lazy(() => import("@core/pages/FORM/App"));
const ExampleDetail = React.lazy(() => import("@core/pages/DETAIL/App"));
const ExampleListAndModal = React.lazy(() => import("@core/pages/LIST_AND_MODAL/App"));
const ExampleListAndDrawer = React.lazy(() => import("@core/pages/LIST_AND_DRAWER/App"));
const ExampleListWithList = React.lazy(() => import("@core/pages/LIST_WITH_LIST/App"));
const ExampleListWithForm = React.lazy(() => import("@core/pages/LIST_WITH_FORM/App"));
const ExampleListWithFormList = React.lazy(() => import("@core/pages/LIST_WITH_FORM_LIST/App"));
const ExampleListWithFormRow = React.lazy(() => import("@core/pages/LIST_WITH_FORM_ROW/App"));
const ExampleThreeList = React.lazy(() => import("@core/pages/THREE_LIST/App"));
const ExampleStats = React.lazy(() => import("@core/pages/STATS/App"));

const Home = React.lazy(() => import("pages/home/App"));
const SignIn = React.lazy(() => import("pages/signIn/App"));
const Error404 = React.lazy(() => import("pages/error/Error404"));

/* ##IMPORT_COMPONENT_POSITION## */

function PageRoute() {
  const sideMenuOpened = useAppStore((s) => s.sideMenuOpened);
  const setSelectedMenuUuid = useUserStore((s) => s.setSelectedMenuUuid);
  const setActiveTabByPath = usePageTabStore((s) => s.setActiveTabByPath);
  const { MENUS_LIST } = useAppMenu();
  const location = useLocation();

  React.useEffect(() => {
    const route = ROUTES_LIST.find((route) => matchPath(route.path, location.pathname));
    if (!route) {
      return;
    }
    const currentMenu = MENUS_LIST.find((m) => m.progCd && m.progCd === route.program_type);

    setSelectedMenuUuid(currentMenu?.keyPath?.join("_") ?? "");

    setActiveTabByPath(location.pathname);
  }, [MENUS_LIST, location.pathname, setActiveTabByPath, setSelectedMenuUuid]);

  return (
    <React.Suspense fallback={<StoreSpinner spinning />}>
      <Routes>
        <Route
          element={
            <RequireAuth>
              <FrameProgram sideMenuOpened={sideMenuOpened} />
            </RequireAuth>
          }
        >
          <Route path={EXAMPLE_ROUTERS.LIST_DETAIL.children.REGISTRATION.path} element={<ExampleForm />} />
          <Route path={EXAMPLE_ROUTERS.LIST_DETAIL.children.LIST.path} element={<ExampleList />} />
          <Route path={EXAMPLE_ROUTERS.LIST_DETAIL.children.DETAIL.path} element={<ExampleDetail />} />
          <Route path={EXAMPLE_ROUTERS.LIST_AND_MODAL.path} element={<ExampleListAndModal />} />
          <Route path={EXAMPLE_ROUTERS.LIST_AND_DRAWER.path} element={<ExampleListAndDrawer />} />
          <Route path={EXAMPLE_ROUTERS.LIST_WITH_LIST.path} element={<ExampleListWithList />} />
          <Route path={EXAMPLE_ROUTERS.LIST_WITH_FORM.path} element={<ExampleListWithForm />} />
          <Route path={EXAMPLE_ROUTERS.LIST_WITH_FORM_LIST.path} element={<ExampleListWithFormList />} />
          <Route path={EXAMPLE_ROUTERS.LIST_WITH_FORM_ROW.path} element={<ExampleListWithFormRow />} />
          <Route path={EXAMPLE_ROUTERS.THREE_LIST.path} element={<ExampleThreeList />} />
          <Route path={EXAMPLE_ROUTERS.STATS.path} element={<ExampleStats />} />

          {/* ##INSERT_ROUTE_POSITION## */}

          <Route path={ROUTES.HOME.path} element={<Home />} />
        </Route>
        <Route
          element={
            <RestrictAuth>
              <FrameDefault />
            </RestrictAuth>
          }
        >
          <Route path={ROUTES.SIGN_IN.path} element={<SignIn />} />
        </Route>
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </React.Suspense>
  );
}

export default PageRoute;
