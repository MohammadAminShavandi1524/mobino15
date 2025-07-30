import SubCategoryPage from "@/components/mycomponents/SubCategoryPage";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SubCategory_PageProps {
  serachParams: Promise<SearchParams>;
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubCategory_Page = async ({ serachParams, params }: SubCategory_PageProps) => {
  const { category, subcategory } = await params;

  const filters = await LoadProductFilters(serachParams);

  prefetch(trpc.products.getMany.queryOptions({ ...filters }));
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>subCategory error boundary!!!!</div>}>
        <Suspense fallback={<>subCategory loading</>}>
          <SubCategoryPage category={category} subcategory={subcategory} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default SubCategory_Page;
