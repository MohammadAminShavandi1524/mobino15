import { cn } from "@/lib/utils";
import { Category, Product } from "@/payload-types";
import Link from "next/link";

interface BreadCrumpProps {
  selectedCategoryData?: Category;
  selectedSubCategoryData?: Category;
  productData?: Product;
  activePage: "category" | "subcategory" | "product" | "all";
  className?: string;
}
// products must be added later

const BreadCrump = ({
  selectedCategoryData,
  selectedSubCategoryData,
  productData,
  activePage,
  className,
}: BreadCrumpProps) => {
  if (activePage === "all")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link
          className={cn("", activePage === "all" && "text-black")}
          href={`/products`}
        >
          همه محصولات
        </Link>
      </div>
    );
  else if (activePage === "category")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link
          className={cn("text-black")}
          href={`/${selectedCategoryData?.name}`}
        >
          {selectedCategoryData?.label}
        </Link>
      </div>
    );
  else if (activePage === "subcategory")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("")} href={`/${selectedCategoryData?.name}`}>
          {selectedCategoryData?.label}
        </Link>
        <span>/</span>
        <Link
          className={cn("text-black")}
          href={`/${selectedCategoryData?.name}/${selectedSubCategoryData?.name}`}
        >
          {selectedSubCategoryData?.label}
        </Link>
      </div>
    );
  // ** activePage === "product"
  else
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("")} href={`/${selectedCategoryData?.name}`}>
          {selectedCategoryData?.label}
        </Link>
        <span>/</span>
        <Link
          className={cn("")}
          href={`/${selectedCategoryData?.name}/${selectedSubCategoryData?.name}`}
        >
          {selectedSubCategoryData?.label}
        </Link>
        <span>/</span>
        <Link
          className={cn("text-black")}
          href={`/products/${productData?.label}`}
        >
          {productData?.label}
        </Link>
      </div>
    );
};
export default BreadCrump;
