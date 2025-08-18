import { convertToPersianNumber } from "@/lib/utils";
import Link from "next/link";

interface PriceTagsProps {
  evenColor: string;
  oddColor: string;
  options: {
    priceTag: number;
  }[];
  label: string;
}

const PriceTags = ({ evenColor, oddColor, options, label }: PriceTagsProps) => {
  return (
    <div className="flex flex-col gap-y-5 rounded-xl border border-[#c7cbdb] bg-white p-10 pt-8">
      <div className="text-2xl font-semibold">{label} بر اساس قیمت</div>
      <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-1">
        {options.map((option, index) => {
          return (
            <Link
              style={{
                backgroundColor: index % 2 === 0 ? evenColor : oddColor,
              }}
              className="flex h-20 items-center justify-center gap-x-1 rounded-lg text-lg"
              href={`/mobile?maxPrice=${option.priceTag}000000`}
              key={index}
            >
              <span>تا</span>
              <span className="text-[22px] font-bold">
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
