import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const alt = "Projects — Richard Kuthita";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: "Projects", subtitle: "Live from GitHub — React, Next.js, TypeScript work" });
}
