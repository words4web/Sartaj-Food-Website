import { MetadataRoute } from "next";
import { allBlogPosts } from "@/data/blogs";

const BASE_URL = "https://www.sartajfoods.jp";
const API_URL = "https://api.sartajfoods.jp/api/v1";

async function getAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  const limit = 100;

  try {
    while (true) {
      const res = await fetch(`${API_URL}/customer/products?page=${page}&limit=${limit}`, {
        next: { revalidate: 86400 },
      });

      if (!res.ok) break;

      const json = await res.json();
      const products: any[] = json?.data?.products ?? json?.data ?? [];

      if (!products?.length) break;

      products?.forEach((p: any) => {
        const slug = p?.slug;
        if (slug) slugs?.push(String(slug));
      });

      const meta = json?.meta;
      const total = meta?.total ?? 0;
      const totalPages = Math.ceil(total / limit);
      if (page >= totalPages) break;

      page++;
    }
  } catch (e) {
    console.error("[sitemap] Failed to fetch products:", e);
  }

  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${BASE_URL}/sale`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const productSlugs = await getAllProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = productSlugs?.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts?.map((post) => ({
    url: `${BASE_URL}/blog/${post?.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
