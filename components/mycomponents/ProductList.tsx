import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  getDiscountPercent,
  getMainImageUrl,
} from "@/lib/utils";
import { Product, Review } from "@/payload-types";
import { Box, Gamepad2, Percent, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import NoResult from "@/lotties/noresultfound.json";
import Lottie from "lottie-react";
import Skeleton from "./(skeletonComponets)/Skleton";

interface ProductListProps {
  products: Product[] | undefined | null;
  reviews: Review[] | undefined | null;
  isFiltersOpened: boolean;
  isAfinoPage?: boolean;
  setProductslength: Dispatch<SetStateAction<number>>;
}

const ProductList = ({
  products,
  isFiltersOpened,
  reviews,
  isAfinoPage,
  setProductslength,
}: ProductListProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getProductRating = (product: Product) => {
    const dkp = product.address.split("dkp-")[1].replace(/\D/g, "");
    const Ids: string[] = [];
    products
      ?.filter((p) => {
        const productDkp = p.address.split("dkp-")[1].replace(/\D/g, "");
        return productDkp === dkp;
      })
      .flatMap((p) => Ids.push(p.id));

    const productReviews = reviews?.filter((review) =>
      Ids.includes(review.product as string),
    );

    const ratings: number[] = [];
    productReviews?.forEach((review) => {
      ratings.push(review.rating);
    });

    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = Math.round((totalRating / ratings.length) * 10) / 10;

    return averageRating;
  };

  const availableProducts = products?.filter((p) => p.available) ?? [];
  const uniqueAvailableProducts = Array.from(
    new Map(availableProducts.map((p) => [p.name, p])).values(),
  );

  const unavailableProducts = products?.filter((p) => !p.available) ?? [];

  const finalProducts = [...uniqueAvailableProducts, ...unavailableProducts];

  setProductslength(finalProducts.length);

  return (
    <div>
      {finalProducts.length > 0 ? (
        <>
          {" "}
          {/* mobile product list */}
          <div className="s:hidden flex flex-col">
            {finalProducts &&
              finalProducts.map((product, index) => {
                const averageRating = getProductRating(product);

                const mainImageUrl = getMainImageUrl(product);

                const discountPercent = getDiscountPercent(product);

                const duplicateAvailableProducts = products?.filter(
                  (p) => p.name === product.name && p.available,
                );

                const hasRating = !Number.isNaN(averageRating);
                const isGamingLaptop =
                  product.productType?.[0].blockType === "laptop" &&
                  product.productType?.[0].usage === "گیمینگ";
                const hasLowStock =
                  product.quantity === 1 ||
                  (product.quantity === 2 && product.available);

                const laptopGamingTag = product.productType?.[0].blockType ===
                  "laptop" &&
                  product.productType?.[0].usage === "گیمینگ" && (
                    <div className="flex items-center gap-x-1 rounded-[12px] bg-[#f8f8f8] px-2">
                      <Gamepad2 size={16} color="#004c72" />
                      <span className="text-[12px] text-[#81858b]">
                        {product.productType?.[0].usage}
                      </span>
                    </div>
                  );

                const MonitorGamingTag = product.productType?.[0].blockType ===
                  "monitor" &&
                  product.productType?.[0].usageType.includes("gaming") && (
                    <div className="flex items-center gap-x-1 rounded-[12px] bg-[#f8f8f8] px-2">
                      <Gamepad2 size={16} color="#004c72" />
                      <span className="text-[12px] text-[#81858b]">گیمینگ</span>
                    </div>
                  );

                const LowStockTag = (
                  <div className="flex items-center gap-x-0.5 text-[10px] text-[#e6123d]">
                    <Box size={16} />
                    <span>{convertToPersianNumber(product.quantity)}</span>
                    <span>عدد باقی مانده</span>
                  </div>
                );

                const RatingTag = (
                  <div className="flex items-center gap-x-0.5">
                    <Star color="#f1c21b" size={16} />
                    <span className="text-[10px] text-[#666666]">
                      {convertToPersianNumber(averageRating)}
                    </span>
                  </div>
                );
                return (
                  <Link
                    href={`/products/${product.order}_${product.label}`}
                    key={index}
                    className={cn(
                      "relative flex min-h-[250px] flex-col gap-y-4 border-b-6 border-double border-b-[#f1f3f8] p-3 pt-6",
                      !isAfinoPage && "pt-[75px]",
                      !product.offPrice && "pt-[30px]",
                    )}
                  >
                    {/* بخش نشون دادن تخفیف  */}
                    {!isAfinoPage && product.available && product.offPrice && (
                      <div className="absolute top-4 mx-auto w-[95%] pb-2">
                        <div className="text-[14px] font-bold text-[#e6123d]">
                          {discountPercent && discountPercent > 5
                            ? "پیشنهاد شگفت انگیز"
                            : "فروش ویژه"}
                        </div>
                        <div className="mt-2 h-[4px] rounded-sm bg-[#e6123d]"></div>
                      </div>
                    )}

                    <div className="grid w-full grid-cols-20">
                      {/* title ratingtag */}
                      <div className="col-span-11 flex w-full flex-col pr-1 pl-4">
                        {/* title */}
                        <div className="productlist-mobiletitle mt-2 mb-4 min-h-[84px] text-justify text-[14px] text-[#212121]">
                          {product.label}
                        </div>

                        {/* rating and quntity */}

                        <div
                          className={cn(
                            "mb-6 flex min-h-4 items-center justify-between",
                            hasRating ? "px-1" : "pr-0.5 pl-0.5",
                          )}
                        >
                          {hasRating ? (
                            <>
                              {isGamingLaptop ? (
                                laptopGamingTag || MonitorGamingTag
                              ) : hasLowStock ? (
                                LowStockTag
                              ) : (
                                <div></div>
                              )}
                              {RatingTag}
                            </>
                          ) : (
                            <>
                              {hasLowStock ? (
                                <>
                                  {laptopGamingTag || MonitorGamingTag}{" "}
                                  {LowStockTag}
                                </>
                              ) : (
                                <>
                                  {laptopGamingTag || MonitorGamingTag}{" "}
                                  <div></div>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        {/* price - offPrice - decount percent */}

                        {product.available && product.quantity > 0 ? (
                          product.offPrice ? (
                            <div className="relative flex items-center justify-between px-0.5 pb-[42px]">
                              {/* discount percent */}
                              <div className="flex h-5 max-w-7.5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                                <span>
                                  <Percent strokeWidth={2.5} size={14} />
                                </span>
                                <span className="pt-[2px] text-[12px]">
                                  {convertToPersianNumber(
                                    discountPercent || "33",
                                  )}
                                </span>
                              </div>
                              {/* price */}
                              <div className="flex items-center gap-x-1 text-[#212121]">
                                <span className="xss:text-[20px] text-lg font-bold">
                                  {product.offPrice.toLocaleString("fa-IR")}
                                </span>
                                <span className="text-[12px]">تومان</span>
                              </div>
                              {/* off price */}
                              <div className="absolute bottom-[16px] left-[5px] flex gap-x-0.5 px-0.5 text-[#919ebc]">
                                <span className="xss:text-[17px] text-[15px] line-through">
                                  {product.price.toLocaleString("fa-IR")}
                                </span>
                                <span className="pt-0.5 text-[12px]">
                                  تومان
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-x-1 pb-[42px] pl-0.5 text-[#212121]">
                              <span className="xss:text-[20px] text-lg font-bold">
                                {product.price.toLocaleString("fa-IR")}
                              </span>
                              <span className="text-[12px]">تومان</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-end gap-x-1 px-0.5 pb-[42px] text-[#212121]">
                            <span className="h-[1px] w-full bg-[#ced0d0]"></span>
                            <span className="text-[16px]"> ناموجود</span>
                            <span className="h-[1px] w-[50px] bg-[#ced0d0]"></span>
                          </div>
                        )}
                      </div>
                      {/* image and colors */}
                      <div className="col-span-9 flex w-full flex-col items-center">
                        {/* تصویر */}
                        <div className="mb-4 flex w-full items-center justify-center">
                          <Image
                            className={cn("")}
                            src={mainImageUrl}
                            alt={`${product.name}`}
                            width={160}
                            height={160}
                          />
                        </div>

                        {/* دایره رنگ ها  */}

                        {product.available ? (
                          <div
                            className={cn(
                              "flex items-center gap-x-1.5 rounded-full bg-[#ffffff] p-1",
                            )}
                          >
                            {duplicateAvailableProducts &&
                              duplicateAvailableProducts.map((p, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={cn(
                                      "size-2.5 rounded-full shadow-sm",

                                      product.color === "White" &&
                                        "border border-[#b4b4b4]",
                                    )}
                                    style={{
                                      backgroundColor: getColorInfo(p.color)
                                        .hex,
                                    }}
                                  ></div>
                                );
                              })}
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "h-[10px] w-[10px] rounded-full border border-[#d7dee0]",
                              product.color === "White" &&
                                "border border-[#b4b4b4]",
                            )}
                            style={{
                              backgroundColor: getColorInfo(product.color).hex,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
          {/* s: product list  */}
          <div
            className={cn(
              "3xl:grid-cols-5 s:grid-cols-2 mlg:grid-cols-3 max-s:hidden grid grid-cols-1 gap-x-3 gap-y-3 max-lg:px-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
              !isFiltersOpened &&
                "3xl:grid-cols-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
            )}
          >
            {finalProducts &&
              finalProducts.map((product: Product, index) => {
                const averageRating = getProductRating(product);

                const mainImageUrl = getMainImageUrl(product);

                const discountPercent = getDiscountPercent(product);

                const duplicateAvailableProducts = products?.filter(
                  (p) => p.name === product.name && p.available,
                );

                const hasRating = !Number.isNaN(averageRating);
                const isGamingLaptop =
                  product.productType?.[0].blockType === "laptop" &&
                  product.productType?.[0].usage === "گیمینگ";
                const hasLowStock =
                  product.quantity === 1 ||
                  (product.quantity === 2 && product.available);

                const laptopGamingTag = product.productType?.[0].blockType ===
                  "laptop" &&
                  product.productType?.[0].usage === "گیمینگ" && (
                    <div className="flex items-center gap-x-1 rounded-[12px] bg-[#f8f8f8] px-2">
                      <Gamepad2 size={16} color="#004c72" />
                      <span className="text-[12px] text-[#81858b]">
                        {product.productType?.[0].usage}
                      </span>
                    </div>
                  );

                const MonitorGamingTag = product.productType?.[0].blockType ===
                  "monitor" &&
                  product.productType?.[0].usageType.includes("gaming") && (
                    <div className="flex items-center gap-x-1 rounded-[12px] bg-[#f8f8f8] px-2">
                      <Gamepad2 size={16} color="#004c72" />
                      <span className="text-[12px] text-[#81858b]">گیمینگ</span>
                    </div>
                  );

                const LowStockTag = (
                  <div className="flex items-center gap-x-0.5 text-[10px] text-[#e6123d]">
                    <Box size={16} />
                    <span>{convertToPersianNumber(product.quantity)}</span>
                    <span>عدد باقی مانده</span>
                  </div>
                );

                const RatingTag = (
                  <div className="flex items-center gap-x-0.5">
                    <Star color="#f1c21b" fill="#f1c21b" size={16} />
                    <span className="text-[10px] text-[#666666]">
                      {convertToPersianNumber(averageRating)}
                    </span>
                  </div>
                );

                return (
                  <Link
                    href={`/products/${product.order}_${product.label}`}
                   
                    className={cn(
                      "relative min-h-[480px] w-full rounded-md bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)]",
                      !isAfinoPage && "pt-[50px]",
                    )}
                    key={index}
                  >
                    {/* بخش نشون دادن تخفیف  */}
                    {!isAfinoPage && product.available && product.offPrice && (
                      <div className="absolute top-4 w-full px-5 pb-2">
                        <div className="text-[14px] font-bold text-[#e6123d]">
                          {discountPercent && discountPercent > 5
                            ? "پیشنهاد شگفت انگیز"
                            : "فروش ویژه"}
                        </div>
                        <div className="mt-2 h-[4px] rounded-sm bg-[#e6123d]"></div>
                      </div>
                    )}

                    {/* دایره رنگ ها  */}

                    {product.available ? (
                      <div
                        className={cn(
                          "absolute top-[71px] right-[20px] flex flex-col items-center gap-y-1.5 rounded-full bg-[#ffffff] p-1",
                          isAfinoPage && "top-[30px]",
                        )}
                      >
                        {duplicateAvailableProducts &&
                          duplicateAvailableProducts
                            .slice(0, 4)
                            .map((p, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className={cn(
                                      "size-2.5 rounded-full shadow-sm",
                                      index === 3 && "hidden",
                                      product.color === "White" &&
                                        "border border-[#b4b4b4]",
                                    )}
                                    style={{
                                      backgroundColor: getColorInfo(p.color)
                                        .hex,
                                    }}
                                  ></div>
                                  {duplicateAvailableProducts.length > 3 &&
                                    index === 3 && (
                                      <div>
                                        <Plus size={10} />
                                      </div>
                                    )}
                                </>
                              );
                            })}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "absolute top-[71px] right-[20px] h-[10px] w-[10px] rounded-full border border-[#d7dee0]",
                          product.color === "White" &&
                            "border border-[#b4b4b4]",
                        )}
                        style={{
                          backgroundColor: getColorInfo(product.color).hex,
                        }}
                      ></div>
                    )}

                    {/* تصویر */}
                    <div className="mt-5 mb-5 flex w-full items-center justify-center">
                      <Image
                        className={cn("")}
                        src={mainImageUrl}
                        alt={`${product.name}`}
                        width={206}
                        height={206}
                      />
                    </div>

                    {/* title */}
                    <div className="productlist-title mb-3 min-h-[63px] px-6 text-justify text-[14px] font-light text-[#212121]">
                      {product.label}
                    </div>

                    {/* rating and quntity */}

                    <div
                      className={cn(
                        "mb-6 flex min-h-4 items-center justify-between",
                        hasRating ? "px-6" : "pr-5.5 pl-5.5",
                      )}
                    >
                      {hasRating ? (
                        <>
                          {isGamingLaptop ? (
                            laptopGamingTag || MonitorGamingTag
                          ) : hasLowStock ? (
                            LowStockTag
                          ) : (
                            <div></div>
                          )}
                          {RatingTag}
                        </>
                      ) : (
                        <>
                          {hasLowStock ? (
                            <>
                              {laptopGamingTag || MonitorGamingTag}{" "}
                              {LowStockTag}
                            </>
                          ) : (
                            <>
                              {laptopGamingTag || MonitorGamingTag} <div></div>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* price - offPrice - decount percent */}

                    {product.available && product.quantity > 0 ? (
                      product.offPrice ? (
                        <div className="relative flex items-center justify-between px-4 pb-[42px]">
                          {/* discount percent */}
                          <div className="flex h-5 max-w-7.5 min-w-7 items-center justify-center gap-x-0.5 rounded-sm bg-[#da1e28] px-1 text-white">
                            <span>
                              <Percent strokeWidth={2.5} size={14} />
                            </span>
                            <span className="pt-[2px] text-[12px]">
                              {convertToPersianNumber(discountPercent || "33")}
                            </span>
                          </div>
                          {/* price */}
                          <div className="flex items-center gap-x-1 text-[#212121]">
                            <span className="text-[20px] font-bold">
                              {product.offPrice.toLocaleString("fa-IR")}
                            </span>
                            <span className="text-[12px]">تومان</span>
                          </div>
                          {/* off price */}
                          <div className="absolute bottom-[12px] left-[5px] gap-x-1 px-4 text-[#919ebc]">
                            <span className="text-[17px] font-bold line-through">
                              {product.price.toLocaleString("fa-IR")}
                            </span>
                            <span className="text-[12px]">تومان</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-x-1 pb-[42px] pl-4 text-[#212121]">
                          <span className="text-[20px] font-bold">
                            {product.price.toLocaleString("fa-IR")}
                          </span>
                          <span className="text-[12px]">تومان</span>
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
                );
              })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center pb-20 text-[#333333]">
          {!isLoaded && (
            <div className="xss:size-72.5 s:size-75 flex size-70 items-center justify-center rounded-xl sm:size-80 lg:size-90">
              <Skeleton className="xss:size-37.5 s:size-40 size-35 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] sm:size-45 lg:size-55" />
            </div>
          )}
          <div className="xss:w-72.5 s:w-75 w-70 sm:w-80 lg:w-90">
            <Lottie
              onDOMLoaded={() => setIsLoaded(true)}
              style={{ display: isLoaded ? "block" : "none" }}
              animationData={NoResult}
              loop={false}
            />
          </div>
          <div className="mb-4 text-base font-medium sm:text-xl lg:text-[22px]">
            کالایی یافت نشد.
          </div>
          <div className="text-xs lg:text-base">
            لطفا فیلترها را ویرایش کنید یا واژه دیگری را جستجو کنید.
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;
