"use client";

import { convertToPersianNumber } from "@/lib/utils";
import { Product, Review } from "@/payload-types";
import { Star } from "lucide-react";
import { Link, Element } from "react-scroll";

interface ProductRatingProps {
  rating: number;
  productReviews: Review[] | null | undefined;
}

const ProductRating = ({ rating, productReviews }: ProductRatingProps) => {
  const ratings: number[] = [];
  productReviews?.forEach((review) => {
    ratings.push(review.rating);
  });

  const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
  const averageRating = Math.round((totalRating / ratings.length) * 10) / 10;

  return (
    <div className="mb-4 flex items-center gap-x-0.5 self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
      <div className="ml-0.5">
        {productReviews && productReviews?.length > 0
          ? "امتیاز کاربران :"
          : "نظرات کاربران :"}
      </div>
      {productReviews && productReviews?.length > 0 && (
        <>
          <div className="pb-0.5">
            <Star color="#f1c21b" size={16} />
          </div>
          <div className="text-[14px]">
            {convertToPersianNumber(averageRating)}
          </div>
        </>
      )}
      <Link
        to="reviews"
        offset={-30}
        spy={true}
        smooth={true}
        duration={500}
        className="mr-1 cursor-pointer text-[12px] text-[#0079b1]"
      >
        {productReviews && productReviews?.length > 0 && <span>(</span>}
        <span className="ml-0.25 text-[14px]">
          {productReviews && convertToPersianNumber(productReviews?.length)}
        </span>
        <span>نظر</span>
        {productReviews && productReviews?.length > 0 && <span>)</span>}
      </Link>
    </div>
  );
};
export default ProductRating;
