"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryGridSkeleton } from "@/components/skeletons/CategorySkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useGetCategories } from "@/services/category/category.hooks";
import { useState, useEffect, useRef } from "react";

export function CategoriesGrid() {
  const t = useTranslations();
  const { data: categories = [], isLoading, error, refetch } = useGetCategories();
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = entry.target.getAttribute("data-index");
            if (index !== null) {
              setVisibleElements((prev) => ({
                ...prev,
                [index]: entry.isIntersecting,
              }));
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -100px 0px" },
      );
    }
    return observerRef.current;
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const elementRefCallback = (el: HTMLDivElement | null) => {
    if (el) {
      getObserver().observe(el);
    }
  };

  return (
    <section className="pt-16 pb-8 bg-muted/40 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t("home.shopByCategories")}
          </h2>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <Link
              href={ROUTES.PRODUCTS()}
              className="text-primary hover:text-primary font-semibold text-sm"
            >
              {t("home.allCategories")} →
            </Link>
          </div>
        </div>

        {isLoading ? (
          <CategoryGridSkeleton />
        ) : error ? (
          <CommonError onRetry={refetch} message="Could not load categories" />
        ) : categories?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
            No categories available.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center">
            {categories?.map((category: any, idx: number) => {
              const isVisible = visibleElements[`cat-${idx}`];
              const transformValue = isVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)";

              return (
                <div
                  key={category?.id || category?._id}
                  ref={elementRefCallback}
                  data-index={`cat-${idx}`}
                  className="w-full h-full"
                >
                  <div
                    style={{
                      transform: transformValue,
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: isVisible ? `${(idx % 5) * 60}ms` : "0ms",
                      transitionProperty: "transform, opacity",
                      transitionDuration: "800ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="w-full h-full transform"
                  >
                    <CategoryCard category={category} size="lg" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
