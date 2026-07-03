import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  return `${base.replace(/\/$/, "")}/v1`;
}
