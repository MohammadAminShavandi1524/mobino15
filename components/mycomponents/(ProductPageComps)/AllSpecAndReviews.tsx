"use client";

import { Product, Tenant } from "@/payload-types";
import Divider from "./Divider";
import { cn, convertToPersianNumber, getColorInfo } from "@/lib/utils";
import AllProductSpecs from "../productAllSpec/AllProductSpecs";
import {
  ArrowDownWideNarrow,
  BadgeCheck,
  Plus,
  Store,
  Truck,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import ProductFaTitle from "./ProductFaTitle";
import ProductAndQty from "./ProductAndQty";
import AddToCartButton from "../AddToCartButton";
import { StaticRating } from "../StaticRating";

interface AllSpecAndReviewsProps {
  type: "single" | "multiple";
  product: Product;
  userName?: string;

  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsReviewModalOpen: Dispatch<SetStateAction<boolean>>;

  MPMainImage?: {
    url: string;
    isMain?: boolean | null;
    id?: string | null;
  } | null;
  MPImageShowcase?: string;
  SPMainImage?: {
    url: string;
    isMain?: boolean | null;
    id?: string | null;
  } | null;

  SPImageShowcase?: string;
}
const reviewsSortOptions = [
  { label: "جدیدترین", value: "Newest" },
  { label: "قدیمی‌ترین", value: "Oldest" },
  { label: "بیشترین امتیاز", value: "HighestRating" },
  { label: "کمترین امتیاز", value: "LowestRating" },
];
const AllSpecAndReviews = ({
  type,
  product,
  userName,
  setIsModalOpen,
  setIsReviewModalOpen,
  MPMainImage,
  MPImageShowcase,
  SPImageShowcase,
  SPMainImage,
}: AllSpecAndReviewsProps) => {
  const [reviewOrderBar, setReviewOrderBar] = useState("Newest");
  return (
    <div className="relative flex flex-col my-10">
      {/* header */}
      <div className="sticky top-0 z-6 flex items-center  px-11 py-4 gap-x-10 text-[14px] bg-[#f3f8fd] border-b border-b-[#919ebc] text-[#919ebc]">
        <div>مشخصات فنی</div>
        <div>معرفی محصول</div>
        <div>نظرات کاربران</div>
      </div>
      <div className="relative flex gap-x-[50px] mt-8">
        <div className="flex flex-col w-full  min-h-500">
          {/* product introduction */}
          <div className="flex flex-col gap-y-5 pt-4 ">
            <div className="flex items-center gap-x-3 mr-5">
              <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
              <span className="text-xl font-medium">معرفی محصول</span>
            </div>
            <p className="text-justify text-[16px]/[32px] text-[#23254e] px-10.5">
              {convertToPersianNumber(product.introduction)}
            </p>
          </div>
          {/* divider */}
          <Divider />

          {/* all spec */}
          <div className="flex flex-col gap-y-5 pt-4">
            <div className="flex items-center gap-x-3 mr-5">
              <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
              <span className="text-xl font-medium">مشخصات فنی</span>
            </div>
            {/*All spec cards */}
            <div className="flex flex-col gap-y-2.5 ">
              <AllProductSpecs product={product} />
            </div>
          </div>

          {/* divider */}
          <Divider />

          {/* reviews */}
          <div className="relative flex gap-x-10 min-h-250">
            <div className="flex flex-col w-full">
              {/* reviews header */}
              <div className="flex items-center gap-x-3 mr-5 mb-5">
                <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
                <span className="text-xl font-medium">نظرات کاربران</span>
              </div>
              {/* reviews orderbar */}
              <div className="flex items-center gap-x-4 bg-[#f1f8ff] w-full p-[14px] text-[12px]">
                <div className="flex items-center gap-x-2 text-[#333333]">
                  <span>
                    <ArrowDownWideNarrow size={18} color="#333333" />
                  </span>
                  <span className="font-medium">ترتیب :</span>
                </div>
                {reviewsSortOptions.map((option, index) => {
                  return (
                    <div
                      onClick={() => setReviewOrderBar(option.value)}
                      className={cn(
                        "text-[#919ebc] cursor-pointer",
                        option.value === reviewOrderBar && "text-[#0079b1]"
                      )}
                      key={index}
                    >
                      {option.label}
                    </div>
                  );
                })}
              </div>
              {/* content */}
              <div></div>
            </div>

            {/* reviews aside */}
            <div className="sticky top-16 z-5 flex flex-col min-w-[400px] max-w-[400px] self-baseline pt-10 ">
              <div className="flex justify-between gap-x-6 mb-10">
                <div className="">
                  <div className="flex justify-between items-center gap-x-1.5">
                    <div className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"></div>
                    <div className="text-[#919ebc]">
                      {convertToPersianNumber(5)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-x-1.5">
                    <div className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"></div>
                    <div className="text-[#919ebc]">
                      {convertToPersianNumber(4)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-x-1.5">
                    <div className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"></div>
                    <div className="text-[#919ebc]">
                      {convertToPersianNumber(3)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-x-1.5">
                    <div className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"></div>
                    <div className="text-[#919ebc]">
                      {convertToPersianNumber(2)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-x-1.5">
                    <div className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"></div>
                    <div className="text-[#919ebc]">
                      {convertToPersianNumber(1)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end ">
                  {/* reviews averege */}
                  <div className="text-[40px]/[40px] font-extrabold text-[#385086] mb-3">
                    {convertToPersianNumber(product.rating)}
                  </div>
                  {/* reviews count */}
                  <div className="flex items-center gap-x-1 mb-3">
                    <span>{convertToPersianNumber(60)}</span>
                    <span>نظر</span>
                  </div>
                  {/* reviews star averege  */}
                  <div>
                    <StaticRating size={18} value={3.3} />
                  </div>
                </div>
              </div>
              {/* add review */}
              <div className="flex flex-col w-full rounded-2xl p-6 min-h-[140px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] gap-y-3">
                <div className="flex items-center gap-x-2 px-2">
                  <Image
                    src="/productpage/comment.gif"
                    alt="comment"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  <span className="text-[14px] font-medium">
                    نظر خود را در مورد این محصول بنویسید ...
                  </span>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="flex items-center justify-center gap-x-1 bg-custom-primary text-white h-13 w-full rounded-lg cursor-pointer"
                >
                  <span>افزودن نظر</span>
                  <span>
                    <Plus size={20} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* aside */}
        <div className="sticky top-16 z-5 flex flex-col min-w-[400px] max-w-[400px] min-h-100 self-baseline p-6  rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
          {/* image title and color */}
          <div className="flex gap-x-5 mt-3">
            <div className="flex justify-center items-center self-baseline min-w-[100px]">
              {type === "multiple"
                ? MPMainImage && (
                    <Image
                      className={cn("")}
                      src={MPImageShowcase ?? MPMainImage.url}
                      alt={`${product.name}`}
                      width={100}
                      height={100}
                    />
                  )
                : SPMainImage && (
                    <Image
                      className={cn("")}
                      src={SPImageShowcase ? SPImageShowcase : SPMainImage.url}
                      alt={`${product.name}`}
                      width={100}
                      height={100}
                    />
                  )}
            </div>
            {/* title and color */}
            <div className="flex flex-col">
              {/* title */}
              <ProductFaTitle
                className="productlist-title text-[14px]/[20px] text-[#212121] font-normal text-justify"
                label={product.label}
              />

              {/* product color */}
              <div
                className="flex justify-between items-center self-baseline  
                   rounded-[6px] "
              >
                <div
                  className="w-5 h-5 flex items-center justify-center border border-[#d7dee0] 
                      rounded-full"
                  style={{
                    backgroundColor: getColorInfo(product.color).hex,
                  }}
                ></div>
                <span className="text-[12px] font-medium text-[#333333] ml-3 mr-2">
                  {getColorInfo(product.color).label}
                </span>
              </div>
            </div>
          </div>
          {/* seller info */}

          <div className="flex flex-col gap-x-3  mt-8 mr-3 bg-transparent ">
            <div className="pb-3 border-b border-b-[#d3d8e4]">
              <div className="flex items-center pb-2">
                <span className="">
                  <Store color="#3b5388" size={20} />
                </span>

                <span className="mr-4 text-[14px]">
                  {typeof product.tenant === "object" && product.tenant !== null
                    ? (product.tenant as Tenant).name
                    : "موبینو"}
                </span>
              </div>

              <div className="flex items-center">
                <span className=" w-5 h-5 flex justify-center items-center">
                  <Truck color="#3b5388" size={16} />
                </span>
                <span className="text-[#385086] mr-4 text-[14px]">
                  {typeof product.tenant === "object" &&
                  product.tenant !== null &&
                  (product.tenant as Tenant).name !== "موبینو"
                    ? "موجود در انبار فروشنده(ارسال از 1 روز کاری بعد)"
                    : " موجود در انبار موبینو(ارسال فوری)"}
                </span>
              </div>
            </div>

            <div className="flex items-center pt-3 pb-1">
              <span className="">
                <BadgeCheck color="#3b5388" size={20} />
              </span>
              <span className="mr-4 text-[14px]">
                {convertToPersianNumber(18)} ماه گارانتی شرکتی
              </span>
            </div>
          </div>

          {/* price and qty */}
          <ProductAndQty product={product} />
          {/* add to cart button */}

          <AddToCartButton
            productId={product.id}
            setIsModalOpen={setIsModalOpen}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSpecAndReviews;
