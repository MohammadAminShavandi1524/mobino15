"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import Orderbar from "@/components/mycomponents/Orderbar";
import ProductList from "@/components/mycomponents/ProductList";
import ProductListSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductListSkeleton";
import ProductsFilter from "@/components/mycomponents/ProductFilters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import ProductFilters from "@/components/mycomponents/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilter";

interface ProductsProps {}

const Products = ({}: ProductsProps) => {
  const [activeOrder, setActiveOrder] = useState<string>("Newest");
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const _products = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      ...filters,
    })
  );
  const __products = _products.data;
  const products = __products?.docs;

  if (products) {
    switch (activeOrder) {
      case "MostPopular":
        products.sort((a, b) => b.rating - a.rating);
        break;

      case "HighestPrice":
        products.sort((a, b) => {
          const priceA = a.offPrice || a.price;
          const priceB = b.offPrice || b.price;
          return priceB - priceA;
        });
        break;

      case "LowestPrice":
        products.sort((a, b) => {
          const priceA = a.offPrice || a.price;
          const priceB = b.offPrice || b.price;
          return priceA - priceB;
        });
        break;

      case "BiggestDiscount":
        products.sort((a, b) => {
          const discountA = a.price - (a.offPrice || a.price);
          const discountB = b.price - (b.offPrice || b.price);
          return discountB - discountA;
        });

        break;

      default:
        products;
        break;
    }
  }



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
              products={products}
              activeOrder={activeOrder}
              setActiveOrder={setActiveOrder}
            />

            {/* products list */}
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList
                products={products}
                isFiltersOpened={isFiltersOpened}
              />
            </Suspense>
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
              products={products}
              activeOrder={activeOrder}
              setActiveOrder={setActiveOrder}
            />
          </div>
          {/* product list */}
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList
              isFiltersOpened={isFiltersOpened}
              products={products}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};
export default Products;
