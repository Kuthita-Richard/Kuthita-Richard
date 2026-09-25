// Updates feed — the "magazine" channel for things that never end up on
// GitHub: UI screenshots from client/freelance work, bootcamp photos,
// conference badges, milestones, anything worth showing off.
//
// To publish a new entry: drop image(s) in /public/updates/<some-slug>/ and
// add an object below. Nothing else needs to change — the page renders
// straight from this array, newest first.

export type UpdateEntry = {
  id: string;
  title: string;
  /** ISO date string, e.g. "2026-08-14" */
  date: string;
  type: "project" | "milestone" | "note";
  description: string;
  /** Paths under /public, e.g. "/updates/my-entry/screenshot-1.png" */
  images: string[];
  tags?: string[];
  links?: { label: string; url: string }[];
};

export const updates: UpdateEntry[] = [
  {
    id: "welcome",
    title: "Updates channel is live",
    date: "2026-09-22",
    type: "note",
    description:
      "This page is where I'll post UI screenshots from work that never makes it to GitHub (client projects, private repos), plus career milestones like courses, bootcamps, and events.",
    images: [],
    tags: ["meta"],
  },
];

export const updateTypeLabels: Record<UpdateEntry["type"], string> = {
  project: "Project",
  milestone: "Milestone",
  note: "Note",
};
