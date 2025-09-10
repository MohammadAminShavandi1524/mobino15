"use client";

import { useProductFilters } from "@/hooks/useProductFilter";
import { Category, Product, Review } from "@/payload-types";
import { Dispatch, SetStateAction, useState } from "react";
import BreadCrump from "./BreadCrump";
import Link from "next/link";
import ProductFilters from "./(product_filters)/ProductFilters";
import Orderbar from "./Orderbar";
import ProductList from "./ProductList";

import {
  MobileOverview,
  LaptopOverview,
  TabletOverview,
  HeadphoneOverview,
  SmartWatchOverview,
  MonitorOverview,
} from "./ProductOverview/Cat";

import {
  // موبایل
  XiaomiPhoneOverview,
  HonorPhoneOverview,
  RealmePhoneOverview,
  SamsungPhoneOverview,
  IPhoneOverview,

  // لپ‌تاپ
  DellLaptopOverview,
  MSILaptopOverview,
  AcerLaptopOverview,
  HPLaptopOverview,
  LenovoLaptopOverview,
  AsusLaptopOverview,
  AppleLaptopOverview,

  // تبلت
  LenovoTabletOverview,
  MicrosoftTabletOverview,
  SamsungTabletOverview,
  AppleTabletOverview,

  // هدفون
  TscoHeadphonesOverview,
  AnkerHeadphonesOverview,
  RazerHeadphonesOverview,
  BeatsHeadphonesOverview,

  // ساعت هوشمند
  XiaomiSmartWatchOverview,
  SamsungSmartwatchOverview,
  AppleWatchOverview,

  // مانیتور
  AcerMonitorOverview,
  LGMonitorOverview,
  DellMonitorOverview,
  SamsungMonitorOverview,
  ASUSMonitorOverview,
} from "./ProductOverview/Sub";
import AfinoOverview from "./ProductOverview/custom/AfinoOverview";
import FlagbearerMobilesOverview from "./ProductOverview/custom/FlagbearerMobilesOverview";

const categoryMap: Record<string, React.ReactNode> = {
  mobile: <MobileOverview />,
  laptop: <LaptopOverview />,
  tablet: <TabletOverview />,
  Headphones: <HeadphoneOverview />,
  SmartWatch: <SmartWatchOverview />,
  Monitor: <MonitorOverview />,
};

const SubCategoryMap: Record<string, React.ReactNode> = {
  //* موبایل
  XiaomiPhone: <XiaomiPhoneOverview />,
  iPhone: <IPhoneOverview />,
  samsungPhone: <SamsungPhoneOverview />,
  HonorPhone: <HonorPhoneOverview />,
  RealmePhone: <RealmePhoneOverview />,

  //* لپ‌تاپ
  DellLaptop: <DellLaptopOverview />,
  MSILaptop: <MSILaptopOverview />,
  AcerLaptop: <AcerLaptopOverview />,
  HPLaptop: <HPLaptopOverview />,
  lenovoLaptop: <LenovoLaptopOverview />,
  asusLaptop: <AsusLaptopOverview />,
  appleLaptop: <AppleLaptopOverview />,

  //* تبلت
  LenovoTablet: <LenovoTabletOverview />,
  MicrosoftTablet: <MicrosoftTabletOverview />,
  SamsungTablet: <SamsungTabletOverview />,
  AppleTablet: <AppleTabletOverview />,

  //* هدفون
  TscoHeadphones: <TscoHeadphonesOverview />,
  AnkerHeadphones: <AnkerHeadphonesOverview />,
  RazerHeadphones: <RazerHeadphonesOverview />,
  BeatsHeadphones: <BeatsHeadphonesOverview />,

  //* ساعت هوشمند
  XiaomiSmartWatch: <XiaomiSmartWatchOverview />,
  SamsungSmartwatch: <SamsungSmartwatchOverview />,
  AppleWatch: <AppleWatchOverview />,

  //* مانیتور
  AcerMonitor: <AcerMonitorOverview />,
  LGMonitor: <LGMonitorOverview />,
  DellMonitor: <DellMonitorOverview />,
  SamsungMonitor: <SamsungMonitorOverview />,
  ASUSMonitor: <ASUSMonitorOverview />,
};

interface ProductListLayoutProps {
  breadCrupActivePage:
    | "category"
    | "subcategory"
    | "all"
    | "afino"
    | "flagBearerMobiles";
  ProductsFiltersActivePage: "category" | "all" | "SubCategory" | "custom";
  selectedCategoryData?: Category | undefined;
  selectedSubCategoryData?: Category | undefined;
  isCategory: boolean;
  products: Product[] | undefined | null;
  reviews: Review[] | undefined | null;
  isCustomProductOverview?: "afino" | "flagBearerMobiles";
}

const ProductListLayout = ({
  ProductsFiltersActivePage,
  breadCrupActivePage,
  isCategory,
  products,
  reviews,
  selectedCategoryData,
  selectedSubCategoryData,
  isCustomProductOverview,
}: ProductListLayoutProps) => {
  
  // console.log(
  //   "🚀 ~ ProductListLayout ~ selectedSubCategoryData:",
  //   selectedSubCategoryData?.name,
  // );
  const [isFiltersOpened, setIsFiltersOpened] = useState(true);
  const [productslength, setProductslength] = useState<number>(0);
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="lg:w-[90%] mt-4 flex flex-col lg:mx-auto lg:max-w-[1920px] lg:px-6">
      {/* bread crump and categories tags */}
      <div className="flex flex-col gap-y-4 px-4.5 lg:px-[10px]">
        <div className="px-1">
           {/* bread crump */}
        {breadCrupActivePage === "category" ? (
          <BreadCrump
            activePage="category"
            category={selectedCategoryData?.name}
          />
        ) : breadCrupActivePage === "subcategory" ? (
          <BreadCrump
            activePage="subcategory"
            category={selectedCategoryData?.name}
            subCategory={selectedSubCategoryData?.name}
            className="px-[10px]"
          />
        ) : breadCrupActivePage === "afino" ? (
          <BreadCrump activePage="afino" />
        ) : breadCrupActivePage === "all" ? (
          <BreadCrump activePage="all" />
        ) : (
          <BreadCrump activePage="flagBearerMobiles" />
        )}
        </div>
       

        {/* categories tags */}

        {isCategory && (
          <div className="flex flex-wrap items-center gap-x-3 s:gap-x-4 gap-y-2">
            {selectedCategoryData &&
              (selectedCategoryData?.subcategories?.docs as Category[]).map(
                (sub, index) => {
                  return (
                    <Link
                      href={`/${selectedCategoryData.name}/${sub.name}`}
                      key={index}
                      className="shrink-0 cursor-pointer rounded-md border border-[#81858b] px-6 py-2 text-[10px] text-[#81858b]"
                    >
                      {sub.label}
                    </Link>
                  );
                },
              )}
          </div>
        )}

      </div>

      {/* product and product filters */}

      {isFiltersOpened ? (
        <div className="relative mt-4 flex gap-x-8 lg:mt-8 lg:px-[10px]">
          {/* filter*/}
          <ProductFilters
            activePage={ProductsFiltersActivePage}
            isFiltersOpened={isFiltersOpened}
            setIsFiltersOpened={setIsFiltersOpened}
          />

          {/*orderbar and products list  */}
          <div className="flex w-full flex-col">
            {/* order bar */}
            <Orderbar
              activePage={ProductsFiltersActivePage}
              sorts={filters.sort}
              setFilters={setFilters}
              products={products}
              productslength={productslength}
            />

            {/* products list */}

            <ProductList
              products={products}
              reviews={reviews}
              isFiltersOpened={isFiltersOpened}
              isAfinoPage={breadCrupActivePage === "afino"}
              setProductslength={setProductslength}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 lg:mt-8 flex w-full flex-col gap-y-5 px-[10px]">
          {/* filters and orderbar */}
          <div className="flex gap-x-5">
            <ProductFilters
              activePage={ProductsFiltersActivePage}
              isFiltersOpened={isFiltersOpened}
              setIsFiltersOpened={setIsFiltersOpened}
            />
            <Orderbar
              activePage={ProductsFiltersActivePage}
              sorts={filters.sort}
              setFilters={setFilters}
              products={products}
              productslength={productslength}
            />
          </div>
          {/* product list */}

          <ProductList
            isFiltersOpened={isFiltersOpened}
            products={products}
            reviews={reviews}
            isAfinoPage={breadCrupActivePage === "afino"}
            setProductslength={setProductslength}
          />
        </div>
      )}
      {/* product overviews Cat*/}

      {isCategory &&
        selectedCategoryData?.name &&
        categoryMap[selectedCategoryData.name]}

      {/* product overviews Sub*/}
      {selectedSubCategoryData?.name &&
        SubCategoryMap[selectedSubCategoryData.name]}

      {/* product overviews Custom*/}
      {isCustomProductOverview === "afino" && <AfinoOverview />}
      {isCustomProductOverview === "flagBearerMobiles" && (
        <FlagbearerMobilesOverview />
      )}
    </div>
  );
};

export default ProductListLayout;
