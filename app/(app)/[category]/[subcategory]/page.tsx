export const dynamic = "force-dynamic";

import SubCategoryPage from "@/components/mycomponents/(pages)/SubCategoryPage";
import { ScrollToTopOnUrlChange } from "@/components/mycomponents/ScrollToTopOnUrlChange ";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { convertCatOrSubToId } from "@/lib/utils";
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

const SubCategory_Page = async ({
  serachParams,
  params,
}: SubCategory_PageProps) => {
  const { category, subcategory } = await params;

  const filters = await LoadProductFilters(serachParams);
  const id = convertCatOrSubToId(subcategory);
 

  if (!id) return <div>param loading</div>;
  prefetch(
    trpc.products.getSubCatProducts.queryOptions({ ...filters, Id: id })
  );
  prefetch(trpc.reviews.getSubReviews.queryOptions({ Id: id }));
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>subCategory error boundary!!!!</div>}>
        <Suspense fallback={<>subCategory loading</>}>
          <SubCategoryPage category={category} subcategory={subcategory} />
          <ScrollToTopOnUrlChange />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default SubCategory_Page;
