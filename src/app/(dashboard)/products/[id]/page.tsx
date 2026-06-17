"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { ProductDetailSkeleton } from "@/components/skeletons/ProductDetailSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useGetProductById } from "@/services/product/product.hooks";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { CartActions } from "@/components/cart/CartActions";
import { ProductReviews } from "@/components/product/ProductReviews";
import { STOCK_STATUSES } from "@/constants/product.constants";
import { getLocalizedValue } from "@/utils/product/product.utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  const id = params.id as string;

  const [activeImage, setActiveImage] = useState<string>("");

  const { data: product, isLoading, isError, refetch } = useGetProductById(id);

  useEffect(() => {
    const firstImage = product?.images?.[0] || product?.image;
    setActiveImage(firstImage || "");
  }, [product, id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <CommonError
          onRetry={refetch}
          message={t("products.loadError") || "Could not load product details. Please try again."}
        />
      </div>
    );
  }

  // Derived values
  const name = getLocalizedValue(product?.name, locale);
  const description = getLocalizedValue(product?.description, locale);
  const manufacturerName =
    typeof product?.manufacturer === "object" ? product?.manufacturer?.name : product?.manufacturer;

  const price = product?.unitPrice ?? product?.price ?? 0;
  const originalPrice = product?.originalPrice ?? price;
  const isDiscounted = product?.isDiscounted || originalPrice > price;
  const discountPercent = product?.discountPercent || product?.discountPercentage || 0;
  const isOutOfStock =
    product?.stockStatus === STOCK_STATUSES.OUT_OF_STOCK ||
    (product?.stockQuantity !== undefined && product?.stockQuantity <= 0);

  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("common.back")}</span>
        </button>
      </div>

      {/* Main product display */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-card rounded-2xl border border-border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8 relative">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            product={product}
            name={name}
            activeImage={activeImage}
            onSetActiveImage={setActiveImage}
          />

          {/* Right: Info + Actions */}
          <div className="flex flex-col justify-between gap-6">
            <ProductInfo
              product={product}
              name={name}
              description={description}
              manufacturerName={manufacturerName}
              price={price}
              originalPrice={originalPrice}
              isDiscounted={isDiscounted}
              discountPercent={discountPercent}
              isOutOfStock={isOutOfStock}
            />

            {/* Cart Actions (self-contained, reads from Redux) */}
            <div className="space-y-4">
              <CartActions product={product} mode="detail" />
              <ProductSpecs product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <ProductReviews productId={id} hasReviewed={product?.hasReviewed} />

      {/* Related Products */}
      <RelatedProducts productId={id} />
    </main>
  );
}
