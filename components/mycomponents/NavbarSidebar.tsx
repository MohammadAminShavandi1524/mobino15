"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

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
  if (isOpen) {
    return (
      <div
        className={cn(
          "fixed z-50 right-0 top-0  flex w-full  bg-black/10 h-screen mt-[158px]",
          isBannerDisplayed && "mt-[205px]"
        )}
      >
        {/* content */}
        <div
          style={{
            boxShadow: "4px 8px 16px rgba(0, 0, 0, 0.1)",
          }}
          className="w-[280px] bg-white text-custom-primary pt-4 px-4 flex flex-col gap-y-4 "
        >
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
          className={cn(
            "flex-1 bg-black/10  transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 "
          )}
        >
          <div className="bg-transparent text-white pr-6 pt-4 cursor-pointer">
            <X size={28} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="hidden"></div>;
  }
};
export default NavbarSidebar;
