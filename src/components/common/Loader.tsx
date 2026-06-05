import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  label?: string;
}

export function Loader({ size = "md", fullPage = false, label }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const spinner = (
    <div
      className={cn(
        sizeClasses[size],
        "border-primary border-t-transparent rounded-full animate-spin",
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-background rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
          {spinner}
          {label && <p className="text-sm font-medium text-on-surface">{label}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {spinner}
      {label && <p className="text-sm font-medium text-on-surface">{label}</p>}
    </div>
  );
}
