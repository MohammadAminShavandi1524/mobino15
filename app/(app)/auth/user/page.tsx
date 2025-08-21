export const dynamic = "force-dynamic";

import UserAuthPage from "@/components/mycomponents/(auth)/UserAuthPage";
import UserAuthSkeleton from "@/components/mycomponents/(skeletonComponets)/auth/UserAuthSkeleton";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const UserAuth_Page = async () => {
  prefetch(trpc.auth.session.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>user auth error boundary!!!!</div>}>
        <Suspense fallback={<UserAuthSkeleton />}>
          <UserAuthPage />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default UserAuth_Page;
