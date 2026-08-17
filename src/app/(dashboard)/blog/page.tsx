"use client";
import { BookOpen } from "lucide-react";
import { allBlogPosts } from "@/data/blogs";
import { BlogCard, GoogleTranslator } from "@/components/common";

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 flex justify-end">
          <GoogleTranslator />
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Sartaj Culinary Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-foreground bg-clip-text">
            Our Food Stories & Guides
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Discover authentic South Asian flavours, recipes, and rich guides compiled by our
            experts to enrich your dining table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogPosts?.map((post) => (
            <BlogCard key={post?.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
