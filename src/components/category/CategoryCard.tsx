"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { ThemedImage } from "@/components/common";
import { CategoryCardProps } from "@/types/product/product.types";
import { getLocalizedValue, getCategorySizeClasses } from "@/utils/product/product.utils";

import { useSearchParams } from "next/navigation";

import { memo } from "react";

export const CategoryCard = memo(function CategoryCard({
  category,
  size = "md",
}: CategoryCardProps) {
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

  const { sizeClasses, innerSizeClasses, textClasses, subTextClasses } =
    getCategorySizeClasses(size);

  return (
    <Link
      href={href}
      className={`relative overflow-hidden isolate flex flex-col items-center justify-center gap-1.5 rounded-full border lg:transition-all lg:duration-300 group text-center shrink-0 select-none ${sizeClasses} ${
        isActive
          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
          : "border-border bg-card lg:hover:border-primary lg:hover:shadow-xl"
      }`}
    >
      {/* Background Fill Hover Effect - Fast bottom fill, top empty using active theme primary */}
      <div className="absolute inset-0 bg-primary rounded-full scale-y-0 lg:group-hover:scale-y-100 origin-bottom transition-transform duration-200 ease-out -z-10" />

      <div
        className={`rounded-full bg-primary/10 lg:group-hover:bg-primary-foreground/20 lg:group-hover:scale-105 lg:group-hover:rotate-3 lg:group-hover:shadow-sm flex items-center justify-center lg:transition-all lg:duration-300 lg:ease-out overflow-hidden shrink-0 ${innerSizeClasses}`}
      >
        <ThemedImage
          src={category?.image}
          alt={name}
          className="h-full w-full object-contain p-1.5 lg:transition-transform lg:duration-300 lg:group-hover:scale-105"
          fallbackType="category"
        />
      </div>
      <h3
        className={`font-semibold text-foreground lg:group-hover:text-primary-foreground lg:transition-colors lg:duration-300 line-clamp-2 px-1 leading-tight ${textClasses}`}
      >
        {name}
      </h3>
      {category?.productCount !== undefined && category?.productCount > 0 ? (
        <p
          className={`${subTextClasses} text-muted-foreground lg:group-hover:text-primary-foreground/80 lg:transition-colors lg:duration-300 leading-none`}
        >
          {category?.productCount} items
        </p>
      ) : category?.subCategories && category?.subCategories?.length > 0 ? (
        <p
          className={`${subTextClasses} text-muted-foreground lg:group-hover:text-primary-foreground/80 lg:transition-colors lg:duration-300 leading-none`}
        >
          {category?.subCategories?.length} subs
        </p>
      ) : null}
    </Link>
  );
});
