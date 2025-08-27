"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getMainImageUrl } from "@/lib/utils";
import { Product } from "@/payload-types";
import {
  Heart,
  MessageCircleMore,
  MessageSquareMore,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Link } from "react-scroll";
import { toast, Toaster } from "sonner";
import LikeAndShareBtns from "./LikeAndShareBtns";

interface ImageShowcaseProps {
  product: Product;
}

const ImageShowcase = ({ product }: ImageShowcaseProps) => {
  const mainImageUrl = getMainImageUrl(product);

  const [imageShowcase, setImageShowcase] = useState(mainImageUrl);

 

  return (
    <div className="3xl:px-[50px] relative col-span-10 flex h-full flex-col gap-y-[70px] rounded-l-xl pt-[60px] pr-4 pb-0 pl-0 xl:col-span-9 xl:px-6 xl:pb-5 2xl:justify-center 2xl:px-10 2xl:pt-[60px] 2xl:pb-[42px]">
      {/* like share and reviews btns */}
      <div className="absolute top-[3px] left-[50%] z-2  -translate-x-[50%]  2xl:top-[20px]">
        <LikeAndShareBtns/>
      </div>
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
                <div className="relative size-18 xl:size-20">
                  <Image
                    className={cn("")}
                    src={img.url}
                    alt={`${product.name}`}
                    fill
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageShowcase;
