import BreadCrump from "@/components/mycomponents/BreadCrump";
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
    <div className="w90 flex flex-col ">
      {/* bread crump */}
      <BreadCrump
        activePage="subcategory"
        selectedCategoryData={selectedCategoryData}
        selectedSubCategoryData={selectedSubCategoryData}
        className="px-[10px]"
      />

      {/* product and product filters */}
    </div>
  );
};
export default Subcategory;
