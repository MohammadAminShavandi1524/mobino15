"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  //* mobile main carousel

  if (isMobile) {
    return (
      <Carousel autoplay interval={6500} className="w-screen group">
        <CarouselContent className="">
          {mainCarouselMobileOptions.map((option, index) => {
            return (
              <CarouselItem key={index} className="w-full">
                <Link
                  className="relative w-full h-[240px] xs:h-[260px] s:h-[350px] sm:h-110  md:h-[550px] mlg:h-[650px] block"
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
    <Carousel autoplay interval={5000} className="w-screen group">
      <CarouselContent className="">
        {mainCarouselOptions.map((option, index) => {
          return (
            <CarouselItem key={index} className="w-full">
              <Link
                className="relative w-full h-75 xl:h-90 2xl:h-105 3xl:h-[450px] block"
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

      <CarouselPrevious className="opacity-0 invisible group-hover:opacity-100 group-hover:visible flex justify-center items-center transition-all bottom-[25px] right-[40px] 2xl:size-10 2xl:[&>*]:size-7 max-md:hidden" />
      <CarouselNext className="opacity-0 invisible group-hover:opacity-100 group-hover:visible flex justify-center items-center transition-all bottom-[25px] right-[90px] 2xl:size-10 2xl:[&>*]:size-7 max-md:hidden" />
    </Carousel>
  );
};
export default MainCarousel;
