import { Product } from "@/payload-types";

interface TabletMainSpecProps {
  product: Product;
}

const TabletMainSpec = ({ product }: TabletMainSpecProps) => {
  if (product.productType?.[0].blockType === "tablet") {
    return (
      <>
        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] ">
          <span className="text-[#385086] font-light ml-3">
            نوع پردازنده - CPU :
          </span>
          <span>
            {product.productType?.[0].chipset?.replace(
              /(\d+)\s*nm/i,
              "$1 نانومتری"
            )}
          </span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">حافظه داخلی :</span>
          <span>
            {product.productType?.[0].storage
              ?.replace(/gb/i, " گیگابایت")
              ?.replace(/tb/i, " ترابایت")}
          </span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">حافظه RAM :</span>
          <span>{product.productType?.[0].ram.replace("gb", " گیگابایت")}</span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            سایز صفحه نمایش :
          </span>
          <span className="ml-1">{product.productType?.[0].displaySize}</span>
          <span>اینچ</span>
        </div>

        <div className="flex items-center  text-[14px]  pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            رزولوشن دوربین اصلی :
          </span>
          <span className="ml-1">
            {product.productType?.[0].mainCameraResolution}
          </span>
          <span>مگاپیکسل</span>
        </div>
      </>
    );
  }

  return <></>;
};
export default TabletMainSpec;
