export const dynamic = "force-dynamic";

import AuthPage from "@/components/mycomponents/(pages)/AuthPage";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Auth_Page = async () => {

  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>auth error boundary!!!!</div>}>
        <Suspense fallback={<>auth loading</>}>
          <AuthPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Auth_Page;
