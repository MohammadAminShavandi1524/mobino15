"use client";

import dynamic from "next/dynamic";

import { Category, Product, Tenant, User } from "@/payload-types";

import { useState } from "react";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Check, Percent } from "lucide-react";

import {
  cn,
  convertIdToCatOrSub,
  convertToPersianNumber,
  getColorInfo,
  getDiscountPercent,
  isDarkColor,
} from "@/lib/utils";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import AddToCartBtnModal from "../AddToCartBtnModal";
import LoadingDots from "../LoadingDots";
import ProductAndQty from "../(ProductPageComps)/ProductAndQty";
import SellerInfo from "../(ProductPageComps)/SellerInfo";
import ProductRating from "../(ProductPageComps)/ProductRating";
import ProductFaTitle from "../(ProductPageComps)/ProductFaTitle";
import ProductEnTitle from "../(ProductPageComps)/ProductEnTitle";

import ServiceHighlights from "../(ProductPageComps)/ServiceHighlights";
import SimilarProductsCarousel from "../(carousels)/SimilarProductsCarousel";

import ProductMainSpec from "../(productMainSpec)/ProductMainSpec";
import AllSpecAndReviews from "../(ProductPageComps)/AllSpecAndReviews";
import ReviewModal from "../(ProductPageComps)/reviewModal";
import ImageShowcase from "../(ProductPageComps)/ImageShowcase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LikeAndShareBtns from "../(ProductPageComps)/LikeAndShareBtns";
import TomanLogo from "../TomanLogo";
import AddToCartBtnMobileModal from "../(ProductPageComps)/AddToCartBtnMobileModal";

const AddToCartButton = dynamic(
  () => import("../AddToCartButton").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="bg-custom-primary relative mx-[10px] flex h-13 cursor-pointer items-center justify-center rounded-lg">
        <LoadingDots dotClassName="bg-white" />
      </div>
    ),
  },
);

interface ProductPageProps {
  product: string;
}

const ProductPage = ({ product }: ProductPageProps) => {
  if (!product) return <div>param loading</div>;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const orderParam = decodeURIComponent(product as string).split("_")[0];

  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  const matchedProductByDKP: Product[] = useSuspenseQuery(
    trpc.products.getOneWithDKP.queryOptions({ order: orderParam }),
  ).data.docs;

  const matchedProductByOrder: Product = useSuspenseQuery(
    trpc.products.getOneWithOrder.queryOptions({ order: orderParam }),
  ).data.docs[0];

  const { data: productReviews } = useQuery(
    trpc.reviews.getOne.queryOptions({ product: product }),
  );

  const [MPProductShowcase, setMPProductsShowcase] = useState<
    Product | undefined
  >();

  const matchedAvailableProducts = matchedProductByDKP.filter((p) => {
    return p.available;
  });

  // * نا موجود   it must be added later when checkout added

  if (
    matchedProductByOrder &&
    (matchedProductByOrder.available === false ||
      matchedProductByOrder.quantity === 0)
  )
    return (
      <div className="w90 mt-4 flex flex-col">
        <div className="px-[10px]">ناموجود</div>
      </div>
    );

  // *multiple products

  if (matchedProductByDKP.length > 1) {
    const TheProduct = MPProductShowcase ?? matchedProductByOrder;
    return (
      <div className="relative mt-4 lg:mx-auto lg:w-[90%] lg:max-w-[1600px] lg:px-2.5">
        {/* AddToCartBtnModal sm: */}
        <AddToCartBtnModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={TheProduct}
        />

        {/* AddToCartBtnModal mobile */}
        <AddToCartBtnMobileModal
          isMobileModalOpen={isMobileModalOpen}
          setIsMobileModalOpen={setIsMobileModalOpen}
          product={TheProduct}
        />

        {/* review modal */}
        <ReviewModal
          product={TheProduct}
          isReviewModalOpen={isReviewModalOpen}
          setIsReviewModalOpen={setIsReviewModalOpen}
          userId={user?.id}
        />

        <div className="xss:px-6 s:px-8 flex flex-col px-4 lg:px-0">
          {/* bread crump */}
          <div className="mb-5">
            <BreadCrump
              activePage="product"
              productData={matchedProductByOrder}
              category={
                convertIdToCatOrSub(
                  matchedProductByOrder?.category as string,
                ) as string
              }
              subCategory={
                convertIdToCatOrSub(
                  matchedProductByOrder?.subCategory as string,
                ) as string
              }
              className="px-1"
            />
          </div>

          {/* main content pc*/}
          <div className="3xl:gap-x-[50px] relative hidden gap-y-10 bg-[#fcfeff] max-2xl:mt-4 max-2xl:border-y-5 max-2xl:border-double max-2xl:border-y-[#d3d8e4] max-2xl:py-10 max-xl:flex-col lg:flex 2xl:gap-x-10">
            {/* landing main */}
            <div className="grid w-full grid-cols-20 rounded-xl 2xl:border 2xl:border-[#d3d8e4]">
              <div className="col-span-10 flex h-full flex-col rounded-r-xl bg-[#fcfeff] p-0 pr-0.5 xl:col-span-11 2xl:p-10 2xl:pl-0">
                {/* product fa title */}
                <ProductFaTitle label={matchedProductByOrder.label} />
                {/* product en title */}
                <ProductEnTitle name={matchedProductByOrder.name} />

                <div className="mb-10 self-baseline">
                  {/* product rating */}
                  <ProductRating
                    productReviews={productReviews}
                    rating={matchedProductByOrder.rating}
                  />

                  {/* product color */}
                  <div className="flex flex-col gap-y-[14px] self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
                    <div className="flex items-center gap-x-2 text-sm 2xl:text-base">
                      <span>رنگ :</span>
                      <span>{getColorInfo(TheProduct.color).label}</span>
                    </div>

                    <div className="flex flex-row-reverse items-center gap-x-3">
                      {matchedAvailableProducts.map((p, index) => {
                        const isSelected = p.color === TheProduct.color;

                        const checkColor = isDarkColor(
                          getColorInfo(p.color).hex,
                        )
                          ? "#fff"
                          : "#000";

                        return (
                          <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => setMPProductsShowcase(p)}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]",
                                isSelected && "border-[#14a0de]",
                              )}
                            >
                              <div
                                className="flex size-4.5 items-center justify-center rounded-[6px] border border-[#d7dee0] 2xl:size-5"
                                style={{
                                  backgroundColor: getColorInfo(p.color).hex,
                                }}
                              >
                                {isSelected && (
                                  <Check
                                    color={checkColor}
                                    size={12}
                                    strokeWidth={3}
                                  />
                                )}
                              </div>
                              <span
                                className={cn(
                                  "mr-2 ml-2 text-[14px] text-[#666666] 2xl:mr-2 2xl:ml-3",
                                  isSelected && "font-medium text-[#333333]",
                                )}
                              >
                                {getColorInfo(p.color).label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* main specifictions */}

                <div className="flex flex-col gap-y-2.5">
                  <div className="pr-1.5 pb-0.5 text-[15px] font-medium">
                    ویژگی های اصلی
                  </div>
                  <div className="w-full rounded-[10px] border border-[#d7dee0] bg-white p-4.5 pl-6.5 2xl:p-5 2xl:pl-7.5">
                    <ProductMainSpec product={matchedProductByOrder} />
                  </div>
                </div>
              </div>
              {/* ImageShowcase col-span9*/}
              <ImageShowcase product={matchedProductByOrder} />
            </div>

            {/* landing aside */}
            <div className="flex flex-col self-baseline rounded-[16px] px-5 max-xl:w-full xl:sticky xl:top-5 xl:min-w-95 xl:border xl:border-[#d3d8e4] xl:p-5 2xl:min-w-100 2xl:p-6">
              {/* seller info */}
              <SellerInfo
                product={matchedProductByOrder}
                productType="multiple"
                MPProductShowcase={MPProductShowcase}
              />

              {/* price info and quantity */}
              <ProductAndQty product={TheProduct} />

              {/* add to cart button */}
              <AddToCartButton
                productId={TheProduct.id}
                setIsModalOpen={setIsModalOpen}
                setIsMobileModalOpen={setIsMobileModalOpen}
                userName={user?.username}
              />
            </div>
          </div>

          {/* main content mobile */}
          <div className="mt-2 flex flex-col items-center lg:hidden">
            {/*  Like And Share Btns */}
            <LikeAndShareBtns />
            {/* image carousel showCase */}
            <Carousel autoplay interval={7000}>
              <CarouselContent className="my-10">
                {matchedProductByOrder.images?.map((img, index) => {
                  return (
                    <CarouselItem
                      className="flex basis-1/1 justify-center pl-4"
                      key={index}
                    >
                      <Image
                        className=""
                        alt="product-image"
                        src={img.url}
                        width={280}
                        height={280}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>

            <div className="mb-6 w-full pr-6 pl-5">
              {/* product fa title */}
              <ProductFaTitle
                className="mt-4"
                label={matchedProductByOrder.label}
              />
              {/* product en title */}
              <ProductEnTitle name={matchedProductByOrder.name} />

              {/* product color */}
              <div className="flex flex-col gap-y-[14px] border-b border-b-[#d3d8e4] pb-4 pl-6">
                <div className="flex items-center gap-x-2 text-sm 2xl:text-base">
                  <span>رنگ :</span>
                  <span>{getColorInfo(TheProduct.color).label}</span>
                </div>

                <div className="flex justify-end w-fit flex-row-reverse gap-x-3 gap-y-3 flex-wrap">
                  {matchedAvailableProducts.map((p, index) => {
                    const isSelected = p.color === TheProduct.color;

                    const checkColor = isDarkColor(getColorInfo(p.color).hex)
                      ? "#fff"
                      : "#000";

                    return (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => setMPProductsShowcase(p)}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]",
                            isSelected && "border-[#14a0de]",
                          )}
                        >
                          <div
                            className="flex size-4.5 items-center justify-center rounded-[6px] border border-[#d7dee0] 2xl:size-5"
                            style={{
                              backgroundColor: getColorInfo(p.color).hex,
                            }}
                          >
                            {isSelected && (
                              <Check
                                color={checkColor}
                                size={12}
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          <span
                            className={cn(
                              "mr-2 ml-2 text-[14px] text-[#666666] 2xl:mr-2 2xl:ml-3",
                              isSelected && "font-medium text-[#333333]",
                            )}
                          >
                            {getColorInfo(p.color).label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* seller info */}
            <div className="w-full px-4">
              <SellerInfo product={TheProduct} productType="single" />
            </div>
          </div>
        </div>

        {/* ServiceHighlights */}
        <ServiceHighlights />

        {/* main specifictions for mobile*/}

        <div className="mb-10 flex flex-col gap-y-2.5 px-4 lg:hidden">
          <div className="pr-2 pb-0.5 text-[14px] font-medium">
            ویژگی های اصلی
          </div>
          <div className="w-full rounded-[10px] border border-[#d7dee0] bg-white p-4.5 pl-6.5">
            <ProductMainSpec product={matchedProductByOrder} />
          </div>
        </div>
        {/* similar products carousel */}
        <SimilarProductsCarousel product={matchedProductByOrder} />

        {/* all spec and reviews */}

        <AllSpecAndReviews
          product={TheProduct}
          productReviews={productReviews}
          setIsModalOpen={setIsModalOpen}
          setIsReviewModalOpen={setIsReviewModalOpen}
          setIsMobileModalOpen={setIsMobileModalOpen}
          userName={user?.username}
        />

        {/* mobile add to cart */}

        <div className="xss:px-6 fixed right-0 bottom-0 z-10 flex w-full flex-col-reverse border-t border-t-[#d7dee0] bg-[#f8f8f8] px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-x-4 lg:hidden">
          <AddToCartButton
            userName={user?.username}
            setIsModalOpen={setIsModalOpen}
            setIsMobileModalOpen={setIsMobileModalOpen}
            productId={TheProduct.id}
          />

          <div className="flex items-center justify-end pb-3 pl-0.5 sm:justify-center sm:pb-1">
            {TheProduct.offPrice ? (
              <div className="flex flex-row-reverse items-center gap-x-3">
                {/* off price */}
                <div className="flex gap-x-1.25 sm:gap-x-2">
                  <div className="text-lg font-bold sm:text-[20px]">
                    {TheProduct.offPrice.toLocaleString("fa-IR")}
                  </div>
                  <div className="flex items-center justify-center pb-0.5 text-sm sm:pb-1 sm:text-base">
                    تومان
                  </div>
                </div>
                {/* price */}
                <div className="pt-0.5 text-base font-bold text-[#919ebc] line-through sm:pt-0.5 sm:text-lg">
                  {TheProduct.price.toLocaleString("fa-IR")}
                </div>
                {/* discount percent */}
                <div className="flex h-5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                  <span>
                    <Percent strokeWidth={2.5} size={14} />
                  </span>
                  <span className="pt-[2px] text-[12px]">
                    {convertToPersianNumber(
                      getDiscountPercent(TheProduct) || "33",
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-1.25 sm:gap-x-2">
                <div className="text-lg font-bold sm:text-[20px]">
                  {TheProduct.price.toLocaleString("fa-IR")}
                </div>
                <div className="flex items-center justify-center pb-0.5 text-sm sm:pb-1 sm:text-base">
                  تومان
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  */}
      </div>
    );
  }

  // * single products

  return (
    <div className="relative mt-4 lg:mx-auto lg:w-[90%] lg:max-w-[1600px] lg:px-2.5">
      {/* AddToCartBtnModal sm: */}
      <AddToCartBtnModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={matchedProductByOrder}
      />

      {/* AddToCartBtnModal mobile */}
      <AddToCartBtnMobileModal
        isMobileModalOpen={isMobileModalOpen}
        setIsMobileModalOpen={setIsMobileModalOpen}
        product={matchedProductByOrder}
      />
      {/* review modal */}
      <ReviewModal
        product={matchedProductByOrder}
        isReviewModalOpen={isReviewModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        userId={user?.id}
      />
      <div className="xss:px-6 s:px-8 flex flex-col px-4 lg:px-0">
        {/* bread crump */}
        <div className="mb-5">
          <BreadCrump
            activePage="product"
            productData={matchedProductByOrder}
            category={
              convertIdToCatOrSub(
                matchedProductByOrder.category as string,
              ) as string
            }
            subCategory={
              convertIdToCatOrSub(
                matchedProductByOrder.subCategory as string,
              ) as string
            }
            className="px-1"
          />
        </div>

        {/* main content pc*/}
        <div className="3xl:gap-x-[50px] relative hidden gap-y-10 bg-[#fcfeff] max-2xl:mt-4 max-2xl:border-y-5 max-2xl:border-double max-2xl:border-y-[#d3d8e4] max-2xl:py-10 max-xl:flex-col lg:flex 2xl:gap-x-10">
          {/* landing main */}
          <div className="grid w-full grid-cols-20 rounded-xl 2xl:border 2xl:border-[#d3d8e4]">
            <div className="col-span-10 flex h-full flex-col rounded-r-xl bg-[#fcfeff] p-0 pr-0.5 xl:col-span-11 2xl:p-10 2xl:pl-0">
              {/* product fa title */}
              <ProductFaTitle label={matchedProductByOrder.label} />
              {/* product en title */}
              <ProductEnTitle name={matchedProductByOrder.name} />

              <div className="mb-10 self-baseline">
                {/* product rating */}
                <ProductRating
                  productReviews={productReviews}
                  rating={matchedProductByOrder.rating}
                />

                {/* product color */}
                <div className="flex items-center gap-x-1 self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
                  <span className="ml-0.5 text-sm 2xl:text-base">رنگ :</span>
                  <span className="text-sm 2xl:text-base">
                    {getColorInfo(matchedProductByOrder.color).label}
                  </span>
                  <span
                    style={{
                      backgroundColor: getColorInfo(matchedProductByOrder.color)
                        .hex,
                    }}
                    className="size-3.5 rounded-full border border-[#d7dee0] 2xl:size-4"
                  />
                </div>
              </div>

              {/* main specifictions */}

              <div className="flex flex-col gap-y-2.5">
                <div className="pr-1.5 pb-0.5 text-[15px] font-medium">
                  ویژگی های اصلی
                </div>
                <div className="w-full rounded-[10px] border border-[#d7dee0] bg-white p-4.5 pl-6.5 2xl:p-5 2xl:pl-7.5">
                  <ProductMainSpec product={matchedProductByOrder} />
                </div>
              </div>
            </div>

            {/* ImageShowcase col-span9*/}
            <ImageShowcase product={matchedProductByOrder} />
          </div>

          {/* landing aside */}
          <div className="flex flex-col self-baseline rounded-[16px] px-5 max-xl:w-full xl:sticky xl:top-5 xl:min-w-95 xl:border xl:border-[#d3d8e4] xl:p-5 2xl:min-w-100 2xl:p-6">
            {/* seller info */}
            <SellerInfo product={matchedProductByOrder} productType="single" />

            {/* price info and quantity */}
            <ProductAndQty product={matchedProductByOrder} />

            {/* add to cart button */}

            <AddToCartButton
              setIsModalOpen={setIsModalOpen}
              setIsMobileModalOpen={setIsMobileModalOpen}
              productId={matchedProductByOrder.id}
              userName={user?.username}
            />
          </div>
        </div>

        {/* main content mobile */}
        <div className="mt-2 flex flex-col items-center lg:hidden">
          {/*  Like And Share Btns */}
          <LikeAndShareBtns />
          {/* image carousel showCase */}
          <Carousel autoplay interval={7000}>
            <CarouselContent className="my-10">
              {matchedProductByOrder.images?.map((img, index) => {
                return (
                  <CarouselItem
                    className="flex basis-1/1 justify-center pl-4"
                    key={index}
                  >
                    <Image
                      className=""
                      alt="product-image"
                      src={img.url}
                      width={280}
                      height={280}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mb-6 w-full pr-5 pl-4">
            {/* product fa title */}
            <ProductFaTitle
              className="mt-4"
              label={matchedProductByOrder.label}
            />
            {/* product en title */}
            <ProductEnTitle name={matchedProductByOrder.name} />
            {/* product color */}
            <div className="flex items-center gap-x-1 self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
              <span className="ml-0.5 text-sm 2xl:text-base">رنگ :</span>
              <span className="text-sm 2xl:text-base">
                {getColorInfo(matchedProductByOrder.color).label}
              </span>
              <span
                style={{
                  backgroundColor: getColorInfo(matchedProductByOrder.color)
                    .hex,
                }}
                className="size-3.5 rounded-full border border-[#d7dee0] 2xl:size-4"
              />
            </div>
          </div>

          {/* seller info */}
          <div className="w-full px-4">
            <SellerInfo product={matchedProductByOrder} productType="single" />
          </div>
        </div>
      </div>
      {/* ServiceHighlights */}
      <ServiceHighlights />

      {/* main specifictions for mobile*/}

      <div className="mb-10 flex flex-col gap-y-2.5 px-4 lg:hidden">
        <div className="pr-2 pb-0.5 text-[14px] font-medium">
          ویژگی های اصلی
        </div>
        <div className="w-full rounded-[10px] border border-[#d7dee0] bg-white p-4.5 pl-6.5">
          <ProductMainSpec product={matchedProductByOrder} />
        </div>
      </div>

      {/* similar products carousel */}
      <SimilarProductsCarousel product={matchedProductByOrder} />

      {/* all spec and reviews */}

      <AllSpecAndReviews
        product={matchedProductByOrder}
        productReviews={productReviews}
        setIsModalOpen={setIsModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        setIsMobileModalOpen={setIsMobileModalOpen}
        userName={user?.username}
      />

      {/* mobile add to cart */}

      <div className="xss:px-6 fixed right-0 bottom-0 z-10 flex w-full flex-col-reverse border-t border-t-[#d7dee0] bg-[#f8f8f8] px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-x-4 lg:hidden">
        <AddToCartButton
          userName={user?.username}
          setIsMobileModalOpen={setIsMobileModalOpen}
          setIsModalOpen={setIsModalOpen}
          productId={matchedProductByOrder.id}
        />

        <div className="flex items-center justify-end pb-3 pl-0.5 sm:justify-center sm:pb-1">
          {matchedProductByOrder.offPrice ? (
            <div className="flex flex-row-reverse items-center gap-x-3">
              {/* off price */}
              <div className="flex gap-x-1.25 sm:gap-x-2">
                <div className="text-lg font-bold sm:text-[20px]">
                  {matchedProductByOrder.offPrice.toLocaleString("fa-IR")}
                </div>
                <div className="flex items-center justify-center pb-0.5 text-sm sm:pb-1 sm:text-base">
                  تومان
                </div>
              </div>
              {/* price */}
              <div className="pt-0.5 text-base font-bold text-[#919ebc] line-through sm:pt-0.5 sm:text-lg">
                {matchedProductByOrder.price.toLocaleString("fa-IR")}
              </div>
              {/* discount percent */}
              <div className="flex h-5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                <span>
                  <Percent strokeWidth={2.5} size={14} />
                </span>
                <span className="pt-[2px] text-[12px]">
                  {convertToPersianNumber(
                    getDiscountPercent(matchedProductByOrder) || "33",
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-x-1.25 sm:gap-x-2">
              <div className="text-lg font-bold sm:text-[20px]">
                {matchedProductByOrder.price.toLocaleString("fa-IR")}
              </div>
              <div className="flex items-center justify-center pb-0.5 text-sm sm:pb-1 sm:text-base">
                تومان
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
