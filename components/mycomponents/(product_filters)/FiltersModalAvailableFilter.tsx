"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface FiltersModalAvailableFilterProps {
  available: boolean | null;
  onAvailableChange: (value: boolean) => void;
}

const FiltersModalAvailableFilter = ({
  available,
  onAvailableChange,
}: FiltersModalAvailableFilterProps) => {

  
  const handleAvailableChange = () => {
    if (available === null) onAvailableChange(true);
    else onAvailableChange(!available);
  };

  return (
    <div className="flex items-center justify-between py-5">
      <div className="text-[14px] font-medium text-[#333333]">
        فقط کالا های موجود
      </div>
      <div
        onClick={handleAvailableChange}
        className={cn(
          "relative h-5 w-9 cursor-pointer rounded-2xl border border-[#666666]",
          available && "border-[#223c78] bg-[#223c78]",
        )}
      >
        <motion.div
          className={cn(
            "absolute top-[3px] left-[3px] h-[12px] w-[12px] rounded-full border border-[#666666]",
            available && "left-[19px] border-0 bg-[#ffffff]",
          )}
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default FiltersModalAvailableFilter