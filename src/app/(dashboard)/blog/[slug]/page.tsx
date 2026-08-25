"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ChevronDown, ShoppingBag } from "lucide-react";
import { allBlogPosts } from "@/data/blogs";
import { parseMarkdown } from "@/utils/common/common.utils";
import { ROUTES } from "@/constants/routes";
import { GoogleTranslator } from "@/components/common";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  const idx = allBlogPosts?.findIndex((p) => p?.slug === resolvedParams?.slug);
  const post = idx !== -1 ? allBlogPosts?.[idx] : null;
  const navPosts = {
    prev: idx > 0 ? allBlogPosts?.[idx - 1] : null,
    next: idx < allBlogPosts?.length - 1 ? allBlogPosts?.[idx + 1] : null,
  };

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-bold text-muted-foreground">Post Not Found</p>
        <Link
          href={ROUTES.BLOG}
          className="text-primary font-bold flex items-center gap-2 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10 relative z-10 bg-white">
      <div className="flex items-center justify-between gap-4 notranslate">
        <Link
          href={ROUTES.BLOG}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <GoogleTranslator />
      </div>

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-foreground tracking-tight leading-tight">
          {post?.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium border-b border-border/40 pb-6 notranslate">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-primary" /> {post?.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" /> {post?.date}
          </span>
        </div>
      </header>

      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-md">
        <Image
          src={post?.headerImage}
          alt={post?.title}
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        {post?.content.map((block, i) => {
          if (block?.type === "heading") {
            return (
              <h2
                key={i}
                className="text-2xl font-bold text-foreground border-b border-border/30 pb-2 pt-6"
              >
                {block?.value}
              </h2>
            );
          } else if (block?.type === "image") {
            return (
              <div
                key={i}
                className="relative w-full aspect-video rounded-2xl overflow-hidden my-8 shadow-sm border border-border/45"
              >
                <Image
                  src={block?.value}
                  alt="Insight Image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            );
          }
          return (
            <p
              key={i}
              className="text-muted-foreground leading-relaxed text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(block?.value) }}
            />
          );
        })}
      </div>

      {post?.faqs?.length > 0 && (
        <section className="space-y-4 pt-8 border-t border-border/45">
          <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {post?.faqs?.map((faq, i) => (
              <details
                key={i}
                className="group border border-border/60 rounded-xl bg-card p-4 transition-all duration-200"
              >
                <summary className="list-none flex items-center justify-between font-semibold cursor-pointer text-foreground select-none">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed pl-1">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {post?.citations && post?.citations?.length > 0 && (
        <footer className="text-xs text-muted-foreground space-y-2 pt-6 border-t border-border/40">
          <span className="font-semibold block text-foreground">Citations:</span>
          <ul className="list-disc pl-5 space-y-1">
            {post?.citations?.map((c, i) => (
              <li key={i}>
                <a
                  href={c}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline break-all font-medium transition-colors"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}

      <div className="flex justify-between items-center gap-4 pt-8 border-t border-border/40 notranslate">
        {navPosts.prev ? (
          <Link
            href={ROUTES.BLOG_DETAIL(navPosts?.prev?.slug)}
            className="group p-4 border border-border/60 hover:border-primary/40 rounded-2xl flex-1 text-left hover:bg-muted/10 transition-all max-w-[48%]"
          >
            <span className="text-xs text-muted-foreground font-semibold block mb-1">
              Previous Post
            </span>
            <span className="font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
              {navPosts?.prev?.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {navPosts?.next ? (
          <Link
            href={ROUTES.BLOG_DETAIL(navPosts?.next?.slug)}
            className="group p-4 border border-border/60 hover:border-primary/40 rounded-2xl flex-1 text-right hover:bg-muted/10 transition-all max-w-[48%]"
          >
            <span className="text-xs text-muted-foreground font-semibold block mb-1">
              Next Post
            </span>
            <span className="font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
              {navPosts?.next?.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 text-center space-y-4 my-10 notranslate">
        <h4 className="text-xl sm:text-2xl font-bold text-foreground">
          Bring Authentic South Asian Flavors Home
        </h4>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          Visit Sartaj Foods and discover premium basmati rice, aromatic spices, and traditional
          lentils imported directly for your kitchen in Japan.
        </p>
        <a
          href="https://www.sartajfoods.jp/products?search=dal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm shadow-md transition-all hover:scale-102"
        >
          <ShoppingBag className="w-4 h-4" /> Shop Indian Lentils
        </a>
      </div>
    </article>
  );
}
