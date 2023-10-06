import { Route, Routes } from "react-router-dom";
import ProjectsHome from "./Projects-home/Projects-home";
import ProjectsCataloguePage from "./Projects-catalog/Projects-catalogue";
import Project1 from "./Projects-catalog/Project1/Project1";
import NotFound404 from "../NotFound404/NotFound404";

export const projectsRoutesData = [
  {
    path: "/",
    element: <ProjectsHome />,
  },
  {
    path: "/project-1",
    element: <Project1 />,
  },
  {
    path: "/project-catalogue",
    element: <ProjectsCataloguePage />,
  },
  {
    path: "/*",
    element: <NotFound404 />,
  },
];

export default function RenderProjectsRoutes() {
  return (
    <Routes>
      {projectsRoutesData.map((el, ind) => {
        return (
          <Route
            key={`route-projects${ind}`}
            path={el.path}
            element={el.element}
          />
        );
      })}
    </Routes>
  );
}
