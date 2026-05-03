"use client";

import { useState } from "react";

export function ShareChapter({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/${slug}`
        : `https://firstownersreference.com/${slug}`;
    const shareData = {
      title: `${title} | The First Owner\u2019s Reference`,
      text: title,
      url,
    };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed; fall through to copy
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
        return;
      } catch {
        // ignore
      }
    }
    if (typeof window !== "undefined") {
      window.location.href = `mailto:?subject=${encodeURIComponent(
        `${title} | The First Owner\u2019s Reference`
      )}&body=${encodeURIComponent(url)}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      className="inline-flex items-center gap-2 meta-marine hover:text-charcoal transition-colors"
      aria-label="Share this chapter"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 4.5a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
        <path d="M5 7a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
        <path d="M11 9.5a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
        <path d="M5 7l4-2" />
        <path d="M5 7l4 2" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
