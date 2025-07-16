import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Markdown Editor - Boad Technologies",
    short_name: "MD Editor",
    description: "Professional Markdown editor with live preview and advanced features",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["productivity", "utilities"],
    shortcuts: [
      {
        name: "New Document",
        short_name: "New",
        description: "Create a new markdown document",
        url: "/?new=true",
        icons: [{ src: "/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  }
}
