export type RangeBarRow = {
  label: string;
  from: number;
  to: number;
  note?: string;
};

export type RangeBarsProps = {
  rows: RangeBarRow[];
  domainMin?: number;
  domainMax: number;
  unit?: string;
  unitLabel?: string;
  axisTicks?: number[];
  rowHeight?: number;
  labelWidth?: number;
  valueWidth?: number;
};

export function RangeBars({
  rows,
  domainMin = 0,
  domainMax,
  unit = "",
  unitLabel,
  axisTicks,
  rowHeight = 36,
  labelWidth = 220,
  valueWidth = 110,
}: RangeBarsProps) {
  const width = 760;
  const top = 16;
  const plotLeft = labelWidth;
  const plotRight = width - valueWidth;
  const plotWidth = plotRight - plotLeft;
  const plotHeight = rows.length * rowHeight;
  const axisHeight = 28;
  const height = top + plotHeight + axisHeight;

  const scale = (v: number) =>
    plotLeft + ((v - domainMin) / (domainMax - domainMin)) * plotWidth;

  const ticks =
    axisTicks ??
    Array.from({ length: 6 }, (_, i) => domainMin + (i / 5) * (domainMax - domainMin));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Range bar chart"
    >
      <g>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={scale(t)}
              x2={scale(t)}
              y1={top}
              y2={top + plotHeight}
              stroke="#d8d2c4"
              strokeWidth={1}
            />
            <text
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
          </g>
        ))}
      </g>

      {rows.map((row, i) => {
        const y = top + i * rowHeight + rowHeight / 2;
        const x1 = scale(row.from);
        const x2 = scale(row.to);
        const isPoint = row.from === row.to;
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
            {isPoint ? (
              <circle cx={x1} cy={y} r={5} fill="#0f3b5c">
                <title>{`${row.label}: ${row.from}${unit}${row.note ? ` (${row.note})` : ""}`}</title>
              </circle>
            ) : (
              <>
                <line
                  x1={x1}
                  x2={x2}
                  y1={y}
                  y2={y}
                  stroke="#0f3b5c"
                  strokeWidth={7}
                  strokeLinecap="round"
                >
                  <title>{`${row.label}: ${row.from} to ${row.to}${unit}${row.note ? ` (${row.note})` : ""}`}</title>
                </line>
              </>
            )}
            <text
              x={plotRight + 12}
              y={y + 4}
              fontSize={11.5}
              fontFamily="var(--font-mono), monospace"
              fill="#1a1a1a"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {row.from === row.to
                ? `${row.from}${unit}`
                : `${row.from} to ${row.to}${unit}`}
            </text>
          </g>
        );
      })}

      {unitLabel && (
        <text
          x={plotLeft}
          y={top + plotHeight + axisHeight - 2}
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
          fill="#7a756d"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {unitLabel}
        </text>
      )}
    </svg>
  );
}
