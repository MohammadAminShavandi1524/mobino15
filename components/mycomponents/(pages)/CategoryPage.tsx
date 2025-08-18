"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import ProductList from "@/components/mycomponents/ProductList";

import { Category } from "@/payload-types";
import Link from "next/link";
import { useState } from "react";
import Orderbar from "@/components/mycomponents/Orderbar";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductFilters from "@/components/mycomponents/(product_filters)/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilter";
import { convertCatOrSubToId } from "@/lib/utils";
import ProductListLayout from "../ProductListLayout";

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {

  const [filters, setFilters] = useProductFilters();

  const id = convertCatOrSubToId(category);
  const trpc = useTRPC();

  if (!id) return <div>param loading</div>; // loading for empty param

  const catReviews = useSuspenseQuery(
    trpc.reviews.getCatReviews.queryOptions({ Id: id })
  ).data;

  const products = useSuspenseQuery(
    trpc.products.getCatProducts.queryOptions({ ...filters, Id: id })
  ).data.docs;

  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const selectedCategoryData = categories?.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  // ? subcategory sorted by order **For Categories Tags**

  selectedCategoryData &&
    (selectedCategoryData?.subcategories?.docs as Category[]).sort(
      (a, b) => a.order - b.order
    );

  // ?

  return (
    <ProductListLayout
      ProductsFiltersActivePage="category"
      breadCrupActivePage="category"
      isCategory={true}
      products={products}
      reviews={catReviews}
      selectedCategoryData={selectedCategoryData}
    />
  );
};
export default CategoryPage;
