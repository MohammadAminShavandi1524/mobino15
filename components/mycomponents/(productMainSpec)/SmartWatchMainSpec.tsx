import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";
import {
  convertToPersianNumber,
  getCompatibilityLabels,
  getStrapMaterial,
} from "@/lib/utils";

interface SmartWatchMainSpecProps {
  product: Product;
}

const SmartWatchMainSpec = ({ product }: SmartWatchMainSpecProps) => {
  if (product.productType?.[0].blockType === "smartwatch") {
    const spec = product.productType?.[0];
    return (
      <>
        <MainSpecCard
          title="سازگاری"
          value={getCompatibilityLabels(spec.compatibility).join(" ,")}
          firstChild
        />
        <MainSpecCard
          title="جنس بند"
          value={getStrapMaterial(spec.strapMaterial)}
        />
        <MainSpecCard
          title="بلوتوث"
          value={`نسخه ${convertToPersianNumber(spec.bluetoothVersion)}`}
        />
        <MainSpecCard
          title="پشتیبانی از زبان فارسی در اعلان و پیام"
          value={spec.persianLanguageSupport ? "دارد" : "ندارد"}
        />
        <MainSpecCard
          title="قابلیت مکالمه"
          value={spec.callSupport ? "دارد" : "ندارد"}
          lastChild
        />
      </>
    );
  }

  return <></>;
};
export default SmartWatchMainSpec;
