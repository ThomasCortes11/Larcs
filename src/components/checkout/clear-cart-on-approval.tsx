"use client";

import { useEffect } from "react";

import { useCartStore } from "@/store/cart-store";

interface ClearCartOnApprovalProps {
  shouldClear: boolean;
}

export function ClearCartOnApproval({ shouldClear }: ClearCartOnApprovalProps) {
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    if (shouldClear) {
      clear();
    }
  }, [clear, shouldClear]);

  return null;
}