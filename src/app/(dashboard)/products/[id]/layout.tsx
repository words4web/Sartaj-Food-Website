import type { Metadata } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE_URL}/customer/products/${id}`, {
      next: { revalidate: 604800 },
    });

    if (!res.ok) {
      return {
        title: "Product Details | Sartaj Foods Japan",
        description:
          "Buy authentic Indian groceries, spices, and essentials online with fast delivery across Japan from Sartaj Foods.",
      };
    }

    const json = await res.json();
    const product = json?.data;

    const name = product?.name || "Product";
    const rawDescription = (product?.description || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    const description =
      rawDescription.length > 0
        ? rawDescription.slice(0, 157) + (rawDescription.length > 157 ? "..." : "")
        : "Buy authentic Indian groceries, spices, and essentials online with fast delivery across Japan from Sartaj Foods.";

    const image =
      product?.images?.[0] || product?.image || "/favicons_sartaj/android-chrome-512x512.png";

    return {
      title: `${name} | Buy Online at Sartaj Foods Japan`,
      description,
      openGraph: {
        title: `${name} | Buy Online at Sartaj Foods Japan`,
        description,
        images: [image],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} | Buy Online at Sartaj Foods Japan`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Product Details | Sartaj Foods Japan",
      description:
        "Buy authentic Indian groceries, spices, and essentials online with fast delivery across Japan from Sartaj Foods.",
    };
  }
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
