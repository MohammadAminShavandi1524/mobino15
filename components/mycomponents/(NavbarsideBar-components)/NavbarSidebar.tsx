"use client";
import { adjustAlpha, cn, generateGradient } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import * as Icons from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "@/payload-types";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

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
  const [activeCategory, setActiveCategory] = useState<null | Category>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<null | Category>(
    null
  );

  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const selectedCategory = data?.docs.find((doc: Category) => {
    const findedDoc = doc === activeCategory;
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
          {data?.docs.map((doc) => {
            const LucideIcon = Icons[
              doc.logo as keyof typeof Icons
            ] as Icons.LucideIcon;

            return (
              <li
                key={doc.id}
                onMouseEnter={() => setActiveCategory(doc)}
                className={cn("pb-1 mb-1 border-b rounded-md group")}
                // style={
                //   activeCategory === doc
                //     ? {
                //         backgroundColor: adjustAlpha(
                //           doc.logoColor ?? "#111111",
                //           0.30
                //         ),
                //       }
                //     : undefined
                // }
                style={{
                  // borderBottomColor: adjustAlpha(
                  //   doc.logoColor ?? "#f0f0f0",
                  //   0.5
                  // ),
                  borderBottomColor: "#f0f0f0",
                  borderBottomWidth: "1px",
                  ...(activeCategory === doc
                    ? {
                        background: generateGradient(
                          doc.logoColor ?? "rgba(100,166,227,1)"
                        ),
                      }
                    : {}),
                }}
              >
                <Link
                  className="flex items-center py-[10px] pr-[14px] pl-3"
                  href={`/${doc.name}`}
                  onClick={() => setIsOpen(false)}
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
                  {!!doc.subcategories?.docs?.length && (
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center opacity-0",
                        activeCategory === doc && "opacity-100"
                      )}
                      style={{
                        color: doc.logoColor ?? undefined,
                        display: "inline-flex",
                      }}
                    >
                      <ChevronLeft size={22} />
                    </motion.div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* subCategories */}
        {activeCategory && !!activeCategory.subcategories?.docs?.length && (
          <div
            style={{ boxShadow: "-2px -2px 10px -5px rgba(0,0,0,0.3) inset" }}
            className="min-w-[280px] bg-white text-custom-primary pt-4 pb-8 pl-4 flex flex-col gap-y-4"
          >
            <Link
              href={`/${activeCategory.name}`}
              onClick={() => setIsOpen(false)}
              className="min-h-10 text-[#333]  font-semibold py-2 px-4 rounded-md mr-4"
              style={
                activeCategory
                  ? {
                      backgroundColor: adjustAlpha(
                        activeCategory.logoColor ?? "#111111",
                        0.3
                      ),
                    }
                  : undefined
              }
            >
              <span>همه محصولات</span>
              <span> </span>
              <span>{selectedCategory?.label}</span>
            </Link>

            <ul className="py-2">
              {(selectedCategory?.subcategories?.docs as Category[]).map(
                (sub) => {
                  return (
                    <li
                      key={sub.id}
                      onMouseEnter={() => setActiveSubCategory(sub || null)}
                      onMouseLeave={() => setActiveSubCategory(null)}
                      className="min-h-10 flex items-center text-base pr-8 text-[#333] hover:bg-[#f1f8ff] rounded-sm cursor-pointer "
                      style={
                        activeSubCategory?.id === sub.id
                          ? {
                              backgroundColor: adjustAlpha(
                                activeCategory?.logoColor ?? "#111111",
                                0.1
                              ),
                            }
                          : undefined
                      }
                    >
                      <Link
                        className="flex items-center h-full w-full  min-h-10"
                        href={`/${activeCategory.name}/${sub.name}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
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
            setActiveCategory(null);
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
