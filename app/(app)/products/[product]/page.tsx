export const dynamic = "force-dynamic";

import ProductPage from "@/components/mycomponents/(pages)/ProductPage";
import ProductPageSkeleton from "@/components/mycomponents/(skeletonComponets)/ProductPageSkeleton";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Product_PageProps {
  serachParams: Promise<SearchParams>;
  params: Promise<{
    product: string;
  }>;
}

const Product_Page = async ({ serachParams, params }: Product_PageProps) => {
  const { product } = await params;
  if (!product) return <div>param loading</div>;
  const orderParam = decodeURIComponent(product).split("_")[0];

  prefetch(trpc.products.getOneWithOrder.queryOptions({ order: orderParam }));
  prefetch(trpc.products.getOneWithDKP.queryOptions({ order: orderParam }));
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>product error boundary!!!!</div>}>
        <Suspense fallback={<ProductPageSkeleton/>}>
          <ProductPage product={product} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Product_Page;
