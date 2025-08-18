"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  cn,
  convertToPersianNumber,
  getDiscountPercent,
  getMainImageUrl,
} from "@/lib/utils";
import { Product } from "@/payload-types";
import { Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductsCarouselProps {
  products: Product[] | undefined | null;
}

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  // autoplay interval={7000}
  return (
    <Carousel className="pl-4">
      <CarouselContent className="lg:pt-4">
        {products &&
          products.map((product, index) => {
            const mainImageUrl = getMainImageUrl(product);

            const discountPercent = getDiscountPercent(product);

            return (
              <CarouselItem
                className="3xl:basis-1/6 relative flex basis-1/2 flex-col border-l border-l-[#d3d8e4] select-none last:border-l-0 last:pl-0 sm:basis-1/2 md:basis-1/2 lg:mt-[50px] lg:min-h-[360px] lg:basis-1/3 lg:justify-center lg:px-2 lg:pl-4 xl:basis-1/4 2xl:basis-1/5"
                key={index}
              >
                <Link
                  target="_blank"
                  href={`/products/${product.order}_${product.label}`}
                >
                  {discountPercent && discountPercent > 8 && (
                    <div className="absolute -top-10 w-full px-10 pb-2 max-lg:hidden">
                      <div className="text-center text-[14px] font-bold text-[#e6123d]">
                        پیشنهاد شگفت انگیز
                      </div>
                      <div className="mt-2 h-[4px] rounded-sm bg-[#e6123d]"></div>
                    </div>
                  )}

                  <div className="mb-3 flex w-full items-center justify-center lg:mb-5">
                    <Image
                      className={cn("")}
                      src={mainImageUrl}
                      alt={`${product.name}`}
                      width={isMobile ? 132 : 186}
                      height={isMobile ? 132 : 186}
                    />
                  </div>

                  {/* title */}
                  <div className="productlist-title mb-3 min-h-[63px] px-5 text-justify text-xs/[20px] font-light text-[#212121] lg:px-6 lg:text-[14px]">
                    {product.label}
                  </div>

                  {/* price - offPrice - decount percent */}

                  {product.available ? (
                    product.offPrice ? (
                      <div className="relative flex items-center justify-between px-4 pr-5 pb-6 lg:pb-[42px]">
                        {/* discount percent */}
                        <div className="flex h-5 w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                          <span>
                            <Percent
                              strokeWidth={2.5}
                              size={isMobile ? 12 : 14}
                            />
                          </span>
                          <span className="pt-[2px] text-xs lg:text-[12px]">
                            {convertToPersianNumber(discountPercent || "33")}
                          </span>
                        </div>
                        {/* price */}
                        <div className="flex items-center gap-x-1 text-[#212121]">
                          <span className="text-[15px] font-bold lg:text-[20px]">
                            {product.offPrice.toLocaleString("fa-IR")}
                          </span>
                          <span className="text-xs lg:text-[12px]">تومان</span>
                        </div>
                        {/* off price */}
                        <div className="absolute bottom-[2px] left-[49px] gap-x-1 text-[#919ebc]">
                          <span className="text-[14px] font-bold line-through lg:text-[17px]">
                            {product.price.toLocaleString("fa-IR")}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-x-1 pb-[42px] pl-2 text-[#212121] lg:pl-4">
                        <span className="text-sm font-bold lg:text-[20px]">
                          {product.price.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-xs lg:text-[12px]">تومان</span>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-end gap-x-1 px-4 pb-[42px] text-[#212121]">
                      <span className="h-[1px] w-full bg-[#ced0d0]"></span>
                      <span className="text-[16px]"> ناموجود</span>
                      <span className="h-[1px] w-[50px] bg-[#ced0d0]"></span>
                    </div>
                  )}
                </Link>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevious className="top-[185px] right-[18px] size-10 max-lg:hidden [&>*]:size-8" />
      <CarouselNext className="top-[185px] left-[18px] size-10 max-lg:hidden [&>*]:size-8" />
    </Carousel>
  );
};
export default ProductsCarousel;
