import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

// Add a route here once and it's in the sitemap everywhere — no separate
// XML file to remember to update.
const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/updates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/testimonials", changeFrequency: "weekly", priority: 0.6 },
  { path: "/hire-me", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
