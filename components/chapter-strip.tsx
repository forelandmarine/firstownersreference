"use client";

import { useEffect, useState } from "react";

export type ChapterStripSection = {
  id: string;
  label: string;
};

export function ChapterStrip({
  number,
  title,
  sections,
}: {
  number: string;
  title: string;
  sections: ChapterStripSection[];
}) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 320);
      const positions = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: s.id, top: rect.top };
        })
        .filter(Boolean) as { id: string; top: number }[];
      const above = positions.filter((p) => p.top - 120 <= 0);
      const current = above.length ? above[above.length - 1].id : positions[0]?.id ?? null;
      setActiveId(current);
    };
    update();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed left-0 right-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-rule transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ top: "var(--header-h, 50px)" }}
    >
      <div className="px-6 py-2.5 flex items-baseline gap-3 overflow-x-auto">
        <span className="meta-marine shrink-0">Ch&nbsp;{number}</span>
        <span className="font-serif text-sm text-charcoal-soft shrink-0 truncate max-w-[40%]">
          {title}
        </span>
        <nav className="flex items-baseline gap-3 shrink-0 ml-auto">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`meta whitespace-nowrap transition-colors ${
                activeId === s.id ? "text-marine" : "text-stone hover:text-charcoal"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
