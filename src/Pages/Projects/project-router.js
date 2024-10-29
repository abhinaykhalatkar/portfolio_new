import { Route, Routes } from "react-router-dom";
import ProjectsHome from "./Projects-home/Projects-home";
import ProjectsCataloguePage from "./Projects-catalog/Projects-catalogue";
import Project1 from "./Projects-catalog/Project1/Project1";
import Project2 from "./Projects-catalog/Project2/Project2";
import Project3 from "./Projects-catalog/Project3/Project3";
import Project4 from "./Projects-catalog/Project4/Project4";

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
    path: "/project-2",
    element: <Project2 />,
  },
  {
    path: "/project-3",
    element: <Project3 />,
  },
  {
    path: "/project-4",
    element: <Project4 />,
  },
  {
    path: "/project-5",
    element: <ProjectsCataloguePage />,
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
