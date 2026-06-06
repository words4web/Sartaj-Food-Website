import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdempotencyKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getOrderStatusColor(status: string): string {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
