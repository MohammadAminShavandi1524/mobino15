import { cn, getPersianLabel } from "@/lib/utils";
import { Category, Product } from "@/payload-types";
import Link from "next/link";
import Skeleton from "./(skeletonComponets)/Skleton";

interface BreadCrumpProps {
  category?: string;
  subCategory?: string;
  productData?: Product;
  activePage: "category" | "subcategory" | "product" | "all" | "afino" | "flagBearerMobiles";
  className?: string;
}


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
        <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black shrink-0")} href={`/products`}>
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
        <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black shrink-0")} href="">
          محصولات تخفیف خورده
        </Link>
      </div>
    );
  else if (activePage === "flagBearerMobiles")
    return (
      <div
        className={cn(
          "flex items-center gap-x-3 text-[12px] text-[#81858b]",
          className,
        )}
      >
         <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black shrink-0")} href="">
          پرچمداران هوشمند
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
         <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("text-black shrink-0")} href={`/${category}`}>
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
        <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("shrink-0")} href={`/${category}`}>
          {getPersianLabel(category as string)}
        </Link>
        <span>/</span>
        <Link className={cn("text-black shrink-0")} href={`/${category}/${subCategory}`}>
          {getPersianLabel(subCategory as string)}
        </Link>
      </div>
    );
  // ** activePage === "product"
  else
    return (
      <div
        className={cn(
          "flex items-center max-s:justify-center gap-x-3 text-[12px] text-[#81858b] overflow-x-hidden",
          className,
        )}
      >
         <Link className="shrink-0" href={"/"}>فروشگاه اینترنتی موبینو</Link>
        <span>/</span>
        <Link className={cn("shrink-0")} href={`/${category}`}>
          {getPersianLabel(category as string)}
        </Link>
        <span>/</span>
        <Link className={cn("shrink-0")} href={`/${category}/${subCategory}`}>
          {getPersianLabel(subCategory as string)}
        </Link>
        <span className="max-s:hidden">/</span>
        <Link
          className={cn("text-black shrink-0 text-ellipsis max-s:hidden")}
          href={`/products/${productData?.order}_${productData?.label}`}
        >
          {productData?.label}
        </Link>
      </div>
    );
};
export default BreadCrump;
