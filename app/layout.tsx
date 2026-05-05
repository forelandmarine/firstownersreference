import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import {
  organizationSchema,
  websiteSchema,
  jackPersonSchema,
  danPersonSchema,
} from "@/lib/jsonld";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "The First Owner's Reference | A yachting field manual",
    template: "%s | The First Owner's Reference",
  },
  description:
    "An independent, contributor-led yachting field manual for first-time superyacht buyers. Cost of ownership, market structure, acquisition, refit, operations, and the questions to ask before signing. Written by Foreland Marine. 1st Edition, 2026.",
  metadataBase: new URL("https://firstownersreference.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The First Owner's Reference",
    description:
      "An independent, contributor-led yachting field manual for first-time superyacht buyers. 1st Edition, 2026.",
    type: "website",
    locale: "en_GB",
    siteName: "The First Owner's Reference",
    url: "https://firstownersreference.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The First Owner's Reference",
    description:
      "An independent yachting field manual for first-time superyacht buyers. 1st Edition, 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-paper text-charcoal font-serif">
        <JsonLd
          nodes={[
            organizationSchema(),
            websiteSchema(),
            jackPersonSchema(),
            danPersonSchema(),
          ]}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
