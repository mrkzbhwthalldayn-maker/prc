import { ReactNode } from "react";
import { i18n, Locale } from "@/i18n-config";
import { Metadata } from "next";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
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

  const current = data[lang];

  return {
    title: current.title,
    description: current.description,
    openGraph: {
      title: current.title,
      description: current.description,
      type: "website",
    },
  };
}

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
