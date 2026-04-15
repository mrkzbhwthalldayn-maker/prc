import { i18n, Locale } from "@/i18n-config";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const lang = params.lang;

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

    verification: {
      google: "WUvGI62OW9RzSkInnwhFNrcBRV9rhvRsRJf2rBSJWJ0",
    },

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

    manifest: `/manifest.${lang}.json`,
  };
}

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
