import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule bg-paper-deep">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl leading-tight tracking-tight">
            The First Owner&rsquo;s Reference
          </p>
          <p className="meta mt-3">1st Edition &middot; 2026</p>
          <p className="caption mt-6 max-w-md">
            A yachting field manual, published annually. Independent. Contributor-led.
            Written by Foreland Marine. No advertising, ever.
          </p>
          <p className="caption mt-4">
            Editorial:{" "}
            <a
              href="mailto:editors@firstownersreference.com"
              className="link-marine"
            >
              editors@firstownersreference.com
            </a>
          </p>
        </div>
        <div>
          <p className="meta mb-4">Read</p>
          <ul className="space-y-2 caption">
            <li>
              <Link href="/#chapters" className="link">
                All chapters
              </Link>
            </li>
            <li>
              <Link href="/tools/running-cost-calculator" className="link">
                Running cost calculator
              </Link>
            </li>
            <li>
              <Link href="/contributors" className="link">
                Contributors
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="link">
                Glossary
              </Link>
            </li>
            <li>
              <Link href="/search" className="link">
                Search
              </Link>
            </li>
            <li>
              <Link href="/request-print-edition" className="link">
                Request print copy
              </Link>
            </li>
            <li>
              <Link href="/colophon" className="link">
                Colophon
              </Link>
            </li>
            <li>
              <Link href="/press" className="link">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-end gap-4">
          <div>
            <p className="meta mb-4">Publisher</p>
            <p className="caption mb-2">Published by Foreland Marine.</p>
            <p className="caption mb-6">
              An independent superyacht consultancy headquartered in London.
            </p>
            <a
              href="https://forelandmarine.com"
              className="link-marine caption"
              target="_blank"
              rel="noopener noreferrer"
            >
              forelandmarine.com
            </a>
          </div>
          <Image
            src="/brand/foreland-lighthouse-charcoal.svg"
            alt="Foreland Marine lighthouse"
            width={42}
            height={42}
            className="opacity-40 shrink-0"
          />
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="meta">
            &copy; 2026 Foreland Marine Consultancy Limited
          </p>
          <p className="meta">ISSN pending &middot; Print run 500 &middot; Hand numbered</p>
          <p className="meta">
            Website by{" "}
            <a
              href="https://faro.is"
              target="_blank"
              rel="noopener noreferrer"
              className="link-marine"
            >
              Faro Creative
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
