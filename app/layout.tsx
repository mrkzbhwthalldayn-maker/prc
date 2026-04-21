import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { cn } from "@/lib/utils";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prc.ly"),

  title: "Libyan Polymer Research Center | المركز الليبي لبحوث اللدائن",

  description:
    "Libyan Polymer Research Center is a leading scientific institution in Libya specializing in polymer and plastic research, innovation, and industrial support.",

  keywords: [
    "Libyan Polymer Research Center",
    "PRC Libya",
    "Polymer Research Libya",
    "المركز الليبي لبحوث اللدائن",
  ],

  verification: {
    google: "WUvGI62OW9RzSkInnwhFNrcBRV9rhvRsRJf2rBSJWJ0",
  },

  openGraph: {
    title: "Libyan Polymer Research Center",
    description: "Polymer research and innovation center in Libya.",
    siteName: "PRC Libya",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(cairo.className)}>
        {children}
      </body>
    </html>
  );
}
