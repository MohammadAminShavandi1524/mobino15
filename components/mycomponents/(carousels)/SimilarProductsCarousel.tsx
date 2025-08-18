"use client";


import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Category, Product } from "@/payload-types";
import { convertIdToCatOrSub } from "@/lib/utils";
import ProductsCarouselLayout from "./ProductsCarouselLayout";

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
    <ProductsCarouselLayout
      headerTitle="محصولات مشابه"
      products={uniqueAvailableProducts}
      viewAllHref={`/${convertIdToCatOrSub(product.category as string)}/${convertIdToCatOrSub(product.subCategory as string)}`}
      isAfino="false"
    />
  );
};
export default SimilarProductsCarousel;
