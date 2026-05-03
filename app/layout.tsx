import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

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
    default: "The First Owner's Reference",
    template: "%s | The First Owner's Reference",
  },
  description:
    "An annual editorial publication for first-time superyacht buyers. Independent, contributor-led, written by Foreland Marine. Edition One, 2026.",
  metadataBase: new URL("https://firstownersreference.com"),
  openGraph: {
    title: "The First Owner's Reference",
    description:
      "An annual editorial publication for first-time superyacht buyers. Independent, contributor-led, written by Foreland Marine.",
    type: "website",
    locale: "en_GB",
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
        {children}
      </body>
    </html>
  );
}
