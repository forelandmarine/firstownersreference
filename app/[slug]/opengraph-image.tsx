import { ImageResponse } from "next/og";
import { getSection } from "@/lib/sections";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The First Owner's Reference";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);

  if (!section) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#f5f2ec",
          }}
        />
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2ec",
          color: "#1a1a1a",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#0f3b5c",
          }}
        >
          <div style={{ display: "flex" }}>
            Chapter {section.number} · 1st Edition · 2026
          </div>
          <div style={{ display: "flex", color: "#7a756d" }}>
            {section.coordinates}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              color: "#1a1a1a",
              display: "flex",
              maxWidth: 980,
            }}
          >
            {section.title}
          </div>
          <div
            style={{
              fontSize: 26,
              fontStyle: "italic",
              color: "#2a2a2a",
              lineHeight: 1.35,
              display: "flex",
              maxWidth: 940,
            }}
          >
            {section.standfirst}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d8d2c4",
            paddingTop: 24,
            fontSize: 18,
            color: "#7a756d",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>
            The First Owner&rsquo;s Reference
          </div>
          <div style={{ display: "flex" }}>firstownersreference.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
