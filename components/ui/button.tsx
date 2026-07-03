import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }
>(({ className, variant = "primary", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:opacity-50",
        variant === "primary" &&
          "teamix-gradient-bg text-white shadow-md shadow-teamix-teal/25 hover:opacity-90",
        variant === "ghost" &&
          "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        variant === "outline" &&
          "border border-gray-200 bg-white text-gray-700 hover:border-teamix-teal hover:text-teamix-teal",
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
