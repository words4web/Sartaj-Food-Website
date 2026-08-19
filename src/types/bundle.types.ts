import { IProduct } from "@/types/product/product.types";

export interface IProductBundle {
  id: string;
  productIds: [string, string];
  products: [IProduct, IProduct];
  title: string;
  description: string;
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
}

export interface IBundlePairDefinition {
  id: string;
  productId1: string;
  productId2: string;
  title: string;
  description: string;
}

export interface BundleCardProps {
  bundle: IProductBundle;
}

export interface BundleSectionProps {
  products: IProduct[];
  isLoading?: boolean;
}
