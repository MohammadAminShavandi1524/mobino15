"use client";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect } from "react";

interface NavbarSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isBannerDisplayed: boolean;
}

const NavbarSidebar = ({
  isOpen,
  setIsOpen,
  isBannerDisplayed,
}: NavbarSidebarProps) => {
  console.log("🚀 ~ NavbarSidebar ~ isOpen:", isOpen);



  return (
    <div
      className={cn(
        "fixed z-50 right-0 top-0 bg-pink-500 flex w-full  h-screen mt-[158px]",
        isOpen === false && "hidden",
        isBannerDisplayed && "mt-[205px]"
      )}
    >
      {/* content */}
      <div className="w-[400px] bg-white text-custom-primary flex flex-col gap-y-4">
        {/* header */}
        <div>
          <div></div>
        </div>
        {/* body */}
        <div>body</div>
      </div>
      {/*  */}
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="flex-1 bg-custom-primary"
      ></div>
    </div>
  );
};
export default NavbarSidebar;
