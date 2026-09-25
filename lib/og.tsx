import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Shared by every route's opengraph-image.tsx — one look, different
// title/subtitle per page, so a shared link actually reflects what's being
// shared instead of always showing the homepage photo.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png" as const;

export function renderOgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080F1A",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#C9A24B", display: "flex" }} />
          <div style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#C9A24B", display: "flex" }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, color: "#E2E8F5", display: "flex" }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 30, color: "#8896AA", display: "flex" }}>{subtitle}</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 2, backgroundColor: "#4A7FD4", display: "flex" }} />
          <div style={{ fontSize: 22, color: "#4A7FD4", display: "flex" }}>richardkuthita.com</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
