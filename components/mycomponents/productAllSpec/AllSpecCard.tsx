"use client";

import { cn } from "@/lib/utils";

interface AllSpecCardProps {
  title: string;
  value: string | number;
  valueClassname?: string;
}

const AllSpecCard = ({ title, value, valueClassname }: AllSpecCardProps) => {
  return (
    <div className="flex flex-col gap-y-2 rounded-lg bg-[#f3f8fd] px-6 lg:px-10.5 py-4">
      <span className="text-sm lg:text-base">{title} :</span>
      <span
        className={cn(
          "pr-0.5 text-sm lg:text-[15px] font-light text-[#000511]",
          valueClassname,
        )}
      >
        {value}
      </span>
    </div>
  );
};

export default AllSpecCard;
