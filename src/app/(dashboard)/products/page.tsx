"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SAMPLE_PRODUCTS } from "@/data/productsData";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const t = useTranslations();
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(SAMPLE_PRODUCTS.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t("products.products")}</h1>
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
            {t("common.cart")} ({cart.length})
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-4 text-center bg-muted/50">
                <div className="text-4xl mb-2">{product.emoji}</div>
                <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-primary mb-4">¥{product.price.toFixed(2)}</p>
                <Button
                  variant={cart.includes(product.id) ? "destructive" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={() => toggleCart(product.id)}
                >
                  {cart.includes(product.id) ? t("cart.removeItem") : t("products.addToCart")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
