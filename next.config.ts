import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:slug/lead-essay",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
