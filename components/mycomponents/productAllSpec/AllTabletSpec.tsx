"use client";

import {
  capitalizeFirstLetter,
  convertToPersianNumber,
  getBrandLabelFa,
  getClassification,
} from "@/lib/utils";
import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";

interface AllTabletSpecProps {
  product: Product;
}

const AllTabletSpec = ({ product }: AllTabletSpecProps) => {
  if (product.productType?.[0].blockType === "tablet") {
    const spec = product.productType?.[0];

    const getSpecNetwork = (network: string) => {
      const numberpart = network.split("")[0];
      const letterpart = network.split("")[1];
      return (
        convertToPersianNumber(numberpart) +
        " " +
        capitalizeFirstLetter(letterpart)
      );
    };
    return (
      <>
        <AllSpecCard title="برند" value={getBrandLabelFa(spec.brand)} />
        <AllSpecCard title="مدل" value={spec.model} />
        <AllSpecCard
          title="دسته بندی"
          value={getClassification(spec.classification as string)}
        />
        <AllSpecCard
          title="سیستم عامل"
          value={spec.os === "android" ? "اندروید" : spec.os}
        />
        <AllSpecCard title="نوع صفحه نمایش" value={spec.displayType} />

        <AllSpecCard
          title="سایز صفحه نمایش"
          value={`${convertToPersianNumber(spec.displaySize)} اینچ`}
        />
        <AllSpecCard
          title="وضوح نمایش"
          value={`${spec.displayResolution} پیکسل`}
        />

        <AllSpecCard title="نرخ تازه‌سازی" value={`${spec.refreshRate} هرتز`} />

        <AllSpecCard
          title="وضوح دوربین اصلی"
          value={`${spec.mainCameraResolution} مگاپیکسل`}
        />
        <AllSpecCard
          title="وضوح دوربین جلو"
          value={`${spec.frontCameraResolution} مگاپیکسل`}
        />

        <AllSpecCard
          title="نوع پردازنده - CPU"
          value={spec.chipset?.replace(/(\d+)\s*nm/i, "$1 نانومتری")}
        />

        <AllSpecCard
          title="تعداد هسته"
          value={`${convertToPersianNumber(spec.cpuCores)} هسته`}
        />

        <AllSpecCard title="پردازنده گرافیکی - GPU " value={spec.gpu} />

        <AllSpecCard
          title="حافظه RAM"
          value={spec.ram.replace("gb", " گیگابایت")}
        />
        <AllSpecCard
          title="حافظه داخلی"
          value={spec.storage
            ?.replace(/gb/i, " گیگابایت")
            ?.replace(/tb/i, " ترابایت")}
        />

        <AllSpecCard
          title="ظرفیت باتری"
          value={`${convertToPersianNumber(spec.batteryCapacity)} میلی آمپر ساعت`}
        />

        <AllSpecCard
          title="تعداد سیم‌کارت"
          value={
            spec.simSupport === "1"
              ? "یک سیم کارت"
              : spec.simSupport === "2"
                ? "دو سیم کارت"
                : "ندارد"
          }
        />
        <AllSpecCard
          title="شبکه اینترنت"
          value={getSpecNetwork(spec.network)}
        />
        <AllSpecCard
          title="ضد آب"
          value={spec.waterResistant ? "هست" : "نیست"}
        />
        <AllSpecCard
          title="ابعاد"
          value={`${convertToPersianNumber(spec.dimensions)} میلی متر`}
        />
        <AllSpecCard
          title="وزن"
          value={`${convertToPersianNumber(spec.weight)} گرم`}
        />

        <AllSpecCard title="اقلام همراه" value={spec.accessories || "ندارد"} />
      </>
    );
  }

  return <></>;
};

export default AllTabletSpec;
