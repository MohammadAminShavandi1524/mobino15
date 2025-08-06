"use client";

import { Product } from "@/payload-types";
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
}

const ProductRating = ({ rating }: ProductRatingProps) => {
  return (
    <div className="flex items-center self-baseline gap-x-0.5 pl-6  pb-4 border-b border-b-[#d3d8e4] mb-4">
      <div className="ml-0.5">امتیاز کاربران :</div>
      <div className="pb-0.5">
        <Star color="#f1c21b" size={16} />
      </div>
      <div className=" text-[14px]">{rating}</div>
    </div>
  );
};
export default ProductRating;
