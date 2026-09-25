import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/profile";
import UpdatesContent from "./UpdatesContent";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Updates — Richard Kuthita",
  description: `Project screenshots, career milestones, and updates from ${profile.name} — including UI work not hosted on GitHub.`,
  keywords: ["updates", "portfolio", "screenshots", "milestones", "bootcamp", "UI work"],
  openGraph: {
    title: "Updates — Richard Kuthita",
    description: `Project screenshots and career updates from ${profile.name}.`,
    url: `${siteUrl}/updates`,
  },
};

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <BreadcrumbSchema page="Updates" path="/updates" />
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep dark:text-dk-ink">Updates</h1>
      <UpdatesContent />
    </div>
  );
}
