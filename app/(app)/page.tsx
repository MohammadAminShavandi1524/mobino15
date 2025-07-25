export const dynamic = "force-dynamic";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ThemeButton from "@/components/mycomponents/(theme)/ThemeButton";
import NavbarSidebar from "@/components/mycomponents/(NavbarsideBar-components)/NavbarSidebar";
import { getQueryClient, trpc } from "@/trpc/server";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Category } from "@/payload-types";

export default async function Home() {
  // SERVER

  // const queryClient = getQueryClient();
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

  // console.log("🚀 ~ Home ~ categories:", categories);

  // CLIENT

  // const trpc = useTRPC();
  // const { data } = useSuspenseQuery(trpc.auth.session.queryOptions());

  // console.log("🚀 ~ Home ~ data:", data?.user)

  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  return (
    <div className=" w90 flex flex-col gap-y-6 text-3xl bg-primaryBackground  min-h-[1000px] ">
      {categories.docs.map((category) => {
        return (
          <div key={category.id}>
            <div className="flex items-center   ">
              <span className="px-6 py-3 border border-custom-primary rounded-md">
                category id : {category.id}
              </span>
              <span className="px-6 py-3 border border-custom-primary rounded-md">
                category name : {category.name}
              </span>
            </div>
            <div>
              {(category.subcategories?.docs as Category[]).map((sub) => {
                return (
                  <div className="flex  gap-y-4" key={sub.id}>
                    <span className="px-6 py-3 border border-custom-primary rounded-md">
                      subCategory id : {sub.id}
                    </span>
                    <span className="px-6 py-3 border border-custom-primary rounded-md">
                      subCategory name : {sub.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
