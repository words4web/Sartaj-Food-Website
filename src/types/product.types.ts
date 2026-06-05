export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountPercentage?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  brand?: string;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  stock: number;
  rating?: number;
  reviewCount?: number;
  badge?: "NEW" | "BESTSELLER" | "FEATURED" | null;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
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
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isNew?: boolean;
  badge?: string;
}

export interface ProductSectionProps {
  title: string;
  showTabs?: boolean;
}
