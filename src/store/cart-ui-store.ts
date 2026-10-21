"use client";

import { create } from "zustand";

// Estado de la ventana del carrito (no se guarda en el navegador).
// Al agregar un producto se abre el carrito y se resalta lo que se acaba de agregar.
interface CartUiState {
  open: boolean;
  lastAddedKey: string | null;
  setOpen: (open: boolean) => void;
  showAdded: (key: string) => void;
}

export const cartItemKey = (id: string, size: string, color?: string) => `${id}-${size}-${color ?? ""}`;

export const useCartUiStore = create<CartUiState>()((set) => ({
  open: false,
  lastAddedKey: null,
  setOpen: (open) => set(open ? { open } : { open, lastAddedKey: null }),
  showAdded: (key) => set({ open: true, lastAddedKey: key })
}));
