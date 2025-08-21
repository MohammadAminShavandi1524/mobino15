"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductsCarousel from "./ProductsCarousel";
import { Product } from "@/payload-types";
import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/useBreakPoint";

interface ProductsCarouselLayoutProps {
  viewAllHref: string;
  products: Product[];
  headerTitle: string;
  borderColor?: string;
  headerBgColor?: string;
  headerTextColor?: string;
  isAfino?: "true" | "false";
}

const ProductsCarouselLayout = ({
  headerTitle,
  viewAllHref,
  products,
  borderColor,
  headerBgColor,
  headerTextColor,
  isAfino,
}: ProductsCarouselLayoutProps) => {
  const { lg } = useBreakpoints();

  return (
    <div
      className={cn(
        isAfino === "false" && "border-t-5 border-double",
        "border-b-solid mt-6 flex w-full flex-col border-b pb-6 lg:mt-13 lg:min-h-120 lg:rounded-2xl lg:border lg:p-3",
      )}
      style={{ borderColor: borderColor || "#d3d8e4" }}
    >
      <div
        className={cn(
          "mb-3 flex w-full items-center justify-between px-5 py-1.5 text-white lg:mb-6 lg:rounded-md lg:px-6 lg:py-3",
          isAfino === "false" ? "max-lg:pt-6" : "pr-7",
        )}
        style={{
          backgroundColor: headerBgColor || "transparent",
          color: headerTextColor || "#223c78",
        }}
      >
        <div className="text-[15px] font-medium md:text-xl lg:text-2xl">
          {headerTitle}
        </div>
        <Link
          href={viewAllHref}
          className="flex cursor-pointer items-center gap-x-1.5 lg:gap-x-2"
        >
          <span className="text-[12px] md:text-sm">نمایش همه</span>
          <span>
            <ChevronLeft className="size-4 lg:size-5" />
          </span>
        </Link>
      </div>
      <ProductsCarousel products={products} />
    </div>
  );
};

export default ProductsCarouselLayout;
