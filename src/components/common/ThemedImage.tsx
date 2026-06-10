"use client";

import { useState, forwardRef } from "react";
import { Package, User } from "lucide-react";
import type { ThemedImageProps } from "@/types/common.types";

export const ThemedImage = forwardRef<HTMLImageElement, ThemedImageProps>(
  ({ src, alt = "Image", emoji, className = "", style, fallbackType = "product" }, ref) => {
    const [hasError, setHasError] = useState(false);

    // If there is no src or we encountered an error, render the themed gradient placeholder
    if (!src || hasError) {
      if (fallbackType === "category") {
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 text-foreground transition-colors duration-300">
            <Package className="h-1/2 w-1/2 text-primary/70" />
          </div>
        );
      }

      if (fallbackType === "avatar") {
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/15 text-foreground rounded-full">
            <User className="h-1/2 w-1/2 text-primary/80" />
          </div>
        );
      }

      // Default: product placeholder with dynamic gradient and drop-shadowed emoji
      return (
        <div className="w-full h-full bg-gradient-to-br from-primary/15 via-accent/5 to-background flex items-center justify-center select-none relative overflow-hidden">
          {/* Glowing blur pool in background for premium depth */}
          <div className="absolute h-2/3 w-2/3 rounded-full bg-primary/10 blur-xl top-1/6 left-1/6 pointer-events-none" />

          <span className="text-4xl md:text-5xl filter drop-shadow-md select-none transform hover:scale-110 transition-transform duration-300">
            {emoji || "📦"}
          </span>
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={() => setHasError(true)}
      />
    );
  },
);

ThemedImage.displayName = "ThemedImage";
