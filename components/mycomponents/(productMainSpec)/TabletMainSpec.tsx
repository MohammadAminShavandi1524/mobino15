import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";
import { convertToPersianNumber } from "@/lib/utils";

interface TabletMainSpecProps {
  product: Product;
}

const TabletMainSpec = ({ product }: TabletMainSpecProps) => {
  if (product.productType?.[0].blockType === "tablet") {
    const spec = product.productType?.[0];
    return (
      <>
        <MainSpecCard
          title="نوع پردازنده - CPU"
          value={spec.chipset?.replace(/(\d+)\s*nm/i, "$1 نانومتری")}
          firstChild
        />
        <MainSpecCard
          title="حافظه داخلی"
          value={spec.storage
            ?.replace(/gb/i, " گیگابایت")
            ?.replace(/tb/i, " ترابایت")}
        />
        <MainSpecCard
          title="حافظه RAM"
          value={spec.ram.replace("gb", " گیگابایت")}
        />
        <MainSpecCard
          title="سایز صفحه نمایش"
           value={`${convertToPersianNumber(spec.displaySize)} اینچ`}
        />
        <MainSpecCard
          title="رزولوشن دوربین اصلی"
          value={`${spec.mainCameraResolution} مگاپیکسل`}
          lastChild
        />
      </>
    );
  }

  return <></>;
};
export default TabletMainSpec;
