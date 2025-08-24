"use client";

import { cn } from "@/lib/utils";

interface SellerAuthSubmitBtnProps {
  label: "ورود" | "ثبت نام";
  disabled: boolean;
  className?: string;
}

const SellerAuthSubmitBtn = ({
  disabled,
  className,
}: SellerAuthSubmitBtnProps) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={cn(
        "bg-custom-primary xss:w-[340px] mt-5 block h-[54px] w-80 cursor-pointer rounded-md text-lg font-semibold text-white disabled:cursor-default disabled:opacity-90 sm:w-90 lg:w-[340px] xl:text-xl",
        className,
      )}
    >
      ورود
    </button>
  );
};

export default SellerAuthSubmitBtn;
