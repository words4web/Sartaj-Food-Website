"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User, Globe, Check, Palette, Truck } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { themes, applyTheme, themeSwatchColors, type Theme } from "@/lib/themes";
import { LANGUAGES } from "@/data/languages";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

export function HeaderActions() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const changeLanguage = useChangeLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  const currentTheme = useSelector((state: RootState) => state.locale.theme);
  const currentConfig = themes[currentTheme];
  const rawCartCount = useSelector((state: RootState) => state.cart?.cart?.items?.length || 0);
  const cartItemsCount = isAuthenticated ? rawCartCount : 0;
  const wishlistItemsCount = useSelector((state: RootState) => state.wishlist?.items?.length || 0);

  const locale = useSelector((state: RootState) => state?.locale?.locale);
  const currentLanguage = LANGUAGES.find((lang) => lang?.code === locale) || LANGUAGES[0];

  const handleThemeSelect = (theme: Theme) => {
    dispatch(setTheme(theme));
    applyTheme(theme);
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
      {/* Order History */}
      {isAuthenticated && (
        <Link
          href={ROUTES.ORDERS()}
          className="relative hidden sm:flex items-center justify-center h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-accent/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
          title={t("orders.orderHistory") || "Order History"}
        >
          <Truck className="h-5 w-5" />
        </Link>
      )}

      {/* Cart */}
      {isAuthenticated && (
        <Link
          href={ROUTES.CART}
          className="relative flex items-center justify-center h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-accent/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-extrabold leading-none ring-2 ring-background animate-in zoom-in duration-200"
            >
              {cartItemsCount > 99 ? "99+" : cartItemsCount}
            </span>
          )}
        </Link>
      )}

      {/* Wishlist */}
      {isAuthenticated && (
        <Link
          href={ROUTES.WISHLIST}
          className="relative flex items-center justify-center h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-accent/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
        >
          <Heart className="h-5 w-5" />
          {wishlistItemsCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-extrabold leading-none ring-2 ring-background animate-in zoom-in duration-200"
            >
              {wishlistItemsCount > 99 ? "99+" : wishlistItemsCount}
            </span>
          )}
        </Link>
      )}

      {/* Notifications Bell */}
      {isAuthenticated && <NotificationBell />}

      {/* Language Selector Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center h-9 w-9 rounded-full text-foreground hover:text-primary hover:bg-accent/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer text-base">
            <span>{currentLanguage?.flag || "🌐"}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 p-2 rounded-xl shadow-lg border border-border bg-card"
        >
          {LANGUAGES?.map((lang) => (
            <DropdownMenuItem
              key={lang?.code}
              onClick={() => changeLanguage(lang?.code as any)}
              className={`flex items-center gap-2.5 w-full px-2.5 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                locale === lang?.code
                  ? "bg-primary/10 text-primary font-semibold focus:bg-primary/15 focus:text-primary"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className="text-base select-none">{lang?.flag || "🌐"}</span>
              <span className="flex-1">{lang?.nativeName}</span>
              {locale === lang?.code && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User / Settings Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 text-foreground hover:text-primary font-medium text-sm focus:outline-none transition-colors duration-200 cursor-pointer">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm tracking-wider hover:bg-primary/20 transition-all">
              {isAuthenticated && user?.fullName ? (
                user?.fullName?.charAt(0)?.toUpperCase()
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 p-2 rounded-xl shadow-lg border border-border bg-card"
        >
          {isAuthenticated ? (
            <>
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
                  href={ROUTES.ORDERS()}
                  className="flex items-center gap-2 w-full px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer"
                >
                  {t("orders.orders")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border my-1" />
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 w-full px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer"
                >
                  {t("common.login")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border my-1" />
            </>
          )}

          {/* Theme settings submenu commented out — controlled via admin panel
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
                  {currentConfig?.label}
                </span>
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="dropdown-sub-shifted w-52 p-2 rounded-xl shadow-lg border border-border bg-card">
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
                      <span className="flex-1">{config?.label}</span>
                      {currentTheme === key && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          */}

          {isAuthenticated && (
            <>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
