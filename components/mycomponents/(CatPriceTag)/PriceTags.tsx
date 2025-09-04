"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import { convertToPersianNumber } from "@/lib/utils";
import Link from "next/link";

interface PriceTagsProps {
  evenColor: string;
  oddColor: string;
  options: {
    priceTag: number;
  }[];
  label: string;
  type: "mobile" | "laptop";
}

const PriceTags = ({
  evenColor,
  oddColor,
  options,
  label,
  type,
}: PriceTagsProps) => {
  const { xl, lg } = useBreakpoints();
  return (
    <div className="flex flex-col gap-y-5 border-y border-[#c7cbdb] bg-white p-10 pt-8 max-lg:w-full lg:rounded-xl lg:border">
      <div className="text-base font-semibold sm:text-lg md:text-lg lg:text-[22px] xl:text-2xl">
        {label} بر اساس قیمت
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-1 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
        {options.map((option, index) => {
          return (
            <Link
              style={{
                backgroundColor: xl
                  ? index % 2 === 0
                    ? evenColor
                    : oddColor
                  : lg
                    ? index === 0 || index === 3 || index === 4
                      ? evenColor
                      : oddColor
                    : index % 2 === 0
                      ? evenColor
                      : oddColor,
              }}
              className="flex h-20 items-center justify-center gap-x-1 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
              href={`/${type}?maxPrice=${option.priceTag}000000`}
              key={index}
            >
              <span>تا</span>
              <span className="text-sm font-semibold sm:text-base md:text-lg lg:text-[22px] lg:font-bold">
                {convertToPersianNumber(option.priceTag)}
              </span>
              <span>میلیون</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default PriceTags;
