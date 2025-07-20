import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { PaginatedDocs } from "payload";

interface ProductListProps {
  products: PaginatedDocs<Product> | undefined;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-5 gap-x-3">
      {products &&
        products.docs.map((product) => {
          let selectedColor = "#ddd";

          switch (product.color) {
            case "TitaniumBlack":
              selectedColor = "#383838";
              break;

            case "Black":
              selectedColor = "#1a1a1a";
              break;

            case "Silver":
              selectedColor = "#cfcfcf";
              break;

            case "Purple":
              selectedColor = "#b030b0";
              break;

            case "yellow":
              selectedColor = "#ffee59";
              break;

            case "DarkBlue":
              selectedColor = "#253873";
              break;

            case "Lemon":
              selectedColor = "#f6f436";
              break;

            case "TitaniumSilver":
              selectedColor = "#dacccc";
              break;

            case "DarkGray":
              selectedColor = "#1f1d1f";
              break;

            case "NaturalTitanium":
              selectedColor = "#d7d6d6";
              break;

            case "Golden":
              selectedColor = "#d4a54c";
              break;

            case "TitaniumGray":
              selectedColor = "#64635f";
              break;

            case "TitaniumIceBlue":
              selectedColor = "#bddafc";
              break;

            case "Gray":
              selectedColor = "#8f8f8f";
              break;

            case "NavyBlue":
              selectedColor = "#00009c";
              break;

            case "Brick":
              selectedColor = "#c47020";
              break;

            case "TitaniumDesert":
              selectedColor = "#e6c794";
              break;

            case "TitaniumPurple":
              selectedColor = "#a98ead";
              break;

            case "JetBlackTitanium":
              selectedColor = "#1b1b1a";
              break;

            case "LightGreen":
              selectedColor = "#7fff00";
              break;

            case "Turquoise":
              selectedColor = "#00ffff";
              break;

            case "LightGray":
              selectedColor = "#cecece";
              break;

            case "LightBlue":
              selectedColor = "#74c1f6";
              break;

            case "Pink":
              selectedColor = "#e05ce0";
              break;

            case "TitaniumWhite":
              selectedColor = "#f9f6f6";
              break;

            case "Green":
              selectedColor = "#22a148";
              break;

            case "Cream":
              selectedColor = "#938f7a";
              break;

            case "Blue":
              selectedColor = "#006cf0";
              break;

            case "White":
              selectedColor = "#ffffff";
              break;

            case "Red":
              selectedColor = "#e03131";
              break;

            case "Orange":
              selectedColor = "#ffa600";
              break;

            case "graphite":
              selectedColor = "#3C3C3C";
              break;

            case "oceanBlue":
              selectedColor = "#0077BE";
              break;

            case "roseGold":
              selectedColor = "#B76E79";
              break;

            case "oliveGreen":
              selectedColor = "#708238";
              break;

            case "copper":
              selectedColor = "#B87333";
              break;

            case "bronze":
              selectedColor = "#CD7F32";
              break;

            case "charcoalGray":
              selectedColor = "#36454F";
              break;

            case "skyBlue":
              selectedColor = "#87CEEB";
              break;

            case "lilac":
              selectedColor = "#C8A2C8";
              break;

            case "mintGreen":
              selectedColor = "#98FF98";
              break;

            default:
              selectedColor = "#fff";
              break;
          }
          console.log(product.color);

          return (
            <Link
              href={""}
              className="relative w-full h-[550px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] rounded-md pt-[50px]"
              key={product.id}
            >
              {/* بخش نشون دادن تخفیف  */}
              {product.offPrice && (
                <div className="w-full absolute  top-4 px-5 pb-2 ">
                  <div className="text-[14px] font-medium text-[#e6123d]">
                    فروش ویژه
                  </div>
                  <div className="mt-2 h-[4px] bg-[#e6123d] rounded-sm"></div>
                </div>
              )}

              {/* دایره رنگ ها  */}
              <div
                className={cn(
                  "absolute top-[70px] right-[8px] w-[10px] h-[10px] rounded-full",
                  [
                    "Silver",
                    "TitaniumSilver",
                    "NaturalTitanium",
                    "LightGray",
                    "TitaniumWhite",
                    "White",
                  ].includes(selectedColor) && "border border-[#e0e0e2]"
                )}
                style={{ backgroundColor: selectedColor }}
              ></div>
              {/* تصویر */}
              <div></div>
              {/* مشخصات فنی */}
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              {/* title */}
              <div></div>
              {/* price - offPrice - decount percent */}
              <div></div>
            </Link>
          );
        })}
    </div>
  );
};
export default ProductList;
