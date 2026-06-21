"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import { LanguageSelector } from "@/components/common";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gradient-to-b from-primary/4 via-background to-accent/8 border-t border-border/40 text-muted-foreground mt-24 font-sans w-full">
      <div className="w-full mx-auto px-6 sm:px-12 md:px-20 lg:px-32 pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href={ROUTES.HOME} className="flex items-center gap-2.5 w-fit">
              <img
                src="/sartaj_logo.svg"
                alt="Sartaj Foods Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-black text-foreground tracking-wide">
                {t("common.appName")}
              </span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-3.5 pt-2">
              <a
                href="https://www.facebook.com/sartaj.foods"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-card border border-border/60 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-muted-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/FoodsSartaj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-full bg-card border border-border/60 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-muted-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sartaj_foods_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-card border border-border/60 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-muted-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/sartaj-foods-japan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-card border border-border/60 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-muted-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground tracking-wider uppercase mb-6">
              {t("common.appName")}
            </h4>
            <ul className="space-y-3.5 sm:space-y-4">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PRODUCTS()}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("products.products")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CART}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cart.cart")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ORDERS()}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("orders.orders")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground tracking-wider uppercase mb-6">
              {t("home.supportCenter")}
            </h4>
            <ul className="space-y-3.5 sm:space-y-4">
              <li>
                <Link
                  href={ROUTES.CONTACT}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.faq")}
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base pt-1">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <a
                  href="tel:+81727511975"
                  className="font-bold text-foreground hover:text-primary transition-colors"
                >
                  072-751-1975
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground tracking-wider uppercase mb-6">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3.5 sm:space-y-4">
              <li>
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.TERMS}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.aboutUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & language select bar */}
        <div className="border-t border-border/40 pt-10 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground/60">
            {t("footer.copyright", { year: new Date()?.getFullYear() })}
          </p>
          <LanguageSelector variant="light" align="top" />
        </div>
      </div>
    </footer>
  );
}
