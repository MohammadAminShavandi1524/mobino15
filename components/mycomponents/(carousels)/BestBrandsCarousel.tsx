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

interface BestBrandsCarouselProps {}

const BestBrandsCarousel = ({}: BestBrandsCarouselProps) => {
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
    <div
      className="my-13 w-full flex  border-[1.5px] border-[#d3d8e4]
           rounded-2xl "
    >
      <div className="bg-primaryGradient flex flex-col justify-center items-center gap-y-1.25 pt-8 pb-6.5 px-10.5 text-white font-medium rounded-r-2xl">
        <span>
          <BadgeCheck size={36} />
        </span>
        <span className="min-w-[124px] text-lg font-bold">برند های منتخب</span>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="pt-4 px-4 pr-3 ">
          {options.map((option, index) => {
            return (
              <CarouselItem
                className="relative flex justify-center items-center basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4  2xl:basis-1/5 3xl:basis-1/6 px-1 select-none pl-2 last:pl-0 sm:border-l sm:border-l-[#d3d8e4] last:border-l-0"
                key={index}
              >
                <Link href={option.href}>
                  <Image
                    className={cn("object-cover")}
                    style={{ scale: option.scale }}
                    src={option.img}
                    alt={option.label}
                    width={116}
                    height={88}
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="top-[61px] right-5 max-md:hidden [&>*]:text-[#1b3570]" />
        <CarouselNext className="top-[61px] left-3 max-md:hidden [&>*]:text-[#1b3570]" />
      </Carousel>
    </div>
  );
};

export default BestBrandsCarousel;
