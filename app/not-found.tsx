import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Page not found | The First Owner’s Reference",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="bg-paper">
        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="meta-marine">404</p>
            <p className="meta mt-2">Off chart</p>
          </div>
          <div className="lg:col-span-9 space-y-8">
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              That page is not in the field manual.
            </h1>
            <p className="font-serif text-lg lg:text-xl leading-relaxed text-charcoal-soft max-w-2xl">
              The page you tried to reach has been moved, retired, or never
              existed. Try one of the routes below, or write to the editor if
              you arrived from a citation.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl pt-4">
              <li>
                <Link href="/" className="link font-serif text-lg">
                  All chapters
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="link font-serif text-lg"
                >
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/running-cost-calculator"
                  className="link font-serif text-lg"
                >
                  Running cost calculator
                </Link>
              </li>
              <li>
                <Link href="/search" className="link font-serif text-lg">
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="link font-serif text-lg"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link href="/colophon" className="link font-serif text-lg">
                  Colophon
                </Link>
              </li>
            </ul>
            <p className="caption pt-4">
              Citation issue? Write to{" "}
              <a
                href="mailto:editor@firstownersreference.com"
                className="link-marine"
              >
                editor@firstownersreference.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
