"use client";

import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";
import { convertToPersianNumber, getBrandLabelFa } from "@/lib/utils";
import {
  laptopCpuOptions,
  laptopGpuOptions,
} from "../(productMainSpec)/LaptopMainSpec";

interface AllLaptopSpecProps {
  product: Product;
}

const AllLaptopSpec = ({ product }: AllLaptopSpecProps) => {
  if (product.productType?.[0].blockType === "laptop") {
    const spec = product.productType?.[0];

    const getCpuLabel = (value: string | undefined) => {
      return (
        laptopCpuOptions.find((item) => item.value === value)?.label ?? "نامشخص"
      );
    };
    const getGpuLabel = (value: string | undefined) => {
      return (
        laptopGpuOptions.find((item) => item.value === value)?.label ?? "نامشخص"
      );
    };

    const getStorage = (
      storages: {
        type: "ssd" | "hdd";
        capacity: "64gb" | "128gb" | "256gb" | "512gb" | "1tb" | "2tb" | "4tb";
        id?: string | null;
      }[]
    ) => {
      return storages.map((storage) => {
        return (
          convertToPersianNumber(
            storage.capacity
              ?.replace(/gb/i, " گیگابایت")
              ?.replace(/tb/i, " ترابایت")
          ) +
          " " +
          storage.type
        );
      });
    };

    return (
      <>
        <AllSpecCard title="برند" value={getBrandLabelFa(spec.brand)} />
        <AllSpecCard title="مدل" value={spec.model} />
        <AllSpecCard title="نوع کاربری" value={spec.usage} />
        <AllSpecCard title="سری پردازنده" value={getCpuLabel(spec.cpuSeries)} />
        <AllSpecCard
          title="نسل پردازنده"
          value={convertToPersianNumber(spec.CPUProcessorGeneration)}
        />
        <AllSpecCard
          title="حافظه RAM"
          value={spec.ram.replace("gb", " گیگابایت")}
        />
        <AllSpecCard
          title="قابلیت ارتقای رم "
          value={spec.AbilityToUpgradeLaptopRAM ? "دارد" : "ندارد"}
        />
        <AllSpecCard
          title="ظرفیت حافظه داخلی"
          value={getStorage(spec.storages).join("، ")}
        />
        <AllSpecCard
          title="قابلیت ارتقای حافظه"
          value={spec.AbilityToUpgradeLaptopStorage ? "دارد" : "ندارد"}
        />
        <AllSpecCard
          title="سری گرافیک (GPU Series)"
          value={getGpuLabel(spec.gpuInfo.series)}
        />
        <AllSpecCard title="مدل گرافیک" value={spec.gpuInfo.model} />
        <AllSpecCard
          title="سایز صفحه نمایش"
           value={`${convertToPersianNumber(spec.DisplaySize)} اینچ`}
        />
        <AllSpecCard
          title="رزولوشن نمایشگر"
          value={`${spec.screenResolution}`}
        />
        <AllSpecCard title="اقلام همراه" value={spec.accessories || "ندارد"} />
      </>
    );
  }

  return <></>;
};

export default AllLaptopSpec;
