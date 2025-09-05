"use client";

import { cn, convertToPersianNumber, getSortLabel } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";
import { ParserBuilder, SetValues } from "nuqs";
import { PaginatedDocs } from "payload";
import { Dispatch, SetStateAction, useState } from "react";
import OrderBarModal from "./OrderBarModal";
import FiltersModal from "./FiltersModal";

interface OrderbarProps {
  products: Product[] | undefined | null;
  setFilters: SetValues<{
    sort: ParserBuilder<
      "TheLatest" | "HighestPrice" | "LowestPrice" | "BiggestDiscount"
    >;
  }>;
  sorts:
    | "TheLatest"
    | "HighestPrice"
    | "LowestPrice"
    | "BiggestDiscount"
    | null;
  productslength: number;

  activePage: "category" | "all" | "SubCategory" | "custom";
}

const Orderbar = ({
  products,
  setFilters,
  sorts,
  productslength,
  activePage,
}: OrderbarProps) => {
  const [isOrderbarModalOpened, setIsOrderbarModalOpened] = useState(false);
  const [isfiltersModalOpened, setIsfiltersModalOpened] = useState(false);

  const handleSortChange = (
    value: "TheLatest" | "HighestPrice" | "LowestPrice" | "BiggestDiscount",
  ) => {
    if (sorts === value) {
      setFilters({ sort: null });
      setIsOrderbarModalOpened(false);
    } else {
      setFilters({ sort: value });
      setIsOrderbarModalOpened(false);
    }
  };

  const sortOptions = [
    { label: "جدیدترین", value: "TheLatest" },
    { label: "بیشترین قیمت", value: "HighestPrice" },
    { label: "کم ترین قیمت", value: "LowestPrice" },
    { label: "بیشترین تخفیف", value: "BiggestDiscount" },
  ];

  return (
    <>
      <OrderBarModal
        sorts={sorts}
        isOrderbarModalOpened={isOrderbarModalOpened}
        setIsOrderbarModalOpened={setIsOrderbarModalOpened}
        handleSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
      <FiltersModal
        isfiltersModalOpened={isfiltersModalOpened}
        setIsfiltersModalOpened={setIsfiltersModalOpened}
        activePage={activePage}
      />
      <div className="w-full bg-white max-lg:sticky max-lg:top-0 max-lg:z-5 max-lg:px-4 max-lg:py-4">
        <div className="flex items-center justify-between rounded-lg bg-[#e9ecf2] text-[12px] max-lg:px-4 lg:mb-6 lg:px-0 lg:pr-[14px] lg:pl-6">
          {/* pc orderbar */}
          <>
            {/* orders */}
            <div className="hidden gap-x-8 lg:flex">
              {/* order logo */}
              <div className="flex items-center gap-x-2 text-[#333333]">
                <span>
                  <ArrowDownWideNarrow size={20} color="#333333" />
                </span>
                <span className="font-medium">ترتیب :</span>
              </div>
              {/* order tags */}
              <div className="flex gap-x-6 font-light text-[#212121]">
                {sortOptions.map((sort, index) => {
                  const isSelected = sorts?.includes(sort.value);

                  return (
                    <div
                      key={index}
                      onClick={() =>
                        handleSortChange(
                          sort.value as
                            | "TheLatest"
                            | "HighestPrice"
                            | "LowestPrice"
                            | "BiggestDiscount",
                        )
                      }
                      className={cn(
                        "cursor-pointer py-4",
                        isSelected && "font-medium text-[#004b68]",
                      )}
                    >
                      {sort.label}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* total products */}
            <div className="hidden gap-x-1 lg:flex">
              <span>{convertToPersianNumber(productslength)}</span>
              <span>کالا</span>
            </div>
          </>

          {/* mobile order bar */}
          <>
            {/* order modal and filter sidebar */}
            <div className="s:gap-x-8 flex gap-x-6 lg:hidden">
              {/* filter sidebar */}
              <button
                onClick={() => setIsfiltersModalOpened(true)}
                className="flex cursor-pointer items-center gap-x-1 max-lg:py-3"
              >
                <span className="ml-1">
                  <SlidersHorizontal size={16} color="#333333" />
                </span>
                <span>فیلتر ها</span>
              </button>
              {/* order modal */}
              <button
                onClick={() => setIsOrderbarModalOpened(true)}
                className="flex cursor-pointer items-center gap-x-1 max-lg:py-3"
              >
                <span className="">
                  <ArrowDownWideNarrow size={20} color="#333333" />
                </span>
                <span>ترتیب :</span>
                <span>{getSortLabel(sorts)}</span>
              </button>
            </div>
            {/* total products */}
            <div className="flex gap-x-1 max-lg:py-3 lg:hidden">
              <span>{convertToPersianNumber(productslength)}</span>
              <span>کالا</span>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default Orderbar;
