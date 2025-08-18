"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { X } from "lucide-react";

const AppliedFilters = () => {
  const [filters, setFilters] = useProductFilters();

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

  if (filters.available) {
    appliedFilters.push({
      label: "فقط کالا های موجود",
      key: "available",
    });
  }

  if (filters.minPrice) {
    appliedFilters.push({
      label: `از ${Number(filters.minPrice).toLocaleString()} تومان`,
      key: "minPrice",
    });
  }

  if (filters.maxPrice) {
    appliedFilters.push({
      label: `تا ${Number(filters.maxPrice).toLocaleString()} تومان`,
      key: "maxPrice",
    });
  }

  if (filters.color && filters.color.length > 0) {
    filters.color.forEach((colorKey) => {
      appliedFilters.push({
        label: `رنگ: ${colorLabels[colorKey] || colorKey}`,
        key: "color",
        value: colorKey,
      });
    });
  }

  if (filters.brand && filters.brand.length > 0) {
    filters.brand.forEach((brand) => {
      appliedFilters.push({
        label: `برند: ${brand}`,
        key: "brand",
        value: brand,
      });
    });
  }

  return (
    <div className="flex max-w-full flex-wrap gap-2 py-2">
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
              if (filter.key === "color" && filter.value && filters.color) {
                const newColors = filters.color.filter(
                  (c) => c !== filter.value,
                );
                setFilters({
                  ...filters,
                  color: newColors.length > 0 ? newColors : null,
                });
              } else if (
                filter.key === "brand" &&
                filter.value &&
                filters.brand
              ) {
                const newBrands = filters.brand.filter(
                  (b) => b !== filter.value,
                );
                setFilters({
                  ...filters,
                  brand: newBrands.length > 0 ? newBrands : null,
                });
              } else {
                setFilters({ ...filters, [filter.key]: null });
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default AppliedFilters;
