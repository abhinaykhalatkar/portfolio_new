import { Route, Routes, useLocation } from "react-router-dom";
import { useContext, useEffect, useMemo } from "react";
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import SkillsPage from "../Pages/Skills/Skills";
import RenderProjectsRoutes from "../Pages/Projects/project-router";
import ContactPage from "../Pages/Contact/Contact";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import { PageAnimationContext } from "./PageAnimationContext/PageAnimationContext";

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
  const {
    setIsOnMainPage,
    isOnMainPage,
  } = useContext(PageAnimationContext);

  useEffect(() => {
    let curVal = false;
    routesData.map((el) => {
      if (el.path === location.pathname) curVal = true;
      return null;
    });
    setIsOnMainPage(curVal);
  }, [location.pathname, setIsOnMainPage, routesData, isOnMainPage]);

  return (
    <Routes>
      {routesData.map((el, ind) => {
        if (!el.hasChildRoute) {
          return (
            <Route key={`route${ind}`} path={el.path} element={el.element} />
          );
        } return null
      })}
    </Routes>
  );
};

export default RenderRoutes;
