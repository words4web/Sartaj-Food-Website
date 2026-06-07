"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SAMPLE_PRODUCTS } from "@/data/productsData";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";

export default function ProductsPage() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(SAMPLE_PRODUCTS.map((p) => p?.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p?.category === selectedCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "all":
        return t("common.all");
      case "rice":
        return t("categories.grains");
      case "spices":
        return t("categories.spices");
      case "frozen":
        return t("categories.frozen");
      case "beverages":
        return t("categories.beverages");
      case "sweets":
        return t("categories.sweets");
      default:
        return cat;
    }
  };

  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("products.products")}</h1>

        {/* Category filter tabs */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {getCategoryLabel(cat)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
