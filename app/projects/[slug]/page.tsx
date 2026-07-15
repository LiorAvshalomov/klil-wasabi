import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectView } from "@/app/ProjectView";
import { projects } from "@/app/project-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title.en} / ${project.title.he} | Klil Israeli`,
    description: project.statement.en,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];
  return <ProjectView project={project} nextProject={nextProject} />;
}
