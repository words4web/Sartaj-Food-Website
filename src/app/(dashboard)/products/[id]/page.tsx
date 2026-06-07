"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { RootState } from "@/lib/store";
import { ProductDetailSkeleton } from "@/components/skeletons/ProductDetailSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useGetProductById } from "@/services/product/product.hooks";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductCartActions } from "@/components/product/ProductCartActions";
import {
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useGetCart,
} from "@/services/cart/cart.hooks";
import { STOCK_STATUSES } from "@/constants/product.constants";
import { getLocalizedValue } from "@/utils/product/product.utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  const id = params.id as string;

  // Local state
  const [localQuantity, setLocalQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>("");

  // API hooks
  const { data: product, isLoading, isError, refetch } = useGetProductById(id);

  useEffect(() => {
    const firstImage = product?.images?.[0] || product?.image;
    setActiveImage(firstImage || "");
  }, [product, id]);

  // Cart hooks
  const { refetch: refetchCart } = useGetCart(false);
  const addToCartMutation = useAddToCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeCartItemMutation = useRemoveCartItem();

  const cartItems = useSelector((state: RootState) => state.cart?.cart?.items || []);
  const cartItem = cartItems.find((item) => String(item.productId) === String(id));
  const quantityInCart = cartItem?.quantity || 0;

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

  // Cart handlers
  const handleIncrement = () => {
    const maxStock = product?.stockQuantity ?? 99;
    if (localQuantity < maxStock) {
      setLocalQuantity((prev) => prev + 1);
    } else {
      toast.error(`Cannot exceed available stock of ${maxStock}`);
    }
  };

  const handleDecrement = () => {
    if (localQuantity > 1) setLocalQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    try {
      if (quantityInCart > 0) {
        const newQty = quantityInCart + localQuantity;
        const maxStock = product.stockQuantity ?? 99;
        if (newQty > maxStock) {
          toast.error(
            `Cannot add more. Max available stock is ${maxStock} (You already have ${quantityInCart} in cart)`,
          );
          return;
        }
        await updateCartItemMutation.mutateAsync({ productId: id, quantity: newQty });
        toast.success(t("common.success") || "Cart updated successfully");
      } else {
        await addToCartMutation.mutateAsync({ productId: id, quantity: localQuantity });
        toast.success(t("common.success") || "Item added to cart");
      }
      refetchCart();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update cart");
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeCartItemMutation.mutateAsync(id);
      toast.success(t("cart.removeItem") || "Item removed from cart");
      refetchCart();
    } catch (error: any) {
      toast.error(t("cart.removeError") || "Failed to remove item from cart");
    }
  };

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
        <div className="bg-card rounded-2xl border border-border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8 relative">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            product={product}
            name={name}
            activeImage={activeImage}
            onSetActiveImage={setActiveImage}
          />

          {/* Right: Info + Actions */}
          <div className="flex flex-col justify-between">
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
            <ProductCartActions
              product={product}
              productId={id}
              isOutOfStock={isOutOfStock}
              localQuantity={localQuantity}
              quantityInCart={quantityInCart}
              isAddPending={addToCartMutation.isPending}
              isUpdatePending={updateCartItemMutation.isPending}
              isRemovePending={removeCartItemMutation.isPending}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts productId={id} />
    </main>
  );
}
