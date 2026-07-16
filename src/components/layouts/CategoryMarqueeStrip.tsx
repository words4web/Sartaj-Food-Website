"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams, usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useGetCategories } from "@/services/category/category.hooks";
import { getLocalizedValue } from "@/utils/product/product.utils";
import { Skeleton } from "@/components/skeletons/Skeleton";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Home } from "lucide-react";

export function CategoryMarqueeStrip() {
  const locale = useLocale();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: categories = [], isLoading } = useGetCategories();
  const isDesktop = useIsDesktop();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const activeCategoryId = searchParams.get("category") || "all";

  // Build route path for category clicks
  const getCategoryHref = (categoryId: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", "1");
    params.delete("subcategory");
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    return ROUTES.PRODUCTS_WITH_QUERY(params.toString());
  };

  // Hybrid auto-scroll loop animation frame
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading || categories?.length === 0 || isInteracting) return;

    let animationFrameId: number;

    const scroll = () => {
      // Half width since we duplicated the list items
      const halfWidth = (container.scrollWidth - 16) / 2; // Subtract gap offset

      container.scrollLeft += 0.7; // Incremental auto scroll speed

      // Wrap back to start seamlessly when reaching mid-point
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = container.scrollLeft - halfWidth;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoading, categories.length, isInteracting]);

  if (isLoading) {
    return (
      <div className="w-full bg-card border-b border-border py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="h-7 w-24 rounded-full shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (categories?.length === 0) return null;

  const marqueeItems = [...categories, ...categories];

  return (
    <div className="w-full bg-card border-b border-border py-2 overflow-hidden select-none relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-4">
        {/* Static Pinned ALL / HOME Categories Option */}
        <div className="relative shrink-0 z-20 bg-card pr-3 border-r border-border/60 flex items-center gap-2">
          <Link
            href={ROUTES.HOME}
            className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
              pathname === "/" || pathname === `/${locale}`
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-border bg-background hover:border-primary/50 hover:text-primary"
            }`}
            title={t("common.home") || "Home"}
          >
            <Home className="h-3.5 w-3.5" />
            <span>{t("common.home") || "Home"}</span>
          </Link>
          <Link
            href={getCategoryHref("all")}
            className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 inline-block ${
              activeCategoryId === "all" && pathname !== "/" && pathname !== `/${locale}`
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-border bg-background hover:border-primary/50 hover:text-primary"
            }`}
          >
            {t("common.all")}
          </Link>
        </div>

        {/* Scrollable Marquee Container */}
        <div className="relative flex-1 overflow-hidden min-w-0">
          <div
            ref={containerRef}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            className="flex items-center overflow-x-auto no-scrollbar gap-3 sm:gap-4 py-0.5 cursor-grab active:cursor-grabbing w-full"
          >
            {marqueeItems?.map((category: any, idx: number) => {
              const currentId = category?.id || category?._id;
              const name = getLocalizedValue(category?.name, locale);
              const isActive = activeCategoryId === currentId;

              return (
                <Link
                  key={`${currentId}-${idx}`}
                  href={getCategoryHref(currentId)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 shrink-0 ${
                    isActive
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-background hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
