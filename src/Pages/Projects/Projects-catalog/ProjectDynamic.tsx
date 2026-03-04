import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound404 from "../../NotFound404/NotFound404";
import {
  normalizeProjectSectionCount,
  parseProjectSlug,
} from "../../../Components/ProgressNav/VerticalProgressNav";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import ProjectSectionPage from "./ProjectSectionPage";

export default function ProjectDynamic() {
  const params = useParams();
  const { projectSectionCount, setProjectSectionCount } = usePageAnimationContext();

  const parsedSection = parseProjectSlug(params.projectSlug);

  useEffect(() => {
    if (parsedSection === null) {
      return;
    }

    if (parsedSection > projectSectionCount) {
      setProjectSectionCount((previous) =>
        normalizeProjectSectionCount(Math.max(previous, parsedSection))
      );
    }
  }, [parsedSection, projectSectionCount, setProjectSectionCount]);

  if (parsedSection === null) {
    return <NotFound404 />;
  }

  return (
    <ProjectSectionPage sectionNumber={parsedSection} />
  );
}
