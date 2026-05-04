import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SearchForm } from "@/components/search-form";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search The First Owner\u2019s Reference by topic, builder, yacht name, or keyword.",
  alternates: {
    canonical: "https://firstownersreference.com/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-paper min-h-[80dvh]">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="meta mb-6">The First Owner&rsquo;s Reference</p>
          <h1 className="font-serif font-light text-headline lg:text-[3rem] leading-[1.1] tracking-tight text-charcoal mb-12 max-w-3xl">
            Search the field manual.
          </h1>
          <SearchForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
