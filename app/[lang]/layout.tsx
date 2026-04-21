import { i18n, Locale } from "@/i18n-config";
import { Metadata } from "next";
import React, { Fragment, ReactNode } from "react";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const data = {
    ar: {
      title: "المركز الليبي لبحوث اللدائن",
      description:
        "المركز الليبي لبحوث اللدائن هو مركز بحثي يعمل على تطوير المعرفة والابتكار في مجال اللدائن والبوليمرات.",
    },
    en: {
      title: "Libyan Polymer Research Center",
      description:
        "The Libyan Polymer Research Center is a research center that works to advance knowledge and innovation in the field of polymers.",
    },
  };
  const currentData = data[lang];
  return {
    title: currentData.title,
    description: currentData.description,
    openGraph: {
      title: currentData.title,
      description: currentData.description,
      siteName: currentData.title,
      locale: lang === "ar" ? "ar_LY" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentData.title,
      description: currentData.description,
    },
    manifest: `/manifest.${lang}.json`, // This gets passed in from the route param
  };
}
const layout = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default layout;
// force clean rebuild
