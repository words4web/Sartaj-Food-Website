import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getOrderStatusColor(status: string): string {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
    case "processing":
    case "dispatched":
    case "shipped":
      return "bg-sky-500/10 text-sky-500 border border-sky-500/20";
    case "placed":
    case "confirmed":
      return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
    case "cancelled":
      return "bg-rose-500/10 text-rose-500 border border-rose-500/20";
    case "payment_pending":
    default:
      return "bg-gray-500/10 text-gray-500 border border-gray-500/20";
  }
}

export function formatOrderStatus(status: string): string {
  return status?.replace(/_/g, " ")?.toUpperCase() || "UNKNOWN";
}
