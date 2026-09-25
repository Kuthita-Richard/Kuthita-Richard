import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const alt = "Hire Me — Richard Kuthita";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: "Hire Me", subtitle: "Frontend, Java, and full-stack engineering work" });
}
