import { Product, Tenant } from "@/payload-types";

import { Box, Info } from "lucide-react";
import { cn, convertToPersianNumber } from "@/lib/utils";
import TomanLogo from "../TomanLogo";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductAndQtyProps {
  product: Product;
}

const ProductAndQty = ({ product }: ProductAndQtyProps) => {
  if (product.offPrice) {
    return (
      <div className="flex flex-col p-4 ">
        <div className="flex items-center justify-between mb-4">
          <div className="cursor-pointer relative flex justify-center items-center mb-0.75">
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="cursor-pointer"
                  src="/infoicon.gif"
                  alt="infoicon"
                  width={24}
                  height={24}
                  unoptimized
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={10}
                className="bg-[#f3f8fd] text-black"
              >
                <div className="">
                  <span>این کالا توسط فروشنده آن، </span>
                  <span className="text-[#385086]">
                    {typeof product.tenant === "object" &&
                    product.tenant !== null
                      ? (product.tenant as Tenant).name
                      : "موبینو"}
                  </span>
                  <br />
                  <span>قیمت گذاری شده است</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center self-end bg-[#da1e28] text-white text-[14px] gap-x-2 px-2.5  py-0.5  rounded-xl">
            <span className="text-[18px]">
              {Math.ceil(product.price - product.offPrice).toLocaleString(
                "fa-IR"
              )}
            </span>
            <span>تومان تخفیف</span>
          </div>
        </div>

        <div className="flex items-center gap-x-3 self-end">
          <div className="text-[#919ebc] line-through font-bold">
            {product.price.toLocaleString("fa-IR")}
          </div>
          <div className="flex  gap-x-2">
            <div className="text-[20px] font-bold">
              {product.offPrice.toLocaleString("fa-IR")}
            </div>
            <div className="flex justify-center items-center pb-1">
              <TomanLogo />
            </div>
          </div>
        </div>

        {(product.quantity === 1 || product.quantity === 2) && (
          <div
            className={cn(
              "flex items-center gap-x-1.25  text-[#e6123d] pt-4 pb-2.5 text-[12px]"
            )}
          >
            <span>
              <Box size={20} />
            </span>
            <span>{convertToPersianNumber(product.quantity)}</span>
            <span>عدد در انبار باقی مانده</span>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center ">
          <div className="cursor-pointer relative">
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="cursor-pointer"
                  src="/infoicon.gif"
                  alt="infoicon"
                  width={24}
                  height={24}
                  unoptimized
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={10}
                className="bg-[#f3f8fd] text-black"
              >
                <div className="">
                  <span>این کالا توسط فروشنده آن، </span>
                  <span className="text-[#385086]">
                    {typeof product.tenant === "object" &&
                    product.tenant !== null
                      ? (product.tenant as Tenant).name
                      : "موبینو"}
                  </span>
                  <br />
                  <span>قیمت گذاری شده است</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex gap-x-1">
            <div className="text-[20px] font-bold">
              {product.price.toLocaleString("fa-IR")}
            </div>
            <div></div>
            <div className="flex justify-center items-center pb-1">
              <TomanLogo />
            </div>
          </div>
        </div>
        {/* quantity */}
        {product.quantity === 1 ||
          (product.quantity === 2 && (
            <div
              className={cn(
                "self-baseline flex items-center gap-x-1.25 text-[#e6123d] py-2 pr-0.5 text-[12px]"
              )}
            >
              <span>
                <Box size={20} />
              </span>
              <span>{convertToPersianNumber(product.quantity)}</span>
              <span>عدد در انبار باقی مانده</span>
            </div>
          ))}
      </div>
    );
  }
};
export default ProductAndQty;
