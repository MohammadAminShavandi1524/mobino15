"use client";
import {
  CirclePercent,
  Info,
  Menu,
  Search,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import Link from "next/link";
import ThemeButton from "./(theme)/ThemeButton";
import { useTheme } from "next-themes";
import Logo from "@/components/mycomponents/Logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import NavbarSidebar from "./(NavbarsideBar-components)/NavbarSidebar";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import HeaderSkeleton from "./(skeletonComponets)/HeaderSkeleton";

const Header = () => {
  const pathname = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [isBannerDisplayed, setIsBannerDisplayed] = useState<boolean>(true);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSideBarOpen]);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.auth.session.queryOptions());
  console.log("🚀 ~ Header ~ data:", data.user?.username)

  if (pathname === "/auth") {
    return <div className="hidden"></div>;
  }

  return (
    <header className="relative bg-background flex flex-col w-full mx-auto border-b border-b-[#d7dee0]">
      {/* sidebar */}

      <NavbarSidebar
        isOpen={isSideBarOpen}
        setIsOpen={setIsSideBarOpen}
        isBannerDisplayed={isBannerDisplayed}
      />

      {/* banners */}
      <Image
        className={cn("", isBannerDisplayed && "block")}
        src="/banner.png"
        alt="top banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="pt-4 max-w-[1920px] w-full mx-auto  px-6">
        {/* fixed part */}
        <div className="flex items-center justify-between mx-auto w-[90%] pb-6">
          {/* logo and searchbar */}
          <section className="flex items-center gap-x-6">
            {/* logo */}
            <Logo />
            {/* searchbar */}
            <div className=" flex gap-x-4 w-[600px] rounded-xl bg-[#f0f0f0] px-4 py-3">
              <span className="text-3xl text-gray-400">
                <Search />
              </span>
              <input
                placeholder="محصول، برند یا دسته مورد نظرتان را جستجو کنید"
                className="bg-[#f0f0f0] w-full text-sm"
                type="text"
              />
            </div>
          </section>
          {/* auth and cart button  */}
          <section className="flex items-center gap-x-6">
            {/* experimental admin panel button  */}
            <Button asChild variant={"default"}>
              <Link href="/admin">پنل ادمین</Link>
            </Button>

            {/* login/signup button */}

            <Link
              onClick={() => {
                setIsSideBarOpen(false);
              }}
              prefetch
              href="/auth"
              className="px-4 py-2 border  border-custom-primary rounded-lg text-[15px]
              "
            >
              <span className="pl-4 border-l border-custom-primary">ورود</span>
              <span className="pr-4">ثبت نام</span>
            </Link>

            {/* cart button */}
            <Link
              onClick={() => {
                setIsSideBarOpen(false);
              }}
              className="flex items-center justify-center text-primary w-10 h-10 border border-border
              rounded-md"
              href="/cart"
            >
              <ShoppingCart size={24} />
            </Link>
          </section>
        </div>
        {/* navbar */}
        <nav className="mx-auto w-[90%] flex items-center gap-x-4 text-[14px] text-[#666666] font-medium pb-3">
          {/* Product categories */}
          <motion.button
            key="modal"
            onClick={() => {
              setIsSideBarOpen(!isSideBarOpen);
            }}
            className={cn(
              "p-2.5 flex items-center gap-x-2 cursor-pointer rounded-md hover:bg-[#f1f8ff] hover:text-primary ",
              isSideBarOpen && "bg-[#f1f8ff] text-primary"
            )}
          >
            <span>
              <Menu />
            </span>
            <span>دسته بندی محصولات</span>
          </motion.button>
          {/* optional pages */}
          <div className="flex items-center gap-x-4 mx-2">
            <Link
              href="/off"
              className={cn(
                "p-2.5 flex items-center gap-x-2",
                pathname === "/off" && "border-b-destructive border"
              )}
            >
              <span>
                <CirclePercent />
              </span>
              <span>شگفت انگیز ها</span>
            </Link>
            <Link
              href="/aboutUs"
              className={cn(
                "p-2.5 flex items-center gap-x-2",
                pathname === "/aboutUs" && "border-b-destructive border-2"
              )}
            >
              <span>
                <Info />
              </span>
              <span>درباره ما</span>
            </Link>
            <Link
              href="/InstallmentPurchase"
              className="p-2.5 flex items-center gap-x-2"
            >
              <span>
                <Wallet />
              </span>
              <span>خرید اقساطی</span>
            </Link>
          </div>
          {/* seller login */}
          <Link href="" className="p-2.5 text-custom-primary">
            فروشنده شو
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
