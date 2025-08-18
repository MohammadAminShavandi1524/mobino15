"use client";
import dynamic from "next/dynamic";
import { CirclePercent, Info, Menu, ShoppingCart, Wallet } from "lucide-react";

import Link from "next/link";
import Logo from "@/components/mycomponents/Logo";
import Image from "next/image";
import { cn, convertToPersianNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarSidebar from "./NavbarSidebar";
import { motion } from "framer-motion";

import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useCart } from "@/modules/checkout/hooks/useCart";
import SearchBar from "./SearchBar";

import MobileSideBar from "./MobileSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LoadingDots from "../LoadingDots";

const AuthBtn = dynamic(
  () => import("../(auth)/AuthBtn").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        className=" min-w-[60px] lg:min-w-[140px] h-8 sm:h-10 px-2.5 py-1.25 sm:px-4 sm:py-2 border  border-custom-primary rounded-lg text-[15px]
            flex justify-center items-center "
      >
        <LoadingDots size={2.5} />
      </div>
    ),
  }
);

const CartBtn = dynamic(() => import("./CartBtn").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div
      className="relative flex items-center justify-center text-primary size-8 sm:size-10 border border-border
              rounded-md"
    >
      <ShoppingCart size={24} />
      {/* cart item count */}
      <div
        className={cn(
          "absolute -bottom-[3px] -right-[4px] sm:-bottom-[3px] sm:-right-[3px]  size-4 sm:size-5 flex justify-center items-center border border-[#14a0de] bg-[#14a0de] text-white text-xs z-5 p-[3px] pt-[4px] rounded-full pb-[4px]"
        )}
      >
        {convertToPersianNumber(0)}
      </div>
    </div>
  ),
});

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
  const user = useSuspenseQuery(trpc.auth.session.queryOptions()).data.user;
  

  // *** cart item count ***

  const categories = useSuspenseQuery(trpc.categories.getMany.queryOptions())
    .data.docs;

  const { getCartByUser } = useCart(user?.username);

  const userProductIds: { productId: string; count: number }[] =
    getCartByUser();
  const productIds: string[] = [];
  userProductIds.flatMap((o) => productIds.push(o.productId));

  const userCartProducts = useQuery(
    trpc.products.getCartProducts.queryOptions({ productIds: productIds })
  ).data?.docs;

  const availableProductIds = new Set(
    userCartProducts
      ?.filter((product) => product.available && product.quantity > 0)
      .map((product) => product.id)
  );

  const cartItemCount =
    userProductIds?.reduce((acc, curr) => {
      if (availableProductIds.has(curr.productId)) {
        return acc + curr.count;
      }
      return acc;
    }, 0) ?? 0;

  // ************************************************************************

  if (pathname === "/auth") {
    return <div className="hidden"></div>;
  }

  return (
    <header className="relative bg-background flex flex-col w-full max-h-full mx-auto border-b border-b-[#d7dee0]">
      {/* banners */}
      <Image
        className={cn("", isBannerDisplayed && "block", "max-xl:hidden")}
        src="/banner.png"
        alt="top banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <SidebarProvider>
        {/*mobile sidebar */}
        <div>
          <MobileSideBar categories={categories} />
        </div>
        {/*pc sidebar shown in more than 1024 devices */}
        <NavbarSidebar
          isOpen={isSideBarOpen}
          setIsOpen={setIsSideBarOpen}
          isBannerDisplayed={isBannerDisplayed}
        />

        <div className="max-w-[1920px] w-full mx-auto px-6 py-4 lg:pb-0">
          {/* pc  */}
          {/* fixed part shown in more than 1024 devices*/}
          <div className="flex items-center justify-between mx-auto w-[90%] pb-6 max-lg:hidden">
            {/* logo and searchbar */}
            <section className="flex items-center gap-x-6">
              {/* logo */}
              <Logo />

              {/* searchbar */}
              <SearchBar />
            </section>
            {/* auth and cart button  */}
            <section className="flex items-center gap-x-6">
              {/* login/signup button */}

              <AuthBtn user={user} setIsSideBarOpen={setIsSideBarOpen} />

              {/* cart button */}
              <CartBtn
                cartItemCount={cartItemCount}
                setIsSideBarOpen={setIsSideBarOpen}
              />
            </section>
          </div>

          {/*navbar shown in more than 1024 devices */}
          <nav className="mx-auto w-[90%] flex items-center gap-x-4 text-[14px] text-[#666666] font-medium pb-3 max-lg:hidden">
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
                href="/afino"
                className={cn("p-2.5 flex items-center gap-x-2")}
              >
                <span>
                  <CirclePercent />
                </span>
                <span>شگفت انگیز ها</span>
              </Link>
              <Link
                href="/aboutUs"
                className={cn("p-2.5 flex items-center gap-x-2")}
              >
                <span>
                  <Info />
                </span>
                <span>درباره ما</span>
              </Link>
              {/* <Link
                href="/InstallmentPurchase"
                className="p-2.5 flex items-center gap-x-2"
              >
                <span>
                  <Wallet />
                </span>
                <span>خرید اقساطی</span>
              </Link> */}
            </div>
            {/* seller login */}
            <Link href="" className="p-2.5 text-custom-primary">
              فروشنده شو
            </Link>
          </nav>

          {/* ******************************************************************************** */}

          {/* mobile and tablet */}

          <div className="flex items-center justify-between lg:hidden">
            <SidebarTrigger className="size-8 p-1 " />

            <div>
              <Logo
                logoImage_height={32}
                logoImage_width={32}
                text_className="text-[24px]"
              />
            </div>
            <div className="flex items-center gap-x-3">
              <div>
                <CartBtn
                  cartItemCount={cartItemCount}
                  setIsSideBarOpen={setIsSideBarOpen}
                />
              </div>
              <div>
                <AuthBtn user={user} setIsSideBarOpen={setIsSideBarOpen} />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-4 sm:gap-x-20 mt-5  lg:hidden">
            {/* searchbar */}
            <div className="w-full">
              <SearchBar />
            </div>
            {/* seller login */}
            <div className="hidden sm:block min-w-[100px] text-center py-2 text-[12px] sm:text-[14px] sm:text-base">
              <Link href="" className="text-custom-primary">
                فروشنده شو
              </Link>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </header>
  );
};

export default Header;
