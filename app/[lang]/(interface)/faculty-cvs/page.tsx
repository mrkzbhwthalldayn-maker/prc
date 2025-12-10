import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import FacultyGrid from "@/components/mansory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getFacultyMembers } from "@/database/faculty";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) {
  const { lang } = await params;

  const content = {
    ar: {
      title: "السير الذاتية لأعضاء هيئة التدريس",
      description:
        "تعرف على السير الذاتية لأعضاء هيئة التدريس في المركز الليبي لبحوث اللدائن.",
    },
    en: {
      title: "Faculty Members' CVs",
      description:
        "Explore the CVs of the faculty members at the Libyan Center for Polymer Research.",
    },
  };

  const currentContent = content[lang];

  return {
    title: currentContent.title,
    description: currentContent.description,
    openGraph: {
      title: currentContent.title,
      description: currentContent.description,
      type: "article",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: currentContent.title,
      description: currentContent.description,
    },
  };
}

const FacultyMembersCvs = async ({
  params,
}: {
  params: Promise<{ lang: "ar" | "en" }>;
}) => {
  const { lang } = await params;

  const content = {
    ar: {
      header: "السير الذاتية لأعضاء هيئة التدريس",
      description: "اكتشف معلومات مفصلة حول خبرات وإنجازات أعضاء هيئة التدريس.",
    },
    en: {
      header: "Faculty Members' CVs",
      description:
        "Learn detailed information about the expertise and achievements of the faculty members.",
    },
  };

  const currentContent = content[lang];
  const members = await getFacultyMembers({});
  const memebersByLang = members.map((member) => {
    if (lang === "ar" && member.fullName && member.fullName.length > 0) {
      return member;
    }
    if (lang === "en" && member.enName && member.enName.length > 0) {
      return member;
    }
  });

  return (
    <main className="min-h-screen">
      <div className="container">
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
              <BreadcrumbPage>{currentContent.header}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold my-4">{currentContent.header}</h1>
        <p className="mb-8">{currentContent.description}</p>
        <FacultyGrid members={memebersByLang} />
      </div>
    </main>
  );
};

export default FacultyMembersCvs;
