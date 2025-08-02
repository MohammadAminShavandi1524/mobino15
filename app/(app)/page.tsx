export const dynamic = "force-dynamic";

import { getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import Skeleton from "@/components/mycomponents/(skeletonComponets)/Skleton";
import CatCarousel from "@/components/mycomponents/(carousels)/CatCarousel";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Link from "next/link";
import Afino from "@/components/mycomponents/(carousels)/Afino";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FlagBearerMobiles from "@/components/mycomponents/LandingPageComps/FlagBearerMobiles";

export default async function Home() {
  prefetch(trpc.products.getMany.queryOptions({}));

  const MobileOptions = [
    {
      img: "https://www.technolife.com/image/static_phone_samsung_new.png",
      label: "گوشی سامسونگ",
      href: "/mobile/samsungPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_iphone_new.png",
      label: "گوشی آیفون",
      href: "/mobile/iPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_xiaomi_new.png",
      label: "گوشی شیائومی",
      href: "/mobile/XiaomiPhone",
    },
    {
      img: "https://www.technolife.com/image/static_phone_honor_new.png",
      label: "گوشی آنر",
      href: "/mobile/HonerPhone",
    },
  ];

  return (
    <div className="flex flex-col min-h-[1000px] overflow-x-hidden">
      {/* image carousel */}
      <Skeleton width={1920} height={430} />

      <div className="w90 flex flex-col mt-13 px-12">
        {/* categories carousel */}
        <CatCarousel />

        {/* afino - discountedProducts */}
        <HydrateClient>
          <ErrorBoundary fallback={<div>afino error boundary!!!!</div>}>
            <Suspense fallback={<>afino loading</>}>
              <Afino />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        {/* mobile subCategories */}

        <div className="flex flex-col  justify-center items-center w-full my-14 ">
          <div className="text-[26px] font-medium text-black mb-8">
            برترین های موبایل
          </div>
          <ul className="flex items-center gap-x-14">
            {MobileOptions.map((option, index) => {
              return (
                <li key={index}>
                  <Link
                    className="flex flex-col items-center gap-y-3 cursor-pointer"
                    href={option.href}
                  >
                    <Image
                      className={cn("")}
                      src={option.img}
                      alt={option.label}
                      width={200}
                      height={200}
                    />
                    <span className="text-[18px]">{option.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* flagBearerMobiles */}
        <HydrateClient>
          <ErrorBoundary
            fallback={<div>flagBearerMobiles error boundary!!!!</div>}
          >
            <Suspense fallback={<>flagBearerMobiles loading</>}>
              <FlagBearerMobiles />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
}
