import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import SkillsPage from "../Pages/Skills/Skills";
import RenderProjectsRoutes from "../Pages/Projects/project-router";
import ContactPage from "../Pages/Contact/Contact";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import { usePageAnimationContext } from "./PageAnimationContext/PageAnimationContext";
import {
  getPreferredLocale,
  MAIN_BASE_ROUTES,
  stripLocalePrefix,
  toLocalizedPath,
  type Locale,
} from "../i18n/localeRoutes";

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
  );
};

export default RenderRoutes;
