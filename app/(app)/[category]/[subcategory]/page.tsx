import { Category } from "@/payload-types";
import { getQueryClient, trpc } from "@/trpc/server";
import Link from "next/link";

interface SubCategoryProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Subcategory = async ({ params }: SubCategoryProps) => {
  const { category, subcategory } = await params;

  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  const selectedCategoryData = categories.docs.find((doc) => {
    const findedCategory = doc.name === category;
    return findedCategory;
  });

  const selectedSubCategoryData = (
    selectedCategoryData?.subcategories?.docs as Category[]
  ).find((sub) => {
    const findedSubCategory = sub.name === subcategory;
    return findedSubCategory;
  });

  return (
    <div className="flex flex-col w-full ">
      {/* bread crump  */}
      <div className="flex flex-col px-[10px] gap-y-4">
        {/* bread crump */}
        <div className="flex items-center gap-x-3 text-[12px] text-[#81858b]">
          <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
          <span>/</span>
          <Link className="" href={`/${selectedCategoryData?.name}`}>
            {selectedCategoryData?.label}
          </Link>
          <span>/</span>
          <Link
            className="text-[#000002]"
            href={`/${selectedCategoryData?.name}/${selectedSubCategoryData?.name}`}
          >
            {selectedSubCategoryData?.label}
          </Link>
        </div>
      </div>
      {/* product and product filters */}
    </div>
  );
};
export default Subcategory;
