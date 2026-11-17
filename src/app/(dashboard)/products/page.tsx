import type { Metadata } from "next";
import ProductsContentClient from "./_components/ProductsContentClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = "https://www.sartajfoods.jp";
const DEFAULT_IMAGE = "/favicons_sartaj/android-chrome-512x512.png";

const formatLabel = (str: string) =>
  str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

function buildMetadata({
  title,
  description,
  canonical,
  image,
  robots,
}: {
  title: string;
  description: string;
  canonical: string;
  image?: string | null;
  robots?: Metadata["robots"];
}): Metadata {
  const resolvedImage = image || DEFAULT_IMAGE;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: [resolvedImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
    ...(robots ? { robots } : {}),
  };
}

async function getCategoryImage(categorySlugOrId: string): Promise<string | null> {
  if (!API_BASE_URL || !categorySlugOrId || categorySlugOrId === "all") return null;
  try {
    const res = await fetch(`${API_BASE_URL}/customer/categories`, {
      next: { revalidate: 604800 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const categories: any[] = json?.data?.categories || [];

    const normalized = categorySlugOrId.toLowerCase().trim();
    for (const cat of categories) {
      if (
        cat?.slug?.toLowerCase() === normalized ||
        cat?._id === categorySlugOrId ||
        cat?.name?.toLowerCase() === normalized
      ) {
        return cat?.image || null;
      }
      if (Array.isArray(cat?.subcategories)) {
        for (const sub of cat.subcategories) {
          if (
            sub?.slug?.toLowerCase() === normalized ||
            sub?._id === categorySlugOrId ||
            sub?.name?.toLowerCase() === normalized
          ) {
            return sub?.image || cat?.image || null;
          }
        }
      }
    }
  } catch {
    // Graceful fallback on network error
  }
  return null;
}

async function getManufacturerImage(manufacturerSlugOrName: string): Promise<string | null> {
  if (!API_BASE_URL || !manufacturerSlugOrName) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/customer/manufacturers`, {
      next: { revalidate: 604800 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const manufacturers: any[] = Array.isArray(json?.data)
      ? json.data
      : json?.data?.manufacturers || [];

    const normalized = manufacturerSlugOrName.toLowerCase().trim();
    const found = manufacturers.find(
      (m) =>
        m?.slug?.toLowerCase() === normalized ||
        m?.name?.toLowerCase() === normalized ||
        m?._id === manufacturerSlugOrName,
    );
    return found?.image || null;
  } catch {
    // Graceful fallback on network error
  }
  return null;
}

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
    return buildMetadata({
      title: `Search results for "${cleanSearch}" | Sartaj Foods Japan`,
      description: `Browse Indian groceries and products matching "${cleanSearch}" at Sartaj Foods Japan. Fast delivery across Japan.`,
      canonical: `${SITE_URL}/products`,
      robots: { index: false, follow: true },
    });
  }

  const isSpecificCategory = category && category !== "all";
  const hasSubcategory = subcategory && subcategory.trim().length > 0;
  const hasManufacturer = manufacturers && manufacturers.trim().length > 0;
  const hasBadge = badge && badge.trim().length > 0;

  // Resolve category and manufacturer images concurrently if requested
  const [categoryImage, manufacturerImage] = await Promise.all([
    hasSubcategory
      ? getCategoryImage(subcategory!)
      : isSpecificCategory
        ? getCategoryImage(category!)
        : Promise.resolve(null),
    hasManufacturer ? getManufacturerImage(manufacturers!) : Promise.resolve(null),
  ]);

  const activeFacetCount = [isSpecificCategory, hasManufacturer, hasBadge].filter(Boolean).length;

  // 2. Multi-Filter Combinations (e.g. category + brand, category + badge)
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

    const canonical = isSpecificCategory
      ? `${SITE_URL}/products?category=${encodeURIComponent(category!)}`
      : `${SITE_URL}/products`;

    const titlePrefix = parts.join(" - ");

    return buildMetadata({
      title: `${titlePrefix} | Sartaj Foods Japan`,
      description: `Explore ${parts.join(" ")} at Sartaj Foods Japan. Authentic Indian groceries, spices, snacks, and essentials delivered fresh across Japan.`,
      canonical,
      image: manufacturerImage || categoryImage,
    });
  }

  // 3. Single Category / Subcategory
  if (isSpecificCategory || hasSubcategory) {
    const categoryName = hasSubcategory ? formatLabel(subcategory!) : formatLabel(category!);
    const canonical = hasSubcategory
      ? `${SITE_URL}/products?category=${encodeURIComponent(category || "")}&subcategory=${encodeURIComponent(subcategory!)}`
      : `${SITE_URL}/products?category=${encodeURIComponent(category!)}`;

    return buildMetadata({
      title: `${categoryName} | Indian Groceries Online | Sartaj Foods Japan`,
      description: `Shop authentic ${categoryName} online at Sartaj Foods Japan. Best prices on top Indian brands with fast delivery across Japan.`,
      canonical,
      image: categoryImage,
    });
  }

  // 4. Single Manufacturer / Brand
  if (hasManufacturer) {
    const brandName = formatLabel(manufacturers!);
    return buildMetadata({
      title: `${brandName} Products & Groceries | Sartaj Foods Japan`,
      description: `Buy authentic ${brandName} products online in Japan from Sartaj Foods. Wide range of authentic spices, groceries, and ingredients delivered fresh.`,
      canonical: `${SITE_URL}/products?manufacturers=${encodeURIComponent(manufacturers!)}`,
      image: manufacturerImage,
    });
  }

  // 5. Single Badge (e.g. special-offers, featured)
  if (hasBadge) {
    const badgeName = formatLabel(badge!);
    return buildMetadata({
      title: `${badgeName} Products & Deals | Sartaj Foods Japan`,
      description: `Explore ${badgeName} items at Sartaj Foods Japan. Great discounts and special deals on authentic Indian groceries.`,
      canonical: `${SITE_URL}/products?badge=${encodeURIComponent(badge!)}`,
    });
  }

  // 6. Default All Products Listing
  return buildMetadata({
    title: "Shop Indian Spices, Rice, Snacks & Household Essentials | Sartaj Foods Japan",
    description:
      "Shop full range products from basmati rice, atta, ghee, spices, snacks, frozen foods & more. Authentic Indian & home essentials delivered fresh across Japan.",
    canonical: `${SITE_URL}/products`,
  });
}

export default function ProductsPage() {
  return <ProductsContentClient />;
}
