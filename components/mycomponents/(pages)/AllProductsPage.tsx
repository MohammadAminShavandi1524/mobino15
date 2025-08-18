"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import Orderbar from "@/components/mycomponents/Orderbar";
import ProductList from "@/components/mycomponents/ProductList";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductFilters from "@/components/mycomponents/(product_filters)/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilter";
import ProductListLayout from "../ProductListLayout";

interface AllProductsPageProps {}

const AllProductsPage = ({}: AllProductsPageProps) => {
  
  const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      ...filters,
    })
  );
  const allReviews = useSuspenseQuery(trpc.reviews.getMany.queryOptions()).data;

  const products = productsData?.docs;

  return (
    <ProductListLayout
      ProductsFiltersActivePage="all"
      breadCrupActivePage="all"
      products={products}
      reviews={allReviews}
      isCategory={false}
    />
  );
};
export default AllProductsPage;
