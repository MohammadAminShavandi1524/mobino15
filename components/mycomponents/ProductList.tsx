"use client";

import { cn, convertToPersianNumber } from "@/lib/utils";
import { Product } from "@/payload-types";
import { Box, Gamepad2, Percent, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Dispatch, SetStateAction } from "react";

interface ProductListProps {
  products: Product[] | undefined;
  isFiltersOpened: boolean;
}

const ProductList = ({ products, isFiltersOpened }: ProductListProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-5 gap-x-3 gap-y-3",
        !isFiltersOpened && "grid-cols-6"
      )}
    >
      {products &&
        products.map((product) => {
          let selectedColor = "#ddd";

          switch (product.color) {
            case "TitaniumBlack":
              selectedColor = "#383838";
              break;

            case "Black":
              selectedColor = "#1a1a1a";
              break;

            case "Silver":
              selectedColor = "#cfcfcf";
              break;

            case "Purple":
              selectedColor = "#b030b0";
              break;

            case "yellow":
              selectedColor = "#ffee59";
              break;

            case "DarkBlue":
              selectedColor = "#253873";
              break;

            case "Lemon":
              selectedColor = "#f6f436";
              break;

            case "TitaniumSilver":
              selectedColor = "#dacccc";
              break;

            case "DarkGray":
              selectedColor = "#1f1d1f";
              break;

            case "NaturalTitanium":
              selectedColor = "#d7d6d6";
              break;

            case "Golden":
              selectedColor = "#d4a54c";
              break;

            case "TitaniumGray":
              selectedColor = "#64635f";
              break;

            case "TitaniumIceBlue":
              selectedColor = "#bddafc";
              break;

            case "Gray":
              selectedColor = "#8f8f8f";
              break;

            case "NavyBlue":
              selectedColor = "#00009c";
              break;

            case "Brick":
              selectedColor = "#c47020";
              break;

            case "TitaniumDesert":
              selectedColor = "#e6c794";
              break;

            case "TitaniumPurple":
              selectedColor = "#a98ead";
              break;

            case "JetBlackTitanium":
              selectedColor = "#1b1b1a";
              break;

            case "LightGreen":
              selectedColor = "#7fff00";
              break;

            case "Turquoise":
              selectedColor = "#00ffff";
              break;

            case "LightGray":
              selectedColor = "#cecece";
              break;

            case "LightBlue":
              selectedColor = "#74c1f6";
              break;

            case "Pink":
              selectedColor = "#e05ce0";
              break;

            case "TitaniumWhite":
              selectedColor = "#f9f6f6";
              break;

            case "Green":
              selectedColor = "#22a148";
              break;

            case "Cream":
              selectedColor = "#938f7a";
              break;

            case "Blue":
              selectedColor = "#006cf0";
              break;

            case "White":
              selectedColor = "#ffffff";
              break;

            case "Red":
              selectedColor = "#e03131";
              break;

            case "Orange":
              selectedColor = "#ffa600";
              break;

            case "graphite":
              selectedColor = "#3C3C3C";
              break;

            case "oceanBlue":
              selectedColor = "#0077BE";
              break;

            case "roseGold":
              selectedColor = "#B76E79";
              break;

            case "oliveGreen":
              selectedColor = "#708238";
              break;

            case "copper":
              selectedColor = "#B87333";
              break;

            case "bronze":
              selectedColor = "#CD7F32";
              break;

            case "charcoalGray":
              selectedColor = "#36454F";
              break;

            case "skyBlue":
              selectedColor = "#87CEEB";
              break;

            case "lilac":
              selectedColor = "#C8A2C8";
              break;

            case "mintGreen":
              selectedColor = "#98FF98";
              break;

            default:
              selectedColor = "#fff";
              break;
          }

          const mainImage = product.images?.find((image) => {
            return image.isMain;
          });

          const discountPercent =
            product.offPrice &&
            Math.ceil(
              ((product.price - product.offPrice) / product.price) * 100
            );

          return (
            <Link
             href={`/products/${product?.label}`}
              className="relative w-full h-[495px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] rounded-md pt-[50px]"
              key={product.id}
            >
              {/* بخش نشون دادن تخفیف  */}
              {product.available && product.offPrice && (
                <div className="w-full absolute  top-4 px-5 pb-2 ">
                  <div className="text-[14px] font-bold text-[#e6123d]">
                    {discountPercent && discountPercent > 5
                      ? "پیشنهاد شگفت انگیز"
                      : "فروش ویژه"}
                  </div>
                  <div className="mt-2 h-[4px] bg-[#e6123d] rounded-sm"></div>
                </div>
              )}

              {/* دایره رنگ ها  */}
              <div
                className={cn(
                  "absolute top-[71px] right-[20px] w-[10px] h-[10px] rounded-full",
                  [
                    "Silver",
                    "TitaniumSilver",
                    "NaturalTitanium",
                    "LightGray",
                    "TitaniumWhite",
                    "White",
                  ].includes(selectedColor) && "border border-[#e0e0e2]"
                )}
                style={{ backgroundColor: selectedColor }}
              ></div>
              {/* تصویر */}
              <div className="w-full flex items-center justify-center mt-5 mb-5">
                {mainImage?.url && (
                  <Image
                    className={cn("")}
                    src={mainImage.url}
                    alt={`${product.name}`}
                    width={206}
                    height={206}
                  />
                )}
              </div>

              {/* title */}
              <div className="productlist-title  px-6 text-justify text-[14px] text-[#212121] font-light mb-3">
                {product.label}
              </div>

              {/* rating and quntity */}

              <div className="flex items-center justify-between px-6 mb-6">
                {/* quntity if x is 1 or 2*/}
                {product.quantity === 1 || product.quantity === 2 ? (
                  product.available ? (
                    <div
                      className={cn(
                        "flex items-center gap-x-0.5  text-[#e6123d] text-[10px]"
                      )}
                    >
                      <span>
                        <Box size={16} />
                      </span>
                      <span>{convertToPersianNumber(product.quantity)}</span>
                      <span>عدد در انبار باقی مانده</span>
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <>
                    {product.productType?.[0].blockType === "laptop" &&
                    product.productType?.[0].usage === "گیمینگ" ? (
                      <div className="flex items-center gap-x-1 rounded-[12px] px-2 bg-[#f8f8f8]">
                        <span>
                          <Gamepad2 size={16} color="#004c72" />
                        </span>
                        <span className="text-[12px] text-[#81858b]">
                          {product.productType?.[0].usage}
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}

                {/* rating */}
                <div className="flex items-center gap-x-0.5">
                  {/* logo */}
                  <span>
                    <Star color="#f1c21b" size={16} />
                  </span>
                  {/* rate */}
                  <span className="text-[#666666] text-[10px]">
                    {convertToPersianNumber(product.rating)}
                  </span>
                </div>
              </div>

              {/* price - offPrice - decount percent */}

              {product.available ? (
                product.offPrice ? (
                  <div className="relative flex items-center justify-between px-4 pb-[42px]">
                    {/* discount percent */}
                    <div
                      className="flex items-center justify-center gap-x-0.5 bg-[#da1e28] text-white h-5 w-7 rounded-sm
                  px-1"
                    >
                      <span>
                        <Percent strokeWidth={2.5} size={14} />
                      </span>
                      <span className="text-[12px] pt-[2px]">
                        {convertToPersianNumber(discountPercent || "33")}
                      </span>
                    </div>
                    {/* price */}
                    <div className="flex items-center gap-x-1 text-[#212121]">
                      <span className="font-bold text-[20px]">
                        {product.offPrice.toLocaleString("fa-IR")}
                      </span>
                      <span className="text-[12px]">تومان</span>
                    </div>
                    {/* off price */}
                    <div className="absolute bottom-[12px] left-[5px] px-4 gap-x-1 text-[#919ebc]">
                      <span className="font-bold text-[17px] line-through">
                        {product.price.toLocaleString("fa-IR")}
                      </span>
                      <span className="text-[12px]">تومان</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-x-1 pl-4 pb-[42px] text-[#212121]">
                    <span className="font-bold text-[20px]">
                      {product.price.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-[12px]">تومان</span>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-end gap-x-1  px-4 pb-[42px] text-[#212121]">
                  <span className="w-full h-[1px] bg-[#ced0d0]"></span>
                  <span className="text-[16px]"> ناموجود</span>
                  <span className="w-[50px] h-[1px] bg-[#ced0d0]"></span>
                </div>
              )}

              {}
            </Link>
          );
        })}
    </div>
  );
};
export default ProductList;
