"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import ProductList from "@/components/mycomponents/ProductList";
import ProductListSkeleton from "@/components/mycomponents/ProductListSkeleton";
import { Category } from "@/payload-types";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { ArrowDownWideNarrow } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { convertToPersianNumber } from "@/lib/utils";
import Orderbar from "@/components/mycomponents/Orderbar";
import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import ProductsFilter from "@/components/mycomponents/ProductsFilter";

interface CategoryProps {}

const CategoryPage = ({}: CategoryProps) => {
  const [activeOrder, setActiveOrder] = useState<string>("Newest");

  const { category } = useParams();
  const trpc = useTRPC();

  const _categories = useQuery(trpc.categories.getMany.queryOptions());
  const categories = _categories.data;

  const _products = useQuery(trpc.products.getMany.queryOptions());
  const __products = _products.data;

  const selectedCategoryData = categories?.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  // محصولات فیلتر شده بر اساس کتگوری
  const products =__products &&  __products?.docs.filter((product) => {
    return product.category === selectedCategoryData?.id;
  });

  if (products) {
    switch (activeOrder) {
      case "MostPopular":
        products.sort((a, b) => b.rating - a.rating);
        break;

      case "HighestPrice":
        products.sort((a, b) => {
          const priceA = a.offPrice || a.price;
          const priceB = b.offPrice || b.price;
          return priceB - priceA;
        });
        break;

      case "LowestPrice":
        products.sort((a, b) => {
          const priceA = a.offPrice || a.price;
          const priceB = b.offPrice || b.price;
          return priceA - priceB;
        });
        break;

      case "BiggestDiscount":
        products.sort((a, b) => {
          const discountA = a.price - (a.offPrice || a.price);
          const discountB = b.price - (b.offPrice || b.price);
          return discountB - discountA;
        });

        break;

      default:
        products;
        break;
    }
  }

  // ? subcategory sorted by order

  selectedCategoryData &&
    (selectedCategoryData?.subcategories?.docs as Category[]).sort(
      (a, b) => a.order - b.order
    );

  // ?

  return (
    <div className="w90 flex flex-col">
      {/* bread crump and categories tags */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        <BreadCrump
          activePage="category"
          selectedCategoryData={selectedCategoryData}
        />
        {/* categories tags */}
        <div className="flex items-center gap-x-4 ">
          {selectedCategoryData &&
            (selectedCategoryData?.subcategories?.docs as Category[]).map(
              (sub) => {
                return (
                  <Link
                    href={`/${selectedCategoryData.name}/${sub.name}`}
                    key={sub.id}
                    className="px-6 py-2 text-[10px] text-[#81858b] border border-[#81858b] rounded-md
                    cursor-pointer"
                  >
                    {sub.label}
                  </Link>
                );
              }
            )}
        </div>
      </div>
      {/* product and product filters */}
      <div className="relative flex px-[10px] mt-8 gap-x-8">
        {/* filter*/}
       <ProductsFilter/>

        {/*orderbar and products list  */}
        <div className="flex flex-col h-[3000px] w-full   ">
          {/* order bar */}
          <Orderbar
            products={products}
            activeOrder={activeOrder}
            setActiveOrder={setActiveOrder}
          />

          {/* products list */}
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
