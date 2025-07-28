"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import { cn, isDarkColor } from "@/lib/utils";
import { Category, Product } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Check, SquareCheck, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductPage = () => {
  const { product } = useParams();
  const param = decodeURIComponent(product as string).split("_")[1];
  const orderParam = decodeURIComponent(product as string).split("_")[0];

  const trpc = useTRPC();
  const { data: productsData } = useQuery(
    trpc.products.getMany.queryOptions({})
  );
  const { data: categories } = useQuery(trpc.categories.getMany.queryOptions());

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

  const selectedCategory = categories?.docs.find((cat) => {
    if (singleProduct) return cat.id === singleProduct.category;
    if (multipleProducts) {
      return cat.id === multipleProducts[0].category;
    }
    return false;
  });
  console.log("🚀 ~ ProductPage ~ selectedCategory:", selectedCategory);

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

  const SPMainImage =
    singleProduct &&
    singleProduct.images?.find((image) => {
      return image.isMain;
    });

  const SPOtherImages =
    singleProduct &&
    singleProduct.images?.filter((img) => {
      return !img.isMain;
    });

  const [SPImageShowcase, setSPImageShowcase] = useState(SPMainImage?.url);


  // * نا موجود

  if (
    matchedProductByOrder.length > 0 &&
    matchedProductByOrder[0].available === false
  )
    return (
      <div className="w90 flex flex-col">
        <div className="px-[10px]">ناموجود</div>
      </div>
    );

  // * single products

  if (singleProduct && selectedCategory && selectedSubCategory) {
    let selectedColor = "#ddd";
    let selectedColorLabel = "نامشخص";

    switch (singleProduct.color) {
      case "TitaniumBlack":
        selectedColor = "#383838";
        selectedColorLabel = "مشکی تیتانیومی";
        break;

      case "Black":
        selectedColor = "#1a1a1a";
        selectedColorLabel = "مشکی";
        break;

      case "Silver":
        selectedColor = "#cfcfcf";
        selectedColorLabel = "نقره‌ای";
        break;

      case "Purple":
        selectedColor = "#b030b0";
        selectedColorLabel = "بنفش";
        break;

      case "yellow":
        selectedColor = "#ffee59";
        selectedColorLabel = "زرد";
        break;

      case "DarkBlue":
        selectedColor = "#253873";
        selectedColorLabel = "آبی تیره";
        break;

      case "Lemon":
        selectedColor = "#f6f436";
        selectedColorLabel = "لیمویی";
        break;

      case "TitaniumSilver":
        selectedColor = "#dacccc";
        selectedColorLabel = "نقره‌ای تیتانیومی";
        break;

      case "DarkGray":
        selectedColor = "#1f1d1f";
        selectedColorLabel = "خاکستری تیره";
        break;

      case "NaturalTitanium":
        selectedColor = "#d7d6d6";
        selectedColorLabel = "تیتانیوم طبیعی";
        break;

      case "Golden":
        selectedColor = "#d4a54c";
        selectedColorLabel = "طلایی";
        break;

      case "TitaniumGray":
        selectedColor = "#64635f";
        selectedColorLabel = "خاکستری تیتانیومی";
        break;

      case "TitaniumIceBlue":
        selectedColor = "#bddafc";
        selectedColorLabel = "آبی یخی تیتانیومی";
        break;

      case "Gray":
        selectedColor = "#8f8f8f";
        selectedColorLabel = "خاکستری";
        break;

      case "NavyBlue":
        selectedColor = "#00009c";
        selectedColorLabel = "آبی نفتی";
        break;

      case "Brick":
        selectedColor = "#c47020";
        selectedColorLabel = "آجری";
        break;

      case "TitaniumDesert":
        selectedColor = "#e6c794";
        selectedColorLabel = "بژ تیتانیومی";
        break;

      case "TitaniumPurple":
        selectedColor = "#a98ead";
        selectedColorLabel = "بنفش تیتانیومی";
        break;

      case "JetBlackTitanium":
        selectedColor = "#1b1b1a";
        selectedColorLabel = "مشکی جت تیتانیومی";
        break;

      case "LightGreen":
        selectedColor = "#7fff00";
        selectedColorLabel = "سبز روشن";
        break;

      case "Turquoise":
        selectedColor = "#00ffff";
        selectedColorLabel = "فیروزه‌ای";
        break;

      case "LightGray":
        selectedColor = "#cecece";
        selectedColorLabel = "خاکستری روشن";
        break;

      case "LightBlue":
        selectedColor = "#74c1f6";
        selectedColorLabel = "آبی روشن";
        break;

      case "Pink":
        selectedColor = "#e05ce0";
        selectedColorLabel = "صورتی";
        break;

      case "TitaniumWhite":
        selectedColor = "#f9f6f6";
        selectedColorLabel = "سفید تیتانیومی";
        break;

      case "Green":
        selectedColor = "#22a148";
        selectedColorLabel = "سبز";
        break;

      case "Cream":
        selectedColor = "#938f7a";
        selectedColorLabel = "کرم";
        break;

      case "Blue":
        selectedColor = "#006cf0";
        selectedColorLabel = "آبی";
        break;

      case "White":
        selectedColor = "#ffffff";
        selectedColorLabel = "سفید";
        break;

      case "Red":
        selectedColor = "#e03131";
        selectedColorLabel = "قرمز";
        break;

      case "Orange":
        selectedColor = "#ffa600";
        selectedColorLabel = "نارنجی";
        break;

      case "graphite":
        selectedColor = "#3C3C3C";
        selectedColorLabel = "گرافیتی";
        break;

      case "oceanBlue":
        selectedColor = "#0077BE";
        selectedColorLabel = "آبی اقیانوسی";
        break;

      case "roseGold":
        selectedColor = "#B76E79";
        selectedColorLabel = "رز گلد";
        break;

      case "oliveGreen":
        selectedColor = "#708238";
        selectedColorLabel = "سبز زیتونی";
        break;

      case "copper":
        selectedColor = "#B87333";
        selectedColorLabel = "مسی";
        break;

      case "bronze":
        selectedColor = "#CD7F32";
        selectedColorLabel = "برنزی";
        break;

      case "charcoalGray":
        selectedColor = "#36454F";
        selectedColorLabel = "ذغالی";
        break;

      case "skyBlue":
        selectedColor = "#87CEEB";
        selectedColorLabel = "آبی آسمانی";
        break;

      case "lilac":
        selectedColor = "#C8A2C8";
        selectedColorLabel = "یاسی";
        break;

      case "mintGreen":
        selectedColor = "#98FF98";
        selectedColorLabel = "سبز نعنایی";
        break;

      default:
        selectedColor = "#fff";
        selectedColorLabel = "نامشخص";
        break;
    }

    const checkColor = isDarkColor(selectedColor) ? "#fff" : "#000";

    return (
      <div className="w90 flex flex-col max-w-[1600px] px-[10px]">
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
                    <span>{selectedColorLabel}</span>
                  </div>

                  <div
                    className="flex justify-between items-center self-baseline p-[4px] border border-[#1b3570]
                   rounded-[6px] cursor-pointer"
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center border border-[#d7dee0] 
                      rounded-[6px]"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <Check color={checkColor} size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[14px] font-medium text-[#333333] ml-3 mr-2">
                      {selectedColorLabel}
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
                  {singleProduct.productType?.[0].blockType === "mobile" && (
                    <>
                      <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] ">
                        <span className="text-[#385086] font-light ml-3">
                          نوع پردازنده - CPU :
                        </span>
                        <span>
                          {singleProduct.productType?.[0].chipset?.replace(
                            /(\d+)\s*nm/i,
                            "$1 نانومتری"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
                        <span className="text-[#385086] font-light ml-3">
                          حافظه داخلی :
                        </span>
                        <span>
                          {singleProduct.productType?.[0].storage
                            ?.replace(/gb/i, " گیگابایت")
                            ?.replace(/tb/i, " ترابایت")}
                        </span>
                      </div>

                      <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
                        <span className="text-[#385086] font-light ml-3">
                          حافظه RAM :
                        </span>
                        <span>
                          {singleProduct.productType?.[0].ram.replace(
                            "gb",
                            " گیگابایت"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
                        <span className="text-[#385086] font-light ml-3">
                          سایز صفحه نمایش :
                        </span>
                        <span className="ml-1">
                          {singleProduct.productType?.[0].displaySize}
                        </span>
                        <span>اینچ</span>
                      </div>

                      <div className="flex items-center  text-[14px]  pt-[16px]">
                        <span className="text-[#385086] font-light ml-3">
                          رزولوشن دوربین اصلی :
                        </span>
                        <span className="ml-1">
                          {singleProduct.productType?.[0].mainCameraResolution}
                        </span>
                        <span>مگاپیکسل</span>
                      </div>
                    </>
                  )}
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
          <div className="sticky top-0 min-w-[400px] h-[450px] border border-[#d3d8e4] rounded-[16px]"></div>
        </div>
        {/*  */}
        <div></div>
      </div>
    );
  }

  // *multiple products

  if (multipleProducts && selectedCategory && selectedSubCategory) {
    return (
      <div className="w90 flex flex-col max-w-[1600px] px-[10px]">
        <BreadCrump
          activePage="product"
          productData={multipleProducts[0]}
          selectedCategoryData={selectedCategory}
          selectedSubCategoryData={selectedSubCategory}
          className="px-[10px]"
        />

        <div>multiple product</div>
      </div>
    );
  }

  // *Loading
  return (
    <div className="w90 flex flex-col">
      <div className="px-[10px]">loading</div>
    </div>
  );
};

export default ProductPage;
