"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  slug: string;
  name: string;
  reference?: string;
  price: number;
  imageUrl: string;
  size: string;
  color?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, size: string, color?: string) => void;
  updateQuantity: (id: string, size: string, quantity: number, color?: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const addedQuantity = Math.max(1, Math.trunc(quantity));
          const existing = state.items.find(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.size === item.size &&
              cartItem.color === item.color
          );
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id &&
                cartItem.size === item.size &&
                cartItem.color === item.color
                  ? { ...cartItem, quantity: cartItem.quantity + addedQuantity }
                  : cartItem
              )
            };
          }

          return { items: [...state.items, { ...item, quantity: addedQuantity }] };
        }),
      removeItem: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (cartItem) =>
              !(cartItem.id === id && cartItem.size === size && cartItem.color === color)
          )
        })),
      updateQuantity: (id, size, quantity, color) =>
        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.id === id && cartItem.size === size && cartItem.color === color
              ? { ...cartItem, quantity: Math.max(1, quantity) }
              : cartItem
          )
        })),
      clear: () => set({ items: [] })
    }),
    {
      name: "larcs-cart-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
