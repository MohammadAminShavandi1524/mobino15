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
    trpc.products.getAffinoCarousel.queryOptions()
  );

  const productsData = _productsData.data.docs.filter((product) => {
    if (!product.offPrice) return false;
    const discountPercent = getDiscountPercent(product) as number;
    return discountPercent > 10;
  });

  const products = Array.from(
    new Map(productsData.map((p) => [p.name, p])).values()
  ).slice(0, 10);

  return (
    <div
      className=" w-full flex flex-col lg:min-h-120  lg:p-3 pb-6 border-b lg:border border-[#ffd7d9]
            lg:rounded-2xl mt-6 lg:mt-13"
    >
      <div className="flex justify-between items-center  w-full bg-[#a2191f] text-white px-5 pr-7 py-1.5 mb-3 lg:px-6 lg:py-3 lg:mb-6 lg:rounded-md">
        <div className="text-[15px] md:text-xl lg:text-2xl font-medium">
          آفینو
        </div>
        <Link
          href={""}
          className="flex items-center gap-x-1.5 lg:gap-x-2 cursor-pointer"
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
