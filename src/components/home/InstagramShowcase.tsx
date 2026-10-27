"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import {
  Instagram,
  ExternalLink,
  Sparkles,
  Film,
  Grid3X3,
  Flame,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { instagramFeedData, instagramProfileStats } from "@/data/instagram";
import { InstagramMediaItem } from "@/types/instagram.types";

type FilterTab = "all" | "reels" | "posts";

const PROFILE_URL = instagramProfileStats.profileUrl;
const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const IG_FONT_BASE = {
  fontFamily: "Arial, sans-serif",
} as const;

function ScrollNavButton({
  onClick,
  disabled,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border hover:bg-muted text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
    >
      {children}
    </button>
  );
}

export function InstagramShowcase() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const filteredItems = instagramFeedData.filter((item) => {
    if (activeTab === "reels") return item.type === "reel";
    if (activeTab === "posts") return item.type === "post";
    return true;
  });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout;
    let timeoutId2: NodeJS.Timeout;
    let timeoutId3: NodeJS.Timeout;

    const processEmbeds = () => {
      if (typeof window !== "undefined" && (window as any).instgrm?.Embeds) {
        try {
          (window as any).instgrm.Embeds.process();
        } catch {}
      }
    };

    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("instagram-embed-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "instagram-embed-script";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          timeoutId1 = setTimeout(processEmbeds, 150);
          timeoutId2 = setTimeout(processEmbeds, 600);
          timeoutId3 = setTimeout(processEmbeds, 1500);
        };
        document.body.appendChild(script);
      } else {
        timeoutId1 = setTimeout(processEmbeds, 150);
        timeoutId2 = setTimeout(processEmbeds, 600);
      }
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [activeTab]);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [filteredItems.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    const scrollAmount = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if ((e.target as HTMLElement).tagName === "IFRAME") return;
    isDownRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 5) setIsDragging(true);
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  return (
    <section
      aria-label="Instagram community and feed"
      className="py-6 sm:py-12 md:py-16 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tl from-amber-500/10 via-rose-500/10 to-purple-500/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 px-1 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 pb-5 sm:pb-8 border-b border-border/40">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left flex-col sm:flex-row w-full sm:w-auto">
            <a
              href={PROFILE_URL}
              {...EXTERNAL_LINK_ATTRS}
              className="group relative shrink-0"
              aria-label="Visit Sartaj Foods Instagram profile"
            >
              <div className="p-[3px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="p-0.5 rounded-full bg-background">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white flex items-center justify-center p-1 shadow-inner">
                    <Image
                      src={instagramProfileStats.avatarUrl}
                      alt={instagramProfileStats.name}
                      fill
                      sizes="(max-width: 640px) 56px, 80px"
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-full p-1 shadow-sm">
                <Instagram className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </span>
            </a>

            <div className="space-y-1 w-full sm:w-auto">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 px-2 sm:px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  Social Hub
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
                  Official Channel
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight">
                Follow Us on{" "}
                <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Instagram
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto sm:mx-0 px-2 sm:px-0">
                Catch our latest reels, fresh arrivals, recipe inspirations &amp; behind-the-scenes
                directly from Instagram.
              </p>
            </div>
          </div>

          <a
            href={PROFILE_URL}
            {...EXTERNAL_LINK_ATTRS}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Follow {instagramProfileStats.handle}</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
          </a>
        </div>

        <div className="flex items-center justify-between mt-4 sm:mt-6 mb-4 sm:mb-6 gap-2 sm:gap-3">
          <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-muted/50 rounded-xl border border-border/50 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3X3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>All ({instagramFeedData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === "reels"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Reels ({instagramFeedData.filter((i) => i.type === "reel").length})</span>
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === "posts"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Posts ({instagramFeedData.filter((i) => i.type === "post").length})</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <ScrollNavButton
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                ariaLabel="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </ScrollNavButton>
              <ScrollNavButton
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                ariaLabel="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </ScrollNavButton>
            </div>

            <a
              href={PROFILE_URL}
              {...EXTERNAL_LINK_ATTRS}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline hidden sm:flex items-center gap-1 ml-2"
            >
              <span>View profile</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="relative -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex items-start gap-3 sm:gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={
              {
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              } as React.CSSProperties
            }
          >
            {filteredItems.map((item) => (
              <InstagramEmbedCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 p-3.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 flex-wrap">
              <span>Tag</span>
              <span className="text-pink-600 dark:text-pink-400 font-extrabold">#SartajFoods</span>
              <span>or</span>
              <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                {instagramProfileStats.handle}
              </span>
              <span>to get featured!</span>
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Cook your favorite dishes with Sartaj ingredients and share your culinary creations
              with our community in Japan.
            </p>
          </div>

          <a
            href={PROFILE_URL}
            {...EXTERNAL_LINK_ATTRS}
            className="w-full sm:w-auto justify-center shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-foreground bg-background hover:bg-muted border border-border shadow-xs transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>Tag Us Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramEmbedCard({ item }: { item: InstagramMediaItem }) {
  const isReel = item.type === "reel";
  const embedPermalink = `${item.permalink}?utm_source=ig_embed&utm_campaign=loading`;

  return (
    <div className="shrink-0 w-[84vw] max-w-[340px] xs:w-[300px] sm:w-[320px] md:w-[340px] flex flex-col rounded-2xl overflow-hidden bg-card border border-border/70 hover:border-pink-500/40 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/30 border-b border-border/50">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
          {isReel ? (
            <Film className="w-3.5 h-3.5 text-pink-600" />
          ) : (
            <Instagram className="w-3.5 h-3.5 text-purple-600" />
          )}
          <span>{isReel ? "Reel" : "Post"}</span>
        </span>
        <a
          href={item.permalink}
          {...EXTERNAL_LINK_ATTRS}
          className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <span>Open on IG</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="relative w-full bg-white flex items-center justify-center min-h-[440px] sm:min-h-[480px]">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={embedPermalink}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: "0",
            borderRadius: "3px",
            boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
            margin: "1px",
            maxWidth: "540px",
            minWidth: "260px",
            padding: "0",
            width: "calc(100% - 2px)",
          }}
        >
          <div style={{ padding: "12px" }}>
            <a
              href={embedPermalink}
              {...EXTERNAL_LINK_ATTRS}
              style={{
                background: "#FFFFFF",
                lineHeight: "0",
                padding: "0 0",
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 16px",
                  gap: "12px",
                  minHeight: "360px",
                }}
              >
                <Instagram aria-hidden style={{ width: 32, height: 32 }} />
                <span
                  style={{
                    fontSize: "12px",
                    ...IG_FONT_BASE,
                    fontWeight: 550,
                    color: "#000",
                  }}
                >
                  View {isReel ? "Reel" : "Post"} on Instagram
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    ...IG_FONT_BASE,
                    color: "#737373",
                  }}
                >
                  @sartaj_foods_official
                </span>
              </div>
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
