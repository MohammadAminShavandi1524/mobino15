"use client";

import { convertToPersianNumber } from "@/lib/utils";
import { Product, Tenant } from "@/payload-types";
import { BadgeCheck, Settings, Store, Truck } from "lucide-react";

interface SellerInfoProps {
  productType: "single" | "multiple";
  product: Product;
  MPProductShowcase?: Product;
}
const SellerInfo = ({
  product,
  productType,
  MPProductShowcase,
}: SellerInfoProps) => {
  if (productType === "single")
    return (
      <>
        <div className="max-lg:self-baseline pr-2 lg:pr-2 pb-3 2xl:pb-2 font-medium text-base lg:text-sm 2xl:text-base">فروشنده</div>

        <div className="flex w-full flex-col gap-x-3 rounded-md lg:rounded-lg bg-[#f3f8fd]  px-4  2xl:px-4.5 py-2.5 2xl:py-3 text-[14px]">
          <div className="border-b border-b-white pb-3">
            <div className="flex items-center pb-2">
              <span className="text-[#385086]">
                <Store size={20} />
              </span>

              <span className="mr-4">
                {typeof product.tenant === "object" && product.tenant !== null
                  ? (product.tenant as Tenant).name
                  : "موبینو"}
              </span>
            </div>

            <div className="flex items-center">
              <span className="flex h-5 w-5 items-center justify-center text-[#385086]">
                <Truck size={16} />
              </span>
              <span className="mr-4 text-[#385086]">
                {typeof product.tenant === "object" &&
                product.tenant !== null &&
                (product.tenant as Tenant).name !== "موبینو"
                  ? "موجود در انبار فروشنده(ارسال از 1 روز کاری بعد)"
                  : " موجود در انبار موبینو(ارسال فوری)"}
              </span>
            </div>
          </div>

          <div className="flex items-center border-b border-b-white py-3">
            <span className="text-[#385086]">
              <Settings size={20} />
            </span>
            <span className="mr-4">ارزیابی عملکرد :</span>
            <span className="mr-3 text-[#142d67]">عالی</span>
          </div>

          <div className="flex items-center pt-3 pb-1">
            <span className="text-[#385086]">
              <BadgeCheck size={20} />
            </span>
            <span className="mr-4">
              {convertToPersianNumber(18)} ماه گارانتی شرکتی
            </span>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="pr-2 pb-2 font-medium">فروشنده</div>

        <div className="flex w-full flex-col gap-x-3 rounded-lg bg-[#f3f8fd] px-4 py-3 text-[14px]">
          <div className="border-b border-b-white pb-3">
            <div className="flex items-center pb-2">
              <span className="text-[#385086]">
                <Store size={20} />
              </span>

              <span className="mr-4">
                {MPProductShowcase
                  ? typeof MPProductShowcase.tenant === "object" &&
                    MPProductShowcase.tenant !== null
                    ? (MPProductShowcase.tenant as Tenant).name
                    : "موبینو"
                  : typeof product.tenant === "object" &&
                      product.tenant !== null
                    ? (product.tenant as Tenant).name
                    : "موبینو"}
              </span>
            </div>

            <div className="flex items-center">
              <span className="flex h-5 w-5 items-center justify-center text-[#385086]">
                <Truck size={16} />
              </span>
              <span className="mr-4 text-[#385086]">
                {MPProductShowcase
                  ? typeof MPProductShowcase.tenant === "object" &&
                    MPProductShowcase.tenant !== null &&
                    (MPProductShowcase.tenant as Tenant).name !== "موبینو"
                    ? "موجود در انبار فروشنده(ارسال از 1 روز کاری بعد)"
                    : " موجود در انبار موبینو(ارسال فوری)"
                  : typeof product.tenant === "object" &&
                      product.tenant !== null &&
                      (product.tenant as Tenant).name !== "موبینو"
                    ? "موجود در انبار فروشنده(ارسال از 1 روز کاری بعد)"
                    : " موجود در انبار موبینو(ارسال فوری)"}
              </span>
            </div>
          </div>

          <div className="flex items-center border-b border-b-white py-3">
            <span className="text-[#385086]">
              <Settings size={20} />
            </span>
            <span className="mr-4">ارزیابی عملکرد :</span>
            <span className="mr-3 text-[#142d67]">عالی</span>
          </div>

          <div className="flex items-center pt-3 pb-1">
            <span className="text-[#385086]">
              <BadgeCheck size={20} />
            </span>
            <span className="mr-4">18 ماه گارانتی شرکتی</span>
          </div>
        </div>
      </>
    );
};
export default SellerInfo;
