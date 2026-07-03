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
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition disabled:opacity-50",
        variant === "primary" &&
          "bg-sky-400 text-slate-950 hover:bg-sky-300",
        variant === "ghost" &&
          "text-slate-300 hover:bg-slate-800 hover:text-white",
        variant === "outline" &&
          "border border-slate-700 text-slate-200 hover:bg-slate-900",
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
