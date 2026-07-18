import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(120deg,color-mix(in_srgb,var(--primary)_92%,white),color-mix(in_srgb,var(--accent-rose)_88%,white))] px-6 py-3 text-[var(--primary-foreground)] shadow-[0_10px_24px_-16px_var(--primary)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-16px_var(--primary)]",
        secondary:
          "border border-[var(--border)] bg-white px-6 py-3 text-[var(--foreground)] hover:-translate-y-0.5 hover:bg-[var(--muted)]",
        ghost: "px-3 py-2 text-[var(--foreground)] hover:bg-[var(--muted)]"
      },
      size: {
        md: "h-11",
        lg: "h-12 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
