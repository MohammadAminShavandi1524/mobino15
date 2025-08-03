import { useCart } from "@/modules/checkout/hooks/useCart";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AddToCartButtonProps {
  userName?: string;
  productId: string;
}

const AddToCartButton = ({ productId, userName }: AddToCartButtonProps) => {
  const {
    addProduct,
    clearAllCarts,
    clearCart,
    isProductInCart,
    productIds,
    removeProduct,
    toggleProduct,
    totalItems,
    userCarts,
    decreaseProductCount,
    increaseProductCount,
    getCartByUser,
  } = useCart(userName);

  

  return (
    <>
      {isProductInCart(productId) ? (
        <div className="flex justify-center items-center px-2 text-custom-primary">
          <button
            onClick={() => removeProduct(productId)}
            className="text-custom-primary  h-13 w-1/4 cursor-pointer"
          >
            حذف
          </button>
          <Link
            className="relative flex justify-center items-center w-3/4 pl-3 h-13 border-2 border-custom-primary rounded-md"
            href="/cart"
          >
            <div>مشاهده سبد خرید</div>
            <div className="absolute left-[16px]">
              <ChevronLeft size={20} />
            </div>
          </Link>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              addProduct(productId);
              toast.success("این کالا به سبد خرید اصافه شد", {
                position: "top-right",
              });
            }}
            className="relative flex items-center justify-center mx-[10px] h-13 rounded-lg bg-custom-primary text-white cursor-pointer"
          >
            <div className="text-[18px]">افزودن به سبد خرید</div>
            <div className="absolute left-[16px]">
              <ShoppingCart size={20} />
            </div>
          </button>
        </>
      )}
    </>
  );
};
export default AddToCartButton;
