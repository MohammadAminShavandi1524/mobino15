"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductsCarouselLayout from "./ProductsCarouselLayout";

const TabletCarousel = () => {
  const trpc = useTRPC();

  const productsData = useSuspenseQuery(
    trpc.products.getTabletCarousel.queryOptions(),
  );

  const products = Array.from(
    new Map(productsData.data.docs.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <ProductsCarouselLayout
      headerTitle="تبلت ها در موبینو"
      products={products}
      viewAllHref="/tablet"
      isAfino="false"
    />
  );
};
export default TabletCarousel;
