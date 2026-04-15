import type { MetadataRoute } from "next";

const BASE_URL = "https://prc.ly";

const LOCALES = ["ar", "en"];

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

  for (const locale of LOCALES) {
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
