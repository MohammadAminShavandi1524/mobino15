"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { X } from "lucide-react";

const AppliedFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const appliedFilters = [];

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

 

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {appliedFilters.map((filter) => (
        <div
          key={filter.key}
          className="flex items-center gap-x-1 bg-[#223c78] text-[12px] text-[white] px-2 py-1 rounded-md"
        >
          <span>{filter.label}</span>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => {
              setFilters({ ...filters, [filter.key]: null });
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default AppliedFilters;
