export type CompositionSegment = {
  label: string;
  value: number;
  display?: string;
};

export type CompositionBarProps = {
  segments: CompositionSegment[];
  unit?: string;
  total?: number;
};

const PALETTE = [
  "#0f3b5c",
  "#1a1a1a",
  "#3a3a3a",
  "#5a554d",
  "#7a756d",
  "#a8a39a",
  "#cfc8b9",
  "#e2dccd",
];

export function CompositionBar({
  segments,
  unit = "%",
  total,
}: CompositionBarProps) {
  const width = 760;
  const barHeight = 56;
  const top = 16;
  const labelArea = 220;
  const height = top + barHeight + 24 + segments.length * 18 + 16;
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0);
  const scale = (v: number) => (v / sum) * width;

  let cursor = 0;
  const placed = segments.map((s) => {
    const x = cursor;
    const w = scale(s.value);
    cursor += w;
    return { ...s, x, width: w };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Composition bar"
    >
      {placed.map((seg, si) => (
        <g key={si}>
          <rect
            x={seg.x}
            y={top}
            width={seg.width}
            height={barHeight}
            fill={PALETTE[si % PALETTE.length]}
            stroke="#f5f2ec"
            strokeWidth={1}
          >
            <title>{`${seg.label}: ${seg.display ?? `${seg.value}${unit}`}`}</title>
          </rect>
          {seg.width > 64 && (
            <text
              x={seg.x + seg.width / 2}
              y={top + barHeight / 2 + 4}
              textAnchor="middle"
              fontSize={11}
              fontFamily="var(--font-mono), monospace"
              fill={si < 4 ? "#f5f2ec" : "#1a1a1a"}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {seg.display ?? `${seg.value}${unit}`}
            </text>
          )}
        </g>
      ))}

      <g transform={`translate(0, ${top + barHeight + 18})`}>
        {placed.map((seg, si) => {
          const ypos = si * 18;
          return (
            <g key={si} transform={`translate(0, ${ypos})`}>
              <rect
                x={0}
                y={-9}
                width={12}
                height={12}
                fill={PALETTE[si % PALETTE.length]}
              />
              <text
                x={18}
                y={1}
                fontSize={11}
                fontFamily="var(--font-sans), sans-serif"
                fill="#1a1a1a"
              >
                {seg.label}
              </text>
              <text
                x={labelArea + 60}
                y={1}
                textAnchor="end"
                fontSize={11}
                fontFamily="var(--font-mono), monospace"
                fill="#7a756d"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {seg.display ?? `${seg.value}${unit}`}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
