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
      <div className="border-custom-primary flex h-8 min-w-[60px] items-center justify-center rounded-lg border px-2.5 py-1.25 text-[15px] sm:h-10 sm:px-4 sm:py-2 lg:min-w-[140px]">
        <LoadingDots size={2.5} />
      </div>
    ),
  },
);

const CartBtn = dynamic(() => import("./CartBtn").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="text-primary border-border relative flex size-8 items-center justify-center rounded-md border sm:size-10">
      <ShoppingCart size={24} />
      {/* cart item count */}
      <div
        className={cn(
          "absolute -right-[4px] -bottom-[3px] z-5 flex size-4 items-center justify-center rounded-full border border-[#14a0de] bg-[#14a0de] p-[3px] pt-[4px] pb-[4px] text-xs text-white sm:-right-[3px] sm:-bottom-[3px] sm:size-5",
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
  console.log(user?.roles);
  // *** cart item count ***

  const categories = useSuspenseQuery(trpc.categories.getMany.queryOptions())
    .data.docs;

  const { getCartByUser } = useCart(user?.username);

  const userProductIds: { productId: string; count: number }[] =
    getCartByUser();
  const productIds: string[] = [];
  userProductIds.flatMap((o) => productIds.push(o.productId));

  const userCartProducts = useQuery(
    trpc.products.getCartProducts.queryOptions({ productIds: productIds }),
  ).data?.docs;

  const availableProductIds = new Set(
    userCartProducts
      ?.filter((product) => product.available && product.quantity > 0)
      .map((product) => product.id),
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
    <header className="bg-background relative mx-auto flex max-h-full w-full flex-col border-b border-b-[#d7dee0]">
      {/* banners pc */}
      <div className="hidden lg:block">
        <Link href="/Monitor" className="relative block h-15 w-full">
          <Image
            src="/banner.gif"
            alt="banner"
            fill
            unoptimized
            className="object-cover object-center"
          />
        </Link>
      </div>
      {/* banners mobile */}
      <div className="block lg:hidden">
        <Link
          href="/Monitor"
          className="h-10.5 relative block s:h-14 w-full sm:h-16 md:h-20"
        >
          <Image
            src="/mobilebanner.gif"
            alt="mobilebanner"
            fill
            unoptimized
            className="object-cover object-center"
          />
        </Link>
      </div>

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

        <div className="mx-auto w-full max-w-[1920px] px-6 py-4 lg:pb-0">
          {/* pc  */}
          {/* fixed part shown in more than 1024 devices*/}
          <div className="mx-auto flex w-[90%] items-center justify-between pb-6 max-lg:hidden">
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
          <nav className="mx-auto flex w-[90%] items-center gap-x-4 pb-3 text-[14px] font-medium text-[#666666] max-lg:hidden">
            {/* Product categories */}
            <motion.button
              key="modal"
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
              }}
              className={cn(
                "hover:text-primary flex cursor-pointer items-center gap-x-2 rounded-md p-2.5 hover:bg-[#f1f8ff]",
                isSideBarOpen && "text-primary bg-[#f1f8ff]",
              )}
            >
              <span>
                <Menu />
              </span>
              <span>دسته بندی محصولات</span>
            </motion.button>
            {/* optional pages */}
            <div className="mx-2 flex items-center gap-x-4">
              <Link
                href="/afino"
                className={cn("flex items-center gap-x-2 p-2.5")}
              >
                <span>
                  <CirclePercent />
                </span>
                <span>شگفت انگیز ها</span>
              </Link>
              <Link
                href="/aboutUs"
                className={cn("flex items-center gap-x-2 p-2.5")}
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
            <Link href="" className="text-custom-primary p-2.5">
              فروشنده شو
            </Link>
          </nav>

          {/* ******************************************************************************** */}

          {/* mobile and tablet */}

          <div className="flex items-center justify-between lg:hidden">
            <SidebarTrigger className="size-8 p-1" />

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
          <div className="mt-5 flex items-center justify-between gap-x-4 sm:gap-x-20 lg:hidden">
            {/* searchbar */}
            <div className="w-full">
              <SearchBar />
            </div>
            {/* seller login */}
            <div className="hidden min-w-[100px] py-2 text-center text-[12px] sm:block sm:text-base sm:text-[14px]">
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
