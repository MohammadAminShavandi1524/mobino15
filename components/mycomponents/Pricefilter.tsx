"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

import TomanLogo from "./TomanLogo";
import { formatWithThousandSeparator } from "@/lib/utils";
import { useProductFilters } from "@/hooks/useProductFilter";

interface PricefilterProps {
  minPrice: string | null;
  maxPrice: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  isPriceFilterActive: boolean;
}

const Pricefilter = ({
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
  isPriceFilterActive,
}: PricefilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [setFilters] = useProductFilters();
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");

    onMinPriceChange(numericValue);
  };
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");

    onMaxPriceChange(numericValue);
  };

  if (isFilterOpen)
    return (
      <div className="cursor-pointer border-b border-b-[#ced0d0]">
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className=" flex items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
        >
          <div className="relative">
            <div> محدوده قیمت</div>
            {isPriceFilterActive && (
              <div className="absolute top-[7px] left-[-14px] w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            )}
          </div>

          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            <ChevronUp size={16} />
          </motion.div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-x-1">
            <span className="text-[#81858b] text-[18px]">از</span>
            <input
              className="h-[54px] max-w-[150px] text-[#3f4064] text-[24px] font-extrabold px-[10px] border-0 border-b focus:outline-none  focus:ring-0 caret-custom-primary placeholder-[#3f4064]"
              dir="ltr"
              type="text"
              value={minPrice ? formatWithThousandSeparator(minPrice) : ""}
              onChange={handleMinPriceChange}
            />

            <TomanLogo />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-[#81858b] text-[18px]">تا</span>
            <input
              className="h-[54px] max-w-[150px] text-[#3f4064] text-[24px] font-extrabold px-[10px] border-0 border-b focus:outline-none  focus:ring-0 caret-custom-primary placeholder-[#3f4064] "
              dir="ltr"
              placeholder="∞"
              type="text"
              value={maxPrice ? formatWithThousandSeparator(maxPrice) : ""}
              onChange={handleMaxPriceChange}
            />
            <TomanLogo />
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="flex items-center justify-between py-5 text-[14px] font-medium text-[#333333] cursor-pointer"
    >
      <div className="relative">
        <div> محدوده قیمت</div>
        {isPriceFilterActive && (
          <div className="absolute top-[7px] left-[-14px] w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
        )}
      </div>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </div>
  );
};
export default Pricefilter;
