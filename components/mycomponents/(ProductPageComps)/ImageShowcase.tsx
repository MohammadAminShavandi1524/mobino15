"use client";

import { cn, getMainImageUrl } from "@/lib/utils";
import { Product } from "@/payload-types";
import Image from "next/image";
import { useState } from "react";

interface ImageShowcaseProps {
  product: Product;
}

const ImageShowcase = ({ product }: ImageShowcaseProps) => {
  const mainImageUrl = getMainImageUrl(product);

  const [imageShowcase, setImageShowcase] = useState(mainImageUrl);

  return (
    <div className="relative flex flex-col justify-center gap-y-[70px] col-span-9  h-full pt-[38px] pr-[46px] pb-[42px] pl-[52px] rounded-l-xl">
      {/* like and share */}
      <div className="absolute"></div>
      {/* main image */}
      <div className="w-full flex items-center justify-center ">
        <div>
          <Image
            className={cn("")}
            src={imageShowcase ?? mainImageUrl}
            alt={`${product.name}`}
            width={400}
            height={400}
          />
        </div>
      </div>
      {/* other image */}
      <div className="w-full flex flex-row-reverse items-center justify-center gap-x-2">
        {product.images &&
          product.images?.slice(0, 4).map((img, index) => {
            const selectedImage = imageShowcase
              ? img.url === imageShowcase
              : img.url === mainImageUrl;
            return (
              <div
                key={index}
                className={cn(
                  "p-0.5 border  border-[#d7dee0] rounded-sm cursor-pointer",
                  selectedImage && "border-2 border-[#14a0de]"
                )}
                onClick={() => setImageShowcase(img.url)}
              >
                <Image
                  className={cn("")}
                  src={img.url}
                  alt={`${product.name}`}
                  width={80}
                  height={80}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageShowcase;
