import { Product } from "@/payload-types";

interface LaptopMainSpecProps {
  product: Product;
}

const laptopCpuOptions = [
  { label: "Intel Core i3", value: "intel_i3" },
  { label: "Intel Core i5", value: "intel_i5" },
  { label: "Intel Core i7", value: "intel_i7" },
  { label: "Intel Core i9", value: "intel_i9" },
  { label: "Intel Pentium", value: "intel_pentium" },
  { label: "Intel Celeron", value: "intel_celeron" },
  { label: "Intel Xeon", value: "intel_xeon" },
  { label: "AMD Ryzen 3", value: "amd_ryzen3" },
  { label: "AMD Ryzen 5", value: "amd_ryzen5" },
  { label: "AMD Ryzen 7", value: "amd_ryzen7" },
  { label: "AMD Ryzen 9", value: "amd_ryzen9" },
  { label: "AMD Athlon", value: "amd_athlon" },
  { label: "AMD FX", value: "amd_fx" },
  { label: "Apple M1", value: "apple_m1" },
  { label: "Apple M2", value: "apple_m2" },
  { label: "Apple M3", value: "apple_m3" },
  { label: "Other", value: "other" },
];

const LaptopMainSpec = ({ product }: LaptopMainSpecProps) => {
  
  const getCpuLabel = (value: string | undefined) => {
    return (
      laptopCpuOptions.find((item) => item.value === value)?.label ?? "نامشخص"
    );
  };
  if (product.productType?.[0].blockType === "laptop") {
    return (
      <>
        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] ">
          <span className="text-[#385086] font-light ml-3">نوع کاربری :</span>
          <span>{product.productType?.[0].usage}</span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            سایز صفحه نمایش :
          </span>
          <span className="ml-1">{product.productType?.[0].DisplaySize}</span>
          <span>اینچ</span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            سری پردازنده مرکزی :
          </span>
          <span>{getCpuLabel(product.productType?.[0].cpuSeries)}</span>
        </div>

        <div className="flex items-center  text-[14px] border-b border-dashed border-b-[#d3d8e4] pb-[14px] pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            ظرفیت حافظه RAM :
          </span>
          <span className="ml-1">
            {product.productType?.[0].ram.replace("gb", " گیگابایت")}
          </span>
        </div>

        <div className="flex items-center  text-[14px]  pt-[16px]">
          <span className="text-[#385086] font-light ml-3">
            ظرفیت حافظه داخلی :
          </span>

          <div className="flex items-center gap-x-4">
            {product.productType?.[0].storages.map((storage, index) => {
              return (
                <div key={index} className="flex items-center gap-x-1">
                  <span>
                    {storage.capacity
                      ?.replace(/gb/i, " گیگابایت")
                      ?.replace(/tb/i, " ترابایت")}
                  </span>

                  <span>{storage.type}</span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return <></>;
};
export default LaptopMainSpec;
