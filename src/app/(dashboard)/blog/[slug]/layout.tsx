import type { Metadata } from "next";
import { allBlogPosts } from "@/data/blogs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog & Recipes | Sartaj Foods Japan",
      description:
        "Discover traditional Indian recipes, spice guides, and culinary tips from Sartaj Foods Japan.",
    };
  }

  const firstParagraph =
    post.content?.find((c) => c.type === "paragraph")?.value ||
    "Read the latest Indian food recipes, cooking tips, and culinary guides from Sartaj Foods Japan.";

  const description =
    firstParagraph.length > 160 ? `${firstParagraph.slice(0, 157)}...` : firstParagraph;

  const image = post.headerImage || "/favicons_sartaj/android-chrome-512x512.png";

  return {
    title: `${post.title} | Sartaj Foods Japan`,
    description,
    openGraph: {
      title: `${post.title} | Sartaj Foods Japan`,
      description,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Sartaj Foods Japan`,
      description,
      images: [image],
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
