import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export type OgCard = {
  /** Small uppercase line, top left. */
  eyebrow: string;
  /** Small uppercase line, top right, e.g. chapter coordinates. */
  eyebrowRight?: string;
  title: string;
  standfirst?: string;
};

/**
 * One renderer behind every opengraph-image route. Thirty-eight of the
 * publication's forty-eight pages served no card at all, including all four
 * tools pages and every case, checklist and Q&A route.
 */
export function renderOgCard({
  eyebrow,
  eyebrowRight,
  title,
  standfirst,
}: OgCard) {
  const titleSize =
    title.length > 78 ? 54 : title.length > 56 ? 64 : title.length > 34 ? 74 : 84;

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
          <div style={{ display: "flex" }}>{eyebrow}</div>
          {eyebrowRight ? (
            <div style={{ display: "flex", color: "#7a756d" }}>
              {eyebrowRight}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              color: "#1a1a1a",
              display: "flex",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {standfirst ? (
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
              {standfirst}
            </div>
          ) : null}
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
    { ...OG_SIZE }
  );
}
