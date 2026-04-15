import { ReactNode } from "react";
import Image from "next/image";
import { CustomLink } from "@/components/custom-link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import LangRenderer from "../../../components/lang";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <main className="md:flex h-screen">
      <section className="hidden md:block md:flex-[3] bg-primary text-white text-center">
        <div>
          <Image
            src="/logo.png"
            width={1000}
            height={1000}
            alt="logo"
            className="w-full h-full object-cover"
            priority
          />

          <h2 className="text-2xl font-bold">
            <LangRenderer
              ar="لا تنتظر الوقت المناسب، اصنعه بنفسك."
              en="Don't wait for the right time, make it yourself."
            />
          </h2>
        </div>
      </section>

      <section className="md:flex-[2] flex flex-col justify-center relative">
        <CustomLink
          size="icon"
          variant="secondary"
          className={cn(
            "absolute top-2",
            lang === "ar" ? "right-2" : "left-2"
          )}
          href={`/${lang}`}
        >
          <LangRenderer en={<FaArrowLeft />} ar={<FaArrowRight />} />
        </CustomLink>

        {children}
      </section>
    </main>
  );
}
