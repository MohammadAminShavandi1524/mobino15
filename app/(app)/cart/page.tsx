export const dynamic = "force-dynamic";

import CartPage from "@/components/mycomponents/(pages)/CartPage";
import CartPageSkeleton from "@/components/mycomponents/(skeletonComponets)/CartPageSkeleton";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Cart_Page = async () => {
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>cart error boundary!!!!</div>}>
        <Suspense fallback={<CartPageSkeleton/>}>
          <CartPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Cart_Page;
