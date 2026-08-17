import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogPostData } from "@/types/blog.types";
import { ROUTES } from "@/constants/routes";

export function BlogCard({ post }: { post: BlogPostData }) {
  const excerptBlock = post?.content?.find((b) => b?.type === "paragraph");
  const excerpt = excerptBlock
    ? excerptBlock?.value?.slice(0, 120) + "..."
    : "Read the latest food insights, recipes, and detailed bean guides directly from our culinary masters.";

  return (
    <Link
      href={ROUTES.BLOG_DETAIL(post?.slug)}
      className="group bg-card hover:bg-card/85 rounded-2xl border border-border/70 hover:border-primary/30 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={post?.headerImage}
          alt={post?.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-primary/70" />
              {post?.author}
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary/70" />
              {post?.date}
            </span>
          </div>

          <h2 className="text-xl font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {post?.title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{excerpt}</p>
        </div>

        <div className="pt-2 mt-auto">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-primary/80 transition-colors">
            Read Post
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
