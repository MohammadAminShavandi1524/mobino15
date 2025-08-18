"use client";

import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";
import {
  convertToPersianNumber,
  getBrandLabelFa,
  getCompatibilityLabels,
  getSensors,
  getStrapMaterial,
} from "@/lib/utils";

interface AllSmartwatchSpecProps {
  product: Product;
}

const AllSmartwatchSpec = ({ product }: AllSmartwatchSpecProps) => {
  if (product.productType?.[0].blockType === "smartwatch") {
    const spec = product.productType?.[0];

    return (
      <>
        <AllSpecCard title="برند" value={getBrandLabelFa(spec.brand)} />
        <AllSpecCard
          title="سازگاری"
          value={getCompatibilityLabels(spec.compatibility).join(" ,")}
        />
        <AllSpecCard
          title="بلوتوث"
          value={`نسخه ${convertToPersianNumber(spec.bluetoothVersion)}`}
        />
        <AllSpecCard
          title="ظرفیت باتری"
          value={`${convertToPersianNumber(spec.batteryCapacity)} میلی آمپر ساعت`}
        />
        <AllSpecCard
          title="مدت زمان بازدهی باتری"
          value={`${spec.batteryLife} ساعت`}
        />
        <AllSpecCard
          title="زمان شارژ شدن"
          value={`${spec.chargingTime} ساعت`}
        />
        <AllSpecCard
          title="پشتیبانی از زبان فارسی در اعلان و پیام"
          value={spec.persianLanguageSupport ? "دارد" : "ندارد"}
        />
        <AllSpecCard
          title="قابلیت مکالمه"
          value={spec.callSupport ? "دارد" : "ندارد"}
        />
        <AllSpecCard
          title="سنسورها"
          value={getSensors(spec.sensors).join(" , ")}
        />

        <AllSpecCard
          title="ابعاد"
          value={`${convertToPersianNumber(spec.dimensions)} میلی متر`}
        />
        <AllSpecCard
          title="وزن"
          value={`${convertToPersianNumber(spec.weight)} گرم`}
        />

        <AllSpecCard
          title="جنس بند"
          value={getStrapMaterial(spec.strapMaterial)}
        />
        <AllSpecCard
          title="فرم صفحه نمایش"
          value={
            spec.displayShape === "round"
              ? "گرد"
              : spec.displayShape === "rectangular"
                ? "مستطیل"
                : "مربع"
          }
        />
      </>
    );
  }

  return <></>;
};

export default AllSmartwatchSpec;
