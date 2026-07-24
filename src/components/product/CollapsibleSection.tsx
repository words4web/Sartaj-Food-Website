"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CollapsibleSectionProps } from "@/types/product/product.types";

export function CollapsibleSection({ headerHtml, contentHtml }: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const headerText = headerHtml
    ?.replace(/<[^>]*>/g, "")
    ?.trim()
    ?.replace(/[:：\s]+$/, "");

  if (!contentHtml || !contentHtml?.trim()) return null;

  return (
    <div className="mb-4 border border-border rounded-xl bg-muted/10 overflow-hidden">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full p-4 font-bold text-foreground text-sm cursor-pointer hover:bg-muted/30 transition-colors"
      >
        <span>{headerText}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${!isCollapsed ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0 opacity-0 pointer-events-none" : "max-h-[1200px] opacity-100"
        }`}
      >
        <div className="px-4 pb-4 pt-1">
          <div
            className="product-rich-description"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
