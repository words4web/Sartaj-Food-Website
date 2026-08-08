"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

import { BundleSectionProps } from "@/types/bundle.types";
import { generateProductBundles } from "@/utils/bundles/bundle.utils";
import { BundleCard } from "./BundleCard";

export function BundleSection({ products }: BundleSectionProps) {
  const t = useTranslations("sale");
  const bundles = generateProductBundles(products);

  if (bundles?.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12" aria-label="Pair and Save Bundles">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("bundle.sectionTitle") ?? "Pair & Save"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("bundle.sectionSubtitle") ?? "Hand-picked combinations you'll love"}
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border/50 self-start sm:self-center">
          {bundles?.length}{" "}
          {bundles?.length === 1 ? t("bundle.bundleCountOne") : t("bundle.bundleCountMany")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bundles?.map((bundle) => (
          <div key={bundle?.id} className="w-full">
            <BundleCard bundle={bundle} />
          </div>
        ))}
      </div>
    </section>
  );
}
