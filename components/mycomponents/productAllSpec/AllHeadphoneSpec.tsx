import { Product } from "@/payload-types";
import AllSpecCard from "./AllSpecCard";
import { convertToPersianNumber, getBrandLabelFa } from "@/lib/utils";

interface AllHeadphoneSpecProps {
  product: Product;
}

const AllHeadphoneSpec = ({ product }: AllHeadphoneSpecProps) => {
  if (product.productType?.[0].blockType === "headphone") {
    const spec = product.productType?.[0];

    return (
      <>
        <AllSpecCard title="برند" value={getBrandLabelFa(spec.brand)} />
        <AllSpecCard
          title="قابلیت حذف نویز (ANC)"
          value={spec.noiseCancelling ? "دارد" : "ندارد"}
        />
        <AllSpecCard
          title="نوع اتصال"
          value={
            spec.connectionType === "both"
              ? "با سیم و بی‌ سیم"
              : spec.connectionType === "wired"
                ? "با سیم"
                : "بی سیم"
          }
        />
        <AllSpecCard
          title="بلوتوث"
          value={`نسخه ${convertToPersianNumber(spec.bluetoothVersion)}`}
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
          title="ابعاد"
          value={`${convertToPersianNumber(spec.dimensions)} میلی متر`}
        />
        <AllSpecCard
          title="وزن"
          value={`${convertToPersianNumber(spec.weight)} گرم`}
        />
      </>
    );
  }

  return <></>;
};

export default AllHeadphoneSpec;
