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
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition disabled:opacity-50",
        variant === "primary" &&
          "teamix-rainbow-bg text-white shadow-lg shadow-teamix-teal/25 hover:scale-[1.02] hover:opacity-95",
        variant === "ghost" &&
          "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        variant === "outline" &&
          "border-2 border-gray-200 bg-white/80 text-gray-700 backdrop-blur-sm hover:border-teamix-blue hover:text-teamix-blue",
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
