"use client";

import { cn, convertToPersianNumber } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ArrowDownWideNarrow } from "lucide-react";
import { PaginatedDocs } from "payload";
import { Dispatch, SetStateAction, useState } from "react";

interface OrderbarProps {
  activeOrder: string;
  setActiveOrder: Dispatch<SetStateAction<string>>;
  products: Product[] | undefined;
}

const Orderbar = ({ activeOrder, setActiveOrder, products }: OrderbarProps) => {
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
          <span
            onClick={() => setActiveOrder("MostPopular")}
            className={cn(
              "py-4 cursor-pointer",
              activeOrder === "MostPopular" && "text-[#004b68] font-medium"
            )}
          >
            محبوب‌ترین‌ها
          </span>
          <span
            onClick={() => setActiveOrder("HighestPrice")}
            className={cn(
              "py-4 cursor-pointer",
              activeOrder === "HighestPrice" && "text-[#004b68] font-medium"
            )}
          >
            بیشترین قیمت
          </span>
          <span
            onClick={() => setActiveOrder("LowestPrice")}
            className={cn(
              "py-4 cursor-pointer",
              activeOrder === "LowestPrice" && "text-[#004b68] font-medium"
            )}
          >
            کم ترین قیمت
          </span>

          <span
            onClick={() => setActiveOrder("BiggestDiscount")}
            className={cn(
              "py-4 cursor-pointer",
              activeOrder === "BiggestDiscount" && "text-[#004b68] font-medium"
            )}
          >
            بیشترین تخفیف
          </span>
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
