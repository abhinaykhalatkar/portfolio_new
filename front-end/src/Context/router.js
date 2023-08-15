import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import SkillsPage from "../Pages/Skills/Skills";
import RenderProjectsRoutes from "../Pages/Projects/project-router";
import ContactPage from "../Pages/Contact/Contact";
import NotFound404 from "../Pages/NotFound404/NotFound404";

const RenderRoutes = () => {

  const routesData = [
    {
      path: "/",
      element: <HomePage/>,
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
      path: "/projects/*",
      element: <RenderProjectsRoutes />,
    },
    {
      path: "/contact",
      element: <ContactPage/>,
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ];

  return (
    <Routes >
      {routesData.map((el, ind) => {
        return (
          <Route
            key={`route${ind}`}
            path={el.path}
            element={el.element}
          />
        );
      })}
    </Routes>
  );
};

export default RenderRoutes;
