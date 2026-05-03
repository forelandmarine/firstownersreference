import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-base tracking-tight text-charcoal">
            The First Owner&rsquo;s Reference
          </span>
          <span className="meta mt-1">Edition One &middot; 2026</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 meta">
          <Link href="/#sections" className="link">
            Sections
          </Link>
          <Link href="/tools/running-cost-calculator" className="link">
            Calculator
          </Link>
          <Link href="/contributors" className="link">
            Contributors
          </Link>
          <Link href="/glossary" className="link">
            Glossary
          </Link>
          <Link href="/request-print-edition" className="link-marine">
            Request print copy
          </Link>
        </nav>
      </div>
    </header>
  );
}
