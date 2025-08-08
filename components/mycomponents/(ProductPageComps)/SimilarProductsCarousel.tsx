"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductsCarousel from "../(carousels)/ProductsCarousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Category, Product } from "@/payload-types";

interface SimilarProductsCarouselProps {
  subCategory: Category;
  category: Category;
  product: Product;
}

const SimilarProductsCarousel = ({
  subCategory,
  product,
  category,
}: SimilarProductsCarouselProps) => {
  const trpc = useTRPC();

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const products = productsData.docs.filter((p) => {
    return (
      p.available && p.subCategory === subCategory.id && p.name !== product.name
    );
  });
  // console.log("🚀 ~ SimilarProductsCarousel ~ products:", products)
  

  const uniqueAvailableProducts = Array.from(
    new Map(products.map((p) => [p.name, p])).values()
  );
  // console.log("🚀 ~ SimilarProductsCarousel ~ uniqueAvailableProducts:", uniqueAvailableProducts)

 

  return (
    <div
      className="mt-13 w-full flex flex-col min-h-120 p-3 pb-6 border border-[#d3d8e4]
            rounded-2xl"
    >
      <div className="flex justify-between items-center  w-full  px-6 pt-3  rounded-md">
        <div className="text-xl font-medium">محصولات مشابه</div>
        <Link
          href={`/${category?.name}/${subCategory?.name}`}
          className="flex items-center gap-x-2 cursor-pointer"
        >
          <span className="text-custom-primary">نمایش همه</span>
          <span className="text-custom-primary">
            <ChevronLeft size={20} />
          </span>
        </Link>
      </div>
      <ProductsCarousel products={uniqueAvailableProducts} />
    </div>
  );
};
export default SimilarProductsCarousel;
