export type ComparisonBarRow = {
  label: string;
  value: number;
  display?: string;
  emphasis?: boolean;
};

export type ComparisonBarsProps = {
  rows: ComparisonBarRow[];
  domainMin?: number;
  domainMax: number;
  unit?: string;
  zeroLine?: boolean;
  axisTicks?: number[];
  rowHeight?: number;
};

export function ComparisonBars({
  rows,
  domainMin = 0,
  domainMax,
  unit = "",
  zeroLine = false,
  axisTicks,
  rowHeight = 36,
}: ComparisonBarsProps) {
  const width = 760;
  const labelWidth = 200;
  const valueWidth = 230;
  const plotLeft = labelWidth;
  const plotRight = width - valueWidth;
  const plotWidth = plotRight - plotLeft;
  const top = 16;
  const plotHeight = rows.length * rowHeight;
  const axisHeight = 28;
  const height = top + plotHeight + axisHeight;

  const scale = (v: number) =>
    plotLeft + ((v - domainMin) / (domainMax - domainMin)) * plotWidth;

  const ticks =
    axisTicks ??
    Array.from({ length: 6 }, (_, i) => domainMin + (i / 5) * (domainMax - domainMin));

  const zeroX = scale(0);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Comparison bar chart"
    >
      {rows.map((_, i) =>
        i % 2 === 1 ? (
          <rect
            key={`zebra-${i}`}
            x={plotLeft}
            y={top + i * rowHeight}
            width={plotWidth}
            height={rowHeight}
            fill="#ede8df"
            opacity={0.45}
          />
        ) : null
      )}

      {ticks.map((t) => (
        <line
          key={t}
          x1={scale(t)}
          x2={scale(t)}
          y1={top}
          y2={top + plotHeight}
          stroke="#d8d2c4"
          strokeWidth={1}
        />
      ))}

      {ticks.map((t) => (
        <text
          key={`t-${t}`}
          x={scale(t)}
          y={top + plotHeight + 18}
          textAnchor="middle"
          fontSize={10.5}
          fontFamily="var(--font-mono), monospace"
          fill="#7a756d"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {Number.isInteger(t) ? t : t.toFixed(1)}
        </text>
      ))}

      {zeroLine && (
        <line
          x1={zeroX}
          x2={zeroX}
          y1={top}
          y2={top + plotHeight}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />
      )}

      {rows.map((row, i) => {
        const y = top + i * rowHeight + rowHeight / 2;
        const fill = row.emphasis ? "#0f3b5c" : "#4a7da9";
        const x = row.value < 0 ? scale(row.value) : zeroX;
        const w =
          row.value < 0
            ? zeroX - scale(row.value)
            : scale(row.value) - zeroX;
        const barH = rowHeight - 14;
        return (
          <g key={i}>
            <text
              x={labelWidth - 14}
              y={y + 4}
              textAnchor="end"
              fontSize={13}
              fontFamily="var(--font-serif), Georgia, serif"
              fill="#1a1a1a"
            >
              {row.label}
            </text>
            <rect
              x={x}
              y={y - barH / 2}
              width={Math.max(w, 1)}
              height={barH}
              fill={fill}
            >
              <title>{`${row.label}: ${row.display ?? `${row.value}${unit}`}`}</title>
            </rect>
            <text
              x={plotRight + 12}
              y={y + 4}
              fontSize={11.5}
              fontFamily="var(--font-mono), monospace"
              fill="#1a1a1a"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {row.display ?? `${row.value}${unit}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
