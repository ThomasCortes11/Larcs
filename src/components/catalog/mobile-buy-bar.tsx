"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toCurrency } from "@/lib/utils";

interface MobileBuyBarProps {
  name: string;
  price: number;
  targetId: string;
}

// En celular, barra fija abajo con el precio y un botón que lleva a escoger talla y comprar.
// Se esconde mientras las opciones de compra ya están en pantalla.
export function MobileBuyBar({ name, price, targetId }: MobileBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Visible solo cuando las opciones de compra quedaron más abajo de la pantalla.
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top > 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white/95 px-4 py-3 pr-24 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.3)] backdrop-blur md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-[var(--muted-foreground)]">
                {name}
              </p>
              <p className="text-base font-bold">{toCurrency(price)}</p>
            </div>
            <Button
              onClick={() =>
                document
                  .getElementById(targetId)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="shrink-0"
            >
              Escoger talla
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
