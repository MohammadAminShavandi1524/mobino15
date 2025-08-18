"use client";

import { getDiscountPercent } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductsCarouselLayout from "./ProductsCarouselLayout";

const Afino = () => {
  const trpc = useTRPC();

  const _productsData = useSuspenseQuery(
    trpc.products.getAffinoCarousel.queryOptions(),
  );

  const productsData = _productsData.data.docs.filter((product) => {
    if (!product.offPrice) return false;
    const discountPercent = getDiscountPercent(product) as number;
    return discountPercent > 10;
  });

  const products = Array.from(
    new Map(productsData.map((p) => [p.name, p])).values(),
  ).slice(0, 10);

  return (
    <ProductsCarouselLayout
      headerTitle="آفینو"
      products={products}
      viewAllHref="/afino"
      borderColor="#ffd7d9"
      headerBgColor="#a2191f"
      headerTextColor="#ffffff"
      isAfino="true"
    />
  );
};
export default Afino;
