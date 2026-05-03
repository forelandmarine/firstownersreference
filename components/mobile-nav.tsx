"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/#chapters", label: "Chapters" },
  { href: "/tools/running-cost-calculator", label: "Calculator" },
  { href: "/glossary", label: "Glossary" },
  { href: "/contributors", label: "Contributors" },
  { href: "/search", label: "Search" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-[5px] py-2 px-2 -mr-2"
      >
        <span
          className={`block h-[1.5px] w-6 bg-charcoal transition-transform duration-200 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-charcoal transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-charcoal transition-transform duration-200 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-16 z-40 bg-paper border-t border-rule"
        >
          <nav className="flex flex-col px-6 py-10 gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-charcoal py-3 border-b border-rule"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/request-print-edition"
              onClick={() => setOpen(false)}
              className="font-serif text-2xl text-marine py-3 mt-4"
            >
              Request print copy &rarr;
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
