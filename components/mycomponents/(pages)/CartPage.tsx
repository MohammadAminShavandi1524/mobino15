"use client";

import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  isDarkColor,
} from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/useCart";
import { Product, Tenant, User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  Copy,
  Minus,
  Percent,
  Plus,
  Store,
  Trash,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TomanLogo from "../TomanLogo";

const CartPage = () => {
  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  const { data: productsData } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );

  const {
    addProduct,
    clearAllCarts,
    clearCart,
    isProductInCart,
    productIds,
    removeProduct,
    toggleProduct,
    totalItems,
    userCarts,
    decreaseProductCount,
    increaseProductCount,
    getCartByUser,
  } = useCart(user?.username);

  const userProductIds: { productId: string; count: number }[] | null =
    user && getCartByUser(user?.username);

  const userCartProducts = productsData.docs.filter((product) =>
    userProductIds?.some((p) => p.productId === product.id)
  );

  const userCartProductsLength = userCartProducts.filter((p) => {
    return p.available;
  }).length;

  const productCount = (product: Product) => {
    return userProductIds?.find((id) => id.productId === product.id)
      ?.count as number;
  };

  return (
    <div className="relative w90 grid grid-cols-20 min-h-200  gap-x-[50px] pt-4 mt-4">
      <div className=" flex flex-col  col-span-15">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-x-3">
            <div className="text-xl font-medium">سبد خرید شما</div>
            {userCartProductsLength > 0 && (
              <div className="flex items-center gap-x-1 font-medium">
                <span className="text-[14px]">
                  {convertToPersianNumber(userCartProductsLength)}
                </span>
                <span className="text-[14px]">عدد کالا</span>
              </div>
            )}
          </div>

          <button className="flex items-center gap-x-1.25 text-[14px] cursor-pointer">
            <div>حذف کل سبد خرید</div>
            <div>
              <Trash size={20} />
            </div>
          </button>
        </div>
        {/* content */}
        <div className="flex flex-col min-h-200 mt-5 ">
          {userCartProducts.map((product, index) => {
            const mainImage = product?.images?.find((img) => img.isMain);

            const discountPercent =
              product.offPrice &&
              Math.ceil(
                ((product.price - product.offPrice) / product.price) * 100
              );

            return (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col p-10 pt-6 mb-6  rounded-xl border border-[#d3d8e4]",
                  product.quantity === 0 && "bg-[#f6f6f6]"
                )}
              >
                {/* remove product */}
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-0 left-0 z-5 flex justify-center items-center size-9 p-1.5 m-2 cursor-pointer rounded-full bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                >
                  <Trash2 size={20} color="#ef4056" />
                </button>
                {/*  */}
                <div className=" grid grid-cols-10 gap-x-10 ">
                  <div className="col-span-7 flex flex-col pt-4.5">
                    {/* product fa title */}
                    <div className="text-black text-[18px]/[36px] font-medium min-h-[112px]">
                      {product.label}
                    </div>
                    {/* seller info */}
                    <div className="flex flex-col gap-y-4">
                      {/* نام فروشنده */}
                      <div className="flex items-center gap-x-4">
                        <span>
                          <Store color="#385086" />
                        </span>
                        <span className="pb-0.5">
                          {typeof product.tenant === "object" &&
                          product.tenant !== null
                            ? (product.tenant as Tenant).name
                            : "موبینو"}
                        </span>
                      </div>
                      {/* گارانتی */}
                      <div className="flex items-center gap-x-4">
                        <span>
                          <BadgeCheck color="#385086" />
                        </span>
                        <span className="pb-0.5">18 ماه گارانتی شرکتی</span>
                      </div>
                      {/* ارسال */}
                      {product.quantity !== 0 && (
                        <div className="flex items-center gap-x-4">
                          <span>
                            <Truck color="#385086" />
                          </span>
                          <span className="pb-0.5">
                            {typeof product.tenant === "object" &&
                            product.tenant !== null &&
                            (product.tenant as Tenant).name !== "موبینو"
                              ? "موجود در انبار فروشنده(ارسال از 1 روز کاری بعد)"
                              : " موجود در انبار موبینو(ارسال فوری)"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* image */}
                  <div className="col-span-3 flex justify-center pt-10 ">
                    <Link href={`/products/${product.order}_${product.label}`}>
                      <Image
                        className={cn(
                          "self-baseline",
                          product.quantity === 0 && "opacity-50"
                        )}
                        src={mainImage?.url as string}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                    </Link>
                  </div>
                </div>

                {product.quantity === 0 ? (
                  <div className="flex items-center justify-between w-full mt-6">
                    <Link
                      className="flex items-center gap-x-3 text-[#223c78] border border-[#223c78] rounded-md px-3 py-3"
                      href={`/products/${product.order}_${product.label}`}
                    >
                      <span>
                        <Copy />
                      </span>
                      <span>نمایش کالاهای مشابه</span>
                      <span>
                        <ChevronLeft />
                      </span>
                    </Link>
                    <div className="flex justify-between min-w-90 pr-6 py-7 pl-8  bg-[#f6f6f6] border border-[#d3d8e4] rounded-md self-baseline-last">
                      <div className="flex justify-between items-center  p-[3px] border border-[#ced0d0] rounded-[5px] ">
                        <div
                          className="size-5 flex items-center justify-center border border-[#d7dee0] 
                                rounded-[6px] opacity-75"
                          style={{
                            backgroundColor: getColorInfo(product.color).hex,
                          }}
                        ></div>
                        <span className="text-[12px]  text-[#9c9d9e] ml-2 mr-1">
                          {getColorInfo(product.color).label}
                        </span>
                      </div>

                      <div className="flex items-center gap-x-2 ">
                        <div className="h-px w-10 bg-black"></div>
                        <div className="px-3">ناموجود</div>
                        <div className="h-px w-10 bg-black"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col  min-w-90 px-6 py-3 mt-6 border border-[#f0f0f0] rounded-md self-baseline-last">
                    {/* price */}

                    {product.offPrice ? (
                      <div className="flex flex-col w-full">
                        {/* discount percent and  price and offprice*/}
                        <div className="flex items-center justify-between">
                          {/* discount percent */}
                          <div className="flex items-center justify-center gap-x-0.5 bg-[#da1e28] text-white h-5 min-w-7 rounded-sm px-1">
                            <span>
                              <Percent strokeWidth={2.5} size={14} />
                            </span>
                            <span className="text-[12px] pt-[2px]">
                              {convertToPersianNumber(discountPercent || "33")}
                            </span>
                          </div>
                          {/* price and offprice */}
                          <div className="flex items-center gap-x-1">
                            <span className="text-[#919ebc] line-through text-[14px] pt-[]">
                              {(
                                product.price * productCount(product)
                              ).toLocaleString("fa-IR")}
                            </span>
                            <span className="text-xl font-medium mr-0.5">
                              {(
                                product.offPrice * productCount(product)
                              ).toLocaleString("fa-IR")}
                            </span>
                            <span>
                              <TomanLogo />
                            </span>
                          </div>
                        </div>
                        {/* color and count control */}
                        <div className="flex items-center justify-between mt-3">
                          {/* color */}
                          <div className="flex justify-between items-center  p-[3px] border border-[#1b3570] rounded-[5px] ">
                            <div
                              className="size-5 flex items-center justify-center border border-[#d7dee0] 
                                rounded-[6px]"
                              style={{
                                backgroundColor: getColorInfo(product.color)
                                  .hex,
                              }}
                            ></div>
                            <span className="text-[12px]  text-[#333333] ml-2 mr-1">
                              {getColorInfo(product.color).label}
                            </span>
                          </div>
                          {/* control Bar */}
                          <div className="relative flex items-center justify-between w-45">
                            {/* increment */}
                            <button
                              onClick={() => increaseProductCount(product.id)}
                              disabled={
                                productCount(product) === product.quantity
                              }
                              className="flex justify-center items-center size-9 rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:opacity-50
                              cursor-pointer disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:cursor-default"
                            >
                              <Plus size={22} color="#385086" />
                            </button>
                            {/* count */}
                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <span className="text-xl">
                                {convertToPersianNumber(
                                  productCount(product) as number
                                )}
                              </span>
                              {productCount(product) === product.quantity && (
                                <span className="text-[12px] text-[#c0c2c5]">
                                  حداکثر
                                </span>
                              )}
                            </div>
                            {/* remove or decreace */}
                            <button
                              onClick={() =>
                                productCount(product) === 1
                                  ? removeProduct(product.id)
                                  : decreaseProductCount(product.id)
                              }
                              className="flex justify-center items-center size-9 rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)] cursor-pointer"
                            >
                              {productCount(product) === 1 ? (
                                <Trash2 size={20} color="#ef4056" />
                              ) : (
                                <Minus size={20} color="#385086" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col  w-full">
                        {/* price  */}
                        <div className="flex items-center self-baseline-last gap-x-1">
                          <span className="text-xl font-medium">
                            {(
                              product.price * productCount(product)
                            ).toLocaleString("fa-IR")}
                          </span>
                          <span>
                            <TomanLogo />
                          </span>
                        </div>
                        {/* color and count control */}
                        <div className="flex items-center justify-between mt-3">
                          {/* color */}
                          <div className="flex justify-between items-center  p-[3px] border border-[#1b3570] rounded-[5px] cursor-pointer">
                            <div
                              className="size-4 flex items-center justify-center border border-[#d7dee0] 
                                rounded-[6px]"
                              style={{
                                backgroundColor: getColorInfo(product.color)
                                  .hex,
                              }}
                            ></div>
                            <span className="text-[12px]  text-[#333333] ml-2 mr-1">
                              {getColorInfo(product.color).label}
                            </span>
                          </div>
                          {/* control Bar */}
                          <div className="relative flex items-center justify-between w-45">
                            {/* increment */}
                            <button
                              onClick={() => increaseProductCount(product.id)}
                              disabled={
                                productCount(product) === product.quantity
                              }
                              className="flex justify-center items-center size-9 rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:opacity-50
                              cursor-pointer disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:cursor-default"
                            >
                              <Plus size={22} color="#385086" />
                            </button>
                            {/* count */}
                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <span className="text-xl">
                                {convertToPersianNumber(
                                  productCount(product) as number
                                )}
                              </span>
                              {productCount(product) === product.quantity && (
                                <span className="text-[12px] text-[#c0c2c5]">
                                  حداکثر
                                </span>
                              )}
                            </div>
                            {/* remove or decreace */}
                            <button
                              onClick={() =>
                                productCount(product) === 1
                                  ? removeProduct(product.id)
                                  : decreaseProductCount(product.id)
                              }
                              className="flex justify-center items-center size-9 rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)] cursor-pointer"
                            >
                              {productCount(product) === 1 ? (
                                <Trash2 size={20} color="#ef4056" />
                              ) : (
                                <Minus size={20} color="#385086" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* صورتحساب */}
      <div className="sticky top-5 col-span-5 flex flex-col min-w-[400px] self-baseline">
        صورتحساب
      </div>
    </div>
  );
};
export default CartPage;
