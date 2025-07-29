import { Product } from "@/payload-types";
import TomanLogo from "./TomanLogo";
import { Box } from "lucide-react";
import { cn, convertToPersianNumber } from "@/lib/utils";

interface ProductAndQtyProps {
  product: Product;
}

const ProductAndQty = ({ product }: ProductAndQtyProps) => {
  if (product.offPrice) {
    return (
      <div className="flex flex-col  p-4">
        <div className="flex items-center self-end bg-[#da1e28] text-white text-[14px] gap-x-2 px-2.5  py-0.5 mb-4 rounded-xl">
          <span className="text-[18px]">
            {Math.ceil(product.price - product.offPrice).toLocaleString(
              "fa-IR"
            )}
          </span>
          <span>تومان تخفیف</span>
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
      <div className="flex justify-between items-center p-4">
        {product.quantity === 1 || product.quantity === 2 ? (
          <div
            className={cn(
              "flex items-center gap-x-1.25 text-[#e6123d] pt-4 pb-4 text-[12px]"
            )}
          >
            <span>
              <Box size={20} />
            </span>
            <span>{convertToPersianNumber(product.quantity)}</span>
            <span>عدد در انبار باقی مانده</span>
          </div>
        ) : (
          <div></div>
        )}

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
    );
  }
};
export default ProductAndQty;
