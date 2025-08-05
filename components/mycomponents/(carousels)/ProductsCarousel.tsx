import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, convertToPersianNumber } from "@/lib/utils";
import { Product } from "@/payload-types";
import { Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductsCarouselProps {
  products: Product[] | undefined | null;
}

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Carousel autoplay interval={7000} className="">
      <CarouselContent className="pt-4 px-4">
        {products &&
          products.map((product, index) => {
            const mainImage = product.images?.find((image) => {
              return image.isMain;
            });

            const discountPercent =
              product.offPrice &&
              Math.ceil(
                ((product.price - product.offPrice) / product.price) * 100
              );

            return (
              <CarouselItem
                className="  relative flex flex-col justify-center basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4  2xl:basis-1/5 3xl:basis-1/6 px-2 select-none  min-h-[360px]  pl-4 last:pl-0 sm:border-l sm:border-l-[#d3d8e4] last:border-l-0  mt-[50px]"
                key={index}
              >
                <Link href={`/products/${product.order}_${product.label}`}>
                  {discountPercent && discountPercent > 8 && (
                    <div className="w-full absolute -top-10 px-10 pb-2 ">
                      <div className="text-[14px] text-center font-bold text-[#e6123d]">
                        پیشنهاد شگفت انگیز
                      </div>
                      <div className="mt-2 h-[4px] bg-[#e6123d] rounded-sm"></div>
                    </div>
                  )}

                  <div className="w-full flex items-center justify-center  mb-5">
                    {mainImage?.url && (
                      <Image
                        className={cn("")}
                        src={mainImage.url}
                        alt={`${product.name}`}
                        width={186}
                        height={186}
                      />
                    )}
                  </div>

                  {/* title */}
                  <div className="productlist-title  px-6 text-justify text-[14px] text-[#212121] font-light mb-3">
                    {product.label}
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
                </Link>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevious className="top-[185px] right-[18px] size-10 [&>*]:size-8  max-md:hidden " />
      <CarouselNext className="top-[185px] left-[18px] size-10 [&>*]:size-8  max-md:hidden " />
    </Carousel>
  );
};
export default ProductsCarousel;
