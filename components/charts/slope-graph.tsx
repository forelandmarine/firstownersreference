export type SlopeSeries = {
  name: string;
  values: { x: string; y: number; display?: string }[];
  emphasis?: boolean;
};

export type SlopeGraphProps = {
  series: SlopeSeries[];
  columns: string[];
  yDomain: [number, number];
  yUnit?: string;
};

export function SlopeGraph({
  series,
  columns,
  yDomain,
  yUnit = "",
}: SlopeGraphProps) {
  const width = 760;
  const height = 360;
  const padding = { top: 36, right: 200, bottom: 40, left: 200 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const colXs = columns.map(
    (_, i) =>
      padding.left +
      (columns.length === 1 ? plotWidth / 2 : (i / (columns.length - 1)) * plotWidth)
  );

  const sy = (v: number) =>
    padding.top + (1 - (v - yDomain[0]) / (yDomain[1] - yDomain[0])) * plotHeight;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Slope graph"
    >
      {columns.map((col, ci) => (
        <g key={col}>
          <line
            x1={colXs[ci]}
            x2={colXs[ci]}
            y1={padding.top - 8}
            y2={padding.top + plotHeight + 8}
            stroke="#d8d2c4"
            strokeWidth={1}
          />
          <text
            x={colXs[ci]}
            y={padding.top - 16}
            textAnchor="middle"
            fontSize={11}
            fontFamily="var(--font-mono), monospace"
            fill="#1a1a1a"
            style={{ letterSpacing: "0.04em" }}
          >
            {col}
          </text>
        </g>
      ))}

      {series.map((s, si) => {
        const path = s.values
          .map(
            (v, vi) =>
              `${vi === 0 ? "M" : "L"} ${colXs[columns.indexOf(v.x)]} ${sy(v.y)}`
          )
          .join(" ");
        const stroke = s.emphasis ? "#0f3b5c" : "#1a1a1a";
        const opacity = s.emphasis ? 1 : 0.55;
        const last = s.values[s.values.length - 1];
        const first = s.values[0];

        return (
          <g key={si} opacity={opacity}>
            <path
              d={path}
              fill="none"
              stroke={stroke}
              strokeWidth={s.emphasis ? 2.25 : 1.25}
            />
            {s.values.map((v, vi) => (
              <circle
                key={vi}
                cx={colXs[columns.indexOf(v.x)]}
                cy={sy(v.y)}
                r={s.emphasis ? 4 : 3}
                fill={stroke}
              >
                <title>{`${s.name}, ${v.x}: ${v.display ?? `${v.y}${yUnit}`}`}</title>
              </circle>
            ))}
            {first && (
              <text
                x={colXs[columns.indexOf(first.x)] - 12}
                y={sy(first.y) + 4}
                textAnchor="end"
                fontSize={12}
                fontFamily="var(--font-serif), Georgia, serif"
                fill="#1a1a1a"
              >
                {s.name}
              </text>
            )}
            {last && (
              <text
                x={colXs[columns.indexOf(last.x)] + 12}
                y={sy(last.y) + 4}
                fontSize={12}
                fontFamily="var(--font-mono), monospace"
                fill={stroke}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {last.display ?? `${last.y}${yUnit}`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
