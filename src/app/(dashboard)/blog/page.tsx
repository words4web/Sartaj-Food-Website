"use client";

import { useState } from "react";
import { BookOpen, UtensilsCrossed, Sparkles } from "lucide-react";
import { allBlogPosts } from "@/data/blogs";
import { BlogCard, GoogleTranslator } from "@/components/common";

export default function BlogListingPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "recipes">("blogs");

  const blogs = allBlogPosts.filter((post) => post.category !== "recipe");
  const recipes = allBlogPosts.filter((post) => post.category === "recipe");

  return (
    <div className="min-h-screen bg-background pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 flex justify-end">
          <GoogleTranslator />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Sartaj Culinary Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-foreground bg-clip-text">
            Our Food Stories & Recipes
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Discover authentic South Asian flavours, recipes, and rich guides compiled by our
            experts to enrich your dining table.
          </p>

          <div className="pt-4 flex justify-center notranslate">
            <div className="inline-flex p-2 rounded-2xl bg-muted/60 border border-border/70 backdrop-blur-md shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-background text-foreground shadow-sm border border-border/60 scale-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="w-5 h-5 text-primary" />
                Blogs
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    activeTab === "blogs"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {blogs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("recipes")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer ${
                  activeTab === "recipes"
                    ? "bg-background text-foreground shadow-sm border border-border/60 scale-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                Recipes
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    activeTab === "recipes"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {recipes.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === "blogs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post?.slug} post={post} />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((post) => (
              <BlogCard key={post?.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed border-border/80 bg-card/40 backdrop-blur-sm max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">Recipes Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                We are curating authentic step-by-step South Asian recipes, spice pairings, and
                quick culinary guides. Stay tuned!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className="mt-2 text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              Explore Our Blogs & Guides &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
