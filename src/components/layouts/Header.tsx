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

export function Header() {
  const { isAuthenticated } = useAuth();
  useGetProfile(isAuthenticated);
  useGetCart(isAuthenticated);
  useGetWishlist(isAuthenticated);

  useFcmLifecycle();

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="relative z-40 max-w-7xl mx-auto pl-1 pr-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center min-w-fit">
              <img
                src="/sartaj_logo.svg"
                alt="Sartaj Foods Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <SearchBar className="hidden md:block flex-1 max-w-md" />

            {/* Right Actions */}
            <HeaderActions />
          </div>

          {/* Mobile Search */}
          <SearchBar className="md:hidden mt-3" isMobile />
        </div>
        <CategoryMarqueeStrip />
      </header>
    </>
  );
}
