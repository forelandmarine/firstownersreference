import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The First Owner's Reference",
    short_name: "First Owner",
    description:
      "A yachting field manual, published annually. An editorial publication for first-time superyacht buyers.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ec",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
