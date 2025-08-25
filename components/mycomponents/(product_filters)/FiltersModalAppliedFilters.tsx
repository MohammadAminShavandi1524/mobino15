"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { getBrandLabelFa } from "@/lib/utils";
import { X } from "lucide-react";
import { TempfiltersProps } from "../FiltersModal";
import { Dispatch, SetStateAction } from "react";

interface FiltersModalAppliedFiltersProps {
  Tempfilters: TempfiltersProps;
  setTempFilters: Dispatch<SetStateAction<TempfiltersProps>>;
}

const FiltersModalAppliedFilters = ({Tempfilters ,setTempFilters}:FiltersModalAppliedFiltersProps) => {
  

  const colorLabels: Record<string, string> = {
    WhiteGroup: "سفید",
    BlackGroup: "مشکی",
    BlueGroup: "آبی",
    YellowGroup: "زرد",
    NeutralGroup: "خنثی",
    GreenGroup: "سبز",
    PinkGroup: "صورتی",
    RedGroup: "قرمز",
    PurpleGroup: "بنفش",
  };

  // const brandLabels: Record<string, string> = {
  //   apple: "اپل",
  //   samsung: "سامسونگ",
  //   xiaomi: "شیائومی",
  //   huawei: "هواوی",
  //   nokia: "نوکیا",
  //   sony: "سونی",
  //   asus: "ایسوس",
  //   hp: "اچ‌پی",
  //   lenovo: "لنوو",
  //   msi: "ام‌اس‌آی",
  //   dell: "دل",
  //   acer: "ایسر",
  // };

  const appliedFilters: {
    label: string;
    key: string;
    value?: string;
  }[] = [];

  if (Tempfilters.available) {
    appliedFilters.push({
      label: "فقط کالا های موجود",
      key: "available",
    });
  }

  if (Tempfilters.minPrice) {
    appliedFilters.push({
      label: `از ${Number(Tempfilters.minPrice).toLocaleString()} تومان`,
      key: "minPrice",
    });
  }

  if (Tempfilters.maxPrice) {
    appliedFilters.push({
      label: `تا ${Number(Tempfilters.maxPrice).toLocaleString()} تومان`,
      key: "maxPrice",
    });
  }

  if (Tempfilters.color && Tempfilters.color.length > 0) {
    Tempfilters.color.forEach((colorKey) => {
      appliedFilters.push({
        label: `رنگ: ${colorLabels[colorKey] || colorKey}`,
        key: "color",
        value: colorKey,
      });
    });
  }

  if (Tempfilters.brand && Tempfilters.brand.length > 0) {
    Tempfilters.brand.forEach((brand) => {
      appliedFilters.push({
        label: `برند: ${getBrandLabelFa(brand)}`,
        key: "brand",
        value: brand,
      });
    });
  }

  return (
    <div className="flex max-w-full flex-wrap gap-2 pb-4 max-lg:pr-5 max-lg:pl-6 lg:py-2">
      {appliedFilters.map((filter, index) => (
        <div
          key={index}
          className="flex max-w-[180px] min-w-0 items-center gap-x-1 rounded-md bg-[#223c78] px-2 py-1 text-[12px] text-[white]"
        >
          <span className="max-w-[150px] truncate">{filter.label}</span>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => {
              if (filter.key === "color" && filter.value && Tempfilters.color) {
                const newColors = Tempfilters.color.filter(
                  (c) => c !== filter.value,
                );
                setTempFilters({
                  ...Tempfilters,
                  color: newColors.length > 0 ? newColors : null,
                });
              } else if (
                filter.key === "brand" &&
                filter.value &&
                Tempfilters.brand
              ) {
                const newBrands = Tempfilters.brand.filter(
                  (b) => b !== filter.value,
                );
                setTempFilters({
                  ...Tempfilters,
                  brand: newBrands.length > 0 ? newBrands : null,
                });
              } else {
                setTempFilters({ ...Tempfilters, [filter.key]: null });
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default FiltersModalAppliedFilters;
