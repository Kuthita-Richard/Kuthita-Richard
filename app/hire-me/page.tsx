import type { Metadata } from "next";
import { profile } from "@/data/profile";
import HireMeContent from "./HireMeContent";

export const metadata: Metadata = {
  title: "Hire Me — Richard Kuthita",
  description: `Hire ${profile.name} for your next project. Select engagement type and role preferences. Java Developer, Frontend Developer, Full Stack Engineer.`,
  keywords: ["hire", "freelance", "contract", "Java developer", "frontend developer", "React developer"],
  openGraph: {
    title: "Hire Me — Richard Kuthita",
    description: `Hire ${profile.name} for your next project. Discuss engagement opportunities.`,
    url: "https://kuthita-richard.vercel.app/hire-me",
  },
};

export default function HireMePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Hire Me</h1>
      <HireMeContent />
    </div>
  );
}
