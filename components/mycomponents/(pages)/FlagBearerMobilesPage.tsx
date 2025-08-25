"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductListLayout from "../ProductListLayout";

interface FlagBearerMobilesPageProps {
  
}

const FlagBearerMobilesPage = ({}: FlagBearerMobilesPageProps) => {

const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();

  const  products  = useSuspenseQuery(
    trpc.products.getّFlagbearerMobilesProducts.queryOptions({
      ...filters,
    }),
  ).data.docs;

  const allReviews = useSuspenseQuery(trpc.reviews.getMany.queryOptions()).data;

  return (
   <ProductListLayout
      ProductsFiltersActivePage="custom"
      breadCrupActivePage="flagBearerMobiles"
      isCategory={false}
      products={products}
      reviews={allReviews}
      isCustomProductOverview="flagBearerMobiles"
    />
  );
};

export default FlagBearerMobilesPage;














