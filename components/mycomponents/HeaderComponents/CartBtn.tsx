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
      className="text-primary border-border relative flex size-8 items-center justify-center rounded-md border sm:size-10"
      href="/cart"
    >
      <ShoppingCart size={24} />
      {/* cart item count */}
      <div
        className={cn(
          "absolute -right-[4px] -bottom-[3px] z-5 flex size-4 items-center justify-center rounded-full border border-[#14a0de] bg-[#14a0de] p-[3px] pt-[4px] text-xs text-white sm:-right-[3px] sm:-bottom-[3px] sm:size-5",
          cartItemCount === 0 && "pb-[4px]",
        )}
      >
        {convertToPersianNumber(cartItemCount)}
      </div>
    </Link>
  );
};
export default CartBtn;
