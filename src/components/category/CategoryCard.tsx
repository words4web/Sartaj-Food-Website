"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Package } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { CategoryCardProps } from "@/types/product/product.types";
import { getLocalizedValue } from "@/utils/product/product.utils";

export function CategoryCard({ category }: CategoryCardProps) {
  const locale = useLocale();
  const name = getLocalizedValue(category?.name, locale);

  const href = ROUTES.PRODUCTS_BY_CATEGORY(category?.id || category?._id || "");

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-2 rounded-full border border-border hover:border-primary hover:shadow-lg transition-all group text-center bg-card shrink-0 w-[150px] h-[150px] p-4 select-none"
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors overflow-hidden shrink-0">
        {category?.image ? (
          <img src={category.image} alt={name} className="h-full w-full object-contain p-1" />
        ) : (
          <Package className="h-8 w-8 text-foreground group-hover:text-primary" />
        )}
      </div>
      <h3 className="font-semibold text-foreground text-xs line-clamp-1 px-1">{name}</h3>
      {category?.productCount !== undefined && category?.productCount > 0 ? (
        <p className="text-[10px] text-muted-foreground">{category?.productCount} items</p>
      ) : category?.subCategories && category?.subCategories?.length > 0 ? (
        <p className="text-[10px] text-muted-foreground">{category?.subCategories.length} subs</p>
      ) : null}
    </Link>
  );
}
