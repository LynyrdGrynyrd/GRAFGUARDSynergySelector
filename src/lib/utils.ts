import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cToF(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}