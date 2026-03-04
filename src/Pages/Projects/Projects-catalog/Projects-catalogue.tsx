import React from "react";
import ProjectSectionPage from "./ProjectSectionPage";
import { usePageAnimationContext } from "../../../Context/PageAnimationContext/PageAnimationContext";
import { normalizeProjectSectionCount } from "../../../Components/ProgressNav/VerticalProgressNav";

export default function ProjectsCataloguePage() {
  const { projectSectionCount } = usePageAnimationContext();
  return (
    <ProjectSectionPage
      sectionNumber={normalizeProjectSectionCount(projectSectionCount)}
    />
  );
}
