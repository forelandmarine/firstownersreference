"use client";

/* Shared field components and list helpers for the studio editors. */

import { useCallback, useLayoutEffect, useRef } from "react";
import { smarten } from "@/lib/studio/typography";

export function moveItem<T>(arr: readonly T[], from: number, to: number): T[] {
  const next = [...arr];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
}

export function replaceAt<T>(arr: readonly T[], i: number, x: T): T[] {
  return arr.map((v, j) => (j === i ? x : v));
}

export function removeAt<T>(arr: readonly T[], i: number): T[] {
  return arr.filter((_, j) => j !== i);
}

/* Smartening rewrites the field value, which would throw the caret to the
   end on every converted quote. smarten() is one-for-one on length, so the
   caret position captured at input time stays valid after the rewrite. */
function useSmartField<T extends HTMLTextAreaElement | HTMLInputElement>(
  value: string,
  onChange: (v: string) => void
) {
  const ref = useRef<T>(null);
  const caret = useRef<number | null>(null);
  const handleChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      caret.current = e.target.selectionStart;
      onChange(smarten(e.target.value));
    },
    [onChange]
  );
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && caret.current !== null && document.activeElement === el) {
      el.setSelectionRange(caret.current, caret.current);
    }
    caret.current = null;
  }, [value]);
  return { ref, handleChange };
}

/* Auto-growing textarea that smartens quotes on every change. */
export function TextField({
  value,
  onChange,
  className = "",
  placeholder,
  spellCheck = true,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  spellCheck?: boolean;
}) {
  const { ref, handleChange } = useSmartField<HTMLTextAreaElement>(
    value,
    onChange
  );
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, ref]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      placeholder={placeholder}
      spellCheck={spellCheck}
      onChange={handleChange}
      className={`w-full resize-none overflow-hidden bg-transparent outline-none focus:bg-white/60 rounded-sm px-1 -mx-1 transition-colors ${className}`}
    />
  );
}

export function MetaInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const { ref, handleChange } = useSmartField<HTMLInputElement>(
    value,
    onChange
  );
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className={`w-full bg-transparent outline-none focus:bg-white/60 rounded-sm px-1 -mx-1 font-sans text-small text-charcoal-soft ${className}`}
    />
  );
}

export function TypeChip({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-block font-sans text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${tone}`}
    >
      {label}
    </span>
  );
}

export function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-sans text-meta uppercase tracking-wider text-stone">
        {label}
      </span>
      {children}
    </label>
  );
}

/* Compact up / down / delete controls for list rows. */
export function RowControls({
  index,
  total,
  onMove,
  onRemove,
  confirmRemove,
}: {
  index: number;
  total: number;
  onMove: (delta: number) => void;
  onRemove: () => void;
  confirmRemove?: string;
}) {
  return (
    <span className="inline-flex shrink-0 gap-0.5">
      <button
        onClick={() => onMove(-1)}
        disabled={index === 0}
        title="Move up"
        className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
      >
        ↑
      </button>
      <button
        onClick={() => onMove(1)}
        disabled={index === total - 1}
        title="Move down"
        className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
      >
        ↓
      </button>
      <button
        onClick={() => {
          if (confirmRemove && !window.confirm(confirmRemove)) return;
          onRemove();
        }}
        title="Delete"
        className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone hover:border-red-700 hover:text-red-700"
      >
        ✕
      </button>
    </span>
  );
}

export function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-meta rounded-sm border border-rule bg-paper px-2 py-1 text-stone hover:bg-white"
    >
      + {label}
    </button>
  );
}

/* Confirm before destructive removal when the item holds real text. */
export function confirmIf(hasContent: boolean, message: string): boolean {
  return !hasContent || window.confirm(message);
}
