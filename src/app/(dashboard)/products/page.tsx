"use client";

import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useGetCategories } from "@/services/category/category.hooks";
import { useGetInfiniteProductsByCategory } from "@/services/product/product.hooks";
import { ICategory } from "@/types/product/product.types";
import { AuthLoadingOverlay } from "@/components/common/AuthLoadingOverlay";
import { ROUTES } from "@/constants/routes";
import { CategorySidebar } from "./_components/CategorySidebar";
import { FilterControls } from "./_components/FilterControls";
import { ProductGrid } from "./_components/ProductGrid";

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

  const activeManufacturersParam = searchParams?.get("manufacturers") || "";
  const activeBadgeParam = searchParams?.get("badge") || "";

  const hasActiveFilters = useMemo(() => {
    return (
      (activeCategoryId !== "all" && activeCategoryId !== "") ||
      activeSubCategoryId !== "" ||
      searchQuery !== "" ||
      activeManufacturersParam !== "" ||
      activeBadgeParam !== ""
    );
  }, [
    activeCategoryId,
    activeSubCategoryId,
    searchQuery,
    activeManufacturersParam,
    activeBadgeParam,
  ]);

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
  } = useGetInfiniteProductsByCategory(queryCategoryId, {
    limit,
    search: searchQuery,
    manufacturers: activeManufacturersParam,
    badge: activeBadgeParam,
  });

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
      (c: ICategory) =>
        c?.slug === activeCategoryId || c?.id === activeCategoryId || c?._id === activeCategoryId,
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
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          <CategorySidebar
            scrollContainerRef={scrollContainerRef}
            scrollState={scrollState}
            isCategoriesLoading={isCategoriesLoading}
            categoriesError={categoriesError}
            refetchCategories={refetchCategories}
            categoriesList={categoriesList}
          />
          <div className="flex-1 w-full min-w-0 space-y-6">
            <FilterControls
              subCategories={subCategories}
              activeSubCategoryId={activeSubCategoryId}
              createSubcategoryUrl={createSubcategoryUrl}
              productsLength={products?.length}
              hasActiveFilters={hasActiveFilters}
              locale={locale}
            />
            <ProductGrid
              isProductsLoading={isProductsLoading}
              productsError={productsError}
              refetchProducts={refetchProducts}
              products={products}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              bottomLoadRef={bottomLoadRef}
            />
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
