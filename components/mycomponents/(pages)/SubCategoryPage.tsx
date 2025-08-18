"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import Orderbar from "@/components/mycomponents/Orderbar";
import ProductFilters from "@/components/mycomponents/(product_filters)/ProductFilters";
import ProductList from "@/components/mycomponents/ProductList";
import { useProductFilters } from "@/hooks/useProductFilter";
import { Category } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { useState } from "react";
import { convertCatOrSubToId } from "@/lib/utils";
import ProductListLayout from "../ProductListLayout";

interface SubCategoryPageProps {
  category: string;
  subcategory: string;
}

const SubCategoryPage = ({ category, subcategory }: SubCategoryPageProps) => {
  const [filters, setFilters] = useProductFilters();

  const id = convertCatOrSubToId(subcategory);
  const trpc = useTRPC();

  if (!id) return <div>param loading</div>; // loading for empty param

  const subReviews = useSuspenseQuery(
    trpc.reviews.getSubReviews.queryOptions({ Id: id })
  ).data;

  const products = useSuspenseQuery(
    trpc.products.getSubCatProducts.queryOptions({ ...filters, Id: id })
  ).data.docs;

  const { data: categories } = useQuery(trpc.categories.getMany.queryOptions());

  const selectedCategoryData = categories?.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  const selectedSubCategoryData =
    selectedCategoryData &&
    (selectedCategoryData?.subcategories?.docs as Category[]).find((sub) => {
      const findedSubCategory = sub.name === subcategory;
      return findedSubCategory;
    });

  return (
    <ProductListLayout
      ProductsFiltersActivePage="SubCategory"
      breadCrupActivePage="subcategory"
      isCategory={false}
      products={products}
      reviews={subReviews}
      selectedCategoryData={selectedCategoryData}
      selectedSubCategoryData={selectedSubCategoryData}
    />
  );
};
export default SubCategoryPage;
