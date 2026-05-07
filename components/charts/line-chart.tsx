export type LineSeries = {
  name: string;
  values: { x: number; y: number }[];
  emphasis?: boolean;
  dashed?: boolean;
};

export type LineBand = {
  values: { x: number; yLow: number; yHigh: number }[];
};

export type LineAnnotation = {
  x: number;
  y?: number;
  label: string;
  align?: "above" | "below" | "right";
};

export type LineChartProps = {
  series: LineSeries[];
  band?: LineBand;
  annotations?: LineAnnotation[];
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
  xUnit?: string;
  yUnit?: string;
  yUnitLabel?: string;
};

export function LineChart({
  series,
  band,
  annotations = [],
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  xUnit = "",
  yUnit = "",
  yUnitLabel,
}: LineChartProps) {
  const width = 760;
  const height = 380;
  const padding = { top: 24, right: 120, bottom: 48, left: 64 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const sx = (v: number) =>
    padding.left + ((v - xDomain[0]) / (xDomain[1] - xDomain[0])) * plotWidth;
  const sy = (v: number) =>
    padding.top + (1 - (v - yDomain[0]) / (yDomain[1] - yDomain[0])) * plotHeight;

  const buildPath = (points: { x: number; y: number }[]) =>
    points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.y)}`)
      .join(" ");

  const buildBandPath = (values: LineBand["values"]) => {
    if (values.length === 0) return "";
    const top = values.map((v) => `${sx(v.x)} ${sy(v.yHigh)}`).join(" L ");
    const bottom = [...values]
      .reverse()
      .map((v) => `${sx(v.x)} ${sy(v.yLow)}`)
      .join(" L ");
    return `M ${top} L ${bottom} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Line chart"
    >
      {yTicks.map((t) => (
        <g key={`y-${t}`}>
          <line
            x1={padding.left}
            x2={padding.left + plotWidth}
            y1={sy(t)}
            y2={sy(t)}
            stroke="#d8d2c4"
            strokeWidth={1}
          />
          <text
            x={padding.left - 12}
            y={sy(t) + 4}
            textAnchor="end"
            fontSize={10.5}
            fontFamily="var(--font-mono), monospace"
            fill="#7a756d"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {t}
            {yUnit}
          </text>
        </g>
      ))}

      {xTicks.map((t) => (
        <text
          key={`x-${t}`}
          x={sx(t)}
          y={padding.top + plotHeight + 22}
          textAnchor="middle"
          fontSize={10.5}
          fontFamily="var(--font-mono), monospace"
          fill="#7a756d"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {t}
          {xUnit}
        </text>
      ))}

      {band && (
        <path
          d={buildBandPath(band.values)}
          fill="#0f3b5c"
          fillOpacity={0.08}
          stroke="none"
        />
      )}

      {series.map((s, si) => (
        <g key={si}>
          <path
            d={buildPath(s.values)}
            fill="none"
            stroke={s.emphasis ? "#0f3b5c" : "#1a1a1a"}
            strokeWidth={s.emphasis ? 2.5 : 1.5}
            strokeDasharray={s.dashed ? "5 4" : undefined}
          />
          {s.values.map((p, pi) => (
            <circle
              key={pi}
              cx={sx(p.x)}
              cy={sy(p.y)}
              r={3}
              fill={s.emphasis ? "#0f3b5c" : "#1a1a1a"}
            >
              <title>{`${s.name}: ${p.x}${xUnit}, ${p.y}${yUnit}`}</title>
            </circle>
          ))}
          {s.values.length > 0 && (
            <text
              x={sx(s.values[s.values.length - 1].x) + 10}
              y={sy(s.values[s.values.length - 1].y) + 4}
              fontSize={11}
              fontFamily="var(--font-serif), Georgia, serif"
              fill={s.emphasis ? "#0f3b5c" : "#1a1a1a"}
              fontStyle={s.emphasis ? "normal" : "italic"}
            >
              {s.name}
            </text>
          )}
        </g>
      ))}

      {annotations.map((a, ai) => {
        const yPos = a.y !== undefined ? sy(a.y) : padding.top + 12;
        const xPos = sx(a.x);
        const align = a.align ?? "above";
        const labelOffset = align === "below" ? 18 : -12;
        return (
          <g key={ai}>
            <line
              x1={xPos}
              x2={xPos}
              y1={padding.top}
              y2={padding.top + plotHeight}
              stroke="#7a756d"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={xPos + 6}
              y={yPos + labelOffset}
              fontSize={10}
              fontFamily="var(--font-mono), monospace"
              fill="#7a756d"
              style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              {a.label}
            </text>
          </g>
        );
      })}

      {yUnitLabel && (
        <text
          x={padding.left}
          y={14}
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
          fill="#7a756d"
        >
          {yUnitLabel}
        </text>
      )}
    </svg>
  );
}
