import { useCartStore } from "../store/useCartStore";

export const getGuestId = (): string => {
  if (typeof window === "undefined") {
    return "guest_ssr";
  }

  const existing = localStorage.getItem("guest_id");
  if (existing) return existing;

  const newId = `guest_${crypto.randomUUID()}`;
  localStorage.setItem("guest_id", newId);
  return newId;
};

export const migrateGuestCartToUser = (userName: string) => {
  const store = useCartStore.getState();
  const guestId = getGuestId();

  const guestCart = store.getCartByUser(guestId);
  const userCart = store.getCartByUser(userName);

  const mergedMap = new Map<string, number>();

  guestCart.forEach(({ productId, count }) => {
    mergedMap.set(productId, Math.max(mergedMap.get(productId) || 0, count));
  });

  userCart.forEach(({ productId, count }) => {
    mergedMap.set(productId, Math.max(mergedMap.get(productId) || 0, count));
  });

  store.clearCart(guestId);
  store.removeCartByUser(guestId);

  mergedMap.forEach((count, productId) => {
    if (!productId || !count || count <= 0) return;
    store.addProductWithCount(userName, productId, count);
  });
};

export const useCart = (userName?: string) => {
  const finalUserName = userName || getGuestId();

  const {
    userCarts,
    addProduct,
    removeProduct,
    getCartByUser,
    clearCart,
    clearAllCarts,
    decreaseProductCount,
    increaseProductCount,
    removeCartByUser,
  } = useCartStore();

  const productList = getCartByUser(finalUserName);

  const toggleProduct = (productId: string) => {
    const exists = productList.some((item) => item.productId === productId);
    if (exists) {
      removeProduct(finalUserName, productId);
    } else {
      addProduct(finalUserName, productId);
    }
  };

  const isProductInCart = (productId: string) => {
    return productList.some((item) => item.productId === productId);
  };

  const clearTenantCart = () => {
    clearCart(finalUserName);
  };

  const totalItems = productList.reduce((acc, item) => acc + item.count, 0);

  return {
    productIds: productList.map((item) => item.productId),
    addProduct: (productId: string) => addProduct(finalUserName, productId),
    decreaseProductCount: (productId: string) =>
      decreaseProductCount(finalUserName, productId),
    increaseProductCount: (productId: string) =>
      increaseProductCount(finalUserName, productId),
    removeProduct: (productId: string) =>
      removeProduct(finalUserName, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems,
    userCarts,
    getCartByUser: () => getCartByUser(finalUserName),
    removeCartByUser,
  };
};
