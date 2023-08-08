import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home/Home";
import AboutPage from "../Pages/About/About";
import SkillsPage from "../Pages/Skills/Skills";
import ProjectsPage from "../Pages/Projects/Projects";
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
      path: "/projects",
      element: <ProjectsPage />,
    },
    {
      path: "/contact",
      element: <NotFound404 />,
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ];

  return (
    <Routes>
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
