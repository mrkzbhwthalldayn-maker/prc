import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import { getForms } from "@/database/forms";
import { CustomLink } from "@/components/custom-link";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> => {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const title =
    lang === "en"
      ? "Scientific and Technical Consultations - Libyan Polymer Research Center"
      : "الاستشارات العلمية والفنية - المركز الليبي لبحوث اللدائن";
  const description =
    lang === "en"
      ? "Explore our specialized laboratories focusing on polymer chemistry, thermal analysis, molecular analysis, and more. Discover advanced research and technologies."
      : "تعرف على مختبراتنا المتخصصة في كيمياء البوليمر، التحليل الحراري، التحليل الجزيئي، والمزيد. اكتشف أحدث الأبحاث والتقنيات.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/regulations`,
    },
    openGraph: {
      title: title,
      description,
      url: `/${lang}/regulations`,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          width: 1200,
          height: 630,
          alt: lab.title,
        })),
      ],
      locale: lang,
      siteName: lang === "en" ? "Forms and Regulations" : "نمادج ولوائح",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        ...dictionary.labs.map((lab) => ({
          url: lab.image,
          alt: lab.title,
        })),
      ],
    },
  };
};
const ConsultationsPage = async (props: {
  params: Promise<{ lang: Locale }>;
}) => {
  const params = await props.params;
  const lang = params.lang;
  const rules = await getForms({});

  const rulesByLang = rules.map((rule) => {
    if (lang === "en" && rule.enName && rule.enName.length > 0) {
      return rule;
    }
    if (lang === "ar" && rule.name && rule.name.length > 0) {
      return rule;
    }
  });

  return (
    <main className="bg-secondary min-h-screen">
      <div className="container pt-6 phone-only:py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>
                  <LangRenderer ar={"الرئيسية"} en={"Home"} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {lang === "en" ? "Forms and Regulations" : "نمادج ولوائح"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="phone-only:w-full px-2 mx-auto w-1/2">
        <h1 className="font-extrabold my-10 md:text-4xl text-center text-2xl">
          {lang === "en" ? "Forms and Regulations" : "نمادج ولوائح"}
        </h1>
        <div className="grid">
          {rulesByLang.map(
            (rule, index) =>
              rule && (
                <div
                  key={index}
                  className="my-1 transition-all phone-only:w-[90%] mx-auto duration-500 hover:scale-105 bg-card rounded-md flex justify-between items-center w-full py-2 px-4"
                >
                  <span>{lang === "en" ? rule.enName : rule.name}</span>
                  <CustomLink href={rule.url}>
                    {lang === "en" ? "Download" : "تحميل"}
                  </CustomLink>
                </div>
              )
          )}
        </div>
      </div>
    </main>
  );
};

export default ConsultationsPage;
