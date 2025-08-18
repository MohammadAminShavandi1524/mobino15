"use client";

import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  getDiscountPercent,
  getMainImageUrl,
} from "@/lib/utils";
import { Product } from "@/payload-types";
import { CircleCheck, CircleX, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import TomanLogo from "./TomanLogo";

interface AddToCartBtnModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
}

const AddToCartBtnModal = ({
  isModalOpen,
  setIsModalOpen,
  product,
}: AddToCartBtnModalProps) => {
  const mainImageUrl = getMainImageUrl(product);
  const discountPercent = getDiscountPercent(product);

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed z-[500] top-0 right-0  bg-zinc-900/50 min-w-screen min-h-screen flex justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col w-[460px]  max-w-[460px]  bg-white rounded-xl shadow-[0px_1px_4px_rgba(0,0,0,0.08)] p-4 py-6"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-b-[#d3d8e4] mx-2 pb-5 mb-5">
              <div className="flex items-center gap-x-2 text-[#1c9722]">
                <span>
                  <CircleCheck />
                </span>
                <span>این کالا به سبد خرید اضافه شد</span>
              </div>
              <div
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer"
              >
                <CircleX />
              </div>
            </div>
            {/* image title color */}
            <div className="grid grid-cols-10 gap-x-2 px-4 mb-6">
              <div className="col-span-3 flex justify-center ">
                <Image
                  className={cn("self-baseline")}
                  src={mainImageUrl}
                  alt={product.name}
                  width={100}
                  height={100}
                />
              </div>
              <div className="col-span-7 flex flex-col ">
                {/* product fa title */}
                <div className="productlist-title text-[#333333] text-[16px]/[32px] font-medium min-h-[72px] mb-3">
                  {product.label}
                </div>
                {/* color */}
                <div className="flex items-center gap-x-2">
                  <div
                    className="size-4 border border-[#d7dee0] rounded-full"
                    style={{
                      backgroundColor: getColorInfo(product.color).hex,
                    }}
                  ></div>
                  <div className="text-[12px] text-[#62666d]">
                    {getColorInfo(product.color).label}
                  </div>
                </div>
              </div>
            </div>
            {/* price offPrice discountPercent */}
            <div className="flex items-center self-baseline-last px-4 pl-6 mb-6">
              {product.offPrice ? (
                <div className="flex items-center self-baseline-last gap-x-1.5">
                  {/* discount percent */}
                  <div className="flex items-center justify-center gap-x-0.5 bg-[#da1e28] text-white h-5 min-w-7 rounded-sm px-1 ml-[50px]">
                    <span>
                      <Percent strokeWidth={2.5} size={14} />
                    </span>
                    <span className="text-[12px] pt-[2px]">
                      {convertToPersianNumber(discountPercent || "33")}
                    </span>
                  </div>
                  <div className="text-[#919ebc] line-through text-[14px] pt-[]">
                    {product.price.toLocaleString("fa-IR")}
                  </div>
                  <div className="text-lg font-medium">
                    {product.offPrice.toLocaleString("fa-IR")}
                  </div>
                  <div>
                    <TomanLogo />
                  </div>
                </div>
              ) : (
                <div className="flex items-center self-baseline-last gap-x-1">
                  <span className="text-lg font-medium">
                    {product.price.toLocaleString("fa-IR")}
                  </span>
                  <span>
                    <TomanLogo />
                  </span>
                </div>
              )}
            </div>
            {/* cart  */}
            <div className="mx-4">
              <Link
                className="flex justify-center items-center w-full self-center h-13 bg-custom-primary text-white rounded-xl"
                href="/cart"
              >
                مشاهده سبد خرید
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddToCartBtnModal;
