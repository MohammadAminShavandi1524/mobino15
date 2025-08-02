"use client";

import dynamic from "next/dynamic";

import LaptopMainSpec from "@/components/mycomponents/(productMainSpec)/LaptopMainSpec";
import MobileMainSpec from "@/components/mycomponents/(productMainSpec)/MobileMainSpec";
import BreadCrump from "@/components/mycomponents/BreadCrump";
import ProductAndQty from "@/components/mycomponents/ProductAndQty";
import { cn, getColorInfo, isDarkColor } from "@/lib/utils";
import { Category, Product, Tenant, User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Check,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Store,
  Truck,
} from "lucide-react";
import Image from "next/image";

import { useState } from "react";

const AddToCartButton = dynamic(
  () => import("../AddToCartButton").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface ProductPageProps {
  product: string;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const param = decodeURIComponent(product as string).split("_")[1];
  const orderParam = decodeURIComponent(product as string).split("_")[0];

  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  console.log(user?.username);

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const matchedProductByOrder =
    productsData?.docs.filter((p) => p.order === Number(orderParam)) || [];

  const matchedProducts =
    productsData?.docs.filter((p) => p.label === param) || [];

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

  // *

  // * نا موجود

  if (
    matchedProductByOrder.length > 0 &&
    matchedProductByOrder[0].available === false
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
        <div className="flex  gap-x-[50px] relative bg-[#fcfeff]">
          <div className="grid grid-cols-20  w-full min-h-[700px] border border-[#d3d8e4] rounded-xl">
            <div className="flex flex-col col-span-11 h-full p-10 pl-0 bg-[#fcfeff] rounded-r-xl">
              {/* product fa title */}
              <div className="text-black text-[20px]/[40px] font-medium mb-4">
                {singleProduct.label}
              </div>
              {/* product en title */}
              <div className="text-[#385086] text-[14px] mb-4">
                {singleProduct.name}
              </div>

              <div className="self-baseline mb-10">
                {/* product rating */}
                <div className="flex items-center self-baseline gap-x-0.5 pl-6  pb-4 border-b border-b-[#d3d8e4] mb-4">
                  <div className="ml-0.5">امتیاز کاربران :</div>
                  <div className="pb-0.5">
                    <Star color="#f1c21b" size={16} />
                  </div>
                  <div className=" text-[14px]">{singleProduct.rating}</div>
                </div>

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
                  {/* mobile */}

                  <MobileMainSpec product={singleProduct} />

                  {/* laptop */}

                  <LaptopMainSpec product={singleProduct} />
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
          <div className="sticky top-0 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
            {/* seller info */}
            <div className="pr-2 pb-2 font-medium">فروشنده</div>

            <div className="flex flex-col gap-x-3 w-full text-[14px] bg-[#f3f8fd] py-3 px-4 rounded-lg">
              <div className="pb-3 border-b border-b-white">
                <div className="flex items-center pb-2">
                  <span className="text-[#385086]">
                    <Store size={20} />
                  </span>

                  <span className="mr-4">
                    {typeof singleProduct.tenant === "object" &&
                    singleProduct.tenant !== null
                      ? (singleProduct.tenant as Tenant).name
                      : "موبینو"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-[#385086] w-5 h-5 flex justify-center items-center">
                    <Truck  size={16} />
                  </span>
                  <span className="text-[#385086] mr-4 ">
                    {typeof singleProduct.tenant === "object" &&
                    singleProduct.tenant !== null &&
                    (singleProduct.tenant as Tenant).name !== "موبینو"
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

            {/* price info and quantity */}
            <ProductAndQty product={singleProduct} />

            {/* add to cart button */}

            {user ? (
              <AddToCartButton productId={singleProduct.id}  userName={user.username} />
            ) : (
              <AddToCartButton productId={singleProduct.id} />
            )}
          </div>
        </div>
        {/*  */}
        <div></div>
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
    return (
      <div className="w90 flex flex-col mt-4 max-w-[1600px] px-[10px]">
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
              <div className="text-black text-[20px]/[40px] font-medium mb-4">
                {MPSelectedProduct.label}
              </div>
              {/* product en title */}
              <div className="text-[#385086] text-[14px] mb-4">
                {MPSelectedProduct.name}
              </div>

              <div className="self-baseline mb-10">
                {/* product rating */}
                <div className="flex items-center max-w-fit self-baseline gap-x-0.5 pl-6  pb-4 border-b border-b-[#d3d8e4] mb-4">
                  <div className="ml-0.5">امتیاز کاربران :</div>
                  <div className="pb-0.5">
                    <Star color="#f1c21b" size={16} />
                  </div>
                  <div className=" text-[14px]">{MPSelectedProduct.rating}</div>
                </div>

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
                  {/* mobile */}

                  <MobileMainSpec product={MPSelectedProduct} />

                  {/* laptop */}

                  <LaptopMainSpec product={MPSelectedProduct} />
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
          <div className="sticky top-0 flex flex-col min-w-[400px] self-baseline p-6 border border-[#d3d8e4] rounded-[16px]">
            {/* seller info */}
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
                      : typeof MPSelectedProduct.tenant === "object" &&
                          MPSelectedProduct.tenant !== null
                        ? (MPSelectedProduct.tenant as Tenant).name
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
                      : typeof MPSelectedProduct.tenant === "object" &&
                          MPSelectedProduct.tenant !== null &&
                          (MPSelectedProduct.tenant as Tenant).name !== "موبینو"
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

            {/* price info and quantity */}
            {MPProductShowcase ? (
              <ProductAndQty product={MPProductShowcase} />
            ) : (
              <ProductAndQty product={MPSelectedProduct} />
            )}

            {/* add to cart button */}

            {MPProductShowcase ? (
              user ? (
                <AddToCartButton
                  productId={MPProductShowcase.id}
                  userName={user.username}
                />
              ) : (
                <AddToCartButton productId={MPProductShowcase.id} />
              )
            ) : user ? (
              <AddToCartButton
                productId={MPSelectedProduct.id}
                 userName={user.username}
              />
            ) : (
              <AddToCartButton productId={MPSelectedProduct.id} />
            )}
          </div>
        </div>
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
