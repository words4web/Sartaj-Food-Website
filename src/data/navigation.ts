import { ROUTES } from "@/constants/routes";

export interface NavigationCategory {
  name: string;
  href: string;
}

export const HEADER_CATEGORIES: NavigationCategory[] = [
  { name: "Staples", href: `${ROUTES.PRODUCTS()}?category=staples` },
  { name: "Spices", href: `${ROUTES.PRODUCTS()}?category=spices` },
  { name: "Frozen Foods", href: `${ROUTES.PRODUCTS()}?category=frozen` },
  { name: "Wellness", href: `${ROUTES.PRODUCTS()}?category=wellness` },
  { name: "New Arrivals", href: `${ROUTES.PRODUCTS()}?category=new` },
  { name: "Offers", href: `${ROUTES.PRODUCTS()}?category=offers` },
];
