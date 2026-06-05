"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { CATEGORIES_GRID } from "@/data/homeData";

import { useTranslations } from "next-intl";

export function CategoriesGrid() {
  const t = useTranslations();
  const categories = CATEGORIES_GRID;

  return (
    <section className="py-16 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-foreground">{t("home.shopByCategories")}</h2>
          <Link
            href={ROUTES.PRODUCTS}
            className="text-primary hover:text-primary font-medium text-sm"
          >
            {t("home.allCategories")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Link
                key={idx}
                href={category.href}
                className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group text-center bg-card"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Icon className="h-6 w-6 text-foreground group-hover:text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{t(category.nameKey)}</h3>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
