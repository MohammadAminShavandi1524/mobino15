"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../Logo";
import { CirclePercent, CircleX, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileSideBarProps {}

const MobileSideBar = ({}: MobileSideBarProps) => {
  const { toggleSidebar } = useSidebar();
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
        <SidebarGroup>
          <Link href="" className="flex items-center gap-x-3 ">
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

        <SidebarGroup>
          <Link
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
        <SidebarGroup>
          <Link
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
        <SidebarGroup>
          <Link
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
        </SidebarGroup>
        {/* categories */}
      </SidebarContent>
    </Sidebar>
  );
};
export default MobileSideBar;
