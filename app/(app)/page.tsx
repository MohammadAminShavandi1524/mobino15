import { getQueryClient, trpc } from "@/trpc/server";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Category } from "@/payload-types";
import Skeleton from "@/components/mycomponents/(skeletonComponets)/Skleton";
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

export default async function Home() {
  // SERVER

  const queryClient = getQueryClient();
  const products = await queryClient.fetchQuery(
    trpc.products.getMany.queryOptions({})
  );

  // CLIENT

  // const trpc = useTRPC();
  // const { data } = useSuspenseQuery(trpc.auth.session.queryOptions());

  // console.log("🚀 ~ Home ~ data:", data?.user)

  // const queryClient = getQueryClient();
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

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

  return (
    <div className="flex flex-col min-h-[1000px] ">
      {/* image carousel */}
      <Skeleton width={1920} height={430} />

      <div className="w90 flex flex-col mt-13 px-12">
        {/* categories carousel */}
        <Carousel className="">
          <CarouselContent className="px-4">
            {categoriesCarouselOptions.map((option, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="flex justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6  2xl:basis-1/7 3xl:basis-1/8 px-2"
                >
                  <Link
                    className="flex flex-col items-center gap-y-5 pt-1"
                    href={option.href}
                  >
                    <div className="flex justify-center items-center size-32 border border-[#14a0de]   hover:border-3  rounded-full">
                      <div className="size-28 overflow-hidden rounded-full">
                        <div className="flex justify-center items-center size-[112px] border-1 border-[#c7cbdb] rounded-full">
                          <Image
                            className={cn("overflow-hidden")}
                            src={option.img}
                            alt={option.label}
                            width={78}
                            height={78}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-[#1b3570]">{option.label}</div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="top-[63px]" />
          <CarouselNext className="top-[63px]" />
        </Carousel>
      </div>
    </div>
  );
}
