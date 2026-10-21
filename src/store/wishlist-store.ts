"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => boolean;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
}

// Se guarda en el navegador, igual que el carrito, para que los favoritos sigan ahí al volver.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        const exists = get().items.some(
          (wishlistItem) => wishlistItem.id === item.id
        );

        if (exists) {
          set((state) => ({
            items: state.items.filter(
              (wishlistItem) => wishlistItem.id !== item.id
            )
          }));
          return false;
        }

        set((state) => ({ items: [...state.items, item] }));
        return true;
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((wishlistItem) => wishlistItem.id !== id)
        })),
      hasItem: (id) =>
        get().items.some((wishlistItem) => wishlistItem.id === id)
    }),
    {
      name: "larcs-wishlist-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true
    }
  )
);
