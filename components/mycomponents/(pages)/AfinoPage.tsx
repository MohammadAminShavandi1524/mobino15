"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import ProductListLayout from "../ProductListLayout";

interface AfinoPageProps {}

const AfinoPage = ({}: AfinoPageProps) => {
  const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getAfinoProducts.queryOptions({
      ...filters,
    })
  );
  const allReviews = useSuspenseQuery(trpc.reviews.getMany.queryOptions()).data;

  const _products = productsData?.docs;

  const products = _products.filter((product) => {
    const percent =
      (product.offPrice &&
        Math.ceil(
          ((product.price - product.offPrice) / product.price) * 100
        )) ||
      0;

    return percent > 5;
  });

  return (
    <ProductListLayout
      ProductsFiltersActivePage="all"
      breadCrupActivePage="afino"
      isCategory={false}
      products={products}
      reviews={allReviews}
    />
  );
};

export default AfinoPage;
