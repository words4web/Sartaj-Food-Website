"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import { LanguageSelector } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";

export function Footer() {
  const t = useTranslations();
  const { isAuthenticated } = useAuth();

  return (
    <footer className="relative z-10 bg-gradient-to-b from-primary/4 via-background to-accent/8 border-t border-border/40 text-muted-foreground mt-12 md:mt-16 font-sans w-full">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-10 md:pt-14 lg:pt-16 pb-6 md:pb-8 lg:pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-12 mb-10">
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
            <div className="space-y-2 pt-2 text-sm sm:text-base text-muted-foreground/80 max-w-sm">
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.addressLabel")}:{" "}
                </strong>
                {t("footer.addressValue")}
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.callUsLabel")}:{" "}
                </strong>
                <a
                  href={`tel:${t("footer.callUsValue")}`}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.callUsValue")}
                </a>
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.customerSupportLabel")}:{" "}
                </strong>
                <a
                  href={`tel:${t("footer.customerSupportValue")?.replace(/-/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.customerSupportValue")}
                </a>
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.whatsappLabel")}:{" "}
                </strong>
                <a
                  href={`https://wa.me/81${t("footer.customerSupportValue")?.replace(/-/g, "")?.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.customerSupportValue")}
                </a>
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.viberLabel")}:{" "}
                </strong>
                <a
                  href={`viber://chat?number=%2B81${t("footer.customerSupportValue")?.replace(/-/g, "")?.substring(1)}`}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.customerSupportValue")}
                </a>
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.emailLabel")}:{" "}
                </strong>
                <a
                  href={`mailto:${t("footer.emailValue")}`}
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.emailValue")}
                </a>
              </div>
              <div>
                <strong className="text-foreground/90 font-semibold">
                  {t("footer.hoursLabel")}:{" "}
                </strong>
                {t("footer.hoursValue")}
              </div>
            </div>
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
              {isAuthenticated && (
                <>
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
                </>
              )}
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
                  href={ROUTES.FAQ}
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t("cms.faq")}
                </Link>
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
        <div className="border-t border-border/40 pt-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <p className="text-sm text-muted-foreground/60">
              {t("footer.copyright", { year: new Date()?.getFullYear() })}
            </p>
            <span className="hidden sm:inline text-muted-foreground/30">|</span>
            <p className="text-sm text-muted-foreground/60">
              {t.rich("footer.designedBy", {
                link: (chunks) => (
                  <a
                    href="https://words4web.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
          <LanguageSelector variant="light" align="top" />
        </div>
      </div>
    </footer>
  );
}
