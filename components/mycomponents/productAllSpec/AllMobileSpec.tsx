"use client";

import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";
import {
  capitalizeFirstLetter,
  convertToPersianNumber,
  getBrandLabelFa,
  getClassification,
} from "@/lib/utils";

interface AllMobileSpecProps {
  product: Product;
}

const AllMobileSpec = ({ product }: AllMobileSpecProps) => {
  if (product.productType?.[0].blockType === "mobile") {
    const spec = product.productType?.[0];

    const getSpecNetwork = (network: string) => {
      const [numberpart, letterpart] = network.split("");
      return (
        convertToPersianNumber(numberpart) + capitalizeFirstLetter(letterpart)
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
          value={`${spec.FrontCameraResolution} مگاپیکسل`}
        />
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
          title="نوع پردازنده - CPU"
          value={spec.chipset?.replace(/(\d+)\s*nm/i, "$1 نانومتری")}
        />

        <AllSpecCard
          title="تعداد هسته"
          value={`${convertToPersianNumber(spec.cpuCores)} هسته`}
        />
        <AllSpecCard title="پردازنده گرافیکی - GPU " value={spec.gpu} />
        <AllSpecCard
          title="ظرفیت باتری"
          value={`${convertToPersianNumber(spec.batteryCapacity)} میلی آمپر ساعت`}
        />
        <AllSpecCard
          title="تعداد سیم‌کارت"
          value={`${convertToPersianNumber(spec.simCount)} سیم کارت`}
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

export default AllMobileSpec;
