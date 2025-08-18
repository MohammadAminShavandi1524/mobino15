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
import { useBreakpoints } from "@/hooks/useBreakPoint";

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
  const { lg } = useBreakpoints();

  return (
    <Carousel autoplay interval={7000} className="">
      <CarouselContent className="ml-0 flex justify-between">
        {categoriesCarouselOptions.map((option, index) => {
          return (
            <CarouselItem
              key={index}
              className="s:basis-1/4 3xl:basis-1/8 mlg:basis-1/5 flex basis-1/3 items-center justify-center px-2 select-none lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
            >
              <Link
                className="group flex flex-col items-center gap-y-5 pt-1"
                href={option.href}
              >
                <div className="flex size-[90px] items-center justify-center rounded-full border border-[#14a0de] lg:size-32 lg:group-hover:border-3">
                  <div className="size-[79px] overflow-hidden rounded-full lg:size-28">
                    <div className="flex size-[79px] items-center justify-center overflow-hidden rounded-full border-1 border-[#c7cbdb] lg:size-[112px]">
                      <Image
                        className={cn(
                          "transition-all lg:object-cover lg:group-hover:scale-115",
                        )}
                        src={option.img}
                        alt={option.label}
                        width={lg ? 78 : 55}
                        height={lg ? 78 : 55}
                      />
                      {/* <div className="size-[55px] border"></div> */}
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-[#1b3570] sm:text-sm lg:text-base">
                  {option.label}
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="top-[63px] max-lg:size-7.5 max-lg:hidden md:right-4 lg:-right-10 max-lg:[&>*]:size-6" />
      <CarouselNext className="top-[63px] max-lg:size-7.5 max-lg:hidden md:left-4 lg:-left-12 max-lg:[&>*]:size-6" />
    </Carousel>
  );
};
export default CatCarousel;
