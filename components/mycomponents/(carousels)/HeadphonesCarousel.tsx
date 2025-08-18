"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductsCarousel from "./ProductsCarousel";

const HeadphonesCarousel = () => {
  const trpc = useTRPC();

  const productsData = useSuspenseQuery(
    trpc.products.getHeadphonesCarousel.queryOptions(),
  );

  const products = Array.from(
    new Map(productsData.data.docs.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <div className="mt-13 flex min-h-120 w-full flex-col rounded-2xl border border-[#919ebc] p-3 pb-6">
      <div className="flex w-full items-center justify-between rounded-md px-6 pt-3">
        <div className="text-xl font-medium">هدفون ها در موبینو</div>
        <Link href={""} className="flex cursor-pointer items-center gap-x-2">
          <span className="text-custom-primary">نمایش همه</span>
          <span className="text-custom-primary">
            <ChevronLeft size={20} />
          </span>
        </Link>
      </div>
      <ProductsCarousel products={products} />
    </div>
  );
};
export default HeadphonesCarousel;
