import { Category } from "@/payload-types";
import { getQueryClient, trpc } from "@/trpc/server";
import Link from "next/link";

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

  const selectedCategoryData = categories.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  return (
    <div className="flex flex-col w-full ">
      {/* bread crump and categories tags */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        <div className="flex items-center gap-x-3 text-[12px] text-[#81858b]">
          <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
          <span>/</span>
          <Link className="text-[#000002]" href={""}>
            {selectedCategoryData?.label}
          </Link>
        </div>
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
    </div>
  );
};
export default CategoryPage;
