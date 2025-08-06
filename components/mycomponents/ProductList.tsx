import { cn, convertToPersianNumber, getColorInfo, shuffle } from "@/lib/utils";
import { Product } from "@/payload-types";
import { Box, Gamepad2, Percent, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductListProps {
  products: Product[] | undefined | null;
  isFiltersOpened: boolean;
}

const ProductList = ({ products, isFiltersOpened }: ProductListProps) => {
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

          return (
            <Link
              href={`/products/${product.order}_${product.label}`}
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
                <div className="flex flex-col gap-y-1.5 absolute top-[71px] right-[20px]">
                  {duplicateAvailableProducts &&
                    duplicateAvailableProducts.slice(0, 4).map((p, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "w-[10px] h-[10px] rounded-full",
                            [
                              "Silver",
                              "TitaniumSilver",
                              "NaturalTitanium",
                              "LightGray",
                              "TitaniumWhite",
                              "White",
                            ].includes(getColorInfo(p.color).hex) &&
                              "border border-[#e0e0e2]"
                          )}
                          style={{
                            backgroundColor: getColorInfo(p.color).hex,
                          }}
                        ></div>
                      );
                    })}
                </div>
              ) : (
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
                    ].includes(getColorInfo(product.color).hex) &&
                      "border border-[#e0e0e2]"
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
