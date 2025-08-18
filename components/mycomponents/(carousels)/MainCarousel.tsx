"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import { useBreakpoints } from "@/hooks/useBreakPoint";
import Image from "next/image";
import Link from "next/link";

const MainCarousel = () => {
  const mainCarouselOptions = [
    {
      img: "/mainCarousel/iphone.webp",
      alt: "iphone",
      href: "/mobile/iPhone",
    },
    {
      img: "/mainCarousel/xia15.webp",
      alt: "xia15",
      href: "",
    },
    {
      img: "/mainCarousel/laptop.webp",
      alt: "laptop",
      href: "/laptop",
    },
    {
      img: "/mainCarousel/samsung.png",
      alt: "samsung",
      href: "/mobile/samsungPhone",
    },
    {
      img: "/mainCarousel/smartwatch.webp",
      alt: "smartwatch",
      href: "/SmartWatch",
    },
    {
      img: "/mainCarousel/tablet.webp",
      alt: "tablet",
      href: "/tablet",
    },
    {
      img: "/mainCarousel/samANDxia.webp",
      alt: "samANDxia.webp",
      href: "/mobile?brand=samsung,xiaomi",
    },
  ];

  const mainCarouselMobileOptions = [
    {
      img: "/mainCarousel/mobile/samsung.webp",
      alt: "samsung",
      href: "/mobile/samsungPhone",
    },
    {
      img: "/mainCarousel/mobile/iphone.png",
      alt: "iphone",
      href: "/mobile/iPhone",
    },
    {
      img: "/mainCarousel/mobile/mobile.png",
      alt: "mobile",
      href: "/mobile",
    },
    {
      img: "/mainCarousel/mobile/laptop.png",
      alt: "laptop",
      href: "/laptop",
    },

    {
      img: "/mainCarousel/mobile/smartwatch.png",
      alt: "smartwatch",
      href: "/SmartWatch",
    },
    {
      img: "/mainCarousel/mobile/tablet.png",
      alt: "tablet",
      href: "/tablet",
    },
  ];

  const { lg } = useBreakpoints();

  //* mobile main carousel

  if (!lg) {
    return (
      <Carousel autoplay interval={6500} className="group w-screen">
        <CarouselContent className="">
          {mainCarouselMobileOptions.map((option, index) => {
            return (
              <CarouselItem key={index} className="w-full">
                <Link
                  className="xs:h-[260px] s:h-[350px] mlg:h-[650px] relative block h-[240px] w-full sm:h-110 md:h-[550px]"
                  href={option.href}
                >
                  <Image
                    className="object-cover"
                    fill
                    src={option.img}
                    alt={option.alt}
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    );
  }

  //  *pc main carousel
  return (
    <Carousel autoplay interval={5000} className="group w-screen">
      <CarouselContent className="">
        {mainCarouselOptions.map((option, index) => {
          return (
            <CarouselItem key={index} className="w-full">
              <Link
                className="3xl:h-[450px] relative block h-75 w-full xl:h-90 2xl:h-105"
                href={option.href}
              >
                <Image
                  className="object-cover"
                  fill
                  src={option.img}
                  alt={option.alt}
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="invisible right-[40px] bottom-[25px] flex items-center justify-center opacity-0 transition-all group-hover:visible group-hover:opacity-100 max-md:hidden 2xl:size-10 2xl:[&>*]:size-7" />
      <CarouselNext className="invisible right-[90px] bottom-[25px] flex items-center justify-center opacity-0 transition-all group-hover:visible group-hover:opacity-100 max-md:hidden 2xl:size-10 2xl:[&>*]:size-7" />
    </Carousel>
  );
};
export default MainCarousel;
