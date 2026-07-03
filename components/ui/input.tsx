import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-teamix-teal focus:ring-2 focus:ring-teamix-teal/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
