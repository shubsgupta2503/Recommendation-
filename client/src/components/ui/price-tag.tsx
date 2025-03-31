import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: string;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export function PriceTag({ price, variant = "primary", className }: PriceTagProps) {
  return (
    <span 
      className={cn(
        "relative inline-block px-3 py-1 text-white font-bold rounded-md",
        {
          "bg-primary": variant === "primary",
          "bg-secondary": variant === "secondary",
          "bg-accent": variant === "accent",
        },
        "after:content-[''] after:absolute after:right-[-6px] after:top-1/2 after:transform after:-translate-y-1/2 after:border-t-6 after:border-b-6 after:border-l-6 after:border-transparent after:border-l-primary",
        {
          "after:border-l-primary": variant === "primary",
          "after:border-l-secondary": variant === "secondary",
          "after:border-l-accent": variant === "accent",
        },
        className
      )}
    >
      {price}
    </span>
  );
}
