"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// The title is hidden at the top of the page and fades in over the first
// FADE_PX of scroll.
const FADE_PX = 120;

export function HeaderLogo() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const o = Math.min(1, Math.max(0, window.scrollY / FADE_PX));
      ref.current?.style.setProperty("--logo-o", String(o));
      ref.current?.toggleAttribute("data-hidden", o === 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      data-hidden
      style={{ "--logo-o": 0 } as React.CSSProperties}
      className="flex flex-col leading-none min-w-0 opacity-(--logo-o) data-hidden:pointer-events-none data-hidden:invisible"
    >
      <span className="font-serif text-lg md:text-2xl tracking-tight text-charcoal whitespace-nowrap">
        The First Owner&rsquo;s Reference
      </span>
      <span className="hidden sm:block font-serif italic text-sm text-stone mt-1">
        A yachting field manual
      </span>
    </Link>
  );
}
