import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — Corporate AI training and implementation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Placeholder social-sharing image. Replace with a branded design once available. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(180deg, #0b57c4 0%, #1a6fe0 45%, #8cc4f6 100%)", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#d8f36a", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#ffffff" }}>CORPORATE AI TRAINING &amp; IMPLEMENTATION</div>
          <div style={{ fontSize: 60, fontWeight: 500, lineHeight: 1.05, maxWidth: 980 }}>
            Your team is capable of more. Give them the AI skills to prove it.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#0c0e12" }}>Practical training. Real business applications. Smarter ways of working.</div>
      </div>
    ),
    size,
  );
}
