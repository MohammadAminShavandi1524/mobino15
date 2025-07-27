"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import ProductList from "@/components/mycomponents/ProductList";
import ProductListSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductListSkeleton";
import { Category } from "@/payload-types";
import Link from "next/link";
import { Suspense, useState } from "react";
import Orderbar from "@/components/mycomponents/Orderbar";
import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import ProductFilters from "@/components/mycomponents/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilter";

interface CategoryProps {}

const CategoryPage = ({}: CategoryProps) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [filters, setFilters] = useProductFilters();

  const { category } = useParams();
  const trpc = useTRPC();

  const _categories = useQuery(trpc.categories.getMany.queryOptions());
  const categories = _categories.data;

  const _products = useQuery(
    trpc.products.getMany.queryOptions({
      ...filters,
    })
  );
  const __products = _products.data;

  const selectedCategoryData = categories?.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  // محصولات فیلتر شده بر اساس کتگوری
  const products =
    __products &&
    __products?.docs.filter((product) => {
      return product.category === selectedCategoryData?.id;
    });

  // ? subcategory sorted by order **For Categories Tags**

  selectedCategoryData &&
    (selectedCategoryData?.subcategories?.docs as Category[]).sort(
      (a, b) => a.order - b.order
    );

  // ?

  return (
    <div className="w90 flex flex-col">
      {/* bread crump and categories tags */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        <BreadCrump
          activePage="category"
          selectedCategoryData={selectedCategoryData}
        />
        {/* categories tags */}
        <div className="flex items-center gap-x-4 ">
          {selectedCategoryData &&
            (selectedCategoryData?.subcategories?.docs as Category[]).map(
              (sub) => {
                return (
                  <Link
                    href={`/${selectedCategoryData.name}/${sub.name}`}
                    key={sub.id}
                    className="px-6 py-2 text-[10px] text-[#81858b] border border-[#81858b] rounded-md
                    cursor-pointer"
                  >
                    {sub.label}
                  </Link>
                );
              }
            )}
        </div>
      </div>

      {/* product and product filters */}

      {isFiltersOpened ? (
        <div className="relative flex px-[10px] mt-8 gap-x-8">
          {/* filter*/}
          <ProductFilters
            activePage="category"
            isFiltersOpened={isFiltersOpened}
            setIsFiltersOpened={setIsFiltersOpened}
          />

          {/*orderbar and products list  */}
          <div className="flex flex-col h-[3000px] w-full   ">
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
              activePage="category"
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
export default CategoryPage;
