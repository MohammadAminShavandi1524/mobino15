import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";
import {
  capitalizeFirstLetter,
  convertToPersianNumber,
  getMonitorUsage,
  getResolutionInfo,
} from "@/lib/utils";

interface MonitorMainSpecProps {
  product: Product;
}

const MonitorMainSpec = ({ product }: MonitorMainSpecProps) => {
  if (product.productType?.[0].blockType === "monitor") {
    const spec = product.productType?.[0];
    return (
      <>
        <MainSpecCard
          title="نوع کاربری"
          value={getMonitorUsage(spec.usageType)}
          firstChild
        />
        <MainSpecCard
          title="سایز صفحه نمایش"
          value={`${convertToPersianNumber(spec.displaySize)} اینچ`}
        />
        <MainSpecCard
          title="رزولوشن"
          value={`${convertToPersianNumber(getResolutionInfo(spec.resolution)?.resolution as string)} پیکسل`}
        />
        <MainSpecCard
          title="نوع پنل"
          value={capitalizeFirstLetter(spec.panelType)}
        />
        <MainSpecCard
          title="نوع صفحه نمایش"
          value={spec.screenType === "curved" ? "خمیده" : "تخت"}
        />
        <MainSpecCard
          title="زمان پاسخ‌گویی"
          value={`${convertToPersianNumber(spec.responseTime)} میلی ثانیه`}
          lastChild
        />
      </>
    );
  }

  return <></>;
};
export default MonitorMainSpec;
