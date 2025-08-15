export const dynamic = "force-dynamic";

import ProductPage from "@/components/mycomponents/(pages)/ProductPage";
import { LoadProductFilters } from "@/hooks/useProductFilter";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Category_PageProps {
  serachParams: Promise<SearchParams>;
  params: Promise<{
    product: string;
  }>;
}

const Category_Page = async ({ serachParams, params }: Category_PageProps) => {
  const { product } = await params;
  if (!product) return <div>param loading</div>;
  const orderParam = decodeURIComponent(product).split("_")[0];

  prefetch(trpc.products.getOneWithOrder.queryOptions({ order: orderParam }));
  prefetch(trpc.products.getOneWithDKP.queryOptions({ order: orderParam }));
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>product error boundary!!!!</div>}>
        <Suspense fallback={<>product loading</>}>
          <ProductPage product={product} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Category_Page;
