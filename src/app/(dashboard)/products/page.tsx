import type { Metadata } from "next";
import ProductsContentClient from "./_components/ProductsContentClient";

const formatLabel = (str: string) => {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    manufacturers?: string;
    badge?: string;
    search?: string;
  }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const { category, subcategory, manufacturers, badge, search } = params;

  // 1. Search Query: Protect crawl budget by not indexing internal search queries
  if (search && search.trim().length > 0) {
    const cleanSearch = search.trim();
    return {
      title: `Search results for "${cleanSearch}" | Sartaj Foods Japan`,
      description: `Browse Indian groceries and products matching "${cleanSearch}" at Sartaj Foods Japan. Fast delivery across Japan.`,
      robots: { index: false, follow: true },
    };
  }

  const isSpecificCategory = category && category !== "all";
  const hasSubcategory = subcategory && subcategory.trim().length > 0;
  const hasManufacturer = manufacturers && manufacturers.trim().length > 0;
  const hasBadge = badge && badge.trim().length > 0;

  // Count active refinement facets
  const activeFacetCount = [isSpecificCategory, hasManufacturer, hasBadge].filter(Boolean).length;

  // 2. Multi-Filter Combinations (e.g. category + brand, category + badge)
  // Canonicalize to primary category or main catalog to consolidate Google link equity
  if (activeFacetCount > 1) {
    const parts = [
      hasManufacturer ? formatLabel(manufacturers!) : null,
      hasSubcategory
        ? formatLabel(subcategory!)
        : isSpecificCategory
          ? formatLabel(category!)
          : null,
      hasBadge ? formatLabel(badge!) : null,
    ].filter(Boolean);

    const canonicalUrl = isSpecificCategory
      ? `https://www.sartajfoods.jp/products?category=${encodeURIComponent(category!)}`
      : "https://www.sartajfoods.jp/products";

    const titlePrefix = parts.join(" - ");

    return {
      title: `${titlePrefix} | Sartaj Foods Japan`,
      description: `Explore ${parts.join(" ")} at Sartaj Foods Japan. Authentic Indian groceries, spices, snacks, and essentials delivered fresh across Japan.`,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: { index: true, follow: true },
    };
  }

  // 3. Single Category / Subcategory
  if (isSpecificCategory || hasSubcategory) {
    const categoryName = hasSubcategory ? formatLabel(subcategory!) : formatLabel(category!);

    const canonicalCategory = hasSubcategory
      ? `https://www.sartajfoods.jp/products?category=${encodeURIComponent(category || "")}&subcategory=${encodeURIComponent(subcategory!)}`
      : `https://www.sartajfoods.jp/products?category=${encodeURIComponent(category!)}`;

    return {
      title: `${categoryName} | Indian Groceries Online | Sartaj Foods Japan`,
      description: `Shop authentic ${categoryName} online at Sartaj Foods Japan. Best prices on top Indian brands with fast delivery across Japan.`,
      alternates: {
        canonical: canonicalCategory,
      },
      openGraph: {
        title: `${categoryName} | Sartaj Foods Japan`,
        description: `Shop authentic ${categoryName} online at Sartaj Foods Japan.`,
        type: "website",
      },
    };
  }

  // 4. Single Manufacturer / Brand
  if (hasManufacturer) {
    const brandName = formatLabel(manufacturers!);
    return {
      title: `${brandName} Products & Groceries | Sartaj Foods Japan`,
      description: `Buy authentic ${brandName} products online in Japan from Sartaj Foods. Wide range of authentic spices, groceries, and ingredients delivered fresh.`,
      alternates: {
        canonical: `https://www.sartajfoods.jp/products?manufacturers=${encodeURIComponent(manufacturers!)}`,
      },
      openGraph: {
        title: `${brandName} Products | Sartaj Foods Japan`,
        description: `Buy authentic ${brandName} products online in Japan from Sartaj Foods.`,
        type: "website",
      },
    };
  }

  // 5. Single Badge (e.g. special-offers, featured)
  if (hasBadge) {
    const badgeName = formatLabel(badge!);
    return {
      title: `${badgeName} Products & Deals | Sartaj Foods Japan`,
      description: `Explore ${badgeName} items at Sartaj Foods Japan. Great discounts and special deals on authentic Indian groceries.`,
      alternates: {
        canonical: `https://www.sartajfoods.jp/products?badge=${encodeURIComponent(badge!)}`,
      },
      openGraph: {
        title: `${badgeName} Products | Sartaj Foods Japan`,
        description: `Explore ${badgeName} items at Sartaj Foods Japan.`,
        type: "website",
      },
    };
  }

  // 6. Default All Products Listing
  return {
    title: "Shop Indian Spices, Rice, Snacks & Household Essentials | Sartaj Foods Japan",
    description:
      "Shop full range products from basmati rice, atta, ghee, spices, snacks, frozen foods & more. Authentic Indian & home essentials delivered fresh across Japan.",
    alternates: {
      canonical: "https://www.sartajfoods.jp/products",
    },
    openGraph: {
      title: "Shop Indian Spices, Rice, Snacks & Household Essentials | Sartaj Foods Japan",
      description:
        "Shop full range products from basmati rice, atta, ghee, spices, snacks, frozen foods & more. Authentic Indian & home essentials delivered fresh across Japan.",
      type: "website",
    },
  };
}

export default function ProductsPage() {
  return <ProductsContentClient />;
}
