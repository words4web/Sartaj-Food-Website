"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryCarouselSkeleton } from "@/components/skeletons/CategorySkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useGetCategories } from "@/services/category/category.hooks";

export function CategoriesGrid() {
  const t = useTranslations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories = [], isLoading, error, refetch } = useGetCategories();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-16 pb-8 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-foreground">{t("home.shopByCategories")}</h2>

          <div className="flex items-center gap-4">
            <Link
              href={ROUTES.PRODUCTS()}
              className="text-primary hover:text-primary font-semibold text-sm mr-2"
            >
              {t("home.allCategories")} →
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={isLoading || categories.length === 0}
                className="h-9 w-9 rounded-full cursor-pointer hover:bg-muted active:scale-90 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={isLoading || categories.length === 0}
                className="h-9 w-9 rounded-full cursor-pointer hover:bg-muted active:scale-90 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <CategoryCarouselSkeleton />
        ) : error ? (
          <CommonError onRetry={refetch} message="Could not load categories" />
        ) : categories?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
            No categories available.
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
          >
            {categories?.map((category: any) => (
              <CategoryCard key={category?.id || category?._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
