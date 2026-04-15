import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://prc.ly/ar",
      lastModified: new Date(),
    },
    {
      url: "https://prc.ly/en",
      lastModified: new Date(),
    },
  ];
}
