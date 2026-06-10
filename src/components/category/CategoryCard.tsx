"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { ThemedImage } from "@/components/common";
import { CategoryCardProps } from "@/types/product/product.types";
import { getLocalizedValue } from "@/utils/product/product.utils";

import { useSearchParams } from "next/navigation";

export function CategoryCard({ category, size = "md" }: CategoryCardProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const name = getLocalizedValue(category?.name, locale);
  const currentId = category?.id || category?._id || "all";
  const activeCategoryId = searchParams.get("category") || "all";
  const isActive = activeCategoryId === currentId;

  const params = new URLSearchParams(searchParams?.toString() || "");
  params.set("page", "1");
  params.delete("subcategory");
  if (currentId === "all") {
    params.delete("category");
  } else {
    params.set("category", currentId);
  }
  const href = ROUTES.PRODUCTS_WITH_QUERY(params?.toString());

  const isSmall = size === "sm";

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 rounded-full border hover:border-primary hover:shadow-lg transition-all group text-center shrink-0 select-none ${
        isSmall ? "w-[120px] h-[120px] p-2.5" : "w-[150px] h-[150px] p-4"
      } ${
        isActive
          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
          : "border-border bg-card"
      }`}
    >
      <div
        className={`rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors overflow-hidden shrink-0 ${
          isSmall ? "h-13 w-13" : "h-16 w-16"
        }`}
      >
        <ThemedImage
          src={category?.image}
          alt={name}
          className="h-full w-full object-contain p-1"
          fallbackType="category"
        />
      </div>
      <h3
        className={`font-semibold text-foreground line-clamp-2 px-1 leading-tight ${
          isSmall ? "text-[10px]" : "text-xs"
        }`}
      >
        {name}
      </h3>
      {category?.productCount !== undefined && category?.productCount > 0 ? (
        <p
          className={`${isSmall ? "text-[9px]" : "text-[10px]"} text-muted-foreground leading-none`}
        >
          {category?.productCount} items
        </p>
      ) : category?.subCategories && category?.subCategories?.length > 0 ? (
        <p
          className={`${isSmall ? "text-[9px]" : "text-[10px]"} text-muted-foreground leading-none`}
        >
          {category?.subCategories?.length} subs
        </p>
      ) : null}
    </Link>
  );
}
