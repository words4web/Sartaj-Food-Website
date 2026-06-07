"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Facebook, Twitter, Instagram, Phone } from "lucide-react";
import { LanguageSelector } from "@/components/common";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-950 border-t border-white/10 text-white/60 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 w-fit">
              <img
                src="/sartaj_logo.svg"
                alt="Sartaj Foods Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-white tracking-wide">Sartaj Foods</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Authentic South Asian flavors imported directly to Japan. Experience premium Basmati
              rice, aromatic spices, and traditional sweets.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-white/60"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-white/60"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:border-pink-500 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-white/60"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Linmakks Column */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t("common.appName")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PRODUCTS()}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("products.products")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CART}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cart.cart")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ORDERS}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("orders.orders")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t("home.supportCenter")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cms.contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cms.faq")}
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm pt-1">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+81727511975"
                  className="font-semibold text-white/80 hover:text-white transition-colors"
                >
                  072-751-1975
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cms.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cms.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {t("cms.aboutUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & language select bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Sartaj Foods. All rights reserved.
          </p>
          <LanguageSelector variant="dark" />
        </div>
      </div>
    </footer>
  );
}
