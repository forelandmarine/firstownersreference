import type { DataSpread } from "@/lib/data-spreads";

export function DataSpreadBody({ spread }: { spread: DataSpread }) {
  return (
    <div className="space-y-12">
      {spread.blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h3
              key={i}
              className="font-serif font-light text-2xl lg:text-3xl tracking-tight border-t border-charcoal pt-8"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p
              key={i}
              className="font-serif text-lg leading-relaxed text-charcoal-soft max-w-prose"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "table") {
          return (
            <figure key={i} className="space-y-4">
              {block.caption && (
                <figcaption className="caption max-w-prose">
                  {block.caption}
                </figcaption>
              )}
              <div className="overflow-x-auto -mx-6 lg:mx-0">
                <table className="w-full text-sm border-t border-charcoal">
                  <thead>
                    <tr className="border-b border-rule">
                      {block.head.map((h, hi) => (
                        <th
                          key={hi}
                          className="meta text-charcoal text-left py-3 pr-6"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-rule">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`py-4 pr-6 align-top ${
                              ci === 0
                                ? "font-serif text-base text-charcoal"
                                : "font-sans text-sm text-charcoal-soft"
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
            <figure key={i} className="space-y-4">
              {block.caption && (
                <figcaption className="caption max-w-prose">
                  {block.caption}
                </figcaption>
              )}
              <dl className="border-t border-charcoal">
                {block.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4 border-b border-rule"
                  >
                    <dt className="md:col-span-5 font-serif text-base text-charcoal">
                      {row.label}
                    </dt>
                    <dd className="md:col-span-7">
                      <p className="font-sans text-sm text-charcoal-soft">
                        {row.value}
                      </p>
                      {row.note && <p className="meta mt-1">{row.note}</p>}
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
              key={i}
              className="caption border-l-2 border-marine pl-4 max-w-prose"
            >
              {block.text}
            </p>
          );
        }
        return null;
      })}

      <section className="border-t border-charcoal pt-8 space-y-4">
        <h3 className="meta">Sources</h3>
        <ul className="space-y-3">
          {spread.sources.map((s, si) => (
            <li key={si} className="caption max-w-prose">
              <span className="font-serif text-charcoal">{s.label}.</span>{" "}
              {s.line}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
