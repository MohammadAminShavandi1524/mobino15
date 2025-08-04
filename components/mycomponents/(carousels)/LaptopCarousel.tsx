"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductsCarousel from "./ProductsCarousel";

const LaptopCarousel = () => {
  const trpc = useTRPC();

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const products = productsData.docs.filter((product) => {
    return product.available && product.category === "68721e69c794390510ef3922";
  });

  return (
    <div
      className="mt-13 w-full flex flex-col min-h-120 p-3 pb-6 border border-custom-primary
            rounded-2xl"
    >
      <div className="flex justify-between items-center  w-full  px-6 pt-3  rounded-md">
        <div className="text-xl font-medium">لپ تاپ ها در موبینو</div>
        <Link href={""} className="flex items-center gap-x-2 cursor-pointer">
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
export default LaptopCarousel;
