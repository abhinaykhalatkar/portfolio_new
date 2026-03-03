import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const ProjectsHome = lazy(() => import("./Projects-home/Projects-home"));
const ProjectsCataloguePage = lazy(() => import("./Projects-catalog/Projects-catalogue"));
const Project1 = lazy(() => import("./Projects-catalog/Project1/Project1"));
const Project2 = lazy(() => import("./Projects-catalog/Project2/Project2"));
const Project3 = lazy(() => import("./Projects-catalog/Project3/Project3"));
const Project4 = lazy(() => import("./Projects-catalog/Project4/Project4"));
const NotFound404 = lazy(() => import("../NotFound404/NotFound404"));

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
