"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { ManufacturerFilter } from "@/components/product/ManufacturerFilter";
import { BadgeFilter } from "@/components/product/BadgeFilter";
import { ROUTES } from "@/constants/routes";
import { getLocalizedValue } from "@/utils/product/product.utils";
import { ICategory, FilterControlsProps } from "@/types/product/product.types";

export function FilterControls({
  subCategories,
  activeSubCategoryId,
  createSubcategoryUrl,
  productsLength,
  hasActiveFilters,
  locale,
}: FilterControlsProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between gap-4 pb-2 border-b border-border/60 sticky z-30 bg-background/95 backdrop-blur-sm pt-2 px-2! top-[124px] w-full min-w-0">
      {/* Left side: Subcategory Filter Chips */}
      {subCategories?.length > 0 ? (
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex flex-nowrap gap-2 items-center overflow-x-auto pb-1 scrollbar-none">
            <Link
              href={createSubcategoryUrl()}
              className={`text-xs font-semibold px-4 py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer select-none shrink-0 ${
                !activeSubCategoryId
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {t("common.all") || "All"}
            </Link>
            {subCategories?.map((subCat: ICategory) => {
              const subCatId = subCat?.slug || subCat?.id || subCat?._id;
              const isSubActive =
                activeSubCategoryId === subCatId ||
                activeSubCategoryId === subCat?.id ||
                activeSubCategoryId === subCat?._id;
              const subName = getLocalizedValue(subCat?.name, locale);
              return (
                <Link
                  key={subCatId}
                  href={createSubcategoryUrl(subCatId)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer select-none shrink-0 ${
                    isSubActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {subName}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground font-medium shrink-0">
          {productsLength > 0 && (
            <span>
              {productsLength} {t("common.items") || "items"}
            </span>
          )}
        </div>
      )}

      {/* Right side: Action Filters Row */}
      <div className="flex items-center gap-2 shrink-0 pb-3">
        <ManufacturerFilter />
        <BadgeFilter />
        {hasActiveFilters && (
          <Link
            href={ROUTES.PRODUCTS()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 text-xs font-semibold transition-all duration-200"
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </Link>
        )}
      </div>
    </div>
  );
}
