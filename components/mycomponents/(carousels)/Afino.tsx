"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  cn,
  convertToPersianNumber,
  getDiscountPercent,
  shuffle,
} from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import ProductsCarousel from "./ProductsCarousel";
import { useEffect, useState } from "react";

const Afino = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const trpc = useTRPC();

  const _productsData = useSuspenseQuery(
    trpc.products.getAffinoCarousel.queryOptions(),
  );

  const productsData = _productsData.data.docs.filter((product) => {
    if (!product.offPrice) return false;
    const discountPercent = getDiscountPercent(product) as number;
    return discountPercent > 10;
  });

  const products = Array.from(
    new Map(productsData.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <div className="mt-6 flex w-full flex-col border-b border-[#ffd7d9] pb-6 lg:mt-13 lg:min-h-120 lg:rounded-2xl lg:border lg:p-3">
      <div className="mb-3 flex w-full items-center justify-between bg-[#a2191f] px-5 py-1.5 pr-7 text-white lg:mb-6 lg:rounded-md lg:px-6 lg:py-3">
        <div className="text-[15px] font-medium md:text-xl lg:text-2xl">
          آفینو
        </div>
        <Link
          href={""}
          className="flex cursor-pointer items-center gap-x-1.5 lg:gap-x-2"
        >
          <span className="text-[12px] md:text-sm">نمایش همه</span>
          <span>
            <ChevronLeft size={isMobile ? 16 : 20} />
          </span>
        </Link>
      </div>
      <ProductsCarousel products={products} />
    </div>
  );
};
export default Afino;
