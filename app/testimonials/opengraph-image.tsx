import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const alt = "Testimonials — Richard Kuthita";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: "Testimonials", subtitle: "What people say about working with me" });
}
