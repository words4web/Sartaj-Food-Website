"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShoppingCart, Loader2, Plus } from "lucide-react";
import Link from "next/link";

import { IProduct } from "@/types/product/product.types";
import { BundleCardProps } from "@/types/bundle.types";
import { Button } from "@/components/ui/button";
import { ThemedImage } from "@/components/common";
import { cartService } from "@/services/cart/cart.service";
import { addOrUpdateItem, removeItem } from "@/lib/store/cartSlice";
import { debouncedGlobalSync, setPendingSync } from "@/components/cart/cartSync";
import { ROUTES } from "@/constants/routes";

const getProductName = (product: IProduct): string => {
  const name = product?.name;
  if (typeof name === "object") return name?.en ?? "Product";
  return name ?? "Product";
};

export function BundleCard({ bundle }: BundleCardProps) {
  const t = useTranslations("sale");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const addingRef = useRef(false);

  const [p1, p2] = bundle.products;

  const handleAddBundle = async () => {
    if (addingRef.current) return;
    addingRef.current = true;
    setIsAdding(true);

    const productId1 = p1._id!;
    const productId2 = p2._id!;

    dispatch(addOrUpdateItem({ productId: productId1, quantity: 1, product: p1 }));
    dispatch(addOrUpdateItem({ productId: productId2, quantity: 1, product: p2 }));

    try {
      await cartService.addToCart({ productId: productId1, quantity: 1 });

      try {
        await cartService.addToCart({ productId: productId2, quantity: 1 });

        setPendingSync({ dispatch, queryClient });
        debouncedGlobalSync();
        toast.success(t("bundle.bothAdded") ?? "Both products added to cart!");
      } catch (err: any) {
        dispatch(removeItem({ productId: productId2 }));

        setPendingSync({ dispatch, queryClient });
        debouncedGlobalSync();
        toast.warning(
          t("bundle.partialSuccess") ??
            "First item was added but the second failed. Please add it manually.",
        );
      }
    } catch (err: any) {
      dispatch(removeItem({ productId: productId1 }));
      dispatch(removeItem({ productId: productId2 }));
      setPendingSync({ dispatch, queryClient });
      debouncedGlobalSync();
      toast.error(
        err?.response?.data?.message ??
          t("bundle.errorAdding") ??
          "Failed to add bundle. Please try again.",
      );
    } finally {
      setIsAdding(false);
      addingRef.current = false;
    }
  };

  const name1 = getProductName(p1);
  const name2 = getProductName(p2);
  const img1 = p1?.images?.[0] ?? "";
  const img2 = p2?.images?.[0] ?? "";

  return (
    <div className="relative flex flex-col bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group min-w-[280px] sm:min-w-0">
      {bundle?.savings > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {t("bundle.save", { amount: bundle?.savings?.toLocaleString() }) ??
              `SAVE ¥${bundle?.savings?.toLocaleString()}`}
          </span>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 xs:gap-3 p-4 xs:p-5 pb-3 bg-muted/20 group-hover:bg-primary/5 transition-colors duration-300">
        <Link
          href={ROUTES.PRODUCTS(p1?.slug || p1?._id || "")}
          className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
          tabIndex={-1}
        >
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 bg-card rounded-xl border border-border/60 shadow-sm flex items-center justify-center p-1.5 xs:p-2 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <ThemedImage
              src={img1}
              alt={name1}
              className="max-w-full max-h-full object-contain"
              fallbackType="product"
            />
          </div>
          <div className="text-center min-w-0 w-full">
            <p className="text-[11px] sm:text-xs font-semibold text-foreground line-clamp-2 leading-tight">
              {name1}
            </p>
            <p className="text-xs sm:text-sm font-black text-primary mt-0.5">
              ¥{p1?.unitPrice?.toLocaleString()}
            </p>
          </div>
        </Link>

        <div className="flex flex-col items-center shrink-0">
          <div className="w-7 h-7 xs:w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
            <Plus className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary stroke-[2.5]" />
          </div>
        </div>

        <Link
          href={ROUTES.PRODUCTS(p2?.slug || p2?._id || "")}
          className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
          tabIndex={-1}
        >
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 bg-card rounded-xl border border-border/60 shadow-sm flex items-center justify-center p-1.5 xs:p-2 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <ThemedImage
              src={img2}
              alt={name2}
              className="max-w-full max-h-full object-contain"
              fallbackType="product"
            />
          </div>
          <div className="text-center min-w-0 w-full">
            <p className="text-[11px] sm:text-xs font-semibold text-foreground line-clamp-2 leading-tight">
              {name2}
            </p>
            <p className="text-xs sm:text-sm font-black text-primary mt-0.5">
              ¥{p2?.unitPrice?.toLocaleString()}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 flex-1">
        <div>
          <h3 className="font-bold text-sm text-foreground leading-snug">{bundle?.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
            {bundle?.description}
          </p>
        </div>

        <div className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2.5 border border-border/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              {t("bundle.originalPrice") ?? "Original"}
            </span>
            <span className="text-sm text-muted-foreground line-through font-semibold">
              ¥{bundle?.originalPrice?.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-8 bg-border/60 mx-2" />
          <div className="flex flex-col gap-0.5 items-end">
            <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">
              {t("bundle.bundlePrice") ?? "Bundle Price"}
            </span>
            <span className="text-base font-black text-foreground">
              ¥{bundle?.bundlePrice?.toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          className="w-full rounded-xl font-bold gap-2 h-10 mt-auto shadow-sm active:scale-95 transition-all disabled:opacity-60 disabled:pointer-events-none"
          onClick={handleAddBundle}
          disabled={isAdding}
          id={`add-bundle-${bundle?.id}`}
        >
          {isAdding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("bundle.adding") ?? "Adding…"}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{t("bundle.addBundleToCart") ?? "Add Bundle to Cart"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
