// app/sitemap.ts

import { MetadataRoute } from "next";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const route of STATIC_ROUTES) {
      const path = route ? `/${locale}/${route}` : `/${locale}`;

      const alternates = Object.fromEntries(
        i18n.locales.map((altLocale) => [
          altLocale,
          route
            ? `${BASE_URL}/${altLocale}/${route}`
            : `${BASE_URL}/${altLocale}`,
        ])
      );

      urls.push({
        url: `${BASE_URL}${path}`,

        // ثابت أفضل للـ SEO بدل new Date() المتغير
        lastModified: new Date("2026-01-01"),

        changeFrequency: "weekly",

        priority: route === "" ? 1 : 0.7,

        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return urls;
}

  return urls;
}
