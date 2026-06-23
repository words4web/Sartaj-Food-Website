"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useGetProfile } from "@/services/auth/auth.hooks";
import { useGetCart } from "@/services/cart/cart.hooks";
import { useGetWishlist } from "@/services/wishlist/wishlist.hooks";
import { useFcmLifecycle } from "@/hooks/useFcmLifecycle";
import { HeaderActions } from "./HeaderActions";
import { CategoryMarqueeStrip } from "./CategoryMarqueeStrip";

export function Header() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  useGetProfile(isAuthenticated);
  useGetCart(isAuthenticated);
  useGetWishlist(isAuthenticated);

  useFcmLifecycle();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue?.trim();
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", "1");
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(ROUTES.PRODUCTS_WITH_QUERY(params?.toString()));
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center min-w-fit">
              <img
                src="/sartaj_logo.svg"
                alt="Sartaj Foods Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md">
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`${t("common.search")}...`}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-2.5 cursor-pointer">
                  <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <HeaderActions />
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`${t("common.search")}...`}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-3 top-2.5 cursor-pointer">
                <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </div>
          </form>
        </div>
        <CategoryMarqueeStrip />
      </header>
    </>
  );
}
