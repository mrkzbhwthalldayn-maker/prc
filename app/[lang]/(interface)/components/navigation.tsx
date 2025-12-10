"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LangRenderer from "@/components/lang";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CustomLink } from "@/components/custom-link";
import ToggleTheme from "@/components/theme-toggle";
import { FaBars } from "react-icons/fa";
import { extractText } from "@/lib/text";

const about: {
  title: string;
  href: string;
  description: string;
  enTitle: string;
  enDesc: string;
}[] = [
  {
    title: "حول المركز",
    href: `/about#overview`,
    description:
      "تعريف شامل بالمركز الليبي لبحوث اللدائن ودوره في البحث العلمي وتطوير الصناعات.",
    enTitle: "About the Center",
    enDesc:
      "A comprehensive overview of the Libyan Center for Plastic Research, its role in scientific research, and industrial development.",
  },
  {
    title: "لماذا نحن",
    href: "/about#why",
    description:
      "رسالة ترحيبية من مدير المركز تبرز رؤية المركز وأهدافه الاستراتيجية.",
    enTitle: "Why Us",
    enDesc:
      "A welcoming message from the director highlighting the center's vision and strategic goals.",
  },
  {
    title: "أعضاء هيئة التدريس",
    href: "/faculty-cvs",
    description:
      "عرض معلومات عن السيرة الذاتية والخبرة العلمية لأعضاء هيئة التدريس بالمركز.",
    enTitle: "Faculty Members",
    enDesc:
      "Details about the academic and professional experience of the center's faculty members.",
  },
];

const structure: {
  title: string;
  href: string;
  description: string;
  enTitle: string;
  enDesc: string;
}[] = [
  {
    title: "إدارة الشؤون الإدارية والمالية",
    href: `/organizational-structure/administrative-and-financial-affairs`,
    description:
      "القسم المسؤول عن تنظيم الشؤون الإدارية وضمان سير العمل بسلاسة.",
    enTitle: "Administrative and Financial Affairs Department",
    enDesc:
      "The department responsible for organizing administrative matters and ensuring smooth operations.",
  },
  {
    title: "إدارة الشؤون البحثية",
    href: "/organizational-structure/research-affairs-department",
    description: "الإشراف على الأنشطة البحثية والتطويرية داخل المركز.",
    enTitle: "Research Affairs",
    enDesc: "Overseeing research and development activities within the center.",
  },
  {
    title: "إدارة المعامل والمختبرات",
    href: "/organizational-structure/laboratory-and-testing-department",
    description:
      "إدارة المختبرات وتقديم خدمات التحاليل اللازمة لدعم البحث العلمي.",
    enTitle: "Laboratory and Facilities Management",
    enDesc:
      "Managing laboratories and providing analytical services to support scientific research.",
  },
  {
    title: "مطابقة المواصفات",
    href: "/organizational-structure/specifications-office",
    description:
      "ضمان توافق المنتجات والخدمات مع المعايير والمواصفات المعتمدة.",
    enTitle: "Compliance with Standards",
    enDesc:
      "Ensuring products and services comply with approved standards and specifications.",
  },
  {
    title: "التخطيط والمتابعة",
    href: "/organizational-structure/planning-and-follow-up-office",
    description: "مراقبة الأداء وتقييم النتائج.",
    enTitle: "Planning and Follow-Up Office",
    enDesc: "Monitoring performance and evaluating results.",
  },
  {
    title: "مكتب نظم إدارة الجودة",
    href: "/organizational-structure/quality-management-systems-office",
    description: "الإشراف على تطبيق نظام الجودة ومراقبة الأداء داخل المركز.",
    enTitle: "Quality Assurance",
    enDesc:
      "Supervising the implementation of quality systems and performance monitoring within the center.",
  },
  {
    title: "التدريب",
    href: "/organizational-structure/training",
    description:
      "تعزيز كفاءة الموظفين من خلال برامج تدريبية متنوعة داخلية وخارجية.",
    enTitle: "Training",
    enDesc:
      "Enhancing employee efficiency through diverse training programs locally and internationally.",
  },
];

export function NavigationMenuDesktop({
  labs = [],
  href,
  title,
}: {
  labs?: Lab[];
  href: string;
  title: string;
}) {
  const { lang } = useParams();
  const pathname = usePathname();
  return (
    <NavigationMenu
      className="hidden lg:flex"
      dir={lang === "ar" ? "rtl" : "ltr"}
      viewport={`${lang === "ar" && "right-0"}`}
    >
      <NavigationMenuList dir={lang === "ar" ? "rtl" : "ltr"} className="gap-3">
        <NavigationMenuItem>
          <Link
            href={`/${lang}`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}` && "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="Home" ar="الرئيسية" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LangRenderer en="About" ar="حول" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] ">
              {about.map((component) => (
                <LangListItem
                  key={component.title}
                  title={component.title}
                  href={`/${lang}/${component.href}`}
                  enDescription={component.enDesc}
                  enTitle={component.enTitle}
                >
                  {component.description}
                </LangListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LangRenderer en="organizational structure" ar="الهيكل التنظيمي" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] grid-cols-2 gap-3 p-4 md:w-[600px] ">
              {structure.map((component) => (
                <LangListItem
                  showDescription={false}
                  key={component.title}
                  title={component.title}
                  href={`/${lang}/${component.href}`}
                  enDescription={component.enDesc}
                  enTitle={component.enTitle}
                >
                  {component.description}
                </LangListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LangRenderer en="Laboratories" ar="المختبرات" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ol className="grid grid-cols-2 w-[650px] gap-3 p-4 md:w-[600px] ">
              {labs.map((lab) => (
                <ListItem
                  key={lab.title}
                  title={lab.title}
                  href={`/${lang}/labs#${lab.slug}`}
                >
                  {extractText(lab.description, 85)}
                </ListItem>
              ))}
            </ol>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href={`/${lang}/research-and-studies`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/research-and-studies` &&
                "bg-primary text-white",
              pathname.startsWith(`/${lang}/research-and-studies`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="Researches" ar="البحوث" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href={`/${lang}/news-and-activities`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/news-and-activities` &&
                "bg-primary text-white",
              pathname.startsWith(`/${lang}/news-and-activities`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink
              asChild // Render as a span instead of an anchor when inside <Link>
            >
              <LangRenderer en="News" ar="الأخبار" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href={`/${lang}/articles`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/articles` && "bg-primary text-white",
              pathname.startsWith(`/${lang}/articles`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink asChild>
              <LangRenderer en="Articles" ar="المقالات" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* <NavigationMenuItem className="hidden xl:flex">
          <Link
            href={`/${lang}/articles`}
            passHref
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === `/${lang}/regulations` && "bg-primary text-white",
              pathname.startsWith(`/${lang}/regulations`) &&
                "bg-primary text-white"
            )}
          >
            <NavigationMenuLink asChild>
              <LangRenderer en="Forms & Rules" ar="نمادج ولوائح" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {/* {href === "dashboard" ? (
          <NavigationMenuItem>
            <Link
              href={`/${lang}/${href}`}
              passHref
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === `/${lang}/${href}` && "bg-primary text-white",
                pathname.startsWith(`/${lang}/${href}`) &&
                  "bg-primary text-white"
              )}
            >
              <NavigationMenuLink asChild>
                <LangRenderer en="Dashboard" ar="لوحة التحكم" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link
              href={`/${lang}/${href}`}
              passHref
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === `/${lang}/${href}` && "bg-primary text-white",
                pathname.startsWith(`/${lang}/${href}`) &&
                  "bg-primary text-white"
              )}
            >
              <NavigationMenuLink asChild>
                <LangRenderer ar="تسجيل الدخول" en="Sign In" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )} */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const LangListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & {
    enTitle: string;
    enDescription: string;
    showDescription?: boolean;
  }
>(
  (
    {
      className,
      showDescription = true,
      title,
      children,
      enDescription,
      enTitle,
      ...props
    },
    ref
  ) => {
    const { lang } = useParams();
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">
              {lang === "ar" ? title : enTitle}
            </div>
            {showDescription && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {lang === "ar" ? children : enDescription}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
LangListItem.displayName = "LangListItem";
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & {}
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title} </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface LinkProps {
  link: string;
  ar: string;
  en: string;
}

const links = [
  {
    title: "About",
    ar: "حول",
    href: "about",
    subLinks: [
      {
        link: "/about#overview",
        ar: "حول المركز",
        en: "About the Center",
      },
      {
        link: "/about#why",
        ar: "لماذا نحن",
        en: "Why Us",
      },
      {
        link: "/faculty-cvs",
        ar: "أعضاء هيئة التدريس",
        en: "Faculty Members",
      },
    ],
  },
  {
    title: "Organizational Structure",
    ar: "الهيكل التنظيمي",
    href: "organizational-structure",

    subLinks: [
      {
        link: "/organizational-structure/administrative-and-financial-affairs",
        ar: "إدارة الشؤون الإدارية والمالية",
        en: "Administrative and Financial Affairs Department",
      },
      {
        link: "/organizational-structure/research-affairs-department",
        ar: "إدارة الشؤون البحثية",
        en: "Research Affairs",
      },
      {
        link: "/organizational-structure/laboratory-and-testing-department",
        ar: "إدارة المعامل والمختبرات",
        en: "Laboratory and Facilities Management",
      },
      {
        link: "/organizational-structure/specifications-office",
        ar: "مطابقة المواصفات",
        en: "Compliance with Standards",
      },
      {
        link: "/organizational-structure/planning-and-follow-up-office",
        ar: "التخطيط والمتابعة",
        en: "Planning and Follow-Up Office",
      },
      {
        link: "/organizational-structure/quality-management-systems-office",
        ar: "متابعة نظام الجودة",
        en: "Quality Assurance",
      },
      { link: "/training", ar: "التدريب", en: "Training" },
    ],
  },
  {
    title: "Labs",
    ar: "المختبرات",
    href: "labs",
    subLinks: [
      {
        link: "/labs#polymer-chemistry-lab",
        ar: "مختبر كيمياء البوليمر",
        en: "Polymer Chemistry Lab",
      },
      {
        link: "/labs#thermal-analysis-lab",
        ar: "مختبر التحليل الحراري",
        en: "Thermal Analysis Lab",
      },
      {
        link: "/labs#molecular-analysis-lab",
        ar: "مختبر التحليل الجزيئي",
        en: "Molecular Analysis Lab",
      },
      {
        link: "/labs#spectral-analysis-lab",
        ar: "مختبر التحليل الطيفي",
        en: "Spectral Analysis Lab",
      },
      {
        link: "/labs#microscopic-analysis-lab",
        ar: "مختبر التحليل المجهري",
        en: "Microscopic Analysis Lab",
      },
      {
        link: "/labs#polymer-technical-applications-lab",
        ar: "مختبر التطبيقات التقنية للبوليمرات",
        en: "Polymer Technical Applications Lab",
      },
      {
        link: "/labs#polymer-shaping-lab",
        ar: "مختبر تشكيل البوليمر",
        en: "Polymer Shaping Lab",
      },
      {
        link: "/labs#mechanical-properties-lab",
        ar: "مختبر الخواص الميكانيكية",
        en: "Mechanical Properties Lab",
      },
    ],
  },
];

export default function NavigationSheet({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const { lang } = useParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="lg:hidden flex" size={"icon"}>
          <FaBars size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="z-[10000]"
        side={lang === "en" ? "left" : "right"}
        dir={lang === "en" ? "ltr" : "rtl"}
      >
        <SheetHeader>
          <SheetTitle>
            <VisuallyHidden>navigation bar</VisuallyHidden>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </VisuallyHidden>
          </SheetDescription>

          <CustomLink
            variant={pathname === `/${lang}` ? "default" : "ghost"}
            href={`/${lang}`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="Home" ar="الرئيسية" />
          </CustomLink>
          <Accordion
            dir={lang === "en" ? "ltr" : "rtl"}
            type="single"
            collapsible
          >
            {links.map((item) => (
              <AccordionItem
                key={item.title}
                className="border-none"
                value={item.title}
              >
                <AccordionTrigger
                  className={cn(
                    "border-non my-1 hover:bg-accent px-2 rounded-md py-2 shadow",
                    pathname.startsWith(`/${lang}/${item.href}`) && "bg-primary"
                  )}
                >
                  {lang === "ar" ? item.ar : item.title}
                </AccordionTrigger>
                <AccordionContent dir={lang === "en" ? "ltr" : "rtl"}>
                  {item.subLinks ? (
                    <ul className="ml-4 flex flex-col items-start gap-1 space-y-2">
                      {item.subLinks.map((subLink, i) => (
                        <SheetLink
                          key={i}
                          link={subLink.link}
                          ar={subLink.ar}
                          en={subLink.en}
                          setOpen={setOpen}
                          open={open}
                        />
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <CustomLink
            variant={
              pathname === `/${lang}/research-and-studies` ||
              pathname.startsWith(`/${lang}/research-and-studies`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/research-and-studies`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="Research and Studies" ar="البحوث و الدراسات" />
          </CustomLink>

          <CustomLink
            variant={
              pathname === `/${lang}/news-and-activities` ||
              pathname.startsWith(`/${lang}/news-and-activities`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/news-and-activities`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="News and Activities" ar="الأخبار و الأنشطة" />
          </CustomLink>
          <CustomLink
            variant={
              pathname === `/${lang}/articles` ||
              pathname.startsWith(`/${lang}/articles`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/articles`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="All Articles" ar="كل المقالات" />
          </CustomLink>

          <CustomLink
            variant={
              pathname === `/${lang}/regulations` ||
              pathname.startsWith(`/${lang}/regulations`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/regulations`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            <LangRenderer en="Forms and Regulations" ar="نمادج ولوائح" />
          </CustomLink>

          <CustomLink
            variant={
              pathname === `/${lang}/${href}` ||
              pathname.startsWith(`/${lang}/${href}`)
                ? "default"
                : "ghost"
            }
            href={`/${lang}/${href}`}
            className="text-start block px-2 shadow"
            onClick={() => setOpen(!open)}
          >
            {title}{" "}
          </CustomLink>
        </SheetHeader>
        <SheetFooter>
          <ToggleTheme className="my-4 mx-auto" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const SheetLink = ({
  ar,
  en,
  link,
  open,
  setOpen,
}: LinkProps & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const { lang } = useParams();
  return (
    <li
      key={link}
      onClick={() => setOpen(!open)}
      className="w-full text-start flex"
    >
      <CustomLink
        variant={"link"}
        className="w-full block"
        href={`/${lang}${link}`}
      >
        {lang === "ar" ? ar : en}
      </CustomLink>
    </li>
  );
};
