"use client";

import { useMemo } from "react";
import { Utensils } from "lucide-react";
import { getCategorySeoContent } from "@/data/categorySeo";
import { FeaturedPairingsGrid } from "./FeaturedPairingsGrid";

interface CategorySeoSectionProps {
  categoryId?: string | null;
}

export function CategorySeoSection({ categoryId }: CategorySeoSectionProps) {
  const content = useMemo(() => getCategorySeoContent(categoryId), [categoryId]);

  if (!content) return null;

  const productSlugs = content.productSlugs || [];

  return (
    <section
      aria-labelledby="category-seo-heading"
      className="mt-12 rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs transition-all duration-300"
    >
      <div className="p-5 sm:p-7 space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Utensils className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="category-seo-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground leading-snug"
            >
              {content.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Authentic Indian flavours, delivered across Japan
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
          {content.paragraphs.map((paragraphHtml, index) => (
            <p
              key={index}
              className={index === 0 ? "text-foreground/90 font-normal" : ""}
              dangerouslySetInnerHTML={{ __html: paragraphHtml }}
            />
          ))}
        </div>

        {productSlugs.length > 0 && (
          <div className="pt-2 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Explore popular pairings & recommendations
            </h3>
            <FeaturedPairingsGrid slugs={productSlugs} />
          </div>
        )}
      </div>
    </section>
  );
}
