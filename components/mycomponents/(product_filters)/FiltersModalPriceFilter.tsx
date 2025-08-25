"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

import TomanLogo from "../TomanLogo";
import { formatWithThousandSeparator } from "@/lib/utils";

interface FiltersModalPriceFilterProps {
  minPrice: string | null;
  maxPrice: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  isPriceFilterActive: boolean;
}

const FiltersModalPriceFilter = ({
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
  isPriceFilterActive,
}: FiltersModalPriceFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || "");
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || "");

  // Sync with props
  useEffect(() => {
    setLocalMinPrice(minPrice || "");
  }, [minPrice]);

  useEffect(() => {
    setLocalMaxPrice(maxPrice || "");
  }, [maxPrice]);

  const handleLocalMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setLocalMinPrice(numericValue);
  };

  const handleLocalMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setLocalMaxPrice(numericValue);
  };

  const handleMinBlur = () => {
    if (localMinPrice !== minPrice) {
      onMinPriceChange(localMinPrice);
    }
  };

  const handleMaxBlur = () => {
    if (localMaxPrice !== maxPrice) {
      onMaxPriceChange(localMaxPrice);
    }
  };

  if (isFilterOpen)
    return (
      <div className="cursor-pointer border-b border-b-[#ced0d0]">
        <div
          onClick={() => setIsFilterOpen(false)}
          className="flex items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
        >
          <div className="relative">
            <div>محدوده قیمت</div>
            {isPriceFilterActive && (
              <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]" />
            )}
          </div>

          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            <ChevronUp size={18} />
          </motion.div>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center gap-x-1 w-full">
            <span className="text-[18px] text-[#81858b] shrink-0">از</span>
            <input
              className="caret-custom-primary h-[54px] w-full  lg:max-w-[150px] border-0 border-b px-[10px] text-[24px] font-extrabold text-[#3f4064] placeholder-[#3f4064] focus:ring-0 focus:outline-none"
              dir="ltr"
              type="text"
              value={formatWithThousandSeparator(localMinPrice)}
              onChange={handleLocalMinPriceChange}
              onBlur={handleMinBlur}
              onFocus={(e) => e.target.select()}
            />
            <TomanLogo className="shrink-0"/>
          </div>
          <div className="flex items-center gap-x-1 w-full">
            <span className="text-[18px] text-[#81858b]">تا</span>
            <input
              className="caret-custom-primary h-[54px] w-full  lg:max-w-[150px] border-0 border-b px-[10px] text-[24px] font-extrabold text-[#3f4064] placeholder-[#3f4064] focus:ring-0 focus:outline-none"
              dir="ltr"
              placeholder="∞"
              type="text"
              value={formatWithThousandSeparator(localMaxPrice)}
              onChange={handleLocalMaxPriceChange}
              onBlur={handleMaxBlur}
              onFocus={(e) => e.target.select()}
            />
            <TomanLogo className="shrink-0"/>
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setIsFilterOpen(true)}
      className="flex cursor-pointer items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
    >
      <div className="relative">
        <div>محدوده قیمت</div>
        {isPriceFilterActive && (
          <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]" />
        )}
      </div>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </div>
  );
};

export default FiltersModalPriceFilter;
