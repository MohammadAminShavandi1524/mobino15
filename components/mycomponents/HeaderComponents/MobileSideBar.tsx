"use client";
import { Boxes, ChevronLeft, Smartphone } from "lucide-react";
import * as Icons from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../Logo";
import { CirclePercent, CircleX, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Category } from "@/payload-types";
import { cn } from "@/lib/utils";

interface MobileSideBarProps {
  categories: Category[];
}

const MobileSideBar = ({ categories }: MobileSideBarProps) => {
  const { toggleSidebar } = useSidebar();

  const selectedCategory = (category: Category) => {
    return categories.find((cat) => cat === category);
  };
  return (
    <Sidebar className="">
      <SidebarHeader className="p-3">
        <div className="flex justify-between items-center mb-5">
          <Logo
            logoImage_height={32}
            logoImage_width={32}
            text_className="hidden text-[24px]"
          />
          <button
            onClick={() => {
              toggleSidebar();
            }}
            className="p-1 cursor-pointer"
          >
            <X />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* become seller */}
        <SidebarGroup className="border-b border-b-[#d3d8e4] sm:hidden">
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            href=""
            className="flex items-center gap-x-3 "
          >
            <Image
              src="/shopicon.gif"
              alt="shopicon"
              width={24}
              height={24}
              unoptimized
            />
            <span className="font-medium text-custom-primary text-[14px]">
              فروشنده شو
            </span>
          </Link>
        </SidebarGroup>
        {/* optional pages */}

        <SidebarGroup className="border-b border-b-[#d3d8e4]">
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            href="/off"
            className="flex items-center gap-x-3 text-[#333333]"
          >
            <CirclePercent
              className="bounce-in-place"
              color="#b9375d"
              size={24}
            />
            <span className=" text-[14px]">شگفت انگیز ها</span>
          </Link>
        </SidebarGroup>
        <SidebarGroup className="border-b border-b-[#d3d8e4]">
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            href="/off"
            className="flex items-center gap-x-3 text-[#333333]"
          >
            <Image
              src="/infoicon.gif"
              alt="infoicon"
              width={24}
              height={24}
              unoptimized
            />
            <span className=" text-[14px]">درباره ما</span>
          </Link>
        </SidebarGroup>
        {/* <SidebarGroup className="border-b border-b-[#d3d8e4]">
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            href="/off"
            className="flex items-center gap-x-3 text-[#333333]"
          >
            <Image
              src="/walleticon.gif"
              alt="walleticon"
              width={24}
              height={24}
              unoptimized
            />
            <span className=" text-[14px]">خرید اقساطی</span>
          </Link>
        </SidebarGroup> */}
        {/* categories */}

        <SidebarGroup className="border-b border-b-[#d3d8e4]">
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            href={`/products`}
            className="flex items-center gap-x-3 text-[#333333]"
          >
            <Boxes color="#9cb8cc" size={24} />
            <span className="text-[#666666] text-[14px]">همه محصولات</span>
          </Link>
        </SidebarGroup>

        {categories.map((cat, index) => {
          const LucideIcon = Icons[
            cat.logo as keyof typeof Icons
          ] as Icons.LucideIcon;

          return (
            <Collapsible key={index} className="group/collapsible">
              <SidebarGroup className="py-3">
                <SidebarGroupLabel className="px-0" asChild>
                  <CollapsibleTrigger
                    className={cn("pb-2", index === 0 && "mt-2")}
                  >
                    <div className="flex justify-between items-center w-full text-[#666666]">
                      <div className="flex items-center gap-x-3">
                        <span>
                          <LucideIcon
                            color={cat.logoColor || "#111111"}
                            size={24}
                          />
                        </span>
                        <span className="text-[14px]">{cat.label}</span>
                      </div>
                      <div>
                        <ChevronLeft
                          size={16}
                          className="ml-auto transition-transform group-data-[state=open]/collapsible:-rotate-90"
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent
                  className="mr-[11.5px] border-r-[1.5px] border-r-[#d3d8e4]"
                  // style={{borderRightColor : cat.logoColor || "#d3d8e4"}}
                >
                  {(selectedCategory(cat)?.subcategories?.docs as Category[])
                    ?.sort(
                      (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
                    )
                    .map((sub, index) => {
                      return (
                        <Link
                          onClick={() => {
                            toggleSidebar();
                          }}
                          key={sub.id}
                          className={cn(
                            "block px-5 pr-6 py-2 text-[14px] text-[#555555]",
                            index === 0 && "mt-1"
                          )}
                          href={`/${cat.name}/${sub.name}`}
                        >
                          <li className={cn("list-none")}>{sub.label}</li>
                        </Link>
                      );
                    })}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};
export default MobileSideBar;
