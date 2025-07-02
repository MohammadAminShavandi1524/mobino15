import Image from "next/image";
import Hello from "./mycomponents/Hello";
import ThemeButton from "./mycomponents/ThemeButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-3xl bg-primaryBackground text-center ">
      next 15 !!
      <div className="text-chart-1">
        <Hello />
      </div>
      <ThemeButton />
      <Button variant={"destructive"}>sss</Button>
    </div>
  );
}
