import { Product } from "@/payload-types";
import AllMobileSpec from "./AllMobileSpec";
import AllLaptopSpec from "./AllLaptopSpec";
import AllTabletSpec from "./AllTabletSpec";
import AllHeadphoneSpec from "./AllHeadphoneSpec";
import AllSmartwatchSpec from "./AllSmartwatchSpec";
import AllMonitorSpec from "./AllMonitorSpec";

interface AllProductSpecsProps {
  product: Product;
}

const AllProductSpecs = ({ product }: AllProductSpecsProps) => {
  switch (product.productType?.[0].blockType) {
    case "mobile":
      return <AllMobileSpec product={product} />;

    case "laptop":
      return <AllLaptopSpec product={product} />;

    case "tablet":
      return <AllTabletSpec product={product} />;

    case "headphone":
      return <AllHeadphoneSpec product={product} />;

    case "smartwatch":
      return <AllSmartwatchSpec product={product} />;

    case "monitor":
      return <AllMonitorSpec product={product} />;

    default:
      return <></>;
  }
};

export default AllProductSpecs;
