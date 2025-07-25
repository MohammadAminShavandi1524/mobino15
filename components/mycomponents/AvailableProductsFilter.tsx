"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface AvailableProductsFilterProps {
  available: boolean | null;
  onAvailableChange: (value: boolean) => void;
}

const AvailableProductsFilter = ({
  available,
  onAvailableChange,
}: AvailableProductsFilterProps) => {
  const handleAvailableChange = () => {
    if (available === null) onAvailableChange(true);
    else onAvailableChange(!available);
  };

  return (
    <div className="flex items-center justify-between py-5">
      <div className="text-[14px] text-[#333333] font-medium">
        فقط کالا های موجود
      </div>
      <div
        onClick={handleAvailableChange}
        className={cn(
          "relative w-9 h-5 rounded-2xl border border-[#666666] cursor-pointer",
          available && "bg-[#223c78] border-[#223c78]"
        )}
      >
        <div
          className={cn(
            "absolute top-[3px] left-[3px] w-[12px] h-[12px] rounded-full border border-[#666666]",
            available && "bg-[#ffffff] border-0 left-[19px]"
          )}
        ></div>
      </div>
    </div>
  );
};
export default AvailableProductsFilter;
