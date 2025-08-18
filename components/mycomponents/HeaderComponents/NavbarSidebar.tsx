"use client";
import { adjustAlpha, cn, generateGradient } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import * as Icons from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "@/payload-types";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

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
  const [isAllPHovered, setIsAllPHovered] = useState(false);

  const [activeCategory, setActiveCategory] = useState<null | Category>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<null | Category>(
    null,
  );

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const selectedCategory = data.docs.find((doc: Category) => {
    const findedDoc = doc === activeCategory;
    return findedDoc;
  });

  // ? sort by subcategory order

  selectedCategory &&
    (selectedCategory?.subcategories?.docs as Category[]).sort(
      (a, b) => a.order - b.order,
    );

  // ?

  if (isOpen) {
    return (
      <div className="absolute top-[calc(100%+1px)] right-0 z-50 flex h-screen w-full border-t border-[#d7dee0] bg-zinc-900/50 max-lg:hidden">
        {/* categories */}
        <ul className="text-custom-primary flex min-w-[280px] flex-col bg-white px-4 pt-4">
          {/* تمام محصولات  */}
          <li
            className={cn(
              "group mb-1 rounded-md border-b border-b-[#f0f0f0] pb-1",
            )}
            onMouseEnter={() => setIsAllPHovered(true)}
            onMouseLeave={() => setIsAllPHovered(false)}
            style={{
              background: isAllPHovered
                ? generateGradient(adjustAlpha("rgba(156, 184, 204, 1)", 0.75))
                : undefined,
            }}
          >
            <Link
              className="flex items-center py-[10px] pr-[14px] pl-3"
              href={`/products`}
              onClick={() => setIsOpen(false)}
            >
              {/* logo */}
              <div
                style={{
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,.1)",
                  color: "#9cb8cc",
                }}
                className="bg-background flex h-9 w-9 items-center justify-center rounded-full"
              >
                <Icons.Boxes size={24} />
              </div>
              {/* label */}
              <div className="mr-[14px] flex-1 text-[14px] font-medium text-[#333333]">
                همه محصولات
              </div>
            </Link>
          </li>

          {data?.docs.map((doc) => {
            const LucideIcon = Icons[
              doc.logo as keyof typeof Icons
            ] as Icons.LucideIcon;

            return (
              <li
                key={doc.id}
                onMouseEnter={() => setActiveCategory(doc)}
                className={cn("group mb-1 rounded-md border-b pb-1")}
                style={{
                  // borderBottomColor: adjustAlpha(
                  //   doc.logoColor ?? "#f0f0f0",
                  //   0.5
                  // ),
                  borderBottomColor: "#f0f0f0",
                  borderBottomWidth: "1px",
                  ...(activeCategory === doc && !isAllPHovered
                    ? {
                        background: generateGradient(
                          adjustAlpha(
                            doc.logoColor || "rgba(100,166,227,0.8)",
                            0.75,
                          ) ?? "rgba(100,166,227,1)",
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
                    className="bg-background flex h-9 w-9 items-center justify-center rounded-full"
                  >
                    <LucideIcon size={24} />
                  </div>
                  {/* label */}
                  <div className="mr-[14px] flex-1 text-[14px] font-medium text-[#333333]">
                    {doc.label}
                  </div>
                  {/* arrow logo */}
                  {!isAllPHovered && !!doc.subcategories?.docs?.length && (
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center opacity-0",
                        activeCategory === doc && "opacity-100",
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
        {!isAllPHovered &&
          activeCategory &&
          !!activeCategory.subcategories?.docs?.length && (
            <div
              style={{ boxShadow: "-2px -2px 10px -5px rgba(0,0,0,0.3) inset" }}
              className="text-custom-primary flex min-w-[280px] flex-col gap-y-3 bg-white pt-4 pb-8 pl-4"
            >
              <Link
                href={`/${activeCategory.name}`}
                onClick={() => setIsOpen(false)}
                className="mr-4 min-h-10 rounded-md px-4 py-2 font-semibold text-[#333]"
                style={
                  activeCategory
                    ? {
                        backgroundColor: adjustAlpha(
                          activeCategory.logoColor ?? "#111111",
                          0.3,
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
                {selectedCategory &&
                  (selectedCategory?.subcategories?.docs as Category[]).map(
                    (sub) => {
                      return (
                        <li
                          key={sub.id}
                          onMouseEnter={() => setActiveSubCategory(sub || null)}
                          onMouseLeave={() => setActiveSubCategory(null)}
                          className="flex min-h-10 cursor-pointer items-center rounded-sm pr-8 text-base text-[#333] hover:bg-[#f1f8ff]"
                          style={
                            activeSubCategory?.id === sub.id
                              ? {
                                  backgroundColor: adjustAlpha(
                                    activeCategory?.logoColor ?? "#111111",
                                    0.1,
                                  ),
                                }
                              : undefined
                          }
                        >
                          <Link
                            className="flex h-full min-h-10 w-full items-center"
                            href={`/${activeCategory.name}/${sub.name}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    },
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
            "flex-1 bg-transparent/50 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="cursor-pointer bg-transparent pt-4 pr-6 text-white">
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
