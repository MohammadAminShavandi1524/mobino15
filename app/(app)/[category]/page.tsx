export const dynamic = "force-dynamic";

import CategoryPage from "@/components/mycomponents/(pages)/CategoryPage";
import { ScrollToTopOnUrlChange } from "@/components/mycomponents/ScrollToTopOnUrlChange ";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { convertCatOrSubToId } from "@/lib/utils";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Category_PageProps {
  serachParams: Promise<SearchParams>;
  params: Promise<{
    category: string;
  }>;
}

const Category_Page = async ({ serachParams, params }: Category_PageProps) => {
  const { category } = await params;
 

  const id = convertCatOrSubToId(category);
  const filters = await LoadProductFilters(serachParams);

  if (!id) return <div>param loading</div>;

  prefetch(trpc.products.getCatProducts.queryOptions({ ...filters, Id: id }));
  prefetch(trpc.reviews.getCatReviews.queryOptions({ Id: id }));
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>category error boundary!!!!</div>}>
        <Suspense fallback={<>category loading</>}>
          <CategoryPage category={category} />
          <ScrollToTopOnUrlChange />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Category_Page;
