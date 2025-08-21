export const dynamic = "force-dynamic";

import SellerAuthPage from "@/components/mycomponents/(pages)/SellerAuthPage";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const SellerAuth_Page = async () => {
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>auth error boundary!!!!</div>}>
        <Suspense fallback={<>auth loading</>}>
          <SellerAuthPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default SellerAuth_Page;
