"use client";

import { PanelRightClose, SlidersHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Pricefilter from "./Pricefilter";
import { useProductFilters } from "@/hooks/useProductFilter";
import AppliedFilters from "./AppliedFilters";

interface ProductFiltersProps {
  isFiltersOpened: boolean;
  setIsFiltersOpened: Dispatch<SetStateAction<boolean>>;
}

const ProductFilters = ({
  isFiltersOpened,
  setIsFiltersOpened,
}: ProductFiltersProps) => {
  const [filters, setFilters] = useProductFilters();

  type ProductFilters = ReturnType<typeof useProductFilters>[0];

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== undefined
  );

  const isPriceFilterActive = (filters: ProductFilters) => {
    return (
      (filters.minPrice !== null && filters.minPrice !== "") ||
      (filters.maxPrice !== null && filters.maxPrice !== "")
    );
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  //
  if (isFiltersOpened)
    return (
      <aside className="flex flex-col min-w-[270px] h-[650px] sticky top-0 right-0 border border-[#ced0d0] rounded-md">
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
          <div className="flex flex-col mx-[14px] border-b border-b-[#ced0d0]">
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
            <div className="w-full">
              <AppliedFilters />
            </div>
          </div>
        )}

        {/* filters */}
        <div className="flex flex-col mx-[14px]">
          <Pricefilter
            maxPrice={filters.maxPrice}
            minPrice={filters.minPrice}
            onMaxPriceChange={(value) => onChange("maxPrice", value)}
            onMinPriceChange={(value) => onChange("minPrice", value)}
            isPriceFilterActive={isPriceFilterActive(filters)}
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
