"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Palette, Check } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { HEADER_CATEGORIES } from "@/data/navigation";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useGetProfile } from "@/services/auth/auth.hooks";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { themes, applyTheme, themeSwatchColors, type Theme } from "@/lib/themes";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();
  const { isAuthenticated, user, logout } = useAuth();
  useGetProfile(isAuthenticated);

  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);
  const currentConfig = themes[currentTheme];
  const cartItemsCount = useSelector((state: RootState) => state.cart?.cart?.items?.length || 0);

  const handleThemeSelect = (theme: Theme) => {
    dispatch(setTheme(theme));
    applyTheme(theme);
  };

  const categories = HEADER_CATEGORIES;

  return (
    <>
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
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
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder={`${t("common.search")}...`}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="hidden sm:block">
                <LanguageSelector variant="light" />
              </div>

              {/* Cart */}
              <Link
                href={ROUTES.CART}
                className="flex items-center gap-2 text-foreground hover:text-primary font-medium text-sm transition-colors duration-200"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </div>
                <span className="hidden sm:inline">{t("common.cart")}</span>
              </Link>

              {/* Login / Profile Dropdown */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-foreground hover:text-primary font-medium text-sm focus:outline-none transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm tracking-wider hover:bg-primary/20 transition-all">
                        {user?.fullName ? (
                          user?.fullName?.charAt(0)?.toUpperCase()
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      {/* <span className="hidden lg:inline max-w-[120px] truncate">
                        {user?.fullName || t("common.profile")}
                      </span> */}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 p-2 rounded-xl shadow-lg border border-border bg-card"
                  >
                    {/* <DropdownMenuLabel className="font-semibold text-foreground px-2 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                      {t("common.profile")}
                    </DropdownMenuLabel> */}
                    {/* <div className="px-2 py-1.5 text-sm font-medium text-foreground truncate">
                      {user?.fullName}
                      <div className="text-xs text-muted-foreground truncate font-normal mt-0.5">
                        {user?.email || user?.mobileNumber}
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-border my-1" /> */}
                    <DropdownMenuItem asChild>
                      <Link
                        href={ROUTES.PROFILE}
                        className="flex items-center gap-2 w-full px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer"
                      >
                        {t("common.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border my-1" />
                    <DropdownMenuItem asChild>
                      <Link
                        href={ROUTES.ORDERS}
                        className="flex items-center gap-2 w-full px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer"
                      >
                        {t("orders.orders")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border my-1" />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center gap-2 w-full px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer focus:bg-accent focus:text-accent-foreground">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <span>{t("settings.theme")}</span>
                        <span className="ml-auto flex items-center gap-1.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full flex-shrink-0 ring-1 ring-black/10"
                            style={{ background: themeSwatchColors[currentTheme][0] }}
                          />
                          <span className="text-xs text-muted-foreground font-normal">
                            {currentConfig.label}
                          </span>
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-52 p-2 rounded-xl shadow-lg border border-border bg-card">
                          {(Object.entries(themes) as [Theme, (typeof themes)[Theme]][]).map(
                            ([key, config]) => (
                              <DropdownMenuItem
                                key={key}
                                onClick={() => handleThemeSelect(key)}
                                className={`flex items-center gap-3 w-full px-2 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                                  currentTheme === key
                                    ? "bg-primary/10 text-primary font-semibold focus:bg-primary/15 focus:text-primary"
                                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                              >
                                <span
                                  className="h-4 w-4 rounded-full flex-shrink-0 ring-1 ring-black/10"
                                  style={{
                                    background: `linear-gradient(135deg, ${themeSwatchColors[key][0]}, ${themeSwatchColors[key][1]})`,
                                  }}
                                />
                                <span className="flex-1">{config.label}</span>
                                {currentTheme === key && (
                                  <Check className="h-3.5 w-3.5 flex-shrink-0" />
                                )}
                              </DropdownMenuItem>
                            ),
                          )}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator className="bg-border my-1" />
                    <DropdownMenuItem
                      onClick={async () => {
                        await logout();
                        toast.success("Logged out successfully");
                      }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-sm text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive rounded-lg transition-colors cursor-pointer"
                    >
                      {t("common.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 text-foreground hover:text-foreground font-medium text-sm"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{t("common.login")}</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-foreground p-1"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder={`${t("common.search")}...`}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`flex flex-col md:flex-row md:items-center gap-6 md:gap-8 py-3 ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
          >
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
