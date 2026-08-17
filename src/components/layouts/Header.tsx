"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useGetProfile } from "@/services/auth/auth.hooks";
import { useGetCart } from "@/services/cart/cart.hooks";
import { useGetWishlist } from "@/services/wishlist/wishlist.hooks";
import { useFcmLifecycle } from "@/hooks/useFcmLifecycle";
import { HeaderActions } from "./HeaderActions";
import { CategoryMarqueeStrip } from "./CategoryMarqueeStrip";
import { SearchBar } from "./SearchBar";
import { useTranslations } from "next-intl";

export function Header() {
  const { isAuthenticated } = useAuth();
  useGetProfile(isAuthenticated);
  useGetCart(isAuthenticated);
  useGetWishlist(isAuthenticated);

  useFcmLifecycle();

  const tTranslate = useTranslations();

  return (
    <>
      <div className="notranslate w-full bg-[#1e293b] text-white py-2 overflow-hidden border-b border-slate-900/60 text-base sm:text-lg font-extrabold select-none relative z-50">
        <div className="flex animate-marquee-slow gap-8">
          <span>{tTranslate("common.marqueeRecommendation")}</span>
          <span>{tTranslate("common.marqueeRecommendation")}</span>
          <span>{tTranslate("common.marqueeRecommendation")}</span>
          <span>{tTranslate("common.marqueeRecommendation")}</span>
        </div>
      </div>

      {/* Top Header */}
      <header className="notranslate sticky top-0 z-50 w-full bg-background border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="relative z-40 max-w-7xl mx-auto pl-1 pr-2 sm:px-4 py-3 grid grid-cols-[auto_1fr_auto] gap-x-2 sm:gap-x-4 gap-y-3 items-center">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center min-w-fit col-start-1">
            <img
              src="/sartaj_logo.svg"
              alt="Sartaj Foods Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Search Bar - Unified Mobile & Desktop */}
          <SearchBar className="col-span-3 md:col-span-1 md:col-start-2 order-last md:order-none w-full max-w-full md:max-w-md md:mx-auto" />

          {/* Right Actions */}
          <div className="col-start-3 justify-self-end">
            <HeaderActions />
          </div>
        </div>
        <CategoryMarqueeStrip />
      </header>
    </>
  );
}
