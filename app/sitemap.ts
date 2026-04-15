import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://prc.ly/ar",
      lastModified: "2026-01-01",
    },
    {
      url: "https://prc.ly/en",
      lastModified: "2026-01-01",
    },
  ];
}
