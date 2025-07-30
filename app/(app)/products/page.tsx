export const dynamic = "force-dynamic";

import AllProductsPage from "@/components/mycomponents/AllProductsPage";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Products_PageProps {
  serachParams: Promise<SearchParams>;

}

const Products_Page = async ({ serachParams }: Products_PageProps) => {
  const filters = await LoadProductFilters(serachParams);

  prefetch(trpc.products.getMany.queryOptions({ ...filters }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>header error boundary!!!!</div>}>
        <Suspense fallback={<>all products loading</>}>
          <AllProductsPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Products_Page;

