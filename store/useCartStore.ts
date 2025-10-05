import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "@/interfaces";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.product.id === item.product.id);
        if (existingItem) {
          // if already in cart, increase quantity
          set({
            cart: get().cart.map((i) =>
              i.product.id === item.product.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          // add new product
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (id) => set({ cart: get().cart.filter((i) => i.product.id !== id) }),

      increaseQty: (id) =>
        set({
          cart: get().cart.map((i) =>
            i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get().cart.map((i) =>
            i.product.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        }),

      clearCart: () => set({ cart: [] }),

      total: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      totalQuantity: () => get().cart.reduce((sum, item) => sum + 1 * item.quantity, 0),
    }),
    {
      name: "cart-storage", // stores cart in localStorage ✅
    }
  )
);