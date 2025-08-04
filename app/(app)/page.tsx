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
import { cn, convertToPersianNumber } from "@/lib/utils";
import FlagBearerMobiles from "@/components/mycomponents/LandingPageComps/FlagBearerMobiles";
import MainCarousel from "@/components/mycomponents/(carousels)/MainCarousel";
import LaptopHighlights from "@/components/mycomponents/(CatHighlights)/LaptopHighlights";
import MobileHighlights from "@/components/mycomponents/(CatHighlights)/MobileHighlights";
import LaptopCarousel from "@/components/mycomponents/(carousels)/LaptopCarousel";
import MobilePriceTags from "@/components/mycomponents/(CatPriceTag)/MobilePriceTags";
import LaptopPriceTags from "@/components/mycomponents/(CatPriceTag)/LaptopPriceTags";

export default async function Home() {
  prefetch(trpc.products.getMany.queryOptions({}));

  const mobilePricedBasedOptions = [
    {
      priceTag: 15,
    },
    {
      priceTag: 30,
    },
    {
      priceTag: 50,
    },
    {
      priceTag: 75,
    },
    {
      priceTag: 100,
    },
    {
      priceTag: 150,
    },
  ];

  return (
    <div className="flex flex-col  overflow-x-hidden">
      {/* image carousel */}
      <MainCarousel />

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

        <MobileHighlights />

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

        {/* laptop subCategories */}

        <LaptopHighlights />

        {/* laptop carousel */}
        <HydrateClient>
          <ErrorBoundary
            fallback={<div>LaptopCarousel error boundary!!!!</div>}
          >
            <Suspense fallback={<>LaptopCarousel loading</>}>
              <LaptopCarousel />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        <div className="grid grid-cols-2 items-center w-full gap-x-13 my-14">
          {/* گوشی بر اساس قیمت  */}
          <MobilePriceTags />
          {/* لپ تاپ بر اساس قیمت  */}
          <LaptopPriceTags />
        </div>
      </div>
    </div>
  );
}
