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
  sizes?: string[]; // tallas disponibles, para poder cambiarla desde el carrito
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, size: string, color?: string) => void;
  updateQuantity: (id: string, size: string, quantity: number, color?: string) => void;
  updateSize: (id: string, size: string, newSize: string, color?: string) => void;
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
      updateSize: (id, size, newSize, color) =>
        set((state) => {
          const current = state.items.find(
            (cartItem) => cartItem.id === id && cartItem.size === size && cartItem.color === color
          );
          if (!current || size === newSize) return state;
          const existing = state.items.find(
            (cartItem) => cartItem.id === id && cartItem.size === newSize && cartItem.color === color
          );
          // Si ya había ese mismo producto en la nueva talla, se suman las cantidades.
          const items = existing
            ? state.items
                .filter((cartItem) => cartItem !== current)
                .map((cartItem) =>
                  cartItem === existing ? { ...cartItem, quantity: cartItem.quantity + current.quantity } : cartItem
                )
            : state.items.map((cartItem) => (cartItem === current ? { ...cartItem, size: newSize } : cartItem));
          return { items };
        }),
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
