"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

import TomanLogo from "./TomanLogo";
import {
  capitalizeFirstLetter,
  formatWithThousandSeparator,
} from "@/lib/utils";
import { AllBrandOptions } from "@/hooks/useProductFilter";
import { ParserBuilder, SetValues } from "nuqs";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { usePathname } from "next/navigation";

interface BrandFilterProps {
  brands: string[] | null;
  activePage: "category" | "all" | "SubCategory";
  isBrandFilterActive: boolean;
  setFilters: SetValues<{
    brand: ParserBuilder<string[]>;
  }>;
}

const BrandFilter = ({
  activePage,
  isBrandFilterActive,
  brands,
  setFilters,
}: BrandFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const pathName = usePathname();
  const categoryName = pathName.split("/")[1];

  const filteredOptions = AllBrandOptions.filter((option) => {
    return option.category.includes(categoryName);
  });

  console.log(activePage);

  if (activePage === "SubCategory") return <></>;

  if (isFilterOpen)
    return (
      <div className="cursor-pointer ">
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className=" flex items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
        >
          <div className="relative">
            <div>برند</div>
            {isBrandFilterActive && (
              <div className="absolute top-[8px] left-[-14px] w-[6px] h-[6px] rounded-full bg-[#19bfd3]"></div>
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

        {activePage === "all" ? (
          <ScrollArea dir="rtl" className="flex flex-col max-h-[275px] ">
            {AllBrandOptions.map((brand, index) => {
              const isSelected = brands?.includes(brand.value);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-[12px] py-3 ml-[30px] cursor-pointer"
                >
                  <div className="flex items-center gap-x-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (!brands)
                          return setFilters({ brand: [brand.value] });

                        const newBrands = checked
                          ? [...brands, brand.value]
                          : brands.filter((b) => b !== brand.value);

                        setFilters({ brand: newBrands });
                      }}
                      className="w-5 h-5 data-[state=checked]:bg-[#196ec0] data-[state=checked]:border-transparent cursor-pointer"
                    />
                    <div className="text-[#333333]">{brand.label}</div>
                  </div>
                  <div className="text-[#666666]">
                    {capitalizeFirstLetter(brand.value)}
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        ) : (
          <ScrollArea dir="rtl" className="flex flex-col max-h-[275px] ">
            {filteredOptions.map((brand, index) => {
              const isSelected = brands?.includes(brand.value);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-[12px] py-3 ml-[30px] cursor-pointer"
                >
                  <div className="flex items-center gap-x-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (!brands)
                          return setFilters({ brand: [brand.value] });

                        const newBrands = checked
                          ? [...brands, brand.value]
                          : brands.filter((b) => b !== brand.value);

                        setFilters({ brand: newBrands });
                      }}
                      className="w-5 h-5 data-[state=checked]:bg-[#196ec0] data-[state=checked]:border-transparent cursor-pointer"
                    />
                    <div className="text-[#333333]">{brand.label}</div>
                  </div>
                  <div className="text-[#666666]">
                    {capitalizeFirstLetter(brand.value)}
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </div>
    );

  return (
    <div
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="flex items-center justify-between py-5 text-[14px] font-medium text-[#333333] cursor-pointer"
    >
      <div className="relative">
        <div>برند</div>
        {isBrandFilterActive && (
          <div className="absolute top-[8px] left-[-14px] w-[6px] h-[6px] rounded-full bg-[#19bfd3]"></div>
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
export default BrandFilter;
