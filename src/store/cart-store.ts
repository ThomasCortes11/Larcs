"use client";

import { create } from "zustand";

interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id, size) =>
    set((state) => ({ items: state.items.filter((i) => !(i.id === id && i.size === size)) })),
  updateQuantity: (id, size, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    })),
  clear: () => set({ items: [] })
}));

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
