export const dynamic = "force-dynamic";

import CartPage from "@/components/mycomponents/(pages)/CartPage";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Cart_Page = async () => {
  prefetch(trpc.products.getMany.queryOptions({}));
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>cart error boundary!!!!</div>}>
        <Suspense fallback={<>cart loading</>}>
          <CartPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Cart_Page;
