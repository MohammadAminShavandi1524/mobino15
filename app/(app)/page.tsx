export const dynamic = "force-dynamic";

import { HydrateClient, prefetch, trpc } from "@/trpc/server";

import Skeleton from "@/components/mycomponents/(skeletonComponets)/Skleton";
import CatCarousel from "@/components/mycomponents/(carousels)/CatCarousel";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Link from "next/link";
import Afino from "@/components/mycomponents/(carousels)/Afino";
import Image from "next/image";
import { cn, convertToPersianNumber } from "@/lib/utils";
import FlagBearerMobiles from "@/components/mycomponents/(carousels)/FlagBearerMobiles";
import MainCarousel from "@/components/mycomponents/(carousels)/MainCarousel";
import LaptopHighlights from "@/components/mycomponents/(CatHighlights)/LaptopHighlights";
import MobileHighlights from "@/components/mycomponents/(CatHighlights)/MobileHighlights";
import LaptopCarousel from "@/components/mycomponents/(carousels)/LaptopCarousel";
import MobilePriceTags from "@/components/mycomponents/(CatPriceTag)/MobilePriceTags";
import LaptopPriceTags from "@/components/mycomponents/(CatPriceTag)/LaptopPriceTags";
import TabletHighlight from "@/components/mycomponents/(CatHighlights)/TabletHighlight";
import TabletCarousel from "@/components/mycomponents/(carousels)/TabletCarousel";
import HeadphonesHighlight from "@/components/mycomponents/(CatHighlights)/HeadphonesHighlight";
import HeadphonesCarousel from "@/components/mycomponents/(carousels)/HeadphonesCarousel";
import BestBrandsCarousel from "@/components/mycomponents/(carousels)/BestBrandsCarousel";


import ProductsCarouselSkeleton from "@/components/mycomponents/(skeletonComponets)/Landing/ProductsCarouselSkeleton";
import LandingPageOverview from "@/components/mycomponents/ProductOverview/custom/LandingPageOverview";

export default async function Home() {
  prefetch(trpc.products.getAffinoCarousel.queryOptions());
  prefetch(trpc.products.getMobileCarousel.queryOptions());
  prefetch(trpc.products.getLaptopCarousel.queryOptions());
  prefetch(trpc.products.getTabletCarousel.queryOptions());

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* image carousel */}
      <MainCarousel />

      <div className="s:mt-8 mt-6 flex max-w-[1920px] flex-col lg:mx-auto lg:mt-13 lg:w-9/10 lg:px-12">
        {/* categories carousel */}
        <CatCarousel />

        {/* afino - discountedProducts */}
        <HydrateClient>
          <ErrorBoundary fallback={<div>afino error boundary!!!!</div>}>
            <Suspense fallback={<ProductsCarouselSkeleton />}>
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
            <Suspense fallback={ <ProductsCarouselSkeleton  />}>
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
            <Suspense fallback={ <ProductsCarouselSkeleton  />}>
              <LaptopCarousel />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        <div className="mt-12 flex w-full flex-col items-center gap-y-1 lg:my-14 lg:grid lg:grid-cols-2 lg:gap-x-10 2xl:gap-x-13">
          {/* گوشی بر اساس قیمت  */}
          <MobilePriceTags />
          {/* لپ تاپ بر اساس قیمت  */}
          <LaptopPriceTags />
        </div>

        {/* tablet subCategories */}

        <TabletHighlight />

        {/* tablet carousel */}
        <HydrateClient>
          <ErrorBoundary
            fallback={<div>TabletCarousel error boundary!!!!</div>}
          >
            <Suspense fallback={ <ProductsCarouselSkeleton  />}>
              <TabletCarousel />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        {/* Headphones subCategories */}

        <HeadphonesHighlight />

        {/* Headphones carousel */}
        <HydrateClient>
          <ErrorBoundary
            fallback={<div>HeadphonesCarousel error boundary!!!!</div>}
          >
            <Suspense fallback={ <ProductsCarouselSkeleton  />}>
              <HeadphonesCarousel />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        {/* BEST brands carousel*/}

        <HydrateClient>
          <ErrorBoundary fallback={<div>BEST brands error boundary!!!!</div>}>
            <Suspense fallback={<>BEST brands Carousel loading</>}>
              <BestBrandsCarousel />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>

        {/* ProductOverview */}
        <LandingPageOverview />
      </div>
    </div>
  );
}
