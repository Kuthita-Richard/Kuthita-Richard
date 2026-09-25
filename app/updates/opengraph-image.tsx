import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const alt = "Updates — Richard Kuthita";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: "Updates", subtitle: "Project screenshots, certifications, and milestones" });
}
