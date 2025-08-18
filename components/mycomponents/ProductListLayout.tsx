"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { Category, Product, Review } from "@/payload-types";
import { Dispatch, SetStateAction, useState } from "react";
import BreadCrump from "./BreadCrump";
import Link from "next/link";
import ProductFilters from "./(product_filters)/ProductFilters";
import Orderbar from "./Orderbar";
import ProductList from "./ProductList";

interface ProductListLayoutProps {
  breadCrupActivePage: "category" | "subcategory" | "all" | "afino";
  ProductsFiltersActivePage: "category" | "all" | "SubCategory";
  selectedCategoryData?: Category | undefined;
  selectedSubCategoryData?: Category | undefined;
  isCategory: boolean;
  products: Product[] | undefined | null;
  reviews: Review[] | undefined | null;
}

const ProductListLayout = ({
  ProductsFiltersActivePage,
  breadCrupActivePage,
  isCategory,
  products,
  reviews,
  selectedCategoryData,
  selectedSubCategoryData,
}: ProductListLayoutProps) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [filters, setFilters] = useProductFilters();
  return (
    <div className="w90 flex flex-col mt-4">
      {/* bread crump and categories tags */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        {breadCrupActivePage === "category" ? (
          <BreadCrump
            activePage="category"
            category={selectedCategoryData?.name}
          />
        ) : breadCrupActivePage === "subcategory" ? (
          <BreadCrump
            activePage="subcategory"
            category={selectedCategoryData?.name}
            subCategory={selectedSubCategoryData?.name}
            className="px-[10px]"
          />
        ) : breadCrupActivePage === "afino" ? (
          <BreadCrump activePage="afino" />
        ) : (
          <BreadCrump activePage="all" />
        )}

        {/* categories tags */}

        {isCategory && (
          <div className="flex items-center gap-x-4">
            {selectedCategoryData &&
              (selectedCategoryData?.subcategories?.docs as Category[]).map(
                (sub, index) => {
                  return (
                    <Link
                      href={`/${selectedCategoryData.name}/${sub.name}`}
                      key={index}
                      className="px-6 py-2 text-[10px] text-[#81858b] border border-[#81858b] rounded-md
                    cursor-pointer"
                    >
                      {sub.label}
                    </Link>
                  );
                }
              )}
          </div>
        )}
      </div>

      {/* product and product filters */}

      {isFiltersOpened ? (
        <div className="relative flex px-[10px] mt-8 gap-x-8">
          {/* filter*/}
          <ProductFilters
            activePage={ProductsFiltersActivePage}
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
              reviews={reviews}
              isFiltersOpened={isFiltersOpened}
              isAfinoPage={breadCrupActivePage === "afino"}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-5 w-full px-[10px] mt-8">
          {/* filters and orderbar */}
          <div className="flex gap-x-5">
            <ProductFilters
              activePage={ProductsFiltersActivePage}
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
            reviews={reviews}
            isAfinoPage={breadCrupActivePage === "afino"}
          />
        </div>
      )}
    </div>
  );
};

export default ProductListLayout;
