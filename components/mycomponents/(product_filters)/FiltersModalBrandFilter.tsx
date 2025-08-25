"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

import TomanLogo from "../TomanLogo";
import {
  capitalizeFirstLetter,
  formatWithThousandSeparator,
} from "@/lib/utils";
import { AllBrandOptions } from "@/hooks/useProductFilter";
import { ParserBuilder, SetValues } from "nuqs";
import { ScrollArea } from "../../ui/scroll-area";
import { Checkbox } from "../../ui/checkbox";
import { usePathname } from "next/navigation";
import { TempfiltersProps } from "../FiltersModal";

interface FiltersModalBrandFilterProps {
  brands: string[] | null;
  activePage: "category" | "all" | "SubCategory" | "custom";
  isBrandFilterActive: boolean;
  setTempFilters: Dispatch<SetStateAction<TempfiltersProps>>;
  Tempfilters: TempfiltersProps;
}

const FiltersModalBrandFilter = ({
  activePage,
  isBrandFilterActive,
  brands,
  setTempFilters,
  Tempfilters,
}: FiltersModalBrandFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const pathName = usePathname();
  const categoryName = pathName.split("/")[1];

  const filteredOptions = AllBrandOptions.filter((option) => {
    return option.category.includes(categoryName);
  });

  if (activePage === "SubCategory" || activePage === "custom") return <></>;

  if (isFilterOpen)
    return (
      <div className="cursor-pointer">
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
        >
          <div className="relative">
            <div>برند</div>
            {isBrandFilterActive && (
              <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]"></div>
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

        {activePage === "all" ? (
          <ScrollArea dir="rtl" className="flex max-h-[275px] flex-col">
            {AllBrandOptions.map((brand, index) => {
              const isSelected = brands?.includes(brand.value);

              return (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between py-3 text-[12px]"
                >
                  <div className="flex items-center gap-x-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (!brands)
                          return setTempFilters({
                            ...Tempfilters,
                            brand: [brand.value],
                          });

                        const newBrands = checked
                          ? [...brands, brand.value]
                          : brands.filter((b) => b !== brand.value);

                        setTempFilters({ ...Tempfilters, brand: newBrands });
                      }}
                      className="h-5 w-5 cursor-pointer data-[state=checked]:border-transparent data-[state=checked]:bg-[#196ec0]"
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
          <ScrollArea dir="rtl" className="flex max-h-[275px] flex-col">
            {filteredOptions.map((brand, index) => {
              const isSelected = brands?.includes(brand.value);

              return (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between py-3 text-[12px]"
                >
                  <div className="flex items-center gap-x-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (!brands)
                          return setTempFilters({
                            ...Tempfilters,
                            brand: [brand.value],
                          });

                        const newBrands = checked
                          ? [...brands, brand.value]
                          : brands.filter((b) => b !== brand.value);

                        setTempFilters({ ...Tempfilters, brand: newBrands });
                      }}
                      className="h-5 w-5 cursor-pointer data-[state=checked]:border-transparent data-[state=checked]:bg-[#196ec0]"
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
      className="flex cursor-pointer items-center justify-between py-5 text-[14px] font-medium text-[#333333]"
    >
      <div className="relative">
        <div>برند</div>
        {isBrandFilterActive && (
          <div className="absolute top-[8px] left-[-14px] h-[6px] w-[6px] rounded-full bg-[#19bfd3]"></div>
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

export default FiltersModalBrandFilter;
