"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { href: "/#chapters", label: "Chapters" },
  { href: "/tools/running-cost-calculator", label: "Calculator" },
  { href: "/glossary", label: "Glossary" },
  { href: "/contributors", label: "Contributors" },
  { href: "/search", label: "Search" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const list = Array.from(focusables);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex flex-col gap-[5px] py-2 px-2 -mr-2"
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-paper overflow-y-auto"
        >
          <div className="min-h-full flex flex-col">
            <header className="border-b border-rule px-6 py-4 flex items-start justify-between gap-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex flex-col leading-none"
              >
                <span className="font-serif text-lg tracking-tight text-charcoal">
                  The First Owner&rsquo;s Reference
                </span>
                <span className="font-serif italic text-sm text-stone mt-1">
                  A yachting field manual, published annually
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="meta-marine pt-1 shrink-0"
              >
                Close
              </button>
            </header>

            <nav className="px-6 py-10 flex flex-col">
              <p className="meta mb-5">Read</p>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl text-charcoal py-4 border-b border-rule first:border-t first:border-rule"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/request-print-edition"
                onClick={() => setOpen(false)}
                className="font-serif text-2xl text-marine py-4 mt-8 inline-flex items-center gap-2 border-b border-marine"
              >
                Request a print copy <span aria-hidden>&rarr;</span>
              </Link>
            </nav>

            <footer className="mt-auto border-t border-rule px-6 py-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="meta mb-2">Edition One &middot; 2026</p>
                  <p className="caption max-w-xs">
                    Edited by Jack MacNally and Daniel Marks. Published by
                    Foreland Marine.
                  </p>
                  <p className="caption mt-3">
                    <a
                      href="mailto:editor@firstownersreference.com"
                      className="link-marine"
                    >
                      editor@firstownersreference.com
                    </a>
                  </p>
                </div>
                <Image
                  src="/brand/foreland-lighthouse-charcoal.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="opacity-30 shrink-0"
                />
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
