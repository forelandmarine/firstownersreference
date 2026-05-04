import { ImageResponse } from "next/og";

export const alt = "The First Owner's Reference — A yachting field manual";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          <div style={{ display: "flex" }}>1st Edition · 2026</div>
          <div style={{ display: "flex", color: "#7a756d" }}>
            firstownersreference.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              color: "#1a1a1a",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The First</span>
            <span>Owner&rsquo;s Reference</span>
          </div>
          <div
            style={{
              fontSize: 32,
              fontStyle: "italic",
              color: "#2a2a2a",
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            A yachting field manual for first-time superyacht buyers.
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
            Published by Foreland Marine
          </div>
          <div style={{ display: "flex" }}>Independent · No advertising</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
