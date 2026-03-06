import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const ProjectsHome = lazy(() => import("./Projects-home/Projects-home"));
const ProjectsCataloguePage = lazy(() => import("./Projects-catalog/Projects-catalogue"));
const ProjectDynamic = lazy(() => import("./Projects-catalog/ProjectDynamic"));
const NotFound404 = lazy(() => import("../NotFound404/NotFound404"));

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
    <Suspense fallback={null}>
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
    </Suspense>
  );
}
