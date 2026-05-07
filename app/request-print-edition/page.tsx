import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a print copy of The First Owner's Reference",
  description:
    "1st Edition is a limited print run of 500 copies, casebound on Munken Pure stock, hand numbered and signed. Distribution is curated. Write to request a copy.",
  alternates: {
    canonical: "https://firstownersreference.com/request-print-edition",
  },
  openGraph: {
    title: "Request a print copy | The First Owner's Reference",
    description:
      "Hand-numbered 1st Edition. Curated distribution. Write to request a copy.",
    url: "https://firstownersreference.com/request-print-edition",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a print copy",
    description: "Hand-numbered 1st Edition. Curated distribution.",
  },
};

export default function PrintRequestPage() {
  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <span>Request print copy</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Request a print copy.
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Five hundred copies. Hand numbered. Signed by the editor on the
              final page. Sent without charge to a curated list of readers.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="prose-body text-charcoal-soft">
              <p>
                We do not sell copies. The print edition exists as an
                editorial artefact and as a relationship object. We send
                copies to readers for whom The First Owner’s Reference is genuinely useful:
                first-time buyers approaching an acquisition, family office
                principals, wealth managers, and members of a small number of
                clubs and learned societies whose members we expect to have
                use for it.
              </p>
              <p>
                Tell us briefly who you are and why a copy would be useful.
                We read every request and reply personally. If we run out, we
                will say so. Edition Two ships in September 2027.
              </p>
              <p>
                A digital edition with the full content of the print is also
                available, free, with an email address for the quarterly data
                supplements.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-rule lg:pl-12">
            <p className="caption mb-8 border border-rule bg-paper-deep px-4 py-3">
              Wireframe form. The production version will route to an editorial
              inbox at the publication. Until then, write to{" "}
              <a
                href="mailto:editors@firstownersreference.com"
                className="link-marine"
              >
                editors@firstownersreference.com
              </a>
              .
            </p>
            <form className="space-y-8" aria-disabled="true">
              <FormField id="print-name" label="Name" required>
                <input
                  id="print-name"
                  type="text"
                  name="name"
                  disabled
                  className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FormField>
              <FormField id="print-role" label="Role and organisation" required>
                <input
                  id="print-role"
                  type="text"
                  name="role"
                  disabled
                  placeholder="e.g. Family office principal, Acme Capital"
                  className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FormField>
              <FormField id="print-email" label="Email" required>
                <input
                  id="print-email"
                  type="email"
                  name="email"
                  disabled
                  className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FormField>
              <FormField id="print-address" label="Postal address" required>
                <textarea
                  id="print-address"
                  name="address"
                  disabled
                  rows={4}
                  className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FormField>
              <FormField
                id="print-why"
                label="Why The First Owner’s Reference is useful to you"
                required
              >
                <textarea
                  id="print-why"
                  name="why"
                  disabled
                  rows={5}
                  placeholder="A few sentences. We read every request."
                  className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FormField>
              <p className="caption text-charcoal-soft">
                Your details are used solely to send the print copy and to
                reply to your request. They are not shared, sold, or used for
                marketing. You may ask us to delete them at any time by writing
                to the editorial address above.
              </p>
              <button
                type="submit"
                disabled
                className="border border-charcoal bg-charcoal text-paper px-8 py-4 meta hover:bg-marine hover:border-marine transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit request
              </button>
            </form>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="meta block mb-3">
        {label}
        {required && <span className="text-marine ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
