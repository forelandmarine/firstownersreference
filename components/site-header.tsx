import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none min-w-0">
          <span className="font-serif text-lg md:text-2xl tracking-tight text-charcoal whitespace-nowrap">
            The First Owner&rsquo;s Reference
          </span>
          <span className="hidden sm:block font-serif italic text-sm text-stone mt-1">
            An annual yachting field manual
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-serif text-base text-charcoal">
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
        <MobileNav />
      </div>
    </header>
  );
}
