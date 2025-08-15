"use client";

import dynamic from "next/dynamic";

import { Category, Product, Tenant, User } from "@/payload-types";

import { useState } from "react";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import {
  cn,
  convertIdToCatOrSub,
  getColorInfo,
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
import SimilarProductsCarousel from "../(ProductPageComps)/SimilarProductsCarousel";

import ProductMainSpec from "../(productMainSpec)/ProductMainSpec";
import AllSpecAndReviews from "../(ProductPageComps)/AllSpecAndReviews";
import ReviewModal from "../(ProductPageComps)/reviewModal";
import ImageShowcase from "../(ProductPageComps)/ImageShowcase";

const AddToCartButton = dynamic(
  () => import("../AddToCartButton").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex items-center justify-center mx-[10px] h-13 rounded-lg bg-custom-primary cursor-pointer">
        <LoadingDots dotClassName="bg-white" />
      </div>
    ),
  }
);

interface ProductPageProps {
  product: string;
}

const ProductPage = ({ product }: ProductPageProps) => {
  if (!product) return <div>param loading</div>;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const orderParam = decodeURIComponent(product as string).split("_")[0];

  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  const matchedProductByDKP: Product[] = useSuspenseQuery(
    trpc.products.getOneWithDKP.queryOptions({ order: orderParam })
  ).data.docs;

  const matchedProductByOrder: Product = useSuspenseQuery(
    trpc.products.getOneWithOrder.queryOptions({ order: orderParam })
  ).data.docs[0];

  const { data: productReviews } = useQuery(
    trpc.reviews.getOne.queryOptions({ product: product })
  );

  const [MPProductShowcase, setMPProductsShowcase] = useState<
    Product | undefined
  >();

  const matchedAvailableProducts = matchedProductByDKP.filter((p) => {
    return p.available;
  });

  // * نا موجود

  if (
    matchedProductByOrder &&
    (matchedProductByOrder.available === false ||
      matchedProductByOrder.quantity === 0)
  )
    return (
      <div className="w90 flex flex-col mt-4">
        <div className="px-[10px]">ناموجود</div>
      </div>
    );

  // *multiple products

  if (matchedProductByDKP.length > 1) {
    const TheProduct = MPProductShowcase ?? matchedProductByOrder;
    return (
      <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
        {/* modal */}

        <AddToCartBtnModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={TheProduct}
        />

        {/* review modal */}
        <ReviewModal
          product={TheProduct}
          isReviewModalOpen={isReviewModalOpen}
          setIsReviewModalOpen={setIsReviewModalOpen}
          userId={user?.id}
        />
        {/* bread crump */}
        <div className="mb-5">
          <BreadCrump
            activePage="product"
            productData={matchedProductByOrder}
            category={
              convertIdToCatOrSub(
                matchedProductByOrder?.category as string
              ) as string
            }
            subCategory={
              convertIdToCatOrSub(
                matchedProductByOrder?.subCategory as string
              ) as string
            }
            className="px-1"
          />
        </div>

        {/*  */}
        <div className="flex  gap-x-[50px] relative bg-[#fcfeff]">
          <div className="grid grid-cols-20  w-full min-h-[700px] border border-[#d3d8e4] rounded-xl">
            <div className="flex flex-col col-span-11 h-full p-10 pl-0 bg-[#fcfeff] rounded-r-xl">
              {/* product fa title */}
              <ProductFaTitle label={matchedProductByOrder.label} />
              {/* product en title */}
              <ProductEnTitle name={matchedProductByOrder.name} />

              <div className="self-baseline mb-10">
                {/* product rating */}
                <ProductRating
                  productReviews={productReviews}
                  rating={matchedProductByOrder.rating}
                />

                {/* product color */}
                <div className="flex flex-col self-baseline gap-y-[14px] pl-6 pb-4 border-b border-b-[#d3d8e4]">
                  <div className="flex items-center gap-x-2 ">
                    <span>رنگ :</span>
                    <span>{getColorInfo(TheProduct.color).label}</span>
                  </div>

                  <div className="flex flex-row-reverse gap-x-3 items-center">
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
                              "flex justify-between items-center self-baseline p-[4px] border border-[#d7dee0]  rounded-[6px] ",
                              isSelected && "border-[#14a0de]"
                            )}
                          >
                            <div
                              className="w-5 h-5 flex items-center justify-center border border-[#d7dee0] 
                            rounded-[6px]"
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
                                "text-[14px] font-medium text-[#666666] ml-3 mr-2",
                                isSelected && "text-[#333333]"
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
              <div className="flex flex-col gap-y-2.5 ">
                <div className="text-[14px] font-medium pr-1.5">
                  ویژگی های اصلی
                </div>
                <div className="w-full  bg-white p-[20px] pl-[30px] border border-[#d7dee0] rounded-[10px]">
                  <ProductMainSpec product={matchedProductByOrder} />
                </div>
              </div>
            </div>
            {/* ImageShowcase */}
            <ImageShowcase product={matchedProductByOrder} />
          </div>

          {/* landing aside */}
          <div className="sticky top-5 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
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
              userName={user?.username}
            />
          </div>
        </div>

        {/* ServiceHighlights */}
        <ServiceHighlights />
        {/* similar products carousel */}
        <SimilarProductsCarousel product={matchedProductByOrder} />

        {/* all spec and reviews */}

        <AllSpecAndReviews
          product={TheProduct}
          productReviews={productReviews}
          setIsModalOpen={setIsModalOpen}
          setIsReviewModalOpen={setIsReviewModalOpen}
          userName={user?.username}
        />
      </div>
    );
  }

  // * single products

  return (
    <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
      {/* modal */}
      <AddToCartBtnModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={matchedProductByOrder}
      />
      {/* review modal */}
      <ReviewModal
        product={matchedProductByOrder}
        isReviewModalOpen={isReviewModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        userId={user?.id}
      />
      {/* bread crump */}
      <div className="mb-5">
        <BreadCrump
          activePage="product"
          productData={matchedProductByOrder}
          category={
            convertIdToCatOrSub(
              matchedProductByOrder.category as string
            ) as string
          }
          subCategory={
            convertIdToCatOrSub(
              matchedProductByOrder.subCategory as string
            ) as string
          }
          className="px-1"
        />
      </div>

      {/*  */}
      <div className="flex gap-x-[50px] relative bg-[#fcfeff]">
        <div className="grid grid-cols-20  w-full min-h-[700px] border border-[#d3d8e4] rounded-xl">
          <div className="flex flex-col col-span-11 h-full p-10 pl-0 bg-[#fcfeff] rounded-r-xl">
            {/* product fa title */}
            <ProductFaTitle label={matchedProductByOrder.label} />
            {/* product en title */}
            <ProductEnTitle name={matchedProductByOrder.name} />

            <div className="self-baseline mb-10">
              {/* product rating */}
              <ProductRating
                productReviews={productReviews}
                rating={matchedProductByOrder.rating}
              />

              {/* product color */}
              <div className="flex items-center gap-x-1 self-baseline  pl-6 pb-4 border-b border-b-[#d3d8e4]">
                <span className="ml-0.5">رنگ :</span>
                <span>{getColorInfo(matchedProductByOrder.color).label}</span>
                <span
                  style={{ backgroundColor: matchedProductByOrder.color }}
                  className="size-4 rounded-full border border-[#d7dee0]"
                ></span>
              </div>
            </div>

            {/* main specifictions */}

            <div className="flex flex-col gap-y-2.5 ">
              <div className="text-[14px] font-medium pr-1.5">
                ویژگی های اصلی
              </div>
              <div className="w-full  bg-white p-[20px] pl-[30px] border border-[#d7dee0] rounded-[10px]">
                <ProductMainSpec product={matchedProductByOrder} />
              </div>
            </div>
          </div>

          {/* ImageShowcase */}
          <ImageShowcase product={matchedProductByOrder} />
        </div>

        {/* landing aside */}
        <div className="sticky top-5 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
          {/* seller info */}
          <SellerInfo product={matchedProductByOrder} productType="single" />

          {/* price info and quantity */}
          <ProductAndQty product={matchedProductByOrder} />

          {/* add to cart button */}

          <AddToCartButton
            setIsModalOpen={setIsModalOpen}
            productId={matchedProductByOrder.id}
            userName={user?.username}
          />
        </div>
      </div>

      {/* ServiceHighlights */}
      <ServiceHighlights />
      {/* similar products carousel */}
      <SimilarProductsCarousel product={matchedProductByOrder} />

      {/* all spec and reviews */}

      <AllSpecAndReviews
        product={matchedProductByOrder}
        productReviews={productReviews}
        setIsModalOpen={setIsModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        userName={user?.username}
      />
    </div>
  );

  // // *Loading

  // return (
  //   <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
  //     {/* bread crump */}
  //     <div className="mb-5">
  //       <BreadCrump activePage="product" className="px-1" />
  //     </div>
  //   </div>
  // );
};

export default ProductPage;
