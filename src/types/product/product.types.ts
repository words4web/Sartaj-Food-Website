export interface IProduct {
  _id?: string;
  id?: string | number;
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
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  productCount: number;
  parentId?: string;
  children?: ICategory[];
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
  onAddToCart?: (id: string | number) => void;
  isAddedToCart?: boolean;
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
