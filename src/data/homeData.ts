import {
  Wheat,
  Flame,
  Snowflake,
  Leaf,
  Candy,
  Droplets,
  CheckCircle,
  Truck,
  Phone,
  Award,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const HERO_SLIDES = [
  {
    titleKey: "home.title",
    subtitleKey: "home.subtitle",
    badgeKey: "home.authenticFlavors",
    image: "https://images.unsplash.com/photo-1596040709594-66db9dded17b?w=800&h=600&fit=crop",
  },
  {
    titleKey: "home.directImportTitle",
    subtitleKey: "home.directImportSubtitle",
    badgeKey: "home.directImport",
    image: "https://images.unsplash.com/photo-1596040709594-66db9dded17b?w=800&h=600&fit=crop",
  },
  {
    titleKey: "home.sweetsTitle",
    subtitleKey: "home.sweetsSubtitle",
    badgeKey: "home.festiveSweets",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&h=600&fit=crop",
  },
  {
    titleKey: "home.wellnessTitle",
    subtitleKey: "home.wellnessSubtitle",
    badgeKey: "home.herbalWellness",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=600&fit=crop",
  },
];

export const TRUST_SIGNALS = [
  {
    icon: CheckCircle,
    titleKey: "home.authentic",
    subtitleKey: "home.genuineImports",
  },
  {
    icon: Award,
    titleKey: "home.directImporter",
    subtitleKey: "home.bestPricesInJapan",
  },
  {
    icon: Truck,
    titleKey: "home.fastDelivery",
    subtitleKey: "home.acrossJapan",
  },
  {
    icon: Phone,
    titleKey: "home.supportCenter",
    subtitle: "072-753-1975",
  },
];

export const CATEGORIES_GRID = [
  {
    nameKey: "categories.grains",
    count: "45 items",
    icon: Wheat,
    href: `${ROUTES.PRODUCTS()}?category=rice`,
  },
  {
    nameKey: "categories.spices",
    count: "120 items",
    icon: Flame,
    href: `${ROUTES.PRODUCTS()}?category=spices`,
  },
  {
    nameKey: "categories.frozen",
    count: "41 items",
    icon: Snowflake,
    href: `${ROUTES.PRODUCTS()}?category=frozen`,
  },
  {
    nameKey: "categories.wellness",
    count: "30 items",
    icon: Leaf,
    href: `${ROUTES.PRODUCTS()}?category=wellness`,
  },
  {
    nameKey: "categories.sweets",
    count: "25 items",
    icon: Candy,
    href: `${ROUTES.PRODUCTS()}?category=sweets`,
  },
  {
    nameKey: "categories.beverages",
    count: "18 items",
    icon: Droplets,
    href: `${ROUTES.PRODUCTS()}?category=beverages`,
  },
];

export const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Roasted Vermicelli Small (Ilambrod) - 500gm",
    brand: "Sartaj",
    price: 840,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Manorama Pure Bilona Ghee - 1000 ML",
    brand: "Sartaj",
    price: 4550,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    name: "Jaggery cube | गुड़ की चट्टी - 1 KG",
    brand: "Sartaj",
    price: 1025,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
    badge: "HOT",
  },
  {
    id: "4",
    name: "PATRA (MOTHER'S) | माता - 250gm",
    brand: "Mother's Recipe",
    price: 580,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
    badge: "HOT",
  },
  {
    id: "5",
    name: "POTATO PAPAD (MOTHER'S) - 750gm",
    brand: "Mother's Recipe",
    price: 240,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Basmati Rice Premium - 1kg",
    brand: "Sartaj",
    price: 650,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd1529f?w=500&h=500&fit=crop",
  },
];
