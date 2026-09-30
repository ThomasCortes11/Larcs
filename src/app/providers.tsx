"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";

import { useCartStore } from "@/store/cart-store";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <Toaster richColors position="top-right" duration={2200} closeButton />
    </>
  );
}
