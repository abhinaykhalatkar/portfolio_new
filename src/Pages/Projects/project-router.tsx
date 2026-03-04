import { Route, Routes } from "react-router-dom";
import ProjectsHome from "./Projects-home/Projects-home";
import ProjectsCataloguePage from "./Projects-catalog/Projects-catalogue";
import ProjectDynamic from "./Projects-catalog/ProjectDynamic";

import NotFound404 from "../NotFound404/NotFound404";

export const projectsRoutesData = [
  {
    // index route for `/projects`
    path: "",
    element: <ProjectsHome />,
  },
  {
    path: "project-catalogue",
    element: <ProjectsCataloguePage />,
  },
  {
    path: ":projectSlug",
    element: <ProjectDynamic />,
  },
  {
    path: "*",
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
