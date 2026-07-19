"use client";

import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryCardSkeleton } from "@/components/skeletons/CategorySkeleton";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useGetCategories } from "@/services/category/category.hooks";
import { useGetInfiniteProductsByCategory } from "@/services/product/product.hooks";
import { ICategory } from "@/types/product/product.types";
import { AuthLoadingOverlay } from "@/components/common/AuthLoadingOverlay";
import { ROUTES } from "@/constants/routes";
import { getLocalizedValue } from "@/utils/product/product.utils";

function ProductsContent() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("category") || "all";
  const activeSubCategoryId = searchParams.get("subcategory") || "";
  const searchQuery = searchParams.get("search") || "";
  const limit = 32;

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategories();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
    canScrollTop: false,
    canScrollBottom: false,
  });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = el;

    const canScrollLeft = scrollLeft > 3;
    const canScrollRight = scrollLeft + clientWidth < scrollWidth - 3;
    const canScrollTop = scrollTop > 3;
    const canScrollBottom = scrollTop + clientHeight < scrollHeight - 3;

    setScrollState((prev) => {
      if (
        prev.canScrollLeft === canScrollLeft &&
        prev.canScrollRight === canScrollRight &&
        prev.canScrollTop === canScrollTop &&
        prev.canScrollBottom === canScrollBottom
      ) {
        return prev;
      }
      return { canScrollLeft, canScrollRight, canScrollTop, canScrollBottom };
    });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();

    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const queryCategoryId = activeSubCategoryId || activeCategoryId;

  const {
    data,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteProductsByCategory(queryCategoryId, { limit, search: searchQuery });

  const products = useMemo(() => {
    return data?.pages?.flatMap((page) => page?.products) || [];
  }, [data]);

  const bottomLoadRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchNextPageRef = useRef(fetchNextPage);
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const isProductsLoadingRef = useRef(isProductsLoading);

  fetchNextPageRef.current = fetchNextPage;
  hasNextPageRef.current = hasNextPage;
  isFetchingNextPageRef.current = isFetchingNextPage;
  isProductsLoadingRef.current = isProductsLoading;

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const isAnyIntersecting = entries?.some((entry) => entry?.isIntersecting);
        if (
          isAnyIntersecting &&
          hasNextPageRef.current &&
          !isFetchingNextPageRef.current &&
          !isProductsLoadingRef.current
        ) {
          fetchNextPageRef.current();
        }
      },
      {
        rootMargin: "400px",
        threshold: 0.01,
      },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const triggerEl = document.getElementById("infinite-scroll-trigger");
    const bottomEl = bottomLoadRef.current;

    if (triggerEl && observerRef.current) {
      observerRef.current.observe(triggerEl);
    }
    if (bottomEl && observerRef.current) {
      observerRef.current.observe(bottomEl);
    }

    return () => {
      if (triggerEl && observerRef.current) {
        observerRef.current.unobserve(triggerEl);
      }
      if (bottomEl && observerRef.current) {
        observerRef.current.unobserve(bottomEl);
      }
    };
  }, [products?.length]);

  const categoriesList = useMemo(() => {
    const allCategory: ICategory = {
      id: "all",
      name: t("products.allProducts") || "All Products",
      image: "",
      productCount: 0,
    };
    return [allCategory, ...categories];
  }, [categories, t]);

  // Find active parent category in the categories tree (excluding the virtual "All Products" category)
  const currentCategory = useMemo(() => {
    return categories?.find(
      (c: ICategory) => c?.id === activeCategoryId || c?._id === activeCategoryId,
    );
  }, [categories, activeCategoryId]);

  const subCategories = useMemo(() => {
    return currentCategory?.subCategories || [];
  }, [currentCategory]);

  const createSubcategoryUrl = (subId?: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("page");
    if (subId) {
      params.set("subcategory", subId);
    } else {
      params.delete("subcategory");
    }
    return ROUTES.PRODUCTS_WITH_QUERY(params?.toString());
  };

  return (
    <main className="relative z-10 min-h-screen bg-muted/40 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
          {t("products.products")}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          {/* Left / Top Categories Sidebar */}
          <div className="w-full lg:w-[170px] shrink-0 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 hidden lg:block">
              {t("home.shopByCategories") || "Categories"}
            </h2>

            {/* Scrollable Container Wrapper with dynamic gradient overflow indicators */}
            <div className="relative w-full group/scrollable">
              {/* Left Shadow (mobile/tablet only) */}
              <div
                className={`absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 lg:hidden ${
                  scrollState.canScrollLeft ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Right Shadow (mobile/tablet only) */}
              <div
                className={`absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 lg:hidden ${
                  scrollState.canScrollRight ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Top Shadow (desktop only) */}
              <div
                className={`absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 hidden lg:block ${
                  scrollState.canScrollTop ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Bottom Shadow (desktop only) */}
              <div
                className={`absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-background/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 hidden lg:block ${
                  scrollState.canScrollBottom ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Flex horizontal scroll on mobile, vertical stack scrollable on desktop */}
              <div
                ref={scrollContainerRef}
                className="flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc(100vh-220px)] pb-3 sm:pb-2 custom-thin-scrollbar w-full"
              >
                {isCategoriesLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <CategoryCardSkeleton key={idx} size="sm" />
                  ))
                ) : categoriesError ? (
                  <CommonError
                    compact
                    message="Could not load categories"
                    onRetry={refetchCategories}
                  />
                ) : (
                  categoriesList?.map((category) => (
                    <CategoryCard
                      key={category?.id || category?._id}
                      category={category}
                      size="sm"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Products Area */}
          <div className="flex-1 w-full space-y-6">
            {/* Subcategory Filter Chips */}
            {subCategories?.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center pb-4 border-b border-border/60">
                <Link
                  href={createSubcategoryUrl()}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer select-none ${
                    !activeSubCategoryId
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {t("common.all") || "All"}
                </Link>
                {subCategories?.map((subCat: ICategory) => {
                  const subCatId = subCat?.id || subCat?._id;
                  const isSubActive = activeSubCategoryId === subCatId;
                  const subName = getLocalizedValue(subCat?.name, locale);
                  return (
                    <Link
                      key={subCatId}
                      href={createSubcategoryUrl(subCatId)}
                      className={`text-xs font-semibold px-4 py-2 rounded-full border shadow-sm transition-all duration-200 cursor-pointer select-none ${
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
            )}

            {isProductsLoading ? (
              <ProductGridSkeleton
                count={16}
                columnsClass="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
              />
            ) : productsError ? (
              <CommonError
                onRetry={refetchProducts}
                message="Could not load products for this category."
              />
            ) : products?.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl text-muted-foreground">
                No products found in this category.
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                  {products?.map((product, index) => {
                    const isTriggerIndex = index === Math.max(0, products?.length - 16);
                    return (
                      <div
                        key={product?.id || product?._id}
                        id={isTriggerIndex ? "infinite-scroll-trigger" : undefined}
                        className="h-full w-full"
                      >
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
                </div>

                {/* Loading more skeletons */}
                {isFetchingNextPage && (
                  <div className="mt-6">
                    <ProductGridSkeleton
                      count={4}
                      columnsClass="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
                    />
                  </div>
                )}

                {/* End of list indicator */}
                {!hasNextPage && products?.length > 0 && (
                  <div className="flex justify-center py-6 border-t border-border/40">
                    <span className="text-sm font-semibold text-muted-foreground/60 bg-muted/30 border border-border/40 rounded-full px-5 py-2 select-none">
                      ✨ {t("products.noMoreProducts")}
                    </span>
                  </div>
                )}

                {/* Fallback bottom observer and spacing element */}
                <div ref={bottomLoadRef} className="h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<AuthLoadingOverlay />}>
      <ProductsContent />
    </Suspense>
  );
}
