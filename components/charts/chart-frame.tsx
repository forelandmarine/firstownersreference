import type { ReactNode } from "react";

export type ChartFrameProps = {
  number?: string;
  label?: string;
  title: string;
  standfirst?: string;
  caption?: string;
  source?: string;
  children: ReactNode;
};

export function ChartFrame({
  number,
  label = "Figure",
  title,
  standfirst,
  caption,
  source,
  children,
}: ChartFrameProps) {
  return (
    <figure className="space-y-4 border-t border-charcoal pt-6">
      <header className="space-y-2 max-w-prose">
        <p className="meta-marine">
          {label}
          {number ? ` ${number}` : ""}
        </p>
        <h4 className="font-serif font-light text-xl lg:text-2xl tracking-tight text-charcoal leading-tight">
          {title}
        </h4>
        {standfirst && <p className="caption max-w-prose">{standfirst}</p>}
      </header>
      <div className="w-full">{children}</div>
      <footer className="space-y-1 max-w-prose">
        {caption && <p className="caption">{caption}</p>}
        {source && <p className="meta">Source. {source}</p>}
      </footer>
    </figure>
  );
}
