"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { CustomLink } from "../custom-link";
import { useParams } from "next/navigation";
import LangRenderer from "../lang";

const Carousel = () => {
  const { lang } = useParams();

  const slides = [
    {
      image: "/images/polymer-1.webp", // Optimized WebP image
      alt: "polymer-1.png",
      title: {
        ar: "المركز الليبي لبحوث اللدائن",
        en: "Libyan Center for Polymer Research",
      },
      description: {
        ar: `هو مؤسسة علمية متخصصة في بحوث وتقنية البوليمرات (اللدائن)، تم إنشاؤه بقرار رقم 625 لسنة 1999م كمركز بحثي متخصص يهدف إلى تحقيق نهضة تقنية وعلمية شاملة في مجال تقنية البوليميرات وتطبيقاتها.`,
        en: `A scientific institution specializing in polymer (plastic) research and technology. Established by decision No. 625 of 1999 as a specialized research center aimed at achieving a comprehensive scientific and technical renaissance in polymer technology and its applications.`,
      },
      links: [
        {
          href: `/${lang}/about`,
          text: { ar: "اكتشف المزيد", en: "Discover More" },
        },
      ],
    },
    {
      image: "/images/polymer-2.webp", // Optimized WebP image
      alt: "polymer-2.png",
      title: {
        ar: "ريادة في أبحاث اللدائن",
        en: "Pioneering Research in Polymers",
      },
      description: {
        ar: `بحوث ودراسات هادفة نحن نقود أبحاثا مبتكره في تقنيات البوليمرات باستخدام مختبرات متطورة تقود للمعرفة والاستدامة.`,
        en: `Purposeful research and studies We conduct innovative research in polymer technologies using advanced laboratories that drive knowledge and sustainability.`,
      },
      links: [
        {
          href: `/${lang}/labs`,
          text: { ar: "اكتشف مختبراتنا", en: "Explore Our Labs" },
        },
        // { href: `/${lang}/#goals`, text: { ar: "أهدافنا", en: "Our Goals" } },
      ],
    },
    {
      image: "/images/polymer-3.webp", // Optimized WebP image
      alt: "polymer-3.png",
      title: {
        ar: "رؤية للابتكار والاستدامة",
        en: "A Vision for Innovation & Sustainability",
      },
      description: {
        ar: `مهمتنا هي تعزيز وتوطين علوم وتقنيات البوليمرات في مجالات حماية البيئة والاستفادة من الموارد الطبيعية ودعم الصناعات المحلية.`,
        en: `Our mission is to advance and localize polymer science and technology in environmental protection, natural resource utilization, and support for local industries.`,
      },
      links: [
        {
          href: `/${lang}/#our-vision`,
          text: { ar: "تعرف على رؤيتنا", en: "Learn About Our Vision" },
        },
      ],
    },
  ];

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      draggable
      loop
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper text-white select-none"
    >
      {slides.map((slide, index) => (
        <SwiperSlide className="select-none" key={index}>
          <ReusableSwiperSlide index={index} {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

type SlideProps = {
  index: number;
  image: string;
  alt: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  links: { href: string; text: { ar: string; en: string } }[];
};

const ReusableSwiperSlide = ({
  index,
  image,
  alt,
  title,
  description,
  links,
}: SlideProps) => (
  <div className="min-h-[85vh] relative flex items-center justify-center bg-secondary/50">
    <div className="h-[85vh] w-full overflow-hidden relative">
      <Image
        src={image}
        alt={alt}
        width={1000}
        height={1000}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={index === 0} // Preload the first slide
        loading={index === 0 ? "eager" : "lazy"}
        className="w-full h-full object-cover"
      />
      <div className="w-full h-full absolute bg-black/60 top-0 right-0 z-10 text-center content-center">
        <LangRenderer
          ar={
            <div className="container phone-only:h-full grid gap-5 md:gap-10 phone-only:flex flex-col items-center justify-around relative z-50">
              <h1 className="text-2xl md:text-6xl text-primary font-extrabold">
                {title.ar}
              </h1>
              <p className="md:text-xl">{description.ar}</p>
              <div className="w-fit mx-auto flex justify-center items-center gap-5 phone-only:gap-1 phone-only:flex-col   phone-only:w-full">
                {links.map((link, index) => (
                  <CustomLink
                    key={index}
                    href={link.href}
                    className=""
                    size={"lg"}
                  >
                    <span>{link.text.ar}</span>
                  </CustomLink>
                ))}
              </div>
            </div>
          }
          en={
            <div className="container phone-only:h-full grid gap-5 md:gap-10 relative z-50 phone-only:flex flex-col items-center justify-around">
              <h1 className="text-2xl md:text-6xl text-primary font-extrabold">
                {title.en}
              </h1>
              <p className="md:text-xl">{description.en}</p>
              <div className="w-fit mx-auto flex justify-center items-center gap-5 phone-only:gap-1 phone-only:flex-col  ">
                {links.map((link, index) => (
                  <CustomLink
                    variant={"default"}
                    scroll
                    key={index}
                    href={link.href}
                    className="phone-only:w-full"
                    size={"lg"}
                  >
                    <span>{link.text.en}</span>
                  </CustomLink>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </div>
  </div>
);
