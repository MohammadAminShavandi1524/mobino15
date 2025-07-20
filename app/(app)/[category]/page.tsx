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

interface CategoryProps {}

const CategoryPage = ({}: CategoryProps) => {
  const [activeOrder, setActiveOrder] = useState<string>("Newest");

  const { category } = useParams();
  const trpc = useTRPC();

  const _categories = useQuery(trpc.categories.getMany.queryOptions());
  const categories = _categories.data;

  const _products = useQuery(trpc.products.getMany.queryOptions());
  const products = _products.data;

  const selectedCategoryData = categories?.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  // ? sort by subcategory order

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
        <aside className="flex flex-col w-[270px] h-[150px] sticky top-0 right-0 border border-red-600 rounded-md">
          filter
        </aside>

        {/*orderbar and products list  */}
        <div className="flex flex-col h-[3000px] w-full   ">
          {/* order bar */}
          <Orderbar activeOrder={activeOrder} setActiveOrder={setActiveOrder} />

          {/* products list */}
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList products={products}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
