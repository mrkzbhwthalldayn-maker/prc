import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";

const BASE_URL = "https://prc.ly";

const STATIC_ROUTES = [
  "",
  "about",
  "contact-us",
  "faculty-cvs",
  "goals",
  "labs",
  "organizational-structure",
  "regulations",
  "scientific-and-technical-consultations",
  "search",
  "train-courses",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const route of STATIC_ROUTES) {
      const url =
        route === ""
          ? `${BASE_URL}/${locale}`
          : `${BASE_URL}/${locale}/${route}`;

      urls.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.7,
      });
    }
  }

  return urls;
}
