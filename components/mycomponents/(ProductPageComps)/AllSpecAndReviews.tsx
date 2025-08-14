"use client";

import { Product, Review, Tenant, User } from "@/payload-types";
import Divider from "./Divider";
import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  toJalali,
} from "@/lib/utils";
import AllProductSpecs from "../productAllSpec/AllProductSpecs";
import {
  ArrowDownWideNarrow,
  BadgeCheck,
  CircleQuestionMark,
  CircleUserRound,
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
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Progress } from "@/components/ui/progress";

import { Link, Element } from "react-scroll";

interface AllSpecAndReviewsProps {
  product: Product;
  userName?: string;
  productReviews: Review[] | null | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsReviewModalOpen: Dispatch<SetStateAction<boolean>>;
}
const reviewsSortOptions = [
  { label: "جدیدترین", value: "Newest" },
  { label: "قدیمی‌ترین", value: "Oldest" },
  { label: "بیشترین امتیاز", value: "HighestRating" },
  { label: "کمترین امتیاز", value: "LowestRating" },
];
const AllSpecAndReviews = ({
  product,
  userName,
  setIsModalOpen,
  setIsReviewModalOpen,
  productReviews,
}: AllSpecAndReviewsProps) => {
  const [reviewOrderBar, setReviewOrderBar] = useState("Newest");

  const ratings: number[] = [];
  productReviews?.forEach((review) => {
    ratings.push(review.rating);
  });

  const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
  const averageRating = Math.round((totalRating / ratings.length) * 10) / 10;

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  productReviews?.forEach((review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
  });

  const total = productReviews?.length ?? 0;
  const percentages: Record<number, number> = {} as Record<number, number>;

  Object.entries(counts).forEach(([rating, count]) => {
    percentages[Number(rating)] = Number(((count / total) * 100).toFixed(1));
  });

  const ratingNumbers = [5, 4, 3, 2, 1];

  if (productReviews && productReviews?.length > 0) {
    switch (reviewOrderBar) {
      case "Newest":
        productReviews?.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
        break;

      case "Oldest":
        productReviews?.sort((a, b) => {
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        });
        break;

      case "HighestRating":
        productReviews?.sort((a, b) => b.rating - a.rating);
        break;

      case "LowestRating":
        productReviews?.sort((a, b) => a.rating - b.rating);
        break;
    }
  }

  const mainImageUrl =
    product &&
    product.images?.find((image) => {
      return image.isMain;
    })?.url;
 

  return (
    <div className="relative flex flex-col my-10">
      {/* header */}
      <div className="sticky top-0 z-6 flex items-center  px-11  gap-x-10 text-[14px] bg-[#f3f8fd] border-b border-b-[#919ebc] text-[#919ebc]">
        <Link
          to="introduction"
          offset={-70}
          spy={true}
          smooth={true}
          duration={500}
          className="py-4 cursor-pointer "
          activeStyle={{ borderBottom: "4px solid black", color: "black" }}
        >
          معرفی محصول
        </Link>
        <Link
          to="allSpec"
          offset={-40}
          spy={true}
          smooth={true}
          duration={500}
          className="py-4 cursor-pointer"
          activeStyle={{ borderBottom: "4px solid black", color: "black" }}
        >
          مشخصات فنی
        </Link>
        <Link
          to="reviews"
          offset={-40}
          spy={true}
          smooth={true}
          duration={500}
          className="py-4 cursor-pointer"
          activeStyle={{ borderBottom: "4px solid black", color: "black" }}
        >
          نظرات کاربران
        </Link>
      </div>
      <div className="relative flex gap-x-[50px] pt-5">
        <div className="flex flex-col w-full">
          {/* product introduction */}
          <Element name="introduction">
            <div className="flex flex-col gap-y-5 pt-4 mb-14">
              <div className="flex items-center gap-x-3 mr-5">
                <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
                <span className="text-xl font-medium">معرفی محصول</span>
              </div>
              <p className="text-justify text-[16px]/[32px] text-[#23254e] px-10.5">
                {convertToPersianNumber(product.introduction)}
              </p>
            </div>
          </Element>

          {/* divider */}
          <Divider />

          {/* all spec */}
          <Element name="allSpec">
            <div className="flex flex-col gap-y-5 pt-4 mt-10 mb-14">
              <div className="flex items-center gap-x-3 mr-5">
                <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
                <span className="text-xl font-medium">مشخصات فنی</span>
              </div>
              {/*All spec cards */}
              <div className="flex flex-col gap-y-2.5 ">
                <AllProductSpecs product={product} />
              </div>
            </div>
          </Element>

          {/* divider */}
          <Divider />

          {/* reviews */}
          <Element name="reviews">
            <div className="relative flex gap-x-10 mt-10">
              <div className="flex flex-col w-full">
                {/* reviews header */}
                <div className="flex items-center gap-x-3 mr-5 mb-5">
                  <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
                  <span className="text-xl font-medium">نظرات کاربران</span>
                </div>
                {/* reviews orderbar */}
                <div className="flex items-center gap-x-4 bg-[#f1f8ff] w-full p-[14px] text-[12px] mb-8 rounded-sm">
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
                <div className="flex flex-col gap-y-8">
                  {productReviews && productReviews.length > 0 ? (
                    productReviews?.map((review, index) => {
                      const user = review.user as User;
                      const displayName =
                        user.username === "mobino"
                          ? "کاربر ناشناس"
                          : user.username.includes("superAdmin") ||
                              user.username.includes("seller")
                            ? user.sellername
                            : user.username;

                      return (
                        <div key={index}>
                          <div className="flex flex-col w-full px-8  border-double  border-b-[#d3d8e4]">
                            {/* profile logo and username */}
                            <div className="flex items-center gap-x-2.5 mb-4">
                              <div>
                                {displayName === "کاربر ناشناس" ? (
                                  <CircleQuestionMark />
                                ) : (
                                  <CircleUserRound />
                                )}
                              </div>
                              <div className="pt-0.5">{displayName}</div>
                            </div>
                            {/* rating */}
                            <div className="mb-2.5">
                              <StaticRating
                                className="gap-x-0.75"
                                size={12}
                                value={review.rating}
                              />
                            </div>
                            {/* date */}
                            <div className="mb-6">
                              {toJalali(review.updatedAt)}
                            </div>
                            {/* description */}
                            <div className="text-[#385086] text-base/relaxed mb-8">
                              {review.description}
                            </div>
                          </div>
                          {/* divider */}
                          <div className="w-full h-0.25 bg-[#d3d8e4] "></div>
                          <div className="w-full h-0.25 bg-[#d3d8e4] mt-0.75"></div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full p-6 bg-[#f1f8ff]">
                      <div className="flex flex-col gap-y-2 w-full px-8 py-4.5 bg-white">
                        <span className="text-base">
                          برای راهنمایی دیگران درمورد این کالا نظر دهید.
                        </span>
                        <span className="text-sm">
                          برای ثبت نظر نیاز به خرید کالا نیست.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* reviews aside */}
              <div className="sticky top-16 z-5 flex flex-col min-w-[400px] max-w-[400px] self-baseline pt-10 ">
                <div className="flex justify-between gap-x-6 mb-10">
                  <div className="">
                    {ratingNumbers.map((rating) => (
                      <div
                        key={rating}
                        className="flex justify-between items-center gap-x-1.5"
                      >
                        <div style={{ direction: "rtl" }}>
                          <Progress
                            className="min-w-[180px] max-w-[180px] h-2.5 rounded-[16px] bg-[#e9ecf2]"
                            value={percentages[rating]}
                          />
                        </div>
                        <div className="text-[#919ebc]">
                          {convertToPersianNumber(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end ">
                    {/* reviews averege */}
                    <div className="text-[40px]/[40px] font-extrabold text-[#385086] mb-3">
                      {convertToPersianNumber(
                        productReviews && productReviews?.length > 0
                          ? averageRating
                          : 0
                      )}
                    </div>
                    {/* reviews count */}
                    <div className="flex items-center gap-x-1 mb-3">
                      <span>{convertToPersianNumber(ratings.length)}</span>
                      <span>نظر</span>
                    </div>
                    {/* reviews star averege  */}
                    <div>
                      <StaticRating
                        size={18}
                        value={
                          productReviews && productReviews?.length > 0
                            ? averageRating
                            : 0
                        }
                      />
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
          </Element>
        </div>

        {/* aside */}
        <div className="sticky top-20 z-5 flex flex-col min-w-[400px] max-w-[400px] min-h-100 self-baseline p-6  rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
          {/* image,title and color */}
          <div className="flex gap-x-5 mt-3">
            <div className="flex justify-center items-center self-baseline min-w-[100px]">
              {mainImageUrl && (
                <Image
                  className={cn("")}
                  src={mainImageUrl}
                  alt={product.name}
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
