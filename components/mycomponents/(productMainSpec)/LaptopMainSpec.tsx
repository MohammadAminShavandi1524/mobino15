import { Product } from "@/payload-types";
import MainSpecCard from "./MainSpecCard";
import { convertToPersianNumber } from "@/lib/utils";

interface LaptopMainSpecProps {
  product: Product;
}

export const laptopCpuOptions = [
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

export const laptopGpuOptions = [
  { label: "NVIDIA GeForce MX", value: "nvidia_mx" },
  { label: "NVIDIA GeForce GTX", value: "nvidia_gtx" },
  { label: "NVIDIA GeForce RTX", value: "nvidia_rtx" },
  { label: "NVIDIA Quadro", value: "nvidia_quadro" },
  { label: "AMD Radeon RX", value: "amd_rx" },
  { label: "AMD Radeon Vega", value: "amd_vega" },
  { label: "AMD Radeon Pro", value: "amd_pro" },
  { label: "Intel Iris Xe", value: "intel_iris_xe" },
  { label: "Intel UHD", value: "intel_uhd" },
  {
    label: "Apple M1/M2/M3 GPU",
    value: "apple_m_series_gpu",
  },
  { label: "Other", value: "other" },
];

const LaptopMainSpec = ({ product }: LaptopMainSpecProps) => {
  if (product.productType?.[0].blockType === "laptop") {
    const spec = product.productType?.[0];
    const getStorage = (
      storages: {
        type: "ssd" | "hdd";
        capacity: "64gb" | "128gb" | "256gb" | "512gb" | "1tb" | "2tb" | "4tb";
        id?: string | null;
      }[],
    ) => {
      return storages.map((storage) => {
        return (
          convertToPersianNumber(
            storage.capacity
              ?.replace(/gb/i, " گیگابایت")
              ?.replace(/tb/i, " ترابایت"),
          ) +
          " " +
          storage.type
        );
      });
    };
    return (
      <>
        <MainSpecCard title="نوع کاربری" value={spec.usage} firstChild />
        <MainSpecCard
          title="سایز صفحه نمایش"
          value={`${convertToPersianNumber(spec.DisplaySize)} اینچ`}
        />
        <MainSpecCard
          title="نسل پردازنده"
          value={convertToPersianNumber(spec.CPUProcessorGeneration)}
        />
        <MainSpecCard
          title="حافظه RAM"
          value={spec.ram.replace("gb", " گیگابایت")}
        />
        <MainSpecCard
          title="ظرفیت حافظه داخلی"
          value={getStorage(spec.storages).join("، ")}
          lastChild
        />
      </>
    );
  }
  return <></>;
};
export default LaptopMainSpec;
