"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, convertToPersianNumber, shuffle } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductsCarousel from "./ProductsCarousel";

const Afino = () => {
  const trpc = useTRPC();

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const availableDiscountedProducts = productsData?.docs.filter((p) => {
    return p.available && p.offPrice;
  });

  const products = Array.from(
    new Map(availableDiscountedProducts.map((p) => [p.name, p])).values()
  ).slice(0, 10);

  return (
    <div
      className="mt-13 w-full flex flex-col min-h-120 p-3 pb-6 border border-[#ffd7d9]
            rounded-2xl"
    >
      <div className="flex justify-between items-center  w-full bg-[#a2191f] text-white px-6 py-3 mb-6 rounded-md">
        <div className="text-2xl font-medium">آفینو</div>
        <Link href={""} className="flex items-center gap-x-2 cursor-pointer">
          <span className="">نمایش همه</span>
          <span>
            <ChevronLeft size={20} />
          </span>
        </Link>
      </div>
      <ProductsCarousel products={products} />
    </div>
  );
};
export default Afino;
