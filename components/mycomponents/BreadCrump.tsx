import { cn } from "@/lib/utils";
import { Category, Product } from "@/payload-types";
import Link from "next/link";
import Skeleton from "./(skeletonComponets)/Skleton";

interface BreadCrumpProps {
  selectedCategoryData?: Category;
  selectedSubCategoryData?: Category;
  productData?: Product;
  categoriesLoading?: boolean;
  productsLoading?: boolean;
  activePage: "category" | "subcategory" | "product" | "all";
  className?: string;
}
// products must be added later

const BreadCrump = ({
  selectedCategoryData,
  selectedSubCategoryData,
  productData,
  categoriesLoading,
  productsLoading,
  activePage,
  className,
}: BreadCrumpProps) => {

  // *** loadings ***
 
  if (activePage === "category" && (categoriesLoading || productsLoading))
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Skeleton width={60} height={18} />
      </div>
    );
  if (activePage === "subcategory" && (categoriesLoading || productsLoading))
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Skeleton width={60} height={18} />
        <span>/</span>
        <Skeleton width={100} height={18} />
      </div>
    );
  if (activePage === "product" && (categoriesLoading || productsLoading))
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Skeleton width={60} height={18} />
        <span>/</span>
        <Skeleton width={100} height={18} />
        <span>/</span>
        <Skeleton width={450} height={18} />
      </div>
    );

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
          href={`/products/${productData?.order}_${productData?.label}`}
        >
          {productData?.label}
        </Link>
      </div>
    );
};
export default BreadCrump;
