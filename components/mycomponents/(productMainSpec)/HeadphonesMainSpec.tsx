import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";
import { convertToPersianNumber } from "@/lib/utils";

interface HeadphonesMainSpecProps {
  product: Product;
}

const HeadphonesMainSpec = ({ product }: HeadphonesMainSpecProps) => {
  if (product.productType?.[0].blockType === "headphone") {
    const spec = product.productType?.[0];
    return (
      <>
        <MainSpecCard
          title="قابلیت حذف نویز (ANC)"
          value={spec.noiseCancelling ? "دارد" : "ندارد"}
          firstChild
        />
        <MainSpecCard
          title="نوع اتصال"
          value={
            spec.connectionType === "both"
              ? "با سیم و بی‌ سیم"
              : spec.connectionType === "wired"
                ? "با سیم"
                : "بی سیم"
          }
        />
        <MainSpecCard
          title="بلوتوث"
          value={`نسخه ${convertToPersianNumber(spec.bluetoothVersion)}`}
        />
        <MainSpecCard
          title="مدت زمان بازدهی باتری"
          value={`${spec.batteryLife} ساعت`}
        />
        <MainSpecCard
          title="زمان شارژ شدن"
          value={`${spec.chargingTime} ساعت`}
          lastChild
        />
      </>
    );
  }

  return <></>;
};
export default HeadphonesMainSpec;
