"use client";

import { cn } from "@/lib/utils";

interface ProductFaTitleProps {
  label: string;
  className?:string
}

const ProductFaTitle = ({ label , className }: ProductFaTitleProps) => {
  return (
    <div className={cn("text-black text-[20px]/[40px] font-medium mb-4" , className)}>
      {label}
    </div>
  );
};
export default ProductFaTitle;
