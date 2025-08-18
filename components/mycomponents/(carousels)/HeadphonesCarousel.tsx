"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductsCarouselLayout from "./ProductsCarouselLayout";

const HeadphonesCarousel = () => {
  const trpc = useTRPC();

  const productsData = useSuspenseQuery(
    trpc.products.getHeadphonesCarousel.queryOptions(),
  );

  const products = Array.from(
    new Map(productsData.data.docs.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <ProductsCarouselLayout
      headerTitle="هدفون ها در موبینو"
      products={products}
      viewAllHref="/Headphones"
      isAfino="false"
    />
  );
};
export default HeadphonesCarousel;
