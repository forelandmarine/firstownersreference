export type StackSegment = {
  label: string;
  value: number;
};

export type PairedStackedBarsProps = {
  groups: { label: string; segments: StackSegment[]; total?: string }[];
  unit?: string;
  domainMax?: number;
  barHeight?: number;
};

const PALETTE = [
  "#0f3b5c",
  "#4a7da9",
  "#88a9c6",
  "#7a756d",
  "#d8d2c4",
];

export function PairedStackedBars({
  groups,
  unit = "",
  domainMax,
  barHeight = 60,
}: PairedStackedBarsProps) {
  const width = 760;
  const labelWidth = 180;
  const totalWidth = 100;
  const plotLeft = labelWidth;
  const plotRight = width - totalWidth;
  const plotWidth = plotRight - plotLeft;
  const groupGap = 16;
  const groupHeight = barHeight + groupGap;
  const top = 16;
  const legendHeight = 60;
  const height = top + groups.length * groupHeight + legendHeight;

  const computedMax =
    domainMax ??
    Math.max(
      ...groups.map((g) => g.segments.reduce((a, s) => a + s.value, 0))
    );

  const scale = (v: number) => (v / computedMax) * plotWidth;

  const allLabels = Array.from(
    new Set(groups.flatMap((g) => g.segments.map((s) => s.label)))
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Paired stacked bar chart"
    >
      {groups.map((group, gi) => {
        let x = plotLeft;
        const y = top + gi * groupHeight;
        const sum = group.segments.reduce((a, s) => a + s.value, 0);
        return (
          <g key={gi}>
            <text
              x={labelWidth - 14}
              y={y + barHeight / 2 + 4}
              textAnchor="end"
              fontSize={13}
              fontFamily="var(--font-serif), Georgia, serif"
              fill="#1a1a1a"
            >
              {group.label}
            </text>
            {group.segments.map((seg, si) => {
              const w = scale(seg.value);
              const fill = PALETTE[allLabels.indexOf(seg.label) % PALETTE.length];
              const segX = x;
              x += w;
              return (
                <g key={si}>
                  <rect
                    x={segX}
                    y={y}
                    width={w}
                    height={barHeight}
                    fill={fill}
                    stroke="#f5f2ec"
                    strokeWidth={1}
                  >
                    <title>{`${group.label}, ${seg.label}: ${seg.value}${unit}`}</title>
                  </rect>
                  {w > 60 && (
                    <text
                      x={segX + w / 2}
                      y={y + barHeight / 2 + 4}
                      textAnchor="middle"
                      fontSize={11}
                      fontFamily="var(--font-mono), monospace"
                      fill={si === 0 || si === 1 ? "#f5f2ec" : "#1a1a1a"}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {seg.value}
                      {unit}
                    </text>
                  )}
                </g>
              );
            })}
            <text
              x={plotRight + 12}
              y={y + barHeight / 2 + 4}
              fontSize={12}
              fontFamily="var(--font-mono), monospace"
              fill="#1a1a1a"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {group.total ?? `${sum}${unit}`}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${plotLeft}, ${top + groups.length * groupHeight + 16})`}>
        {allLabels.map((label, li) => {
          const xpos = (li % 4) * 180;
          const ypos = Math.floor(li / 4) * 18;
          return (
            <g key={label} transform={`translate(${xpos}, ${ypos})`}>
              <rect
                x={0}
                y={-9}
                width={12}
                height={12}
                fill={PALETTE[li % PALETTE.length]}
              />
              <text
                x={18}
                y={1}
                fontSize={11}
                fontFamily="var(--font-sans), sans-serif"
                fill="#1a1a1a"
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
