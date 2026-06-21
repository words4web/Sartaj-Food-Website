"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "@/services/wishlist/wishlist.service";
import { debounce } from "@/utils/debounce/debounce.utils";
import { addToWishlistRedux, removeFromWishlistRedux } from "@/lib/store/wishlistSlice";
import { WishlistButtonProps } from "@/types/product/product.types";

export function WishlistButton({ productId, className = "" }: WishlistButtonProps) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const wishlistItems = useSelector((state: RootState) => state?.wishlist?.items || []);
  const isFavorite = productId ? wishlistItems?.includes(String(productId)) : false;

  const debouncedSync = useRef(
    debounce(async (prodId: string, toAdd: boolean) => {
      try {
        if (toAdd) {
          await wishlistService.addToWishlist(prodId);
          toast.success(t("products.addToWishlist") || "Added to wishlist");
        } else {
          await wishlistService.removeFromWishlist(prodId);
          toast.success(t("wishlist.removeFromWishlist") || "Removed from wishlist");
        }
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to update wishlist");
        if (toAdd) {
          dispatch(removeFromWishlistRedux(prodId));
        } else {
          dispatch(addToWishlistRedux(prodId));
        }
      }
    }, 800),
  );

  useEffect(() => {
    const syncFn = debouncedSync.current;
    return () => {
      syncFn.cancel();
    };
  }, []);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId) return;
    const prodId = String(productId);
    const nextState = !isFavorite;

    if (nextState) {
      dispatch(addToWishlistRedux(prodId));
    } else {
      dispatch(removeFromWishlistRedux(prodId));
    }

    debouncedSync.current(prodId, nextState);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleWishlistToggle}
      className={`rounded-full bg-card shadow hover:shadow-md border border-border text-muted-foreground hover:text-red-500 z-10 transition-all ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
    </Button>
  );
}
