"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { SlidersHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FiltersModalAvailableFilter from "./(product_filters)/FiltersModalAvailableFilter";
import FiltersModalPriceFilter from "./(product_filters)/FiltersModalPriceFilter";
import FiltersModalColorFilter from "./(product_filters)/FiltersModalColorFilter";
import FiltersModalBrandFilter from "./(product_filters)/FiltersModalBrandFilter";
import FiltersModalAppliedFilters from "./(product_filters)/FiltersModalAppliedFilters";

export interface TempfiltersProps {
  minPrice: string | null;
  maxPrice: string | null;
  available: boolean | null;
  color: string[] | null;
  brand: string[] | null;
}

interface FiltersModalProps {
  isfiltersModalOpened: boolean;
  setIsfiltersModalOpened: Dispatch<SetStateAction<boolean>>;
  activePage: "category" | "all" | "SubCategory" | "custom";
}

const FiltersModal = ({
  isfiltersModalOpened,
  setIsfiltersModalOpened,
  activePage,
}: FiltersModalProps) => {
  const [filters, setFilters] = useProductFilters();
  const { sort, ...filtersWithoutSort } = filters;

  const [Tempfilters, setTempFilters] =
    useState<TempfiltersProps>(filtersWithoutSort);

  useEffect(() => {
    setTempFilters(filtersWithoutSort);
  }, [isfiltersModalOpened]);

  const hasActiveFilters = Object.values(Tempfilters).some(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== false &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0),
  );

  const isPriceFilterActive = (Tempfilters: TempfiltersProps) => {
    return (
      (Tempfilters.minPrice !== null && filters.minPrice !== "") ||
      (Tempfilters.maxPrice !== null && filters.maxPrice !== "")
    );
  };

  const isColorFilterActive = (Tempfilters: TempfiltersProps) => {
    return (
      Tempfilters.color !== null &&
      Tempfilters.color !== undefined &&
      Tempfilters.color.length > 0
    );
  };

  const isBrandFilterActive = (Tempfilters: TempfiltersProps) => {
    return (
      Tempfilters.brand !== null &&
      Tempfilters.brand !== undefined &&
      Tempfilters.brand.length > 0
    );
  };

  const onSubmit = () => {
    setIsfiltersModalOpened(false);
    setFilters(Tempfilters);
    setTempFilters(filtersWithoutSort);
  };

  return (
    <>
      {isfiltersModalOpened && (
        <div
          // initial={{ x: "100%", opacity: 0, scale: 0.95 }}
          // animate={{ x: 0, opacity: 1, scale: 1 }}
          // exit={{ x: "100%", opacity: 0, scale: 0.95 }}
          // transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-0 right-0 z-[500] flex h-full max-h-[1080px] min-h-fit w-full min-w-screen flex-col bg-[#fcfeff]"
        >
          {/* header */}
          <div className="flex w-full items-center justify-between border-b border-b-[#ced0d0] px-6 py-4">
            <div className="flex items-center gap-x-2">
              <span className="">
                <SlidersHorizontal size={20} color="#333333" />
              </span>
              <span className="s:text-lg">فیلتر ها</span>
            </div>
            <button
              onClick={() => setIsfiltersModalOpened(false)}
              className="flex size-7 cursor-pointer items-center justify-center rounded-full"
            >
              <X size={24} strokeWidth={2} color="#b9375d" />
            </button>
          </div>
          {/* enabled filters */}
          {hasActiveFilters && (
            <div className="flex flex-col border-b border-b-[#ced0d0] lg:mx-[14px]">
              {/*  Applied filters tag and the Remove filters button  */}
              <div className="flex items-center justify-between px-6 py-4 lg:px-0 lg:py-3">
                <div className="text-[12px] text-[#333333]">
                  فیلتر‌های اعمال شده
                </div>
                <button
                  onClick={() =>
                    setTempFilters({
                      minPrice: null,
                      maxPrice: null,
                      available: null,
                      color: null,
                      brand: null,
                    })
                  }
                  className="flex cursor-pointer items-center gap-x-1 text-[#9c9d9e]"
                >
                  <span className="text-[12px]">حذف همه</span>
                  <span className="flex size-7 items-center justify-center">
                    <X size={24} strokeWidth={2} />
                  </span>
                </button>
              </div>
              {/* Applied filters */}
              <div className="max-w-full">
                <FiltersModalAppliedFilters
                  Tempfilters={Tempfilters}
                  setTempFilters={setTempFilters}
                />
              </div>
            </div>
          )}
          {/* filters */}
          <div className="flex h-full flex-col overflow-y-scroll px-6 pt-4 pb-24">
            <FiltersModalAvailableFilter
              available={Tempfilters.available}
              onAvailableChange={(value) =>
                setTempFilters({ ...Tempfilters, available: value })
              }
            />

            <FiltersModalPriceFilter
              maxPrice={Tempfilters.maxPrice}
              minPrice={Tempfilters.minPrice}
              onMaxPriceChange={(value) =>
                setTempFilters({ ...Tempfilters, maxPrice: value })
              }
              onMinPriceChange={(value) =>
                setTempFilters({ ...Tempfilters, minPrice: value })
              }
              isPriceFilterActive={isPriceFilterActive(Tempfilters)}
            />

            <FiltersModalColorFilter
              colors={Tempfilters.color}
              setTempFilters={setTempFilters}
              isColorFilterActive={isColorFilterActive(Tempfilters)}
            />

            <FiltersModalBrandFilter
              brands={Tempfilters.brand}
              activePage={activePage}
              isBrandFilterActive={isBrandFilterActive(Tempfilters)}
              setTempFilters={setTempFilters}
              Tempfilters={Tempfilters}
            />
          </div>
          {/* submit or cancel filters */}

          <div className="fixed right-0 bottom-0 z-5 flex w-full items-center gap-x-3 border-t border-t-[#f0f0f0] bg-white px-6 py-4 text-sm">
            {/* submit */}
            <button
              onClick={() => onSubmit()}
              className="bg-custom-primary w-full cursor-pointer rounded-md px-4 py-3 text-white"
            >
              اعمال فیلتر ها
            </button>
            <button
              onClick={() => setIsfiltersModalOpened(false)}
              className="text-custom-primary s:min-w-30 min-w-20 cursor-pointer px-4 py-3 sm:min-w-40 md:min-w-50"
            >
              انصراف
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersModal;
