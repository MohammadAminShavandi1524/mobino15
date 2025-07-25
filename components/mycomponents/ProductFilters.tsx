"use client";

import { PanelRightClose, SlidersHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Pricefilter from "./Pricefilter";
import { useProductFilters } from "@/hooks/useProductFilter";
import AppliedFilters from "./AppliedFilters";
import AvailableProductsFilter from "@/components/mycomponents/AvailableProductsFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";

interface ProductFiltersProps {
  isFiltersOpened: boolean;
  setIsFiltersOpened: Dispatch<SetStateAction<boolean>>;
  activePage: "category" | "all";
}

const ProductFilters = ({
  isFiltersOpened,
  setIsFiltersOpened,
  activePage,
}: ProductFiltersProps) => {
  const [filters, setFilters] = useProductFilters();

  type ProductFilters = ReturnType<typeof useProductFilters>[0];

  const { sort, ...filtersWithoutSort } = filters;

  const hasActiveFilters = Object.values(filtersWithoutSort).some(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== false &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
  );

  const isPriceFilterActive = (filters: ProductFilters) => {
    return (
      (filters.minPrice !== null && filters.minPrice !== "") ||
      (filters.maxPrice !== null && filters.maxPrice !== "")
    );
  };

  const isColorFilterActive = (filters: ProductFilters) => {
    return (
      filters.color !== null &&
      filters.color !== undefined &&
      filters.color.length > 0
    );
  };

  const isBrandFilterActive = (filters: ProductFilters) => {
    return (
      filters.brand !== null &&
      filters.brand !== undefined &&
      filters.brand.length > 0
    );
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  //
  if (isFiltersOpened)
    return (
      <aside className="flex flex-col self-start min-w-[270px] max-w-[270px]  sticky top-0 right-0 border border-[#ced0d0] rounded-md pb-4">
        {/* header */}
        <div className="flex items-center justify-between  p-[14px] border-b border-b-[#ced0d0]">
          <div className="flex items-center gap-x-2 text-[#333333]">
            <span>
              <SlidersHorizontal size={16} />
            </span>
            <span className="text-[12px] font-medium">فیلتر ها</span>
          </div>
          <div
            onClick={() => setIsFiltersOpened(false)}
            className="cursor-pointer"
          >
            <PanelRightClose color="#223c78" size={20} />
          </div>
        </div>

        {/* enabled filters */}
        {hasActiveFilters && (
          <div className="flex flex-col  mx-[14px] border-b border-b-[#ced0d0]">
            {/*  Applied filters tag and the Remove filters button  */}
            <div className="flex justify-between items-center py-3">
              <div className="text-[12px] text-[#333333]">
                فیلتر‌های اعمال شده
              </div>
              <button
                onClick={() =>
                  setFilters({
                    minPrice: null,
                    maxPrice: null,
                    available: null,
                    color: null,
                    brand: null,
                  })
                }
                className="flex items-center gap-x-1 text-[#9c9d9e] cursor-pointer"
              >
                <span className="text-[12px]">حذف همه</span>
                <span>
                  <X size={16} />
                </span>
              </button>
            </div>
            {/* Applied filters */}
            <div className="max-w-full">
              <AppliedFilters />
            </div>
          </div>
        )}

        {/* filters */}
        <div className="flex flex-col mx-[14px]">
          <AvailableProductsFilter
            available={filters.available}
            onAvailableChange={(value) => onChange("available", value)}
          />

          <Pricefilter
            maxPrice={filters.maxPrice}
            minPrice={filters.minPrice}
            onMaxPriceChange={(value) => onChange("maxPrice", value)}
            onMinPriceChange={(value) => onChange("minPrice", value)}
            isPriceFilterActive={isPriceFilterActive(filters)}
          />

          <ColorFilter
            colors={filters.color}
            setFilters={setFilters}
            isColorFilterActive={isColorFilterActive(filters)}
          />

          <BrandFilter
            brands={filters.brand}
            activePage={activePage}
            isBrandFilterActive={isBrandFilterActive(filters)}
            setFilters={setFilters}
          />
        </div>
      </aside>
    );

  return (
    <div
      onClick={() => setIsFiltersOpened(true)}
      className="flex items-center w-[130px] h-[50px] px-[14px] bg-[#f6f6f6] border border-[#ced0d0] 
      gap-x-2 text-[#333333] rounded-md cursor-pointer"
    >
      <span>
        <SlidersHorizontal size={16} />
      </span>
      <span className="text-[12px] font-medium">فیلتر ها</span>
    </div>
  );
};
export default ProductFilters;
