import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maithil Cuisine — Tradition of Taste",
    short_name: "Maithil Cuisine",
    description:
      "Order authentic Maithili food online. Free delivery within 5 km in Jhanjharpur.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF5E6",
    theme_color: "#1E2D5A",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
