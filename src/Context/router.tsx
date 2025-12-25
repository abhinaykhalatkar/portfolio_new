import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import SkillsPage from "../Pages/Skills/Skills";
import RenderProjectsRoutes from "../Pages/Projects/project-router";
import ContactPage from "../Pages/Contact/Contact";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import { usePageAnimationContext } from "./PageAnimationContext/PageAnimationContext";

const RenderRoutes = () => {
  const location = useLocation();

  const routesData = useMemo(
    () => [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/skills",
        element: <SkillsPage />,
      },
      {
        path: "/projects",
        hasChildRoute: true,
      },
      {
        path: "/projects/*",
        element: <RenderProjectsRoutes />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
    []
  );
  const { setIsOnMainPage } = usePageAnimationContext();

  useEffect(() => {
    const isMain = routesData.some((el) => el.path === location.pathname);
    setIsOnMainPage(isMain);
  }, [location.pathname, setIsOnMainPage, routesData]);

  return (
    <Routes>
      {routesData.map((el, ind) => {
        if (!el.hasChildRoute) {
          return (
            <Route key={`route${ind}`} path={el.path} element={el.element} />
          );
        }
        return null;
      })}
    </Routes>
  );
};

export default RenderRoutes;
