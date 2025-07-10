import configPromise from "@payload-config";
import { getPayload } from "payload";

import Image from "next/image";
import Hello from "../../components/mycomponents/Hello";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ThemeButton from "@/components/mycomponents/ThemeButton";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
  });

  return (
    <div className="max-w-[1920px] flex flex-col gap-y-3 text-3xl bg-primaryBackground text-center min-h-[1000px]"></div>
  );
}
