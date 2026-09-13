import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/tools/yacht-vat-2026",
        destination: "/tools/yacht-vat",
        permanent: true,
      },
      {
        source: "/tools/captain-and-crew-salary-2026",
        destination: "/tools/captain-and-crew-salary",
        permanent: true,
      },
      {
        source: "/tools/yacht-insurance-cost-2026",
        destination: "/tools/yacht-insurance-cost",
        permanent: true,
      },
      {
        source: "/:slug/lead-essay",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
