"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const categoriesCarouselOptions = [
  {
    img: "/categoriesCarousel/iphoneCat.webp",
    label: "گوشی آیفون",
    href: "/mobile/iPhone",
  },
  {
    img: "/categoriesCarousel/macbookCat.webp",
    label: "مک بوک",
    href: "/laptop/appleLaptop",
  },
  {
    img: "/categoriesCarousel/tabletCat.jpg",
    label: "تبلت",
    href: "/tablet",
  },
  {
    img: "/categoriesCarousel/headphonesCat.jpg",
    label: "هدفون",
    href: "/Headphones",
  },
  {
    img: "/categoriesCarousel/samsungPhoneCat.webp",
    label: "گوشی سامسونگ",
    href: "/mobile/samsungPhone",
  },
  {
    img: "/categoriesCarousel/monitorCat.webp",
    label: "مانیتور",
    href: "/Monitor",
  },
  {
    img: "/categoriesCarousel/smartWatchCat.webp",
    label: "ساعت هوشمند",
    href: "/SmartWatch",
  },
  {
    img: "/categoriesCarousel/laptopCat.png",
    label: "لپ تاپ",
    href: "/laptop",
  },
  {
    img: "/categoriesCarousel/xiaomiPhoneCat.png",
    label: "گوشی شیائومی",
    href: "/mobile/XiaomiPhone",
  },
];

const CatCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return (
    <Carousel autoplay interval={7000} className="">
      <CarouselContent className=" ml-0 flex justify-between">
        {categoriesCarouselOptions.map((option, index) => {
          return (
            <CarouselItem
              key={index}
              className="flex justify-center items-center basis-1/3 s:basis-1/4 lg:basis-1/5 xl:basis-1/6  2xl:basis-1/7 3xl:basis-1/8 px-2 select-none "
            >
              <Link
                className="flex flex-col items-center gap-y-5 pt-1 group "
                href={option.href}
              >
                <div className="flex justify-center items-center size-[90px] lg:size-32 border border-[#14a0de]  lg:group-hover:border-3  rounded-full">
                  <div className="size-[79px] lg:size-28 overflow-hidden rounded-full">
                    <div className="flex justify-center items-center overflow-hidden size-[79px] lg:size-[112px] border-1 border-[#c7cbdb] rounded-full">
                      <Image
                        className={cn(
                          "transition-all lg:group-hover:scale-115 lg:object-cover"
                        )}
                        src={option.img}
                        alt={option.label}
                        width={isMobile ? 55 : 78}
                        height={isMobile ? 55 : 78}
                      />
                      {/* <div className="size-[55px] border"></div> */}
                    </div>
                  </div>
                </div>
                <div className="text-[#1b3570] text-[12px]  sm:text-sm lg:text-base">
                  {option.label}
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-[63px] md:right-4 lg:-right-10 max-md:hidden max-lg:size-7.5 max-lg:[&>*]:size-6" />
      <CarouselNext className="top-[63px] md:left-4 lg:-left-12 max-md:hidden max-lg:size-7.5 max-lg:[&>*]:size-6" />
    </Carousel>
  );
};
export default CatCarousel;
