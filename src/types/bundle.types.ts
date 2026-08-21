import { IProduct } from "@/types/product/product.types";

export interface IProductBundle {
  id: string;
  productIds: string[];
  products: IProduct[];
  title: string;
  description: string;
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
}

export interface BundleCardProps {
  bundle: IProductBundle;
}
