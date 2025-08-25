"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import ProductsCarouselLayout from "./ProductsCarouselLayout";

const FlagBearerMobiles = () => {
  const trpc = useTRPC();

  const productsData = useSuspenseQuery(
    trpc.products.getMobileCarousel.queryOptions(),
  );

  const products = Array.from(
    new Map(productsData.data.docs.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <ProductsCarouselLayout
      headerTitle="پرچمداران هوشمند"
      products={products}
      viewAllHref={"/flagbearerMobiles"}
      isAfino="false"
    />
  );
};
export default FlagBearerMobiles;
