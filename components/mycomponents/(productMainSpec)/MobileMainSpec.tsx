import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";

interface MobileMainSpecProps {
  product: Product;
}

const MobileMainSpec = ({ product }: MobileMainSpecProps) => {
  if (product.productType?.[0].blockType === "mobile") {
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
          value={`${spec.displaySize} اینچ`}
        />
        <MainSpecCard
          title="وضوح دوربین اصلی"
          value={`${spec.mainCameraResolution} مگاپیکسل`}
          lastChild
        />
      </>
    );
  }

  return <></>;
};
export default MobileMainSpec;
