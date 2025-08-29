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

import { AnimatePresence, motion } from "framer-motion";
import TomanLogo from "../TomanLogo";

interface AddToCartBtnMobileModalProps {
  isMobileModalOpen: boolean;
  setIsMobileModalOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
}

const AddToCartBtnMobileModal = ({
  isMobileModalOpen,
  product,
  setIsMobileModalOpen,
}: AddToCartBtnMobileModalProps) => {
  const mainImageUrl = getMainImageUrl(product);
  const discountPercent = getDiscountPercent(product);

  return (
    <AnimatePresence>
      {isMobileModalOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setIsMobileModalOpen(false)}
          className="fixed top-0 right-0 z-[500] flex h-dvh min-w-screen items-end justify-center bg-zinc-900/50 sm:hidden"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
        >
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex rounded-t-xl bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
          
          >
            <div className="flex w-full flex-col p-4 py-6">
              {/* header */}
              <div className="mx-2 mb-5 flex items-center justify-between border-b border-b-[#d3d8e4] pb-5">
                <div className="flex items-center gap-x-2 text-[#1c9722]">
                  <span>
                    <CircleCheck />
                  </span>
                  <span>این کالا به سبد خرید اضافه شد</span>
                </div>
                <div
                  onClick={() => setIsMobileModalOpen(false)}
                  className="cursor-pointer"
                >
                  <CircleX />
                </div>
              </div>
              {/* image title color */}
              <div className="mb-6 grid grid-cols-10 gap-x-2 px-4">
                <div className="col-span-3 flex justify-center">
                  <Image
                    className={cn("self-baseline")}
                    src={mainImageUrl}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-span-7 flex flex-col">
                  {/* product fa title */}
                  <div className="productlist-title mb-3 text-[14px]/[21px] font-normal text-[#333333]">
                    {product.label}
                  </div>
                  {/* color */}
                  <div className="flex items-center gap-x-2">
                    <div
                      className="size-4 rounded-full border border-[#d7dee0]"
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
              <div className="mb-6 flex items-center self-baseline-last px-4 pl-6">
                {product.offPrice ? (
                  <div className="flex items-center gap-x-1.5 self-baseline-last">
                    {/* discount percent */}
                    <div className="ml-[50px] flex h-5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                      <span>
                        <Percent strokeWidth={2.5} size={14} />
                      </span>
                      <span className="pt-[2px] text-[12px]">
                        {convertToPersianNumber(discountPercent || "33")}
                      </span>
                    </div>
                    <div className="pt-[] text-[14px] text-[#919ebc] line-through">
                      {product.price.toLocaleString("fa-IR")}
                    </div>
                    <div className="mr-1 text-lg font-medium">
                      {product.offPrice.toLocaleString("fa-IR")}
                    </div>
                    <div>
                      <TomanLogo />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1 self-baseline-last">
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
                  className="bg-custom-primary flex h-13 w-full items-center justify-center self-center rounded-xl text-white"
                  href="/cart"
                >
                  مشاهده سبد خرید
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartBtnMobileModal;
