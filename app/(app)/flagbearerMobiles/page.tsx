export const dynamic = "force-dynamic";

import AfinoPage from "@/components/mycomponents/(pages)/AfinoPage";
import AllProductsPage from "@/components/mycomponents/(pages)/AllProductsPage";
import FlagBearerMobilesPage from "@/components/mycomponents/(pages)/FlagBearerMobilesPage";
import ProductListLayoutSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductListLayoutSkeleton";

import { ScrollToTopOnUrlChange } from "@/components/mycomponents/ScrollToTopOnUrlChange ";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface FlagBearer_MobilesProps {
  serachParams: Promise<SearchParams>;
}

const FlagBearer_Mobiles = async ({
  serachParams,
}: FlagBearer_MobilesProps) => {
  const filters = await LoadProductFilters(serachParams);

  prefetch(
    trpc.products.getّFlagbearerMobilesProducts.queryOptions({ ...filters }),
  );
  prefetch(trpc.reviews.getMany.queryOptions());
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>FlagBearerMobiles error boundary!!!!</div>}>
        <Suspense fallback={<ProductListLayoutSkeleton/>}>
          <ScrollToTopOnUrlChange />
          <FlagBearerMobilesPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default FlagBearer_Mobiles;
