import BreadCrump from "@/components/mycomponents/BreadCrump";
import ProductList from "@/components/mycomponents/ProductList";
import ProductListSkeleton from "@/components/mycomponents/ProductListSkeleton";
import { Category } from "@/payload-types";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import Link from "next/link";
import { Suspense } from "react";

interface CategoryProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryProps) => {
  const { category } = await params;

  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  const products = await queryClient.fetchQuery(
    trpc.products.getMany.queryOptions()
  );
  console.log("🚀 ~ CategoryPage ~ products:", products);

  const selectedCategoryData = categories.docs.find((doc) => {
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
      <div className="flex flex-col gap-y-6">
        {/* filters and sort */}
        <div className=""></div>
        {/* products list */}

        <Suspense fallback={<ProductListSkeleton />}>
          {/* <ProductList /> */}
          {JSON.stringify(products, null, 2)}
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;
