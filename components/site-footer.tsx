import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule bg-paper-deep">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl leading-tight tracking-tight">
            The First Owner&rsquo;s Reference
          </p>
          <p className="meta mt-3">Edition One &middot; 2026</p>
          <p className="caption mt-6 max-w-md">
            An annual editorial publication for first-time superyacht buyers.
            Independent. Contributor-led. Written by Foreland Marine. No
            advertising, ever.
          </p>
        </div>
        <div>
          <p className="meta mb-4">Read</p>
          <ul className="space-y-2 caption">
            <li>
              <Link href="/#sections" className="link">
                All sections
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
              <Link href="/colophon" className="link">
                Colophon
              </Link>
            </li>
          </ul>
        </div>
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
      </div>
      <div className="border-t border-rule">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="meta">
            &copy; 2026 Foreland Marine Consultancy Limited
          </p>
          <p className="meta">ISSN pending &middot; Print run 500 &middot; Hand numbered</p>
        </div>
      </div>
    </footer>
  );
}
