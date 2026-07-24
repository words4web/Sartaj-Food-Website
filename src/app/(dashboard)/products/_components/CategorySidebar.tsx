"use client";

import { useTranslations } from "next-intl";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryCardSkeleton } from "@/components/skeletons/CategorySkeleton";
import { CommonError } from "@/components/ui/common-error";
import { CategorySidebarProps } from "@/types/product/product.types";

export function CategorySidebar({
  scrollContainerRef,
  scrollState,
  isCategoriesLoading,
  categoriesError,
  refetchCategories,
  categoriesList,
}: CategorySidebarProps) {
  const t = useTranslations();
  return (
    <div className="w-full lg:w-[170px] shrink-0 sticky z-30 bg-background/95 backdrop-blur-sm pb-2 lg:pb-0 top-[150px]">
      <h1 className="sr-only">{t("home.shopByCategories") || "Categories"}</h1>

      <div className="relative w-full group/scrollable">
        <div
          className={`absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 lg:hidden ${
            scrollState?.canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 lg:hidden ${
            scrollState?.canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 hidden lg:block ${
            scrollState?.canScrollTop ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 hidden lg:block ${
            scrollState?.canScrollBottom ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={scrollContainerRef}
          className="flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc(100vh-220px)] pb-3 sm:pb-2 custom-thin-scrollbar w-full pt-2"
        >
          {isCategoriesLoading ? (
            Array.from({ length: 6 }).map((_, idx) => <CategoryCardSkeleton key={idx} size="sm" />)
          ) : categoriesError ? (
            <CommonError compact message="Could not load categories" onRetry={refetchCategories} />
          ) : (
            categoriesList?.map((category) => (
              <CategoryCard key={category?.id || category?._id} category={category} size="sm" />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
