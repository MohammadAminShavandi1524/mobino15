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
      <div className="w90 3xl:px-24 relative mb-6 flex flex-col">
        <div className="my-3 px-4 text-xl">سبد خرید</div>
        <div className="flex min-h-[540px] w-full flex-col items-center rounded-xl border border-[#d3d8e4] p-10 pt-0">
          <Image
            className="rounded-xl"
            src="/empty-cart.png"
            alt="empty_cart"
            width={500}
            height={500}
          />
          <div className="text-xl font-semibold text-[#333333]">
            سبد خرید شما خالیه!
          </div>
          <div className="mt-4 mb-6 text-lg text-[#666666]">
            برای مشاهده تخفیف‌های امروز، روی لینک زیر کلیک کنید.
          </div>
          <Link className="flex items-center gap-x-1 text-[#223c78]" href={""}>
            <span>
              <BadgePercent color="#14a0de" />
            </span>
            <span>بیشترین تخفیف های امروز</span>
            <span>
              <ChevronLeft size={22} />
            </span>
          </Link>
        </div>
      </div>
    );
  if (userCartProductsLength) {
    return (
      <div className="w90 3xl:px-24 relative mt-4 grid grid-cols-20 gap-x-[50px] pt-4">
        <div className="col-span-15 flex flex-col">
          <div className="flex items-center justify-between px-4">
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

            <button
              onClick={() => clearCart()}
              className="flex cursor-pointer items-center gap-x-1.25 text-[14px]"
            >
              <div>حذف کل سبد خرید</div>
              <div>
                <Trash size={20} />
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
                    "relative flex flex-col rounded-xl border border-[#d3d8e4] p-10 pt-6",
                    product.quantity === 0 && "bg-[#f6f6f6]",
                  )}
                >
                  {/* remove product */}

                  <button
                    onMouseEnter={() => setIsRemoveProductHovered(product.id)}
                    onMouseLeave={() => setIsRemoveProductHovered("")}
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-0 left-0 z-5 m-2 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white p-1.5 shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                  >
                    <Trash2 size={20} color="#ef4056" />
                  </button>

                  {/* remove product tooltip */}
                  {isRemoveProductHovered === product.id && (
                    <div className="absolute top-[55px] left-[8px] flex items-center rounded-full bg-white px-3.5 py-1.75 text-sm text-black shadow-[0px_2px_4px_rgba(0,0,0,0.2)]">
                      حذف
                    </div>
                  )}

                  {/*  */}
                  <div className="grid grid-cols-10 gap-x-10">
                    <div className="col-span-7 flex flex-col pt-4.5">
                      {/* product fa title */}
                      <div className="min-h-[112px] text-[18px]/[36px] font-medium text-black">
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
                          <span className="pb-0.5">
                            {convertToPersianNumber(18)} ماه گارانتی شرکتی
                          </span>
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
                    <div className="col-span-3 flex justify-center pt-10">
                      <Link
                        href={`/products/${product.order}_${product.label}`}
                      >
                        <Image
                          className={cn(
                            "self-baseline",
                            product.quantity === 0 && "opacity-50",
                          )}
                          src={mainImageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                        />
                      </Link>
                    </div>
                  </div>

                  {product.quantity === 0 ? (
                    <div className="mt-6 flex w-full items-center justify-between">
                      <Link
                        className="flex items-center gap-x-3 rounded-md border border-[#223c78] px-3 py-3 text-[#223c78]"
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
                      <div className="flex min-w-90 justify-between self-baseline-last rounded-md border border-[#d3d8e4] bg-[#f6f6f6] py-7 pr-6 pl-8">
                        <div className="flex items-center justify-between rounded-[5px] border border-[#ced0d0] p-[3px]">
                          <div
                            className="flex size-5 items-center justify-center rounded-[6px] border border-[#d7dee0] opacity-75"
                            style={{
                              backgroundColor: getColorInfo(product.color).hex,
                            }}
                          ></div>
                          <span className="mr-1 ml-2 text-[12px] text-[#9c9d9e]">
                            {getColorInfo(product.color).label}
                          </span>
                        </div>

                        <div className="flex items-center gap-x-2">
                          <div className="h-px w-10 bg-black"></div>
                          <div className="px-3">ناموجود</div>
                          <div className="h-px w-10 bg-black"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 flex min-w-90 flex-col self-baseline-last rounded-md border border-[#f0f0f0] px-6 py-3">
                      {/* price */}

                      {product.offPrice ? (
                        <div className="flex w-full flex-col">
                          {/* discount percent and  price and offprice*/}
                          <div className="flex items-center justify-between">
                            {/* discount percent */}
                            <div className="flex h-5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                              <span>
                                <Percent strokeWidth={2.5} size={14} />
                              </span>
                              <span className="pt-[2px] text-[12px]">
                                {convertToPersianNumber(
                                  discountPercent || "33",
                                )}
                              </span>
                            </div>
                            {/* price and offprice */}
                            <div className="flex items-center gap-x-1">
                              <span className="pt-[] text-[14px] text-[#919ebc] line-through">
                                {(
                                  product.price * productCount(product)
                                ).toLocaleString("fa-IR")}
                              </span>
                              <span className="mr-0.5 text-xl font-medium">
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
                                className="flex size-5 items-center justify-center rounded-[6px] border border-[#d7dee0]"
                                style={{
                                  backgroundColor: getColorInfo(product.color)
                                    .hex,
                                }}
                              ></div>
                              <span className="mr-1 ml-2 text-[12px] text-[#333333]">
                                {getColorInfo(product.color).label}
                              </span>
                            </div>
                            {/* control Bar */}
                            <div className="relative flex w-45 items-center justify-between">
                              {/* increment */}
                              <button
                                onClick={() => increaseProductCount(product.id)}
                                disabled={
                                  productCount(product) >= product.quantity
                                }
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:cursor-default disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:opacity-50"
                              >
                                <Plus size={22} color="#385086" />
                              </button>
                              {/* count */}
                              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                <span className="text-xl">
                                  {convertToPersianNumber(
                                    productCount(product) as number,
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
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
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
                        <div className="flex w-full flex-col">
                          {/* price  */}
                          <div className="flex items-center gap-x-1 self-baseline-last">
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
                          <div className="mt-3 flex items-center justify-between">
                            {/* color */}
                            <div className="flex items-center justify-between rounded-[5px] border border-[#14a0de] p-[3px]">
                              <div
                                className="flex size-4 items-center justify-center rounded-[6px] border border-[#d7dee0]"
                                style={{
                                  backgroundColor: getColorInfo(product.color)
                                    .hex,
                                }}
                              ></div>
                              <span className="mr-1 ml-2 text-[12px] text-[#333333]">
                                {getColorInfo(product.color).label}
                              </span>
                            </div>
                            {/* control Bar */}
                            <div className="relative flex w-45 items-center justify-between">
                              {/* increment */}
                              <button
                                onClick={() => increaseProductCount(product.id)}
                                disabled={
                                  productCount(product) >= product.quantity
                                }
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm border border-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] disabled:cursor-default disabled:border disabled:border-[#f6f6f6] disabled:text-[#d0d0d0] disabled:opacity-50"
                              >
                                <Plus size={22} color="#385086" />
                              </button>
                              {/* count */}
                              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                <span className="text-xl">
                                  {convertToPersianNumber(
                                    productCount(product) as number,
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
                                className="flex size-9 cursor-pointer items-center justify-center rounded-sm shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
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
        <div className="sticky top-5 col-span-5 flex min-w-[400px] flex-col self-baseline">
          <div className="mr-3 text-xl font-medium">صورتحساب</div>
          <div className="mt-5 flex flex-col rounded-lg p-8 pb-6 shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
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
              className="bg-custom-primary mt-4 flex h-13 w-full cursor-pointer items-center justify-center rounded-lg text-xl text-white"
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
