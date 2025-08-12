"use client";

import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";
import {
  capitalizeFirstLetter,
  convertToPersianNumber,
  getBrandLabelFa,
  getMonitorUsage,
  getResolutionInfo,
} from "@/lib/utils";

interface AllMonitorSpecProps {
  product: Product;
}

const AllMonitorSpec = ({ product }: AllMonitorSpecProps) => {
  if (product.productType?.[0].blockType === "monitor") {
    const spec = product.productType?.[0];

    return (
      <>
        <AllSpecCard title="برند" value={getBrandLabelFa(spec.brand)} />
        <AllSpecCard
          title="نوع کاربری"
          value={getMonitorUsage(spec.usageType)}
        />
        <AllSpecCard
          title="سایز صفحه نمایش"
          value={`${convertToPersianNumber(spec.displaySize)} اینچ`}
        />
        <AllSpecCard
          title="نوع پنل"
          value={capitalizeFirstLetter(spec.panelType)}
        />
        <AllSpecCard
          title="نوع صفحه نمایش"
          value={spec.screenType === "curved" ? "خمیده" : "تخت"}
        />
        <AllSpecCard
          title="رزولوشن"
          value={`${convertToPersianNumber(getResolutionInfo(spec.resolution)?.resolution as string)} پیکسل`}
        />
        <AllSpecCard
          title="وضوح تصویر"
          value={getResolutionInfo(spec.resolution)?.quality as string}
        />
        <AllSpecCard
          title="تعداد رنگ قابل نمایش"
          value={convertToPersianNumber(spec.colorCount)}
        />
        <AllSpecCard
          title="زمان پاسخ‌گویی"
          value={`${convertToPersianNumber(spec.responseTime)} میلی ثانیه`}
        />
        <AllSpecCard
          title="اقلام همراه"
          value={
            spec.accessories && spec.accessories.length > 0
              ? spec.accessories.join(" , ")
              : "ندارد"
          }
        />
      </>
    );
  }

  return <></>;
};

export default AllMonitorSpec;
