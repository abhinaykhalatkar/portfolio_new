import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { getCaseStudySlugs } from "../../content/portfolioCaseStudies";

const ProjectsHome = lazy(() => import("./Projects-home/Projects-home"));
const ProjectsCataloguePage = lazy(() => import("./Projects-catalog/Projects-catalogue"));
const ProjectDynamic = lazy(() => import("./Projects-catalog/ProjectDynamic"));
const NotFound404 = lazy(() => import("../NotFound404/NotFound404"));

// Per-slide case-study URLs: each slug renders the SAME carousel (ProjectsHome)
// with that slide active. Declared BEFORE `:projectSlug` so they never fall
// through to the GitHub-catalog section renderer.
const caseStudyRoutes = getCaseStudySlugs().map((slug) => ({
  path: slug,
  element: <ProjectsHome caseStudySlug={slug} />,
}));

export const projectsRoutesData = [
  {
    // index route for `/projects`
    path: "",
    element: <ProjectsHome />,
  },
  ...caseStudyRoutes,
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
