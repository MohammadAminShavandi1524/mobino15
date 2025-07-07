import Image from "next/image";
import Hello from "../components/mycomponents/Hello";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ThemeButton from "@/components/mycomponents/ThemeButton";

export default function Home() {
  return (
    <div className="max-w-[1920px] flex flex-col gap-y-3 text-3xl bg-primaryBackground text-center min-h-[1000px]">
      next 15 !!
      <div className="text-chart-1">
        <Hello />
      </div>
      <ThemeButton />
      <Button variant={"destructive"}>sss</Button>
      <div className="border-red-500 border w-10 h-10">
        <Checkbox />
      </div>
      <div className="flex items-center gap-x-3">
        <span className="text-border">موبینو </span>
        <span className="text-custom-primary">موبینو</span>
      </div>
    </div>
  );
}
