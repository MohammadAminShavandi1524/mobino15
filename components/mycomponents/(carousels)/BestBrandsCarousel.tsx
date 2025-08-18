"use client";

import Link from "next/link";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/useBreakPoint";

interface BestBrandsCarouselProps {}

const BestBrandsCarousel = ({}: BestBrandsCarouselProps) => {
  const { lg, sm } = useBreakpoints();
  const options = [
    {
      img: "https://www.technolife.com/image/banner_BrandBanners_yqE3hH_1a75ca9e-c20c-4ec2-9557-5e55e803138f.png",
      label: "اپل",
      href: "/products?brand=apple",
      scale: 1,
    },
    {
      img: "/bestbarnds/samsung.png",
      label: "سامسونگ",
      href: "/products?brand=samsung",
      scale: 1,
    },
    {
      img: "https://www.technolife.com/image/banner_BrandBanners_XD52NM_0029eb0f-05e7-4f45-83b5-4bdd9317ce6d.png",
      label: "شیائومی",
      href: "/products?brand=",
      scale: 1,
    },
    {
      img: "/bestbarnds/dell.jpg",
      label: "دل",
      href: "/products?brand=dell",
      scale: 1,
    },
    {
      img: "/bestbarnds/asus.jpg",
      label: "ایسوس",
      href: "/products?brand=asus",
      scale: 1,
    },
    {
      img: "/bestbarnds/lenovo.png",
      label: "لنوو",
      href: "/products?brand=lenovo",
      scale: 1,
    },
    {
      img: "/bestbarnds/microsoft.jpg",
      label: "مایکروسافت",
      href: "/products?brand=microsoft",
      scale: 1.2,
    },
    {
      img: "https://www.technolife.com/image/banner_BrandBanners_sk0Pf9_90b94b5c-56f3-46fd-91de-4abfbc3718d3.png",
      label: "انکر",
      href: "/products?brand=anker",
      scale: 1,
    },
    {
      img: "https://www.technolife.com/image/banner_BrandBanners_8XEvZo_8a4b6e91-0046-4f7a-b59b-745c739b8e75.png",
      label: "تسکو",
      href: "/products?brand=tsco",
      scale: 1,
    },
    {
      img: "https://www.technolife.com/image/banner_BrandBanners_Ox33Xi_2b532dfb-3989-46d4-8d2d-b2c5b1e701fb.png",
      label: "LG",
      href: "/products?brand=lg",
      scale: 1,
    },
  ];

  return (
    <div className="mt-10 mb-4 flex w-full rounded-t-[12px] border-[1.5px] border-[#d3d8e4] max-lg:flex-col lg:my-13 lg:rounded-2xl">
      <div className="bg-primaryGradient flex items-center justify-center gap-x-2 rounded-t-[12px] py-3 font-medium text-white lg:flex-col lg:gap-y-1.25 lg:rounded-r-2xl lg:px-10.5 lg:pt-8 lg:pb-6.5">
        <span>
          <BadgeCheck size={lg ? 36 : sm ? 24 : 20} />
        </span>
        <span className="text-sm font-bold sm:text-base lg:min-w-[124px] lg:text-lg">
          برند های منتخب
        </span>
      </div>

      <Carousel autoplay interval={7000} className="w-full">
        <CarouselContent className="pt-4 pl-3 max-lg:pb-2 lg:px-4 lg:pr-3">
          {options.map((option, index) => {
            return (
              <CarouselItem
                className="3xl:basis-1/6 mlg:basis-1/5 relative flex basis-1/3 items-center justify-center border-l border-l-[#d3d8e4] px-1 pl-2 select-none last:border-l-0 last:pl-0 sm:basis-1/4 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                key={index}
              >
                <Link href={option.href}>
                  <Image
                    className={cn("object-cover")}
                    style={{ scale: option.scale }}
                    src={option.img}
                    alt={option.label}
                    width={lg ? 116 : sm ? 95 : 82}
                    height={lg ? 88 : sm ? 72 : 62}
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="top-[61px] right-5 max-lg:hidden [&>*]:text-[#1b3570]" />
        <CarouselNext className="top-[61px] left-3 max-lg:hidden [&>*]:text-[#1b3570]" />
      </Carousel>
    </div>
  );
};

export default BestBrandsCarousel;
