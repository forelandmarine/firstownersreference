"use client";

import { useEffect, useRef, useState } from "react";

export type ChapterStripSection = {
  id: string;
  label: string;
  href?: string;
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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

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

  useEffect(() => {
    if (!activeId) return;
    const scroller = scrollerRef.current;
    const link = linkRefs.current.get(activeId);
    if (!scroller || !link) return;
    const linkLeft = link.offsetLeft;
    const linkWidth = link.offsetWidth;
    const target = linkLeft - scroller.clientWidth / 2 + linkWidth / 2;
    scroller.scrollTo({ left: target, behavior: "smooth" });
  }, [activeId]);

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed left-0 right-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-rule transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ top: "var(--header-h, 50px)" }}
    >
      <div
        ref={scrollerRef}
        className="px-6 py-2.5 flex items-baseline gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <span className="meta-marine shrink-0">Ch&nbsp;{number}</span>
        <span className="font-serif text-sm text-charcoal-soft shrink-0 truncate max-w-[40%]">
          {title}
        </span>
        <nav className="flex items-baseline gap-4 shrink-0 ml-auto pr-2">
          {sections.map((s) => {
            const isActive = !s.href && activeId === s.id;
            return (
              <a
                key={s.id}
                ref={(el) => {
                  if (el) linkRefs.current.set(s.id, el);
                  else linkRefs.current.delete(s.id);
                }}
                href={s.href ?? `#${s.id}`}
                className={`meta whitespace-nowrap relative transition-colors duration-200 ${
                  isActive
                    ? "text-marine font-semibold"
                    : "text-stone hover:text-charcoal"
                }`}
              >
                {s.label}
                <span
                  aria-hidden
                  className={`absolute left-0 right-0 -bottom-1.5 h-px bg-marine transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
