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
    <div className="relative col-span-9 flex h-full flex-col justify-center gap-y-[70px] rounded-l-xl pt-[38px] pr-[46px] pb-[42px] pl-[52px]">
      {/* like and share */}
      <div className="absolute"></div>
      {/* main image */}
      <div className="flex w-full items-center justify-center">
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
      <div className="flex w-full flex-row-reverse items-center justify-center gap-x-2">
        {product.images &&
          product.images?.slice(0, 4).map((img, index) => {
            const selectedImage = imageShowcase
              ? img.url === imageShowcase
              : img.url === mainImageUrl;
            return (
              <div
                key={index}
                className={cn(
                  "cursor-pointer rounded-sm border border-[#d7dee0] p-0.5",
                  selectedImage && "border-2 border-[#14a0de]",
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
