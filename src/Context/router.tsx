import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { usePageAnimationContext } from "./PageAnimationContext/PageAnimationContext";
import {
  MAIN_BASE_ROUTES,
  getPreferredLocale,
  stripLocalePrefix,
  type Locale,
} from "../i18n/localeRoutes";

const HomePage = lazy(() => import("../Pages/Home/Home"));
const AboutPage = lazy(() => import("../Pages/About/About"));
const SkillsPage = lazy(() => import("../Pages/Skills/Skills"));
const RenderProjectsRoutes = lazy(() => import("../Pages/Projects/project-router"));
const ResumePage = lazy(() => import("../Pages/Resume/Resume"));
const ContactPage = lazy(() => import("../Pages/Contact/Contact"));
const WhatsOnMyMindPage = lazy(
  () => import("../Pages/WhatsOnMyMind/WhatsOnMyMind")
);
const NotFound404 = lazy(() => import("../Pages/NotFound404/NotFound404"));

// Server-side `.htaccess` is supposed to redirect `/` to `/en/` (or the persisted
// locale). When that doesn't fire — e.g. Hetzner's Apache serves the SPA shell
// for `/` directly — this component intercepts client-side and ships the user
// to the correct localized home before the catchall 404 can render.
function RootLocaleRedirect() {
  const locale = getPreferredLocale();
  return <Navigate to={`/${locale}/`} replace />;
}

function createLocalizedRoutes(locale: Locale) {
  return [
    {
      path: `/${locale}`,
      element: <HomePage />,
    },
    {
      path: `/${locale}/about`,
      element: <AboutPage />,
    },
    {
      path: `/${locale}/skills`,
      element: <SkillsPage />,
    },
    {
      path: `/${locale}/projects/*`,
      element: <RenderProjectsRoutes />,
    },
    {
      path: `/${locale}/resume`,
      element: <ResumePage />,
    },
    {
      path: `/${locale}/contact`,
      element: <ContactPage />,
    },
    {
      path: `/${locale}/whats-on-my-mind`,
      element: <WhatsOnMyMindPage />,
    },
  ];
}

const RenderRoutes = () => {
  const location = useLocation();

  const routesData = useMemo(
    () => [...createLocalizedRoutes("en"), ...createLocalizedRoutes("de")],
    []
  );
  const { setIsOnMainPage } = usePageAnimationContext();

  useEffect(() => {
    const basePath = stripLocalePrefix(location.pathname);
    const isMain = MAIN_BASE_ROUTES.includes(
      basePath as (typeof MAIN_BASE_ROUTES)[number]
    );
    setIsOnMainPage(isMain);
  }, [location.pathname, setIsOnMainPage]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<RootLocaleRedirect />} />
        {routesData.map((el, ind) => {
          return <Route key={`route${ind}`} path={el.path} element={el.element} />;
        })}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
};

export default RenderRoutes;
