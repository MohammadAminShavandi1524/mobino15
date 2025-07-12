"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import * as Icons from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PaginatedDocs } from "payload";
import { Category } from "@/payload-types";
import Link from "next/link";

interface NavbarSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isBannerDisplayed: boolean;
  data: PaginatedDocs<Category>;
}

const NavbarSidebar = ({
  isOpen,
  setIsOpen,
  isBannerDisplayed,
  data,
}: NavbarSidebarProps) => {
  const [activeCategory, setActiveCategory] = useState("");

  const selectedCategory = data.docs.find((doc: Category) => {
    const findedDoc = doc.id === activeCategory;
    return findedDoc;
  });

  if (isOpen) {
    return (
      <div
        className={cn(
          "fixed z-50 right-0 top-0  flex w-full  bg-zinc-900/50 h-screen mt-[160px] border-t border-[#d7dee0]",
          isBannerDisplayed && "mt-[207px]"
        )}
      >
        {/* categories */}
        <ul className="min-w-[280px] bg-white text-custom-primary pt-4 px-4 flex flex-col ">
          {data.docs.map((doc) => {
            const LucideIcon = Icons[
              doc.logo as keyof typeof Icons
            ] as Icons.LucideIcon;

            return (
              <li
                key={doc.id}
                onMouseEnter={() => setActiveCategory(doc.id)}
                className="pb-1 mb-1 border-b border-b-[#f0f0f0] hover:bg-[#f1f8ff] rounded-md group"
              >
                <Link
                  className="flex items-center py-[10px] pr-[14px] pl-3 "
                  href={""}
                >
                  {/* logo */}
                  <div
                    style={{
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,.1)",
                      color: doc.logoColor || "#7ab2e6",
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-background rounded-full"
                  >
                    <LucideIcon size={20} />
                  </div>
                  {/* label */}
                  <div className="flex-1 font-medium text-[14px] text-[#333333] mr-[10px]">
                    {doc.label}
                  </div>
                  {/* arrow logo */}
                  <div className={cn("opacity-0  group-hover:opacity-100 ")}>
                    <ChevronLeft size={20} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* subCategories */}
        {activeCategory && activeCategory.length > 0 && (
          <div
            style={{ boxShadow: "-2px -2px 10px -5px rgba(0,0,0,0.3) inset" }}
            className="min-w-[280px] bg-white text-custom-primary pt-4 pb-8 pl-4 flex flex-col gap-y-4"
          >
            <Link
              href={""}
              className="min-h-10 text-[#333] bg-[#f1f8ff] font-semibold py-2 px-4 rounded-md mr-4"
            >
              <span>همه محصولات</span>
              <span> </span>
              <span>{selectedCategory?.label}</span>
            </Link>

            <ul className="py-2 ">
              {(selectedCategory?.subcategories?.docs as Category[]).map(
                (sub) => {
                  return (
                    <li
                      className="min-h-10 flex items-center text-base pr-8 text-[#333] hover:bg-[#f1f8ff] rounded-sm"
                      key={sub.id}
                    >
                      <Link href="">{sub.label}</Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}

        {/* transparent side  */}
        <div
          onClick={() => {
            setIsOpen(false);
            setActiveCategory("");
          }}
          className={cn(
            "flex-1 bg-transparent/50  transition-opacity duration-300",
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
