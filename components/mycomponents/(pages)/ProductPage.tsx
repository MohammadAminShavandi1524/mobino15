"use client";

import dynamic from "next/dynamic";

import { Category, Product, Tenant, User } from "@/payload-types";

import { useState } from "react";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, Check, Store, Truck } from "lucide-react";

import {
  cn,
  convertToPersianNumber,
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
import Link from "next/link";
import ServiceHighlights from "../(ProductPageComps)/ServiceHighlights";
import SimilarProductsCarousel from "../(ProductPageComps)/SimilarProductsCarousel";
import AllMobileSpec from "../productAllSpec/AllMobileSpec";
import AllLaptopSpec from "../productAllSpec/AllLaptopSpec";
import AllTabletSpec from "../productAllSpec/AllTabletSpec";
import ProductMainSpec from "../(productMainSpec)/ProductMainSpec";

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

const ProductPage = ({ product  }: ProductPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const param = decodeURIComponent(product as string).split("_")[1];

  const orderParam = decodeURIComponent(product as string).split("_")[0];

  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const matchedProductByOrder =
    productsData?.docs.filter((p) => p.order === Number(orderParam)) || [];

  const dkp = matchedProductByOrder[0].address.replace(/\D/g, "");

  const matchedProducts =
    productsData?.docs.filter((p) => p.address.replace(/\D/g, "") === dkp) ||
    [];
  // console.log("🚀 ~ ProductPage ~ matchedProducts:", matchedProducts);

  // *** single product ***
  const singleProduct: Product | null =
    matchedProducts.length === 1 ? matchedProducts[0] : null;

  // *** multiple product ***
  const multipleProducts: Product[] | null =
    matchedProducts.length > 1 ? matchedProducts : null;

  const MPSelectedProduct = multipleProducts?.find((p) => {
    return p.order === Number(orderParam);
  });

  const selectedCategory = categories?.docs.find((cat) => {
    if (singleProduct) return cat.id === singleProduct.category;
    if (multipleProducts) {
      return cat.id === multipleProducts[0].category;
    }
    return false;
  });

  const selectedSubCategory =
    selectedCategory &&
    (selectedCategory?.subcategories?.docs as Category[]).find(
      (sub: Category) => {
        if (singleProduct) return sub.id === singleProduct.subCategory;
        if (multipleProducts) {
          return sub.id === multipleProducts[0].subCategory;
        }
        return false;
      }
    );

  // * single product

  const SPMainImage =
    singleProduct &&
    singleProduct.images?.find((image) => {
      return image.isMain;
    });

  const [SPImageShowcase, setSPImageShowcase] = useState(SPMainImage?.url);

  // * multiple products

  const MPMainImage =
    MPSelectedProduct &&
    MPSelectedProduct.images?.find((image) => {
      return image.isMain;
    });

  const [MPImageShowcase, setMPImageShowcase] = useState(MPMainImage?.url);

  const [MPProductShowcase, setMPProductsShowcase] = useState<
    Product | undefined
  >();

  const matchedAvailableProducts = matchedProducts.filter((p) => {
    return p.available;
  });

  console.log(singleProduct?.productType?.[0]);
  // *

  // * نا موجود

  if (
    matchedProductByOrder.length > 0 &&
    (matchedProductByOrder[0].available === false ||
      matchedProductByOrder[0].quantity === 0)
  )
    return (
      <div className="w90 flex flex-col mt-4">
        <div className="px-[10px]">ناموجود</div>
      </div>
    );

  // * single products

  if (singleProduct && selectedCategory && selectedSubCategory) {
    const checkColor = isDarkColor(getColorInfo(singleProduct.color).hex)
      ? "#fff"
      : "#000";

    return (
      <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
        {/* modal */}
        <AddToCartBtnModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={singleProduct}
        />

        {/* bread crump */}
        <div className="mb-5">
          <BreadCrump
            activePage="product"
            productData={singleProduct}
            selectedCategoryData={selectedCategory}
            selectedSubCategoryData={selectedSubCategory}
            className="px-1"
          />
        </div>

        {/*  */}
        <div className="flex gap-x-[50px] relative bg-[#fcfeff]">
          <div className="grid grid-cols-20  w-full min-h-[700px] border border-[#d3d8e4] rounded-xl">
            <div className="flex flex-col col-span-11 h-full p-10 pl-0 bg-[#fcfeff] rounded-r-xl">
              {/* product fa title */}
              <ProductFaTitle label={singleProduct.label} />
              {/* product en title */}
              <ProductEnTitle name={singleProduct.name} />

              <div className="self-baseline mb-10">
                {/* product rating */}
                <ProductRating rating={singleProduct.rating} />

                {/* product color */}
                <div className="flex flex-col self-baseline gap-y-[14px] pl-6 pb-4 border-b border-b-[#d3d8e4]">
                  <div className="flex items-center gap-x-2 ">
                    <span>رنگ :</span>
                    <span>{getColorInfo(singleProduct.color).label}</span>
                  </div>

                  <div
                    className="flex justify-between items-center self-baseline p-[4px] border border-[#1b3570]
                   rounded-[6px] cursor-pointer"
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center border border-[#d7dee0] 
                      rounded-[6px]"
                      style={{
                        backgroundColor: getColorInfo(singleProduct.color).hex,
                      }}
                    >
                      <Check color={checkColor} size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[14px] font-medium text-[#333333] ml-3 mr-2">
                      {getColorInfo(singleProduct.color).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* main specifictions */}

              <div className="flex flex-col gap-y-2.5 ">
                <div className="text-[14px] font-medium pr-1.5">
                  ویژگی های اصلی
                </div>
                <div className="w-full  bg-white p-[20px] pl-[30px] border border-[#d7dee0] rounded-[10px]">
                  <ProductMainSpec product={singleProduct} />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center gap-y-[70px] col-span-9  h-full pt-[38px] pr-[46px] pb-[42px] pl-[52px] rounded-l-xl">
              {/* like and share */}
              <div className="absolute"></div>
              {/* main image */}
              <div className="w-full flex items-center justify-center ">
                {SPMainImage && (
                  <div>
                    <Image
                      className={cn("")}
                      src={SPImageShowcase ? SPImageShowcase : SPMainImage.url}
                      alt={`${singleProduct.name}`}
                      width={400}
                      height={400}
                    />
                  </div>
                )}
              </div>
              {/* othet image */}
              <div className="w-full flex flex-row-reverse items-center justify-center gap-x-2">
                {singleProduct.images &&
                  singleProduct.images?.slice(0, 4).map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="p-0.5 border  border-[#d7dee0] rounded-sm cursor-pointer"
                        onClick={() => setSPImageShowcase(img.url)}
                      >
                        <Image
                          className={cn("")}
                          src={img.url}
                          alt={`${singleProduct.name}`}
                          width={80}
                          height={80}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/*  */}
          <div className="sticky top-5 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
            {/* seller info */}
            <SellerInfo product={singleProduct} productType="single" />

            {/* price info and quantity */}
            <ProductAndQty product={singleProduct} />

            {/* add to cart button */}

            {user ? (
              <AddToCartButton
                setIsModalOpen={setIsModalOpen}
                productId={singleProduct.id}
                userName={user.username}
              />
            ) : (
              <AddToCartButton
                setIsModalOpen={setIsModalOpen}
                productId={singleProduct.id}
              />
            )}
          </div>
        </div>
        {/* ServiceHighlights */}
        <ServiceHighlights />
        {/* similar products carousel */}
        <SimilarProductsCarousel
          category={selectedCategory}
          subCategory={selectedSubCategory}
          product={matchedProductByOrder[0]}
        />
        {/* all spec and reviews */}
        <div className="relative flex flex-col my-10">
          {/* header */}
          <div className="sticky top-0 z-6 flex items-center  px-11 py-4 gap-x-10 text-[14px] bg-[#f3f8fd] border-b border-b-[#919ebc] text-[#919ebc]">
            <div>مشخصات فنی</div>
            <div>معرفی محصول</div>
            <div>نظرات کاربران</div>
          </div>
          <div className="relative flex gap-x-[50px] mt-8">
            <div className="flex flex-col w-full  min-h-500">
              {/* all spec */}
              <div className="flex flex-col gap-y-5 pt-4">
                <div className="flex items-center gap-x-3 mr-5">
                  <span className="size-3 rounded-full bg-custom-primary border border-[#919ebc]"></span>
                  <span className="text-xl font-medium">مشخصات فنی</span>
                </div>
                {/*All spec cards */}
                <div className="flex flex-col gap-y-2.5 ">
                  <AllMobileSpec product={singleProduct} />
                  <AllLaptopSpec product={singleProduct} />
                  <AllTabletSpec product={singleProduct} />
                </div>
              </div>
            </div>
            {/* aside */}
            <div className="sticky top-16 z-5 flex flex-col min-w-[400px] max-w-[400px] min-h-100 self-baseline p-6  rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
              {/* image title and color */}
              <div className="flex gap-x-5 mt-3">
                <div className="flex justify-center items-center self-baseline min-w-[100px]">
                  {SPMainImage && (
                    <Image
                      className={cn("")}
                      src={SPImageShowcase ? SPImageShowcase : SPMainImage.url}
                      alt={`${singleProduct.name}`}
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                {/* title and color */}
                <div className="flex flex-col">
                  {/* title */}
                  <ProductFaTitle
                    className="productlist-title text-[14px]/[20px] text-[#212121] font-normal"
                    label={singleProduct.label}
                  />

                  {/* product color */}
                  <div
                    className="flex justify-between items-center  self-baseline  
                   rounded-[6px] "
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center border border-[#d7dee0] 
                      rounded-full"
                      style={{
                        backgroundColor: getColorInfo(singleProduct.color).hex,
                      }}
                    ></div>
                    <span className="text-[12px] font-medium text-[#333333] ml-3 mr-2">
                      {getColorInfo(singleProduct.color).label}
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
                      {typeof singleProduct.tenant === "object" &&
                      singleProduct.tenant !== null
                        ? (singleProduct.tenant as Tenant).name
                        : "موبینو"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className=" w-5 h-5 flex justify-center items-center">
                      <Truck color="#3b5388" size={16} />
                    </span>
                    <span className="text-[#385086] mr-4 text-[14px]">
                      {typeof singleProduct.tenant === "object" &&
                      singleProduct.tenant !== null &&
                      (singleProduct.tenant as Tenant).name !== "موبینو"
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
              <ProductAndQty product={singleProduct} />
              {/* add to cart button */}
              {user ? (
                <AddToCartButton
                  setIsModalOpen={setIsModalOpen}
                  productId={singleProduct.id}
                  userName={user.username}
                />
              ) : (
                <AddToCartButton
                  setIsModalOpen={setIsModalOpen}
                  productId={singleProduct.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // *multiple products

  if (
    multipleProducts &&
    MPSelectedProduct &&
    selectedCategory &&
    selectedSubCategory
  ) {
    const TheProduct = MPProductShowcase ?? MPSelectedProduct;
    return (
      <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
        {/* modal */}
        {MPProductShowcase ? (
          <AddToCartBtnModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            product={MPProductShowcase}
          />
        ) : (
          <AddToCartBtnModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            product={MPSelectedProduct}
          />
        )}

        {/* bread crump */}
        <div className="mb-5">
          <BreadCrump
            activePage="product"
            productData={MPSelectedProduct}
            selectedCategoryData={selectedCategory}
            selectedSubCategoryData={selectedSubCategory}
            className="px-1"
          />
        </div>

        {/*  */}
        <div className="flex  gap-x-[50px] relative bg-[#fcfeff]">
          <div className="grid grid-cols-20  w-full min-h-[700px] border border-[#d3d8e4] rounded-xl">
            <div className="flex flex-col col-span-11 h-full p-10 pl-0 bg-[#fcfeff] rounded-r-xl">
              {/* product fa title */}
              <ProductFaTitle label={MPSelectedProduct.label} />
              {/* product en title */}
              <ProductEnTitle name={MPSelectedProduct.name} />

              <div className="self-baseline mb-10">
                {/* product rating */}
                <ProductRating rating={MPSelectedProduct.rating} />

                {/* product color */}
                <div className="flex flex-col self-baseline gap-y-[14px] pl-6 pb-4 border-b border-b-[#d3d8e4]">
                  <div className="flex items-center gap-x-2 ">
                    <span>رنگ :</span>
                    <span>
                      {MPProductShowcase
                        ? getColorInfo(MPProductShowcase.color).label
                        : getColorInfo(MPSelectedProduct.color).label}
                    </span>
                  </div>

                  <div className="flex flex-row-reverse gap-x-3 items-center">
                    {matchedAvailableProducts.map((p, index) => {
                      const isSelected = MPProductShowcase
                        ? p.color === MPProductShowcase.color
                        : p.color === MPSelectedProduct.color;
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
                              "flex justify-between items-center self-baseline p-[4px] border border-[#d7dee0]       rounded-[6px] ",
                              isSelected && "border-[#1b3570]"
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
                  <ProductMainSpec product={MPSelectedProduct} />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center gap-y-[70px] col-span-9  h-full pt-[38px] pr-[46px] pb-[42px] pl-[52px] rounded-l-xl">
              {/* like and share */}
              <div className="absolute"></div>
              {/* main image */}
              <div className="w-full flex items-center justify-center ">
                {MPMainImage && (
                  <div>
                    <Image
                      className={cn("")}
                      src={MPImageShowcase ? MPImageShowcase : MPMainImage.url}
                      alt={`${MPSelectedProduct.name}`}
                      width={400}
                      height={400}
                    />
                  </div>
                )}
              </div>
              {/* othet image */}
              <div className="w-full flex flex-row-reverse items-center justify-center gap-x-2">
                {MPSelectedProduct.images &&
                  MPSelectedProduct.images?.slice(0, 4).map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="p-0.5 border  border-[#d7dee0] rounded-sm cursor-pointer"
                        onClick={() => setMPImageShowcase(img.url)}
                      >
                        <Image
                          className={cn("")}
                          src={img.url}
                          alt={`${MPSelectedProduct.name}`}
                          width={80}
                          height={80}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="sticky top-5 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
            {/* seller info */}
            <SellerInfo
              product={MPSelectedProduct}
              productType="multiple"
              MPProductShowcase={MPProductShowcase}
            />

            {/* price info and quantity */}
            <ProductAndQty product={MPProductShowcase || MPSelectedProduct} />

            {/* add to cart button */}

            {MPProductShowcase ? (
              user ? (
                <AddToCartButton
                  productId={MPProductShowcase.id}
                  userName={user.username}
                  setIsModalOpen={setIsModalOpen}
                />
              ) : (
                <AddToCartButton
                  productId={MPProductShowcase.id}
                  setIsModalOpen={setIsModalOpen}
                />
              )
            ) : user ? (
              <AddToCartButton
                productId={MPSelectedProduct.id}
                userName={user.username}
                setIsModalOpen={setIsModalOpen}
              />
            ) : (
              <AddToCartButton
                productId={MPSelectedProduct.id}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>

        {/* ServiceHighlights */}
        <ServiceHighlights />
        {/* similar products carousel */}
        <SimilarProductsCarousel
          category={selectedCategory}
          subCategory={selectedSubCategory}
          product={matchedProductByOrder[0]}
        />
      </div>
    );
  }

  // *Loading

  return (
    <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
      {/* bread crump */}
      <div className="mb-5">
        <BreadCrump activePage="product" className="px-1" />
      </div>
    </div>
  );
};

export default ProductPage;
