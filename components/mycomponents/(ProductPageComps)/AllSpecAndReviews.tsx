"use client";

import { Product, Review, Tenant, User } from "@/payload-types";
import Divider from "./Divider";
import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  getMainImageUrl,
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
import { useBreakpoints } from "@/hooks/useBreakPoint";

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
  const { lg, md, mlg, xl, sm } = useBreakpoints();

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

  //* sorts

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

  const mainImageUrl = getMainImageUrl(product);

  return (
    <div className="relative my-10 flex flex-col">
      {/* header */}
      <div className="sticky top-0 z-9 flex items-center gap-x-10 border-b border-b-[#919ebc] bg-[#f3f8fd] text-xs text-[#919ebc] max-xl:justify-center lg:text-sm xl:px-11">
        <Link
          to="introduction"
          offset={lg ? -70 : -55}
          spy={true}
          smooth={true}
          duration={500}
          className="cursor-pointer py-4"
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
          className="cursor-pointer py-4"
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
          className="cursor-pointer py-4"
          activeStyle={{ borderBottom: "4px solid black", color: "black" }}
        >
          نظرات کاربران
        </Link>
      </div>

      <div className="relative flex gap-x-10 px-4 lg:px-0 lg:pt-5 2xl:gap-x-12.5">
        <div className="flex w-full flex-col">
          {/* product introduction */}
          <Element name="introduction">
            <div className="mb-10 flex flex-col gap-y-3 px-4 pt-6 lg:mb-14 lg:gap-y-5 lg:px-0 lg:pt-4">
              <div className="flex items-center gap-x-3 lg:mr-5">
                <span className="bg-custom-primary size-3 rounded-full border border-[#919ebc] max-lg:hidden"></span>
                <span className="text-base font-medium lg:text-xl">
                  معرفی محصول
                </span>
              </div>
              <p className="text-justify text-[14px]/[28px] text-[#23254e] lg:px-10.5 lg:text-[16px]/[32px]">
                {convertToPersianNumber(product.introduction)}
              </p>
            </div>
          </Element>

          {/* divider */}
          <Divider />

          {/* all spec */}
          <Element name="allSpec">
            <div className="mt-10 mb-14 flex flex-col gap-y-3 pt-4 lg:gap-y-5">
              <div className="mr-3 flex items-center gap-x-3 lg:mr-5">
                <span className="bg-custom-primary size-3 rounded-full border border-[#919ebc] max-lg:hidden"></span>
                <span className="text-base font-medium lg:text-xl">
                  مشخصات فنی
                </span>
              </div>

              {/*All spec cards */}
              <div className="flex flex-col gap-y-2.5">
                <AllProductSpecs product={product} />
              </div>
            </div>
          </Element>

          {/* divider */}
          <Divider />

          {/* reviews */}
          <Element name="reviews">
            <div className="relative mt-10 flex max-2xl:flex-col-reverse 2xl:gap-x-10">
              <div className="flex w-full flex-col">
                {/* reviews header pc*/}
                <div className="mr-5 mb-5 hidden items-center gap-x-3 2xl:flex">
                  <span className="bg-custom-primary size-3 rounded-full border border-[#919ebc]"></span>
                  <span className="text-xl font-medium">نظرات کاربران</span>
                </div>

                {/* reviews orderbar */}
                <div className="s:gap-x-3 mb-6 flex w-full max-xss:justify-between items-center xss:gap-x-3 rounded-sm bg-[#f1f8ff] p-[14px] text-[12px] sm:mb-8 lg:gap-x-4">
                  <div className="max-xss:hidden flex items-center gap-x-1 s:gap-x-2 text-[#333333]">
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
                          "cursor-pointer text-[#919ebc]",
                          option.value === reviewOrderBar && "text-[#0079b1]",
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
                            : convertToPersianNumber(user.username);

                      return (
                        <div key={index}>
                          <div className="flex w-full flex-col border-double border-b-[#d3d8e4] px-8">
                            {/* profile logo and username */}
                            <div className="s:mb-4 s:gap-x-2.5 mb-2.5 flex items-center gap-x-1.5">
                              <div className="max-s:hidden">
                                {displayName === "کاربر ناشناس" ? (
                                  <CircleQuestionMark />
                                ) : (
                                  <CircleUserRound />
                                )}
                              </div>
                              <div className="s:hidden">
                                {displayName === "کاربر ناشناس" ? (
                                  <CircleQuestionMark size={20} />
                                ) : (
                                  <CircleUserRound size={20} />
                                )}
                              </div>

                              <div className="s:text-base pt-0.5 text-sm">
                                {displayName}
                              </div>
                            </div>
                            {/* rating */}
                            <div className="mb-2.5">
                              <StaticRating
                                className="mb-2 gap-x-0.75"
                                size={12}
                                value={review.rating}
                              />
                            </div>
                            {/* date */}
                            <div className="s:text-base s:mb-6 mb-4 text-sm">
                              {toJalali(review.updatedAt)}
                            </div>
                            {/* description */}
                            <div className="s:text-base/relaxed mb-8 text-sm/relaxed text-[#385086]">
                              {review.description}
                            </div>
                          </div>
                          {/* divider */}
                          <div className="h-0.25 w-full bg-[#d3d8e4]"></div>
                          <div className="mt-0.75 h-0.25 w-full bg-[#d3d8e4]"></div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full bg-[#f1f8ff] p-6">
                      <div className="flex w-full flex-col gap-y-2 bg-white px-8 py-4.5">
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
              <div className="mb-10 flex px-3 max-2xl:flex-row-reverse max-2xl:items-center max-2xl:gap-x-5 max-lg:flex-col max-lg:gap-y-4 lg:px-0 2xl:sticky 2xl:top-16 2xl:z-5 2xl:mb-0 2xl:max-w-[400px] 2xl:min-w-[400px] 2xl:flex-col 2xl:self-baseline 2xl:pt-10">
                {/* review progress bars */}
                <div className="s:gap-x-6 flex justify-between gap-x-2 max-2xl:w-full 2xl:mb-10">
                  <div className="">
                    {ratingNumbers.map((rating) => (
                      <div
                        key={rating}
                        className="s:gap-x-1.5 flex items-center justify-between gap-x-1"
                      >
                        <div className="" style={{ direction: "rtl" }}>
                          <Progress
                            className="h-2 max-w-[180px] min-w-[180px] rounded-[16px] bg-[#e9ecf2] sm:h-2.5 sm:max-w-[180px] sm:min-w-[180px]"
                            value={percentages[rating]}
                          />
                        </div>
                        <div className="text-sm text-[#919ebc] sm:text-base">
                          {convertToPersianNumber(rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end">
                    {/* reviews averege */}
                    <div className="mb-3 text-[32px]/[32px] font-extrabold text-[#385086] sm:text-[40px]/[40px]">
                      {convertToPersianNumber(
                        productReviews && productReviews?.length > 0
                          ? averageRating
                          : 0,
                      )}
                    </div>
                    {/* reviews count */}
                    <div className="mb-3 flex items-center gap-x-1 text-sm sm:text-base">
                      <span>{convertToPersianNumber(ratings.length)}</span>
                      <span className="">نظر</span>
                    </div>
                    {/* reviews star averege  */}
                    <div>
                      <div className="hidden sm:block">
                        <StaticRating
                          size={18}
                          value={
                            productReviews && productReviews?.length > 0
                              ? averageRating
                              : 0
                          }
                        />
                      </div>
                      <div className="sm:hidden">
                        <StaticRating
                          size={16}
                          value={
                            productReviews && productReviews?.length > 0
                              ? averageRating
                              : 0
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* add review */}
                <div className="flex gap-y-3 rounded-lg p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] max-2xl:min-w-90 max-lg:w-full max-lg:justify-between sm:rounded-2xl lg:min-h-[140px] lg:flex-col lg:p-6 2xl:w-full">
                  <div className="flex items-center gap-x-1.5 sm:gap-x-2 sm:px-2">
                    <div className="relative size-4.5 sm:size-5">
                      <Image
                        src="/productpage/comment.gif"
                        alt="comment"
                        fill
                        unoptimized
                      />
                    </div>

                    <span className="text-xs font-medium sm:text-[14px]">
                      نظر خود را در مورد این محصول بنویسید ...
                    </span>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-custom-primary s:rounded-lg s:px-3 s:py-1.5 flex cursor-pointer items-center justify-center gap-x-1 rounded-sm px-2 py-1 text-white sm:px-4 sm:py-2 lg:h-13 lg:w-full lg:px-0 lg:py-0"
                  >
                    <span className="s:text-sm text-xs sm:text-base">
                      افزودن نظر
                    </span>
                    <span className="max-sm:hidden">
                      <Plus size={20} />
                    </span>
                    <span className="max-xss:hidden sm:hidden">
                      <Plus size={16} />
                    </span>
                  </button>
                </div>
              </div>

              {/* product fa tilte mobile*/}
              <div className="mr-3 flex lg:hidden">
                <ProductFaTitle
                  label={product.label}
                  className="text-[12px]/[24px] font-normal"
                />
              </div>
              {/* reviews header mobile*/}
              <div className="mr-3 mb-3 flex items-center gap-x-3 lg:mr-5 lg:mb-5 2xl:hidden">
                <span className="bg-custom-primary size-3 rounded-full border border-[#919ebc] max-lg:hidden"></span>
                <span className="text-base font-medium lg:text-xl">
                  نظرات کاربران
                </span>
              </div>
            </div>
          </Element>
        </div>

        {/* aside max-lg:hidden*/}
        <div className="sticky top-20 z-5 hidden min-h-100 max-w-[400px] min-w-[400px] flex-col self-baseline rounded-[16px] p-6 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] xl:flex">
          {/* image,title and color */}
          <div className="mt-3 flex gap-x-5">
            <div className="flex min-w-[100px] items-center justify-center self-baseline">
              <Image
                className={cn("")}
                src={mainImageUrl}
                alt={product.name}
                width={100}
                height={100}
              />
            </div>
            {/* title and color */}
            <div className="flex flex-col">
              {/* title */}
              <ProductFaTitle
                className="productlist-title text-justify text-[14px]/[20px] font-normal text-[#212121] 2xl:text-[15px]/[24px]"
                label={product.label}
              />

              {/* product color */}
              <div className="flex items-center justify-between self-baseline rounded-[6px]">
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7dee0]"
                  style={{
                    backgroundColor: getColorInfo(product.color).hex,
                  }}
                ></div>
                <span className="mr-2 ml-3 text-[12px] font-medium text-[#333333]">
                  {getColorInfo(product.color).label}
                </span>
              </div>
            </div>
          </div>
          {/* seller info */}

          <div className="mt-8 mr-4.5 flex flex-col gap-x-3 bg-transparent">
            <div className="border-b border-b-[#d3d8e4] pb-3">
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
                <span className="flex h-5 w-5 items-center justify-center">
                  <Truck color="#3b5388" size={16} />
                </span>
                <span className="mr-4 text-[14px] text-[#385086]">
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
