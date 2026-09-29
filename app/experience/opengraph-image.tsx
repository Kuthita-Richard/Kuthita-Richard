import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const alt = "Experience | Richard Kuthita";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: "Experience", subtitle: "ICT, data analysis, and frontend engineering work" });
}
