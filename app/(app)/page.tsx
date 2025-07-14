
import Image from "next/image";
import Hello from "../../components/mycomponents/Hello";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ThemeButton from "@/components/mycomponents/ThemeButton";
import NavbarSidebar from "@/components/mycomponents/(NavbarsideBar-components)/NavbarSidebar";
import { getQueryClient, trpc } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default async function Home() {

  
  // SERVER

  // const queryClient = getQueryClient();
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

  // console.log("🚀 ~ Home ~ categories:", categories);

  // CLIENT 

  // const trpc = useTRPC();
  // const categories = useQuery(trpc.categories.getMany.queryOptions());
  


  // console.log("🚀 ~ Home ~ categories:", categories.data);







  return (
    <div className="max-w-[1920px] flex flex-col gap-y-3 text-3xl bg-primaryBackground text-center min-h-[1000px]"></div>
  );
}
