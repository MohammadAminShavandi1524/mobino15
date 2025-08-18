"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductsCarouselLayout from "./ProductsCarouselLayout";

const LaptopCarousel = () => {
  const trpc = useTRPC();

  const productsData = useSuspenseQuery(
    trpc.products.getLaptopCarousel.queryOptions(),
  );

  const products = Array.from(
    new Map(productsData.data.docs.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <ProductsCarouselLayout
      headerTitle="لپ تاپ ها در موبینو"
      products={products}
      viewAllHref="/laptop"
      isAfino="false"
    />
  );
};
export default LaptopCarousel;
