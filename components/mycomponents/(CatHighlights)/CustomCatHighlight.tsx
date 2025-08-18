"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CustomCatHighlightProps {
  options: {
    img: string;
    label: string;
    href: string;
  }[];
  label: string;
  bgColor: string;
}

const CustomCatHighlight = ({
  label,
  options,
  bgColor,
}: CustomCatHighlightProps) => {
  const { _2xl, _3xl, lg, md, mlg, s, sm, xl, xs } = useBreakpoints();
  console.log(_2xl);

  return (
    <div className="my-14 flex w-full flex-col items-center justify-center">
      <div className="mb-5 text-[15px] font-medium text-black md:mb-6 md:text-base lg:mb-8 lg:text-[24px] 2xl:text-[26px]">
        برترین های {label}
      </div>
      <ul className="s:flex s:items-center s:gap-x-8 grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-6 sm:gap-x-12 lg:gap-x-8 xl:gap-x-14">
        {options.map((option, index) => {
          return (
            <li key={index}>
              <Link
                className="flex cursor-pointer flex-col items-center gap-y-1.5 lg:gap-y-3"
                href={option.href}
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center",
                    _2xl
                      ? "size-[200px]"
                      : lg
                        ? "size-[187px]"
                        : sm
                          ? "size-[125px]"
                          : "size-[88px]",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-[12px] lg:rounded-[24px]",

                      _2xl
                        ? "size-[172px]"
                        : lg
                          ? "size-[160.5px]"
                          : sm
                            ? "size-[94.5px]"
                            : "size-[75.5px]",
                    )}
                    style={{ backgroundColor: bgColor }}
                  ></div>
                  <div
                    className={cn(
                      "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center",
                      _2xl
                        ? "size-[182px]"
                        : lg
                          ? "size-[170px]"
                          : sm
                            ? "size-[100px]"
                            : "size-[80px]",
                    )}
                  >
                    <Image
                      className={cn(
                        "object-cover transition-all hover:scale-110",
                      )}
                      src={option.img}
                      alt={option.label}
                      width={_2xl ? 182 : lg ? 170 : sm ? 100 : 80}
                      height={_2xl ? 182 : lg ? 170 : sm ? 100 : 80}
                    />
                  </div>
                </div>
                <span className="text-xs sm:text-sm lg:text-[18px]">
                  {option.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomCatHighlight;
