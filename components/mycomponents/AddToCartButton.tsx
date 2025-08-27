"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import { useCart } from "@/modules/checkout/hooks/useCart";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface AddToCartButtonProps {
  userName?: string;
  productId: string;
  setIsMobileModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddToCartButton = ({
  productId,
  userName,
  setIsMobileModalOpen,
  setIsModalOpen,
}: AddToCartButtonProps) => {
  const { addProduct, isProductInCart, removeProduct } = useCart(userName);
  const { sm } = useBreakpoints();
  return (
    <>
      {isProductInCart(productId) ? (
        <div className="text-custom-primary flex items-center justify-center px-2 text-base">
          <button
            onClick={() => removeProduct(productId)}
            className="text-custom-primary h-12.5 w-1/4 cursor-pointer 2xl:h-13"
          >
            حذف
          </button>
          <Link
            className="border-custom-primary relative flex h-12.5 w-3/4 items-center justify-center rounded-md border-2 pl-3 2xl:h-13"
            href="/cart"
          >
            <div className="">مشاهده سبد خرید</div>
            <div className="absolute left-[16px]">
              <ChevronLeft size={20} />
            </div>
          </Link>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              addProduct(productId);
              sm ? setIsModalOpen(true) : setIsMobileModalOpen(true);
            }}
            className="bg-custom-primary relative flex h-12.5 cursor-pointer items-center justify-center rounded-lg text-white lg:mx-[10px] 2xl:h-13"
          >
            <div className="text-lg">افزودن به سبد خرید</div>
            <div className="absolute left-[16px]">
              <ShoppingCart size={20} />
            </div>
          </button>
        </>
      )}
    </>
  );
};
export default AddToCartButton;
