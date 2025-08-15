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
        <div className="pr-2 pb-2 font-medium">فروشنده</div>

        <div className="flex flex-col gap-x-3 w-full text-[14px] bg-[#f3f8fd] py-3 px-4.5 rounded-lg">
          <div className="pb-3 border-b border-b-white">
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
              <span className="text-[#385086] w-5 h-5 flex justify-center items-center">
                <Truck size={16} />
              </span>
              <span className="text-[#385086] mr-4 ">
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
            <span className="text-[#142d67] mr-3">عالی</span>
          </div>

          <div className="flex items-center pt-3 pb-1">
            <span className="text-[#385086]">
              <BadgeCheck size={20} />
            </span>
             <span className="mr-4">{convertToPersianNumber(18)} ماه گارانتی شرکتی</span>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="pr-2 pb-2 font-medium">فروشنده</div>

        <div className="flex flex-col gap-x-3 w-full text-[14px] bg-[#f3f8fd] py-3 px-4 rounded-lg">
          <div className="pb-3 border-b border-b-white">
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
              <span className="text-[#385086] w-5 h-5 flex justify-center items-center">
                <Truck size={16} />
              </span>
              <span className="text-[#385086] mr-4 ">
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
            <span className="text-[#142d67] mr-3">عالی</span>
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
