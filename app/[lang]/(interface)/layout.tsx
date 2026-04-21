import { Cairo, Outfit } from "next/font/google";

import { cn } from "@/lib/utils";

import Footer from "./components/footer";
import Header from "./components/header";
import { Locale } from "@/i18n-config";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>) {
  const lang = (await params).lang;
  return (
    <div
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={cn(
        lang === "ar" ? cairo.className : outfit.className,
        "relative"
      )}
    >
      <Header
        lang={lang as Locale}
        className="border-b border-b-foreground/20"
      />
      <div className="md:mt-28 mt-24">{children}</div>
      <Footer lang={lang} />
    </div>
  );
}
