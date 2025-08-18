import { cn, getPersianLabel } from "@/lib/utils";
import { Category, Product } from "@/payload-types";
import Link from "next/link";
import Skeleton from "./(skeletonComponets)/Skleton";

interface BreadCrumpProps {
  category?: string;
  subCategory?: string;
  productData?: Product;
  activePage: "category" | "subcategory" | "product" | "all" | "afino";
  className?: string;
}
// products must be added later

const BreadCrump = ({
  category,
  subCategory,
  productData,

  activePage,
  className,
}: BreadCrumpProps) => {
  if (activePage === "all")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black")} href={`/products`}>
          همه محصولات
        </Link>
      </div>
    );
  else if (activePage === "afino")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black")} href={`/products`}>
          محصولات تخفیف خورده
        </Link>
      </div>
    );
  else if (activePage === "category")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black")} href={`/${category}`}>
          {getPersianLabel(category as string)}
        </Link>
      </div>
    );
  else if (activePage === "subcategory")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("")} href={`/${category}`}>
          {getPersianLabel(category as string)}
        </Link>
        <span>/</span>
        <Link className={cn("text-black")} href={`/${category}/${subCategory}`}>
          {getPersianLabel(subCategory as string)}
        </Link>
      </div>
    );
  // ** activePage === "product"
  else
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
        <Link href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("")} href={`/${category}`}>
          {getPersianLabel(category as string)}
        </Link>
        <span>/</span>
        <Link className={cn("")} href={`/${category}/${subCategory}`}>
          {getPersianLabel(subCategory as string)}
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
