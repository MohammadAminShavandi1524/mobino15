"use client";

import { cn, convertToPersianNumber } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ArrowDownWideNarrow } from "lucide-react";
import { ParserBuilder, SetValues } from "nuqs";
import { PaginatedDocs } from "payload";
import { Dispatch, SetStateAction, useState } from "react";

interface OrderbarProps {
  products: Product[] | undefined;
  setFilters: SetValues<{
    sort: ParserBuilder<
      "MostPopular" | "HighestPrice" | "LowestPrice" | "BiggestDiscount"
    >;
  }>;
  sorts:
    | "MostPopular"
    | "HighestPrice"
    | "LowestPrice"
    | "BiggestDiscount"
    | null;
}

const Orderbar = ({ products, setFilters, sorts }: OrderbarProps) => {
  const handleSortChange = (
    value: "MostPopular" | "HighestPrice" | "LowestPrice" | "BiggestDiscount"
  ) => {
    if (sorts === value) {
      setFilters({ sort: null });
    } else {
      setFilters({ sort: value });
    }
  };

  const sortOptions = [
    { label: "محبوب‌ترین‌ها", value: "MostPopular" },
    { label: "بیشترین قیمت", value: "HighestPrice" },
    { label: "کم ترین قیمت", value: "LowestPrice" },
    { label: "بیشترین تخفیف", value: "BiggestDiscount" },
  ];

  return (
    <div
      className=" flex items-center justify-between w-full text-[12px] bg-[#e9ecf2] pr-[14px] pl-6 mb-6
          rounded-lg"
    >
      {/* orders */}
      <div className="flex gap-x-8">
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
                      | "MostPopular"
                      | "HighestPrice"
                      | "LowestPrice"
                      | "BiggestDiscount"
                  )
                }
                className={cn(
                  "py-4 cursor-pointer",
                  isSelected && "text-[#004b68] font-medium"
                )}
              >
                {sort.label}
              </div>
            );
          })}
        </div>
      </div>
      {/* total products */}
      <div className="flex gap-x-1">
        <span>{convertToPersianNumber(products?.length || 0)}</span>
        <span>کالا</span>
      </div>
    </div>
  );
};
export default Orderbar;
