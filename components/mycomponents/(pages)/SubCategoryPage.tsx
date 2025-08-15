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

interface SubCategoryPageProps {
  category: string;
  subcategory: string;
}

const SubCategoryPage = ({ category, subcategory }: SubCategoryPageProps) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
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
    <div className="w90 flex flex-col mt-4">
      {/* bread crump */}
      <BreadCrump
        activePage="subcategory"
        category={selectedCategoryData?.name}
        subCategory={selectedSubCategoryData?.name}
        className="px-[10px]"
      />

      {/* product and product filters */}

      {isFiltersOpened ? (
        <div className="relative flex px-[10px] mt-8 gap-x-8">
          {/* filter*/}
          <ProductFilters
            activePage="SubCategory"
            isFiltersOpened={isFiltersOpened}
            setIsFiltersOpened={setIsFiltersOpened}
          />

          {/*orderbar and products list  */}
          <div className="flex flex-col  w-full   ">
            {/* order bar */}
            <Orderbar
              sorts={filters.sort}
              setFilters={setFilters}
              products={products}
            />

            {/* products list */}

            <ProductList
              products={products}
              reviews={subReviews}
              isFiltersOpened={isFiltersOpened}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-5 w-full px-[10px] mt-8">
          {/* filters and orderbar */}
          <div className="flex gap-x-5">
            <ProductFilters
              activePage="SubCategory"
              isFiltersOpened={isFiltersOpened}
              setIsFiltersOpened={setIsFiltersOpened}
            />
            <Orderbar
              sorts={filters.sort}
              setFilters={setFilters}
              products={products}
            />
          </div>
          {/* product list */}

          <ProductList
            isFiltersOpened={isFiltersOpened}
            products={products}
            reviews={subReviews}
          />
        </div>
      )}
    </div>
  );
};
export default SubCategoryPage;
