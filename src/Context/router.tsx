import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { usePageAnimationContext } from "./PageAnimationContext/PageAnimationContext";
import {
  getPreferredLocale,
  MAIN_BASE_ROUTES,
  stripLocalePrefix,
  toLocalizedPath,
  type Locale,
} from "../i18n/localeRoutes";

const HomePage = lazy(() => import("../Pages/Home/Home"));
const AboutPage = lazy(() => import("../Pages/About/About"));
const SkillsPage = lazy(() => import("../Pages/Skills/Skills"));
const RenderProjectsRoutes = lazy(() => import("../Pages/Projects/project-router"));
const ContactPage = lazy(() => import("../Pages/Contact/Contact"));
const NotFound404 = lazy(() => import("../Pages/NotFound404/NotFound404"));

function LocalizedRedirect() {
  const location = useLocation();
  return <Navigate replace to={toLocalizedPath(location.pathname, getPreferredLocale())} />;
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
      path: `/${locale}/contact`,
      element: <ContactPage />,
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
        {routesData.map((el, ind) => {
          return <Route key={`route${ind}`} path={el.path} element={el.element} />;
        })}
        <Route path="/" element={<LocalizedRedirect />} />
        <Route path="/about" element={<LocalizedRedirect />} />
        <Route path="/skills" element={<LocalizedRedirect />} />
        <Route path="/projects/*" element={<LocalizedRedirect />} />
        <Route path="/contact" element={<LocalizedRedirect />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
};

export default RenderRoutes;
