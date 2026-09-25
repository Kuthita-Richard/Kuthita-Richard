import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({ title: profile.name, subtitle: profile.tagline });
}
