import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect } from "react";
import { PageAnimationContext } from "./PageAnimationContext/PageAnimationContext";

const HomePage = lazy(() => import("../Pages/Home/Home"));
const AboutPage = lazy(() => import("../Pages/About/About"));
const SkillsPage = lazy(() => import("../Pages/Skills/Skills"));
const RenderProjectsRoutes = lazy(() => import("../Pages/Projects/project-router"));
const ContactPage = lazy(() => import("../Pages/Contact/Contact"));
const NotFound404 = lazy(() => import("../Pages/NotFound404/NotFound404"));

const routesData = [
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
];

const RenderRoutes = () => {
  const location = useLocation();
  const { setIsOnMainPage } = useContext(PageAnimationContext);

  useEffect(() => {
    const isMainPage = routesData.some((route) => route.path === location.pathname);
    setIsOnMainPage(isMainPage);
  }, [location.pathname, setIsOnMainPage]);

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default RenderRoutes;
