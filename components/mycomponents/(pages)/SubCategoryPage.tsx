"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import Orderbar from "@/components/mycomponents/Orderbar";
import ProductFilters from "@/components/mycomponents/(product_filters)/ProductFilters";
import ProductList from "@/components/mycomponents/ProductList";
import { useProductFilters } from "@/hooks/useProductFilter";
import { Category } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { useState } from "react";

interface SubCategoryPageProps {
  category: string;
  subcategory: string;
}

const SubCategoryPage = ({ category, subcategory }: SubCategoryPageProps) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();

  const { data: categories } = useQuery(trpc.categories.getMany.queryOptions());

  const { data: productsData } = useQuery(
    trpc.products.getMany.queryOptions({
      ...filters,
    })
  );

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

  // محصولات فیلتر شده بر اساس کتگوری
  const products =
    productsData &&
    productsData?.docs.filter((product) => {
      return product.subCategory === selectedSubCategoryData?.id;
    });

  return (
    <div className="w90 flex flex-col mt-4">
      {/* bread crump */}
      <BreadCrump
        activePage="subcategory"
        selectedCategoryData={selectedCategoryData}
        selectedSubCategoryData={selectedSubCategoryData}
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

          <ProductList isFiltersOpened={isFiltersOpened} products={products} />
        </div>
      )}
    </div>
  );
};
export default SubCategoryPage;
