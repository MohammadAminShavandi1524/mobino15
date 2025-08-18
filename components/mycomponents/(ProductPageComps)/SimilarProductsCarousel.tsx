"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductsCarousel from "../(carousels)/ProductsCarousel";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Category, Product } from "@/payload-types";
import { convertIdToCatOrSub } from "@/lib/utils";

interface SimilarProductsCarouselProps {
  product: Product;
}

const SimilarProductsCarousel = ({ product }: SimilarProductsCarouselProps) => {
  const trpc = useTRPC();

  const productsData = useQuery(
    trpc.products.getSubCatProducts.queryOptions({
      Id: product.subCategory as string,
    }),
  ).data?.docs;

  const products = productsData?.filter((p) => {
    return p.available && p.name !== product.name;
  });

  const uniqueAvailableProducts = Array.from(
    new Map(products?.map((p) => [p.name, p])).values(),
  );

  return (
    <div className="mt-13 flex min-h-120 w-full flex-col rounded-2xl border border-[#d3d8e4] p-3 pb-6">
      <div className="flex w-full items-center justify-between rounded-md px-6 pt-3">
        <div className="text-xl font-medium">محصولات مشابه</div>
        <Link
          href={`/${convertIdToCatOrSub(product.category as string)}/${convertIdToCatOrSub(product.subCategory as string)}`}
          target="_blank"
          className="flex cursor-pointer items-center gap-x-2"
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
