import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserCart {
  productIds: { productId: string; count: number }[];
}

interface CartState {
  userCarts: Record<string, UserCart>;
  addProduct: (userName: string, productId: string) => void;
  increaseProductCount: (userName: string, productId: string) => void;
  decreaseProductCount: (userName: string, productId: string) => void;
  removeProduct: (userName: string, productId: string) => void;

  clearCart: (userName: string) => void;
  clearAllCarts: () => void;
  getCartByUser: (userName: string) => { productId: string; count: number }[];
  removeCartByUser: (userName: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      userCarts: {},

      addProduct: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };
          const exists = userCart.productIds.find(
            (p) => p.productId === productId
          );
          if (exists) return {}; 

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: {
                productIds: [...userCart.productIds, { productId, count: 1 }],
              },
            },
          };
        }),

      increaseProductCount: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };
          const exists = userCart.productIds.find(
            (p) => p.productId === productId
          );

          let updated;
          if (exists) {
            updated = userCart.productIds.map((p) =>
              p.productId === productId ? { ...p, count: p.count + 1 } : p
            );
          } else {
            updated = [...userCart.productIds, { productId, count: 1 }];
          }

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: { productIds: updated },
            },
          };
        }),

      decreaseProductCount: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };

          const updated = userCart.productIds
            .map((p) =>
              p.productId === productId ? { ...p, count: p.count - 1 } : p
            )
            .filter((p) => p.count > 0); // حذف اگه صفر شد

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: { productIds: updated },
            },
          };
        }),

      removeProduct: (userName, productId) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userName]: {
              productIds:
                state.userCarts[userName]?.productIds.filter(
                  (p) => p.productId !== productId
                ) || [],
            },
          },
        })),

      clearCart: (userName) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userName]: { productIds: [] },
          },
        })),

      clearAllCarts: () => set({ userCarts: {} }),

      getCartByUser: (userName) => get().userCarts[userName]?.productIds || [],

      removeCartByUser: (userName) =>
        set((state) => {
          const newUserCarts = { ...state.userCarts };
          delete newUserCarts[userName];
          return { userCarts: newUserCarts };
        }),
    }),
    {
      name: "mobinoCart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
