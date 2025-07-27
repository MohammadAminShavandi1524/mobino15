"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import Orderbar from "@/components/mycomponents/Orderbar";
import ProductList from "@/components/mycomponents/ProductList";
import ProductListSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductListSkeleton";
import ProductsFilter from "@/components/mycomponents/ProductFilters";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import ProductFilters from "@/components/mycomponents/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilter";

interface ProductsProps {}

const Products = ({}: ProductsProps) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();
  const _products = useQuery(
    trpc.products.getMany.queryOptions({
      ...filters,
    })
  );
  const __products = _products.data;
  const products = __products?.docs;

  return (
    <div className="w90 flex flex-col">
      {/* bread crump and categories tags */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        <BreadCrump activePage="all" />
      </div>

      {/* product and product filters */}
      {isFiltersOpened ? (
        <div className="relative flex px-[10px] mt-8 gap-x-8">
          {/* filter*/}
          <ProductFilters
            activePage="all"
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
              activePage="all"
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
export default Products;
