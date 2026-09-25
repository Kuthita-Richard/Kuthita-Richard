import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";
import ProjectsContent from "./ProjectsContent";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Projects — Richard Kuthita",
  description: `Portfolio of ${profile.name}'s projects including ${profile.skills.frontend.join(", ")} work. View all GitHub repositories and technical work.`,
  keywords: ["projects", "portfolio", "GitHub", "React", "Next.js", "TypeScript", "full stack"],
  openGraph: {
    title: "Projects — Richard Kuthita",
    description: `Portfolio of ${profile.name}'s projects and technical work.`,
    url: `${siteUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <BreadcrumbSchema page="Projects" path="/projects" />
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Projects</h1>
      <ProjectsContent />
    </div>
  );
}
