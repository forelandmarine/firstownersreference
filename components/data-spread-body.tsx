import type { DataSpread, DataSpreadBlock } from "@/lib/data-spreads";
import { getChart } from "@/lib/charts";

type Group = { heading: string | null; blocks: DataSpreadBlock[] };

function groupByHeading(blocks: DataSpreadBlock[]): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  for (const block of blocks) {
    if (block.type === "h2") {
      if (current) groups.push(current);
      current = { heading: block.text, blocks: [] };
      continue;
    }
    if (!current) {
      current = { heading: null, blocks: [] };
    }
    current.blocks.push(block);
  }
  if (current) groups.push(current);
  return groups;
}

function renderBlock(block: DataSpreadBlock, key: number) {
  if (block.type === "paragraph") {
    return (
      <p
        key={key}
        className="font-serif text-base sm:text-lg leading-relaxed text-charcoal-soft max-w-prose"
      >
        {block.text}
      </p>
    );
  }
  if (block.type === "table") {
    return (
      <figure key={key} className="space-y-5">
        {block.caption && (
          <figcaption className="caption max-w-prose">
            {block.caption}
          </figcaption>
        )}
        <div className="overflow-x-auto -mx-6 lg:mx-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal">
                {block.head.map((h, hi) => (
                  <th
                    key={hi}
                    className="meta text-charcoal text-left py-3 pl-3 sm:pl-0 pr-3 sm:pr-6 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-rule last:border-b-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`py-4 sm:py-5 pl-3 sm:pl-0 pr-3 sm:pr-6 align-top ${
                        ci === 0
                          ? "font-serif text-sm sm:text-base text-charcoal"
                          : "font-sans text-xs sm:text-sm text-charcoal-soft leading-relaxed"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {block.sourceLine && (
          <p className="meta">Source. {block.sourceLine}</p>
        )}
      </figure>
    );
  }
  if (block.type === "kv") {
    return (
      <figure key={key} className="space-y-5">
        {block.caption && (
          <figcaption className="caption max-w-prose">
            {block.caption}
          </figcaption>
        )}
        <dl>
          {block.rows.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-5 border-b border-rule last:border-b-0 first:border-t first:border-charcoal"
            >
              <dt className="md:col-span-5 font-serif text-base text-charcoal">
                {row.label}
              </dt>
              <dd className="md:col-span-7">
                <p className="font-sans text-sm text-charcoal-soft leading-relaxed">
                  {row.value}
                </p>
                {row.note && <p className="meta mt-1.5">{row.note}</p>}
              </dd>
            </div>
          ))}
        </dl>
        {block.sourceLine && (
          <p className="meta">Source. {block.sourceLine}</p>
        )}
      </figure>
    );
  }
  if (block.type === "note") {
    return (
      <p
        key={key}
        className="caption border-l-2 border-marine pl-4 max-w-prose"
      >
        {block.text}
      </p>
    );
  }
  if (block.type === "chart") {
    const chart = getChart(block.chartId);
    if (!chart) return null;
    return (
      <div key={key} className="w-full">{chart}</div>
    );
  }
  return null;
}

export function DataSpreadBody({ spread }: { spread: DataSpread }) {
  const groups = groupByHeading(spread.blocks);

  return (
    <div className="space-y-24 lg:space-y-32">
      {groups.map((group, gi) => (
        <section key={gi} className="space-y-10">
          {group.heading && (
            <header>
              <p className="meta-marine mb-3">
                {String(gi + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif font-light text-2xl lg:text-3xl tracking-tight text-charcoal max-w-3xl">
                {group.heading}
              </h3>
            </header>
          )}
          <div className="space-y-12">
            {group.blocks.map((block, bi) => renderBlock(block, bi))}
          </div>
        </section>
      ))}

      <section className="pt-12 border-t border-charcoal space-y-6">
        <p className="meta-marine">Sources</p>
        <ul className="space-y-4">
          {spread.sources.map((s, si) => (
            <li key={si} className="caption max-w-prose leading-relaxed">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-charcoal link hover:text-marine"
                >
                  {s.label}
                </a>
              ) : (
                <span className="font-serif text-charcoal">{s.label}</span>
              )}
              <span className="text-charcoal-soft">. {s.line}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
