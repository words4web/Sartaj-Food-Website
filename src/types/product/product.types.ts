export interface IProduct {
  _id?: string;
  id?: string | number;
  slug?: string;
  sku?: string;
  name: string | { en?: string; ja?: string; ne?: string; hi?: string; bn?: string };
  description?: string | { en?: string; ja?: string; ne?: string; hi?: string; bn?: string };
  price?: number;
  unitPrice?: number;
  originalPrice?: number;
  discount?: number;
  discountPercent?: number;
  discountPercentage?: number;
  isDiscounted?: boolean;
  images?: string[];
  image?: string;
  emoji?: string;
  category?:
    | string
    | {
        id: string;
        name: string;
      };
  subcategory?: string;
  brand?: string;
  manufacturer?:
    | string
    | {
        _id?: string;
        name?: string;
        image?: string;
      };
  stockStatus?: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK" | string;
  stock?: number;
  stockQuantity?: number;
  rating?: number;
  averageRating?: number;
  reviewCount?: number;
  totalReviews?: number;
  badge?: string | null;
  badges?: string[];
  specifications?: Record<string, string>;
  restrictions?: {
    age20Plus: boolean;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
  netWeightKg?: number;
  caseQuantity?: number;
  sellingUnit?: string;
  productType?: string;
  tax?: {
    amount?: number;
    rate?: number;
  };
  hasReviewed?: boolean;
  isWishListed?: boolean;
  isActive?: boolean;
}

export interface ICategory {
  id?: string;
  _id?: string;
  slug?: string;
  name: string | { en?: string; ja?: string; ne?: string; hi?: string; bn?: string };
  description?: string;
  icon?: string;
  image?: string;
  productCount?: number;
  parentId?: string;
  children?: ICategory[];
  subCategories?: ICategory[];
}

export interface CategoryCardProps {
  category: ICategory;
  size?: "sm" | "md" | "lg";
}

export interface IProductFilter {
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  badges?: string[];
  inStockOnly?: boolean;
  searchTerm?: string;
  sortBy?: "newest" | "popular" | "price_asc" | "price_desc" | "rating";
  page: number;
  pageSize: number;
}

export interface ProductCardProps {
  product?: IProduct;
  badgeOverride?: string;
}

export interface CartActionsProps {
  product: IProduct;
  mode?: "card" | "detail" | "cart-page";
  showRemoveButton?: boolean;
}

export interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export interface ProductSectionProps {
  title: string;
  badge?: string;
  showTabs?: boolean;
}

export interface FilterProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface RelatedProductsProps {
  productId: string;
}

export interface ProductImageGalleryProps {
  product: IProduct;
  name: string;
  activeImage: string;
  onSetActiveImage: (img: string) => void;
}

export interface ProductInfoProps {
  product: IProduct;
  name: string;
  description: string;
  manufacturerName: string | undefined;
  price: number;
  originalPrice: number;
  isDiscounted: boolean;
  discountPercent: number;
  isOutOfStock: boolean;
}

export interface CollapsibleSectionProps {
  headerHtml: string;
  contentHtml: string;
}
