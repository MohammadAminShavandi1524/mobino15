import { cn, convertToPersianNumber, getColorInfo, shuffle } from "@/lib/utils";
import { Product, Review } from "@/payload-types";
import { Box, Gamepad2, Percent, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[] | undefined | null;
  reviews: Review[] | undefined | null;
  isFiltersOpened: boolean;
}

const ProductList = ({
  products,
  isFiltersOpened,
  reviews,
}: ProductListProps) => {
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
      Ids.includes(review.product as string)
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
    new Map(availableProducts.map((p) => [p.name, p])).values()
  );

  const unavailableProducts = products?.filter((p) => !p.available) ?? [];

  const finalProducts = [...uniqueAvailableProducts, ...unavailableProducts];

  return (
    <div
      className={cn(
        "grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-3 gap-y-3 ",
        !isFiltersOpened &&
          "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 "
      )}
    >
      {finalProducts &&
        finalProducts.map((product: Product, index) => {
          const averageRating = getProductRating(product);

          const mainImage = product.images?.find((image) => {
            return image.isMain;
          });

          const discountPercent =
            product.offPrice &&
            Math.ceil(
              ((product.price - product.offPrice) / product.price) * 100
            );

          const duplicateAvailableProducts = products?.filter(
            (p) => p.name === product.name && p.available
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
              <div className="flex items-center gap-x-1 rounded-[12px] px-2 bg-[#f8f8f8]">
                <Gamepad2 size={16} color="#004c72" />
                <span className="text-[12px] text-[#81858b]">
                  {product.productType?.[0].usage}
                </span>
              </div>
            );

          const MonitorGamingTag = product.productType?.[0].blockType ===
            "monitor" &&
            product.productType?.[0].usageType.includes("gaming") && (
              <div className="flex items-center gap-x-1 rounded-[12px] px-2 bg-[#f8f8f8]">
                <Gamepad2 size={16} color="#004c72" />
                <span className="text-[12px] text-[#81858b]">گیمینگ</span>
              </div>
            );

          const LowStockTag = (
            <div className="flex items-center gap-x-0.5 text-[#e6123d] text-[10px]">
              <Box size={16} />
              <span>{convertToPersianNumber(product.quantity)}</span>
              <span>عدد باقی مانده</span>
            </div>
          );

          const RatingTag = (
            <div className="flex items-center gap-x-0.5">
              <Star color="#f1c21b" size={16} />
              <span className="text-[#666666] text-[10px]">
                {convertToPersianNumber(averageRating)}
              </span>
            </div>
          );

          return (
            <Link
              href={`/products/${product.order}_${product.label}`}
              target="_blank"
              className="relative w-full min-h-[480px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] rounded-md pt-[50px]"
              key={index}
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

              {product.available ? (
                <div className="flex flex-col items-center gap-y-1.5 absolute top-[71px] right-[20px] p-1 rounded-full  bg-[#ffffff] ">
                  {duplicateAvailableProducts &&
                    duplicateAvailableProducts.slice(0, 4).map((p, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className={cn(
                              "size-2.5 rounded-full shadow-sm",
                              index === 3 && "hidden"
                            )}
                            style={{
                              backgroundColor: getColorInfo(p.color).hex,
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
                    "absolute top-[71px] right-[20px] w-[10px] h-[10px] rounded-full border border-[#d7dee0]"
                  )}
                  style={{ backgroundColor: getColorInfo(product.color).hex }}
                ></div>
              )}

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
              <div className="productlist-title min-h-[63px] px-6 text-justify text-[14px] text-[#212121] font-light mb-3">
                {product.label}
              </div>

              {/* rating and quntity */}

              <div
                className={cn(
                  "flex items-center justify-between mb-6 min-h-4",
                  hasRating ? "px-6" : "pr-5.5 pl-5.5"
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
                        {laptopGamingTag || MonitorGamingTag} {LowStockTag}
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
                    <div
                      className="flex items-center justify-center gap-x-0.5 bg-[#da1e28] text-white h-5 min-w-7 max-w-7.5 rounded-sm
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
          );
        })}
    </div>
  );
};
export default ProductList;
