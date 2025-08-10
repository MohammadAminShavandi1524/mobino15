import { Product } from "@/payload-types";
import MobileMainSpec from "./MobileMainSpec";
import LaptopMainSpec from "./LaptopMainSpec";
import TabletMainSpec from "./TabletMainSpec";
import HeadphonesMainSpec from "./HeadphonesMainSpec";
import SmartWatchMainSpec from "./SmartWatchMainSpec";
import MonitorMainSpec from "./MonitorMainSpec";

interface ProductMainSpecProps {
  product: Product;
}

const ProductMainSpec = ({ product }: ProductMainSpecProps) => {
  switch (product.productType?.[0].blockType) {
    case "mobile":
      return <MobileMainSpec product={product} />;

    case "laptop":
      return <LaptopMainSpec product={product} />;

    case "tablet":
      return <TabletMainSpec product={product} />;

    case "headphone":
      return <HeadphonesMainSpec product={product} />;

    case "smartwatch":
      return <SmartWatchMainSpec product={product} />;

    case "monitor":
      return <MonitorMainSpec product={product} />;

    default:
      return <></>;
  }
};

export default ProductMainSpec;
