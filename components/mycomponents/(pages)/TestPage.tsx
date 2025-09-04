"use client";

import { cn } from "@/lib/utils";
import Skeleton from "../(skeletonComponets)/Skleton";
import HeaderSkeleton from "../(skeletonComponets)/HeaderSkeleton";
import ProductListLayoutSkeleton from "../(skeletonComponets)/ProductListLayoutSkeleton";
import SellerAuthSkeleton from "../(skeletonComponets)/auth/SellerAuthSkeleton";

const TestPage = () => {
  return (
    <>
      
      <SellerAuthSkeleton />
    </>
  );
};

export default TestPage;
