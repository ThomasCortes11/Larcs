"use client";

import { create } from "zustand";

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

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggleItem: (item) => {
    const exists = get().items.some((wishlistItem) => wishlistItem.id === item.id);

    if (exists) {
      set((state) => ({ items: state.items.filter((wishlistItem) => wishlistItem.id !== item.id) }));
      return false;
    }

    set((state) => ({ items: [...state.items, item] }));
    return true;
  },
  removeItem: (id) => set((state) => ({ items: state.items.filter((wishlistItem) => wishlistItem.id !== id) })),
  hasItem: (id) => get().items.some((wishlistItem) => wishlistItem.id === id)
}));