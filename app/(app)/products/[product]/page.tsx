"use client";

import BreadCrump from "@/components/mycomponents/BreadCrump";
import { useTRPC } from "@/trpc/client";
import { useParams } from "next/navigation";

const Product = () => {
  const { product } = useParams();
  const param = decodeURIComponent(product as string);

  // const trpc = useTRPC();
  // const _products = useQuery(
  //   trpc.products.getMany.queryOptions({
  //     ...filters,
  //   })
  // );

  return (
    <div className="w90 flex flex-col">
      {/* breadCrump */}

      {/* <BreadCrump 
      activePage="product"

      className="px-[10px]"
    /> */}
    </div>
  );
};
export default Product;
