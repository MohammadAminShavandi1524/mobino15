"use client";

import { cn, convertToPersianNumber } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface CartBtnProps {
  cartItemCount: number;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const CartBtn = ({ cartItemCount, setIsSideBarOpen }: CartBtnProps) => {
  return (
    <Link
      onClick={() => {
        setIsSideBarOpen(false);
      }}
      className="relative flex items-center justify-center text-primary size-8 sm:size-10 border border-border
              rounded-md"
      href="/cart"
    >
      <ShoppingCart size={24} />
      {/* cart item count */}
      <div
        className={cn(
          "absolute -bottom-[3px] -right-[4px] sm:-bottom-[3px] sm:-right-[3px]  size-4 sm:size-5 flex justify-center items-center border border-[#14a0de] bg-[#14a0de] text-white text-xs z-5 p-[3px] pt-[4px] rounded-full",
          cartItemCount === 0 && "pb-[4px]"
        )}
      >
        {convertToPersianNumber(cartItemCount)}
      </div>
    </Link>
  );
};
export default CartBtn;
