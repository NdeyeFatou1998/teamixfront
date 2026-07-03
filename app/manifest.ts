import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Teamix",
    short_name: "Teamix",
    description: "Plateforme entreprise B2B multi-tenant",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0dbfb8",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
