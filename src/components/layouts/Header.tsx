"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { HEADER_CATEGORIES } from "@/data/navigation";
import { useTranslations } from "next-intl";
import { LanguageSelector, ThemeSelector } from "@/components/common";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const categories = HEADER_CATEGORIES;

  return (
    <>
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2 min-w-fit">
              <img
                src="/sartaj_logo.svg"
                alt="Sartaj Foods Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-lg font-bold text-foreground">Sartaj Foods</span>
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
              {/* Theme Selector */}
              <div className="hidden sm:block">
                <ThemeSelector variant="light" />
              </div>

              {/* Language Selector */}
              <div className="hidden sm:block">
                <LanguageSelector variant="light" />
              </div>

              {/* Cart */}
              <Link
                href={ROUTES.CART}
                className="relative flex items-center gap-1 text-foreground hover:text-foreground font-medium text-sm"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">{t("common.cart")}</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Login */}
              <Link
                href={ROUTES.LOGIN}
                className="flex items-center gap-2 text-foreground hover:text-foreground font-medium text-sm"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{t("common.login")}</span>
              </Link>

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
