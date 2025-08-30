"use client";

import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  getDiscountPercent,
  getMainImageUrl,
} from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/useCart";
import { Product, Tenant, User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  BadgePercent,
  ChevronLeft,
  Copy,
  Divide,
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

import { useState } from "react";

const CartPage = () => {
  const [isRemoveProductHovered, setIsRemoveProductHovered] = useState("");

  const trpc = useTRPC();

  const user: User | null = useSuspenseQuery(trpc.auth.session.queryOptions())
    .data.user;

  const {
    clearCart,
    removeProduct,
    decreaseProductCount,
    increaseProductCount,
    getCartByUser,
  } = useCart(user?.username);

  const userProductIds: { productId: string; count: number }[] =
    getCartByUser();

  const productIds: string[] = [];
  userProductIds.flatMap((o) => productIds.push(o.productId));

  const userCartProducts = useQuery(
    trpc.products.getCartProducts.queryOptions({ productIds: productIds }),
  ).data?.docs;

  const userCartProductsLength = userCartProducts?.filter((p) => {
    return p.available;
  }).length;

  const productCount = (product: Product) => {
    return userProductIds?.find((id) => id.productId === product.id)
      ?.count as number;
  };

  // *** قیمت کالا ها
  const userAvailableCartProducts = userCartProducts?.filter(
    (product) => product.quantity > 0 && product.available,
  );

  const productPrices = userAvailableCartProducts?.reduce((acc, curr) => {
    const count =
      userProductIds?.find((p) => p.productId === curr.id)?.count ?? 0;
    return acc + curr.price * count;
  }, 0) as number;

  const productOffPrices = userAvailableCartProducts?.reduce((acc, curr) => {
    const count =
      userProductIds?.find((p) => p.productId === curr.id)?.count ?? 0;

    if (curr.offPrice) {
      return acc + (curr.offPrice ?? 0) * count;
    } else {
      return acc + curr.price * count;
    }
  }, 0) as number;

  const ProfitFromPurchase = productPrices - productOffPrices;
  const ProfitFromPurchaseDiscount = Math.ceil(
    ((productPrices - productOffPrices) / productPrices) * 100,
  );

  // *** تعداد ایتم های سبد خرید

  const availableProductIds = new Set(
    userCartProducts
      ?.filter((product) => product.available && product.quantity > 0)
      .map((product) => product.id),
  );

  const cartItemCount =
    userProductIds?.reduce((acc, curr) => {
      if (availableProductIds.has(curr.productId)) {
        return acc + curr.count;
      }
      return acc;
    }, 0) ?? 0;

  // **************************************************************
  // this loading and Cart_page loading must be the same
  if (userCartProductsLength === undefined) {
    return <>loading</>;
  }
  if (userCartProductsLength === 0)
    return (
      <div className="relative mb-6 flex max-w-[1920px] flex-col px-6 sm:px-8 md:px-12 lg:mx-auto lg:w-[90%] lg:px-20">
        <div className="s:my-3 s:text-lg mt-3 mb-2 px-4 text-base lg:text-xl">
          سبد خرید
        </div>
        <div className="flex min-h-111 w-full flex-col items-center rounded-xl border border-[#d3d8e4] p-10 pt-0 lg:min-h-135">
          <div className="3xl:size-120 s:size-70 xss:size-60 relative size-55 md:size-80 xl:size-90 2xl:size-110">
            <Image
              className="rounded-xl"
              src="/empty-cart.png"
              alt="empty_cart"
              fill
            />
          </div>
          <div className="s:text-lg text-base font-semibold text-[#333333] lg:text-xl">
            سبد خرید شما خالیه!
          </div>
          <div className="s:text-base mt-3 mb-5 text-sm text-[#666666] max-sm:text-center lg:text-lg xl:mt-4 xl:mb-6">
            برای مشاهده تخفیف‌های امروز، روی لینک زیر کلیک کنید.
          </div>
          <Link
            className="flex items-center gap-x-1 text-sm text-[#223c78] lg:text-base"
            href={"/afino"}
          >
            <span className="max-s:hidden">
              <BadgePercent size={22} color="#14a0de" />
            </span>
            <span className="s:hidden">
              <BadgePercent size={20} color="#14a0de" />
            </span>
            <span className="s:text-base text-sm">بیشترین تخفیف های امروز</span>
            <span className="max-s:hidden">
              <ChevronLeft size={22} />
            </span>
            <span className="s:hidden">
              <ChevronLeft size={18} />
            </span>
          </Link>
        </div>
      </div>
    );

  if (userCartProductsLength) {
    return (
      <div className="3xl:gap-x-10 s:px-6 relative mt-4 flex max-w-[1920px] grid-cols-20 flex-col gap-x-8 gap-y-10 pt-4 sm:px-6 md:px-8 lg:mx-auto lg:w-[90%] lg:px-8 xl:flex-row xl:px-10 2xl:px-20">
        {/* main content */}
        <div className="flex flex-col">
          {/* header */}
          <div className="s:px-4 max-s:border-b-6 max-s:border-b-[#d3d8e4] max-s:border-double xss:px-6 max-s:pb-4 flex items-center justify-between px-4">
            <div className="flex items-center gap-x-2 md:gap-x-3">
              <div className="text-base font-medium max-md:pt-0.5 md:text-lg 2xl:text-xl">
                سبد خرید شما
              </div>
              {userCartProductsLength > 0 && (
                <div className="flex items-center gap-x-1 text-xs font-medium 2xl:text-sm">
                  <span className="max-md:text-custom-primary max-md:border-custom-primary max-md:flex max-md:size-6 max-md:items-center max-md:justify-center max-md:rounded-full max-md:border max-md:pt-0.5 max-md:text-base max-md:font-medium">
                    {convertToPersianNumber(userCartProductsLength)}
                  </span>
                  <span className="max-md:hidden">عدد کالا</span>
                </div>
              )}
            </div>

            <button
              onClick={() => clearCart()}
              className="s:text-[14px] flex cursor-pointer items-center gap-x-1.25 text-xs"
            >
              <div>حذف کل سبد خرید</div>
              <div>
                <span className="max-s:hidden">
                  <Trash color="#ef4056" size={20} />
                </span>
                <span className="s:hidden">
                  <Trash color="#ef4056" size={16} />
                </span>
                <span></span>
              </div>
            </button>
          </div>

          {/* content */}
          <div className="mt-4 flex flex-col gap-y-6">
            {userCartProducts.map((product, index) => {
              const mainImageUrl = getMainImageUrl(product);

              const discountPercent = getDiscountPercent(product);

              return (
                <div
                  key={index}
                  className={cn(
                    "s:border s:rounded-xl s:border-[#d3d8e4] s:p-4 relative flex flex-col border-x-0 border-b-6 border-double border-b-[#d3d8e4] p-4 pb-6 max-sm:items-center sm:p-6 sm:pt-4 md:p-10 md:pt-6",
                    product.quantity === 0 && "bg-[#f6f6f6]",
                  )}
                >
                  {/* remove product absolute*/}

                  <button
                    onMouseEnter={() => setIsRemoveProductHovered(product.id)}
                    onMouseLeave={() => setIsRemoveProductHovered("")}
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-0 left-0 z-5 m-2 hidden size-8 cursor-pointer items-center justify-center rounded-full bg-white p-1.5 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] sm:flex md:size-9"
                  >
                    <span className="max-md:hidden">
                      <Trash2 size={20} color="#ef4056" />
                    </span>
                    <span className="md:hidden">
                      <Trash2 size={16} color="#ef4056" />
                    </span>
                  </button>

                  {/* remove product tooltip */}
                  {isRemoveProductHovered === product.id && (
                    <div className="absolute top-12 left-[8px] flex items-center rounded-full bg-white px-3.5 py-1.75 text-sm text-black shadow-[0px_2px_4px_rgba(0,0,0,0.2)] md:top-[55px]">
                      حذف
                    </div>
                  )}

                  {/* upper content */}
                  <div className="s:px-0 xss:pr-2 xss:pl-1 s:gap-x-6 xss:gap-x-4 flex flex-row-reverse gap-x-4 sm:grid sm:grid-cols-20 sm:gap-x-0">
                    {/* title and seller info */}
                    <div className="flex flex-col pt-4 sm:col-span-11 sm:pt-4.5 2xl:col-span-13">
                      {/* product fa title */}
                      <div className="productlist-mobiletitle mb-4 min-h-20 text-[14px]/[28px] font-medium text-black sm:min-h-[112px] sm:text-[16px]/[32px] 2xl:text-[18px]/[36px]">
                        {product.label}
                      </div>
                      {/* seller info */}
                      <div className="flex flex-col gap-y-3 sm:gap-y-4">
                        {/* نام فروشنده */}
                        <div className="flex items-center gap-x-2 sm:gap-x-2.5 2xl:gap-x-3.5">
                          <span className="max-2xl:hidden">
                            <Store color="#385086" size={24} />
                          </span>
                          <span className="max-sm:hidden 2xl:hidden">
                            <Store color="#385086" size={20} />
                          </span>
                          <span className="sm:hidden">
                            <Store color="#385086" size={18} />
                          </span>
                          <span className="pb-0.5 text-xs sm:text-sm 2xl:text-base">
                            {typeof product.tenant === "object" &&
                            product.tenant !== null
                              ? (product.tenant as Tenant).name
                              : "موبینو"}
                          </span>
                        </div>
                        {/* گارانتی */}
                        <div className="flex items-center gap-x-2 sm:gap-x-2.5 2xl:gap-x-3.5">
                          <span className="max-2xl:hidden">
                            <BadgeCheck color="#385086" size={24} />
                          </span>
                          <span className="max-sm:hidden 2xl:hidden">
                            <BadgeCheck color="#385086" size={20} />
                          </span>
                          <span className="sm:hidden">
                            <BadgeCheck color="#385086" size={18} />
                          </span>
                          <span className="pb-0.5 text-xs sm:text-sm 2xl:text-base">
                            {convertToPersianNumber(18)} ماه گارانتی شرکتی
                          </span>
                        </div>
                        {/* ارسال */}
                        {product.quantity !== 0 && (
                          <div className="flex items-center gap-x-2 sm:gap-x-2.5 2xl:gap-x-3.5">
                            <span className="max-2xl:hidden">
                              <Truck color="#385086" size={24} />
                            </span>
                            <span className="max-sm:hidden 2xl:hidden">
                              <Truck color="#385086" size={20} />
                            </span>
                            <span className="sm:hidden">
                              <Truck color="#385086" size={18} />
                            </span>
                            <span className="pb-0.5 text-xs sm:text-sm 2xl:text-base">
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
                    <div className="3xl:pr-0 mlg:pl-[68px] s:pt-0 flex justify-end pt-4 sm:col-span-9 sm:pl-10 md:pt-8 md:pl-[50px] lg:pt-10 xl:justify-center xl:pr-[24px] xl:pl-0 2xl:col-span-7 2xl:pr-[22px]">
                      <Link
                        href={`/products/${product.order}_${product.label}`}
                      >
                        <div className="xss:size-32 relative size-24 sm:size-45 md:size-50">
                          <Image
                            className={cn(
                              "self-baseline",
                              product.quantity === 0 && "opacity-50",
                            )}
                            src={mainImageUrl}
                            alt={product.name}
                            fill
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/* price and availablity */}
                  {product.quantity === 0 ? (
                    <div className="mt-6 flex w-full items-center justify-between pl-[10px] xl:pl-0">
                      <Link
                        className="flex items-center gap-x-3 rounded-md border border-[#223c78] px-3 py-3 text-[#223c78]"
                        href={`/products/${product.order}_${product.label}`}
                      >
                        <span className="max-2xl:hidden">
                          <Copy size={24} />
                        </span>
                        <span className="2xl:hidden">
                          <Copy size={20} />
                        </span>
                        <span className="text-sm 2xl:text-base">
                          نمایش کالاهای مشابه
                        </span>
                        <span className="max-2xl:hidden">
                          <ChevronLeft size={24} />
                        </span>
                        <span className="2xl:hidden">
                          <ChevronLeft size={20} />
                        </span>
                      </Link>

                      <div className="flex min-w-70 justify-between self-baseline-last rounded-md border border-[#d3d8e4] bg-[#f6f6f6] py-5 pr-4 pl-6 md:min-w-80 2xl:min-w-90 2xl:py-7 2xl:pr-6 2xl:pl-8">
                        <div className="flex items-center justify-between rounded-[5px] border border-[#ced0d0] p-[3px]">
                          <div
                            className="flex size-4 items-center justify-center rounded-[6px] border border-[#d7dee0] opacity-75 2xl:size-5"
                            style={{
                              backgroundColor: getColorInfo(product.color).hex,
                            }}
                          ></div>
                          <span className="mr-1 ml-2 text-xs text-[#9c9d9e] 2xl:text-[12px]">
                            {getColorInfo(product.color).label}
                          </span>
                        </div>

                        <div className="flex items-center gap-x-1.5 2xl:gap-x-2">
                          <div className="h-px w-8 bg-black 2xl:w-10"></div>
                          <div className="px-3 text-sm 2xl:text-base">
                            ناموجود
                          </div>
                          <div className="h-px w-8 bg-black 2xl:w-10"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 flex min-w-80 flex-col rounded-md border border-[#f0f0f0] px-6 py-3 max-sm:w-full max-sm:shadow-sm sm:mt-6 sm:ml-[10px] sm:self-baseline-last xl:ml-0 2xl:min-w-90">
                      {/* price */}

                      {product.offPrice ? (
                        <div className="flex w-full flex-col">
                          {/* discount percent and  price and offprice*/}
                          <div className="flex items-center justify-between">
                            {/* discount percent */}
                            <div className="flex h-5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                              <span className="max-md:hidden">
                                <Percent strokeWidth={2.5} size={14} />
                              </span>
                              <span className="md:hidden">
                                <Percent strokeWidth={2.5} size={12} />
                              </span>
                              <span className="pt-[1.75] text-xs md:pt-[2px] md:text-[12px]">
                                {convertToPersianNumber(
                                  discountPercent || "33",
                                )}
                              </span>
                            </div>
                            {/* price and offprice */}
                            <div className="flex items-center gap-x-1">
                              <span className="text-xs text-[#919ebc] line-through md:text-[14px]">
                                {(
                                  product.price * productCount(product)
                                ).toLocaleString("fa-IR")}
                              </span>
                              <span className="mr-0.5 text-base font-medium md:text-xl">
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
                          <div className="mt-3 flex items-center justify-between">
                            {/* color */}
                            <div className="flex items-center justify-between rounded-[5px] border border-[#14a0de] p-[3px]">
                              <div
                                className="flex size-4 items-center justify-center rounded-[6px] border border-[#d7dee0] md:size-5"
                                style={{
                                  backgroundColor: getColorInfo(product.color)
                                    .hex,
                                }}
                              ></div>
                              <span className="mr-1 ml-2 text-xs text-[#333333] md:text-[12px]">
                                {getColorInfo(product.color).label}
                              </span>
                            </div>

                            {/* control Bar */}
                            <div className="relative flex w-37.5 items-center justify-between md:w-45">
                              {/* increment */}
                              <button
                                onClick={() => increaseProductCount(product.id)}
                                disabled={
                                  productCount(product) >= product.quantity
                                }
                                className="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:cursor-default disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:opacity-50 md:size-9"
                              >
                                <span className="max-md:hidden">
                                  <Plus size={22} color="#385086" />
                                </span>
                                <span className="md:hidden">
                                  <Plus size={18} color="#385086" />
                                </span>
                              </button>
                              {/* count */}
                              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                <span className="text-base md:text-xl">
                                  {convertToPersianNumber(
                                    productCount(product) as number,
                                  )}
                                </span>
                                {productCount(product) === product.quantity && (
                                  <span className="text-xs text-[#c0c2c5] md:text-[12px]">
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
                                className="flex size-8 cursor-pointer items-center justify-center rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)] md:size-9"
                              >
                                {productCount(product) === 1 ? (
                                  <>
                                    <span className="max-md:hidden">
                                      <Trash2 size={20} color="#ef4056" />
                                    </span>
                                    <span className="md:hidden">
                                      <Trash2 size={16} color="#ef4056" />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="max-md:hidden">
                                      <Minus size={20} color="#385086" />
                                    </span>
                                    <span className="md:hidden">
                                      <Minus size={16} color="#385086" />
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full flex-col">
                          {/* price  */}
                          <div className="flex items-center gap-x-1 self-baseline-last">
                            <span className="text-base font-medium md:text-xl">
                              {(
                                product.price * productCount(product)
                              ).toLocaleString("fa-IR")}
                            </span>
                            <span>
                              <TomanLogo />
                            </span>
                          </div>
                          {/* color and count control */}
                          <div className="mt-3 flex items-center justify-between">
                            {/* color */}
                            <div className="flex items-center justify-between rounded-[5px] border border-[#14a0de] p-[3px]">
                              <div
                                className="flex size-4 items-center justify-center rounded-[6px] border border-[#d7dee0] md:size-5"
                                style={{
                                  backgroundColor: getColorInfo(product.color)
                                    .hex,
                                }}
                              ></div>
                              <span className="mr-1 ml-2 text-xs text-[#333333] md:text-[12px]">
                                {getColorInfo(product.color).label}
                              </span>
                            </div>
                            {/* control Bar */}
                            <div className="relative flex w-37.5 items-center justify-between md:w-45">
                              {/* increment */}
                              <button
                                onClick={() => increaseProductCount(product.id)}
                                disabled={
                                  productCount(product) >= product.quantity
                                }
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:cursor-default disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:opacity-50"
                              >
                                <span className="max-md:hidden">
                                  <Plus size={22} color="#385086" />
                                </span>
                                <span className="md:hidden">
                                  <Plus size={18} color="#385086" />
                                </span>
                              </button>
                              {/* count */}
                              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                <span className="text-base md:text-xl">
                                  {convertToPersianNumber(
                                    productCount(product) as number,
                                  )}
                                </span>
                                {productCount(product) === product.quantity && (
                                  <span className="text-xs text-[#c0c2c5] md:text-[12px]">
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
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                              >
                                {productCount(product) === 1 ? (
                                  <>
                                    <span className="max-md:hidden">
                                      <Trash2 size={20} color="#ef4056" />
                                    </span>
                                    <span className="md:hidden">
                                      <Trash2 size={16} color="#ef4056" />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="max-md:hidden">
                                      <Minus size={20} color="#385086" />
                                    </span>
                                    <span className="md:hidden">
                                      <Minus size={16} color="#385086" />
                                    </span>
                                  </>
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
        {/* aside */}
        <div className="flex flex-col self-baseline max-xl:w-full xl:sticky xl:top-5 xl:min-w-90 2xl:min-w-100">
          <div className="mr-3 text-lg font-medium 2xl:text-xl">صورتحساب</div>
          <div className="mt-4 flex flex-col rounded-lg p-8 pb-6 max-xl:bg-[#f6f6f6] xl:shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
            <div className="my-3 flex items-center justify-between">
              <div className="flex items-center gap-x-1 text-[12px]">
                <span>قیمت کالاها</span>
                <span>{`(${convertToPersianNumber(cartItemCount)})`}</span>
              </div>
              <div className="flex items-center gap-x-0.5">
                <span className="text-[18px]">
                  {productPrices.toLocaleString("fa-IR")}
                </span>
                <span>
                  <TomanLogo />
                </span>
              </div>
            </div>

            <div className="my-3 flex items-center justify-between">
              <div className="text-[14px]">جمع سبد خرید</div>
              <div className="flex items-center gap-x-0.5">
                <span className="">
                  {productOffPrices > 0
                    ? productOffPrices.toLocaleString("fa-IR")
                    : productPrices.toLocaleString("fa-IR")}
                </span>
                <span>
                  <TomanLogo />
                </span>
              </div>
            </div>

            {ProfitFromPurchase > 0 && (
              <div className="my-3 flex items-center justify-between text-[14px] text-[#2e7b32]">
                <div>
                  <span>سود شما از خرید</span>
                </div>
                <div className="flex items-center gap-x-0.5">
                  <span className="ml-1">{`(${convertToPersianNumber(ProfitFromPurchaseDiscount)}%)`}</span>
                  <span>{ProfitFromPurchase.toLocaleString("fa-IR")}</span>
                  <span>
                    <TomanLogo />
                  </span>
                </div>
              </div>
            )}

            <button
              disabled={false}
              className="bg-custom-primary mt-4 flex h-12 w-full cursor-not-allowed items-center justify-center rounded-lg text-white opacity-90 sm:text-base md:h-13 lg:text-xl"
            >
              ادامه خرید
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CartPage;
