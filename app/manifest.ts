import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Teamix",
    short_name: "Teamix",
    description: "Hub de gestion entreprise B2B",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0dbfb8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
