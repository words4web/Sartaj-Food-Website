"use client";

import React from "react";
import { formatYen } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  isDiscounted?: boolean;
  size?: "sm" | "md" | "lg";
  showCurrency?: boolean;
}

export function PriceDisplay({
  price,
  originalPrice,
  isDiscounted = false,
  size = "md",
  showCurrency = true,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg font-bold",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`${sizeClasses[size]} font-semibold text-primary`}>
        {formatYen(price, showCurrency)}
      </span>
      {originalPrice && originalPrice > price && (
        <span
          className={`${sizeClasses[size === "lg" ? "md" : "sm"]} line-through text-on-surface-variant`}
        >
          {formatYen(originalPrice, showCurrency)}
        </span>
      )}
      {isDiscounted && originalPrice && originalPrice > price && (
        <span className="text-xs font-bold text-error px-2 py-1 bg-error/10 rounded-full">
          {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
        </span>
      )}
    </div>
  );
}
