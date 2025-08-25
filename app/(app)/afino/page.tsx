export const dynamic = "force-dynamic";

import AfinoPage from "@/components/mycomponents/(pages)/AfinoPage";
import AllProductsPage from "@/components/mycomponents/(pages)/AllProductsPage";
import ProductListLayoutSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductListLayoutSkeleton";
import { ScrollToTopOnUrlChange } from "@/components/mycomponents/ScrollToTopOnUrlChange ";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Products_PageProps {
  serachParams: Promise<SearchParams>;
}

const Afino_page = async ({ serachParams }: Products_PageProps) => {
  const filters = await LoadProductFilters(serachParams);

  prefetch(trpc.products.getAfinoProducts.queryOptions({ ...filters }));
  prefetch(trpc.reviews.getMany.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>afino error boundary!!!!</div>}>
        <Suspense fallback={<ProductListLayoutSkeleton/>}>
          <ScrollToTopOnUrlChange />
          <AfinoPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Afino_page;
