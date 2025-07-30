import CategoryPage from "@/components/mycomponents/CategoryPage";
import { LoadProductFilters } from "@/hooks/useProductFilter";
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

  const filters = await LoadProductFilters(serachParams);

  prefetch(trpc.products.getMany.queryOptions({ ...filters }));
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>category error boundary!!!!</div>}>
        <Suspense fallback={<>category loading</>}>
          <CategoryPage category={category} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Category_Page;

