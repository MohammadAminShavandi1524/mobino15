"use client";

import { cn } from "@/lib/utils";

interface ProductFaTitleProps {
  label: string;
  className?: string;
}

const ProductFaTitle = ({ label, className }: ProductFaTitleProps) => {
  return (
    <div
      className={cn(
        "mb-4 text-[20px]/[40px] font-medium text-black",
        className,
      )}
    >
      {label}
    </div>
  );
};
export default ProductFaTitle;
