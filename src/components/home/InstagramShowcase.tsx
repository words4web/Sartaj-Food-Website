"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Instagram,
  ExternalLink,
  Film,
  Grid3X3,
  Flame,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { instagramFeedData, instagramProfileStats } from "@/data/instagram";
import { InstagramMediaItem } from "@/types/instagram.types";

type FilterTab = "all" | "reels" | "posts";

const PROFILE_URL = instagramProfileStats.profileUrl;
const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const GRADIENT_PALETTES = [
  "from-pink-500 via-rose-500 to-amber-500",
  "from-purple-600 via-pink-600 to-rose-500",
  "from-amber-500 via-orange-500 to-rose-600",
  "from-fuchsia-600 via-purple-600 to-indigo-600",
  "from-rose-500 via-pink-500 to-purple-600",
  "from-violet-600 via-purple-500 to-pink-500",
  "from-pink-600 via-rose-500 to-amber-400",
  "from-indigo-600 via-purple-600 to-pink-500",
  "from-amber-600 via-rose-600 to-pink-600",
  "from-purple-700 via-fuchsia-600 to-rose-500",
];

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
  const t = useTranslations("home.instagram");
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
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
                  {t("officialChannel")}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight">
                {t("followUsOn")}{" "}
                <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {t("instagram")}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto sm:mx-0 px-2 sm:px-0">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <a
            href={PROFILE_URL}
            {...EXTERNAL_LINK_ATTRS}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              {t("follow")} {instagramProfileStats.handle}
            </span>
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
              <span>
                {t("tabAll")} ({instagramFeedData.length})
              </span>
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
              <span>
                {t("tabReels")} ({instagramFeedData.filter((i) => i.type === "reel").length})
              </span>
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
              <span>
                {t("tabPosts")} ({instagramFeedData.filter((i) => i.type === "post").length})
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <ScrollNavButton
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                ariaLabel={t("scrollLeft")}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </ScrollNavButton>
              <ScrollNavButton
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                ariaLabel={t("scrollRight")}
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </ScrollNavButton>
            </div>

            <a
              href={PROFILE_URL}
              {...EXTERNAL_LINK_ATTRS}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline hidden sm:flex items-center gap-1 ml-2"
            >
              <span>{t("viewProfile")}</span>
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
            {filteredItems.map((item, index) => (
              <InstagramEmbedCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 p-3.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 flex-wrap">
              <span>
                {t("tagTitle", { tag: "#SartajFoods", handle: instagramProfileStats.handle })}
              </span>
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">{t("tagDescription")}</p>
          </div>

          <a
            href={PROFILE_URL}
            {...EXTERNAL_LINK_ATTRS}
            className="w-full sm:w-auto justify-center shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-foreground bg-background hover:bg-muted border border-border shadow-xs transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>{t("tagUsNow")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramEmbedCard({ item, index }: { item: InstagramMediaItem; index: number }) {
  const t = useTranslations("home.instagram");
  const isReel = item.type === "reel";
  const gradient = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

  return (
    <div className="group shrink-0 w-[84vw] max-w-[320px] xs:w-[280px] sm:w-[300px] md:w-[320px] flex flex-col rounded-3xl overflow-hidden bg-card border border-border/80 hover:border-pink-500/50 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/50">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
          {isReel ? (
            <Film className="w-3.5 h-3.5 text-pink-600" />
          ) : (
            <Instagram className="w-3.5 h-3.5 text-purple-600" />
          )}
          <span>{isReel ? t("reelBadge") : t("postBadge")}</span>
        </span>
        <a
          href={item.permalink}
          {...EXTERNAL_LINK_ATTRS}
          className="text-[11px] font-semibold text-muted-foreground group-hover:text-pink-600 flex items-center gap-1 transition-colors"
        >
          <span>{t("openOnIg")}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <a
        href={item.permalink}
        {...EXTERNAL_LINK_ATTRS}
        aria-label={isReel ? t("watchOnInstagram") : t("viewOnInstagram")}
        className={`relative w-full aspect-[9/14] bg-gradient-to-br ${gradient} flex flex-col items-center justify-between p-6 text-white overflow-hidden select-none cursor-pointer`}
      >
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-black/20 blur-2xl pointer-events-none" />

        <div className="w-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <Instagram className="w-3.5 h-3.5 text-pink-300" />
            <span className="text-[11px] font-bold text-white tracking-wide">
              {instagramProfileStats.handle}
            </span>
          </div>

          <span className="bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 border border-white/15">
            {isReel ? t("reelBadge") : t("postBadge")}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3 my-auto text-center">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 group-active:scale-95 transition-all duration-300">
            {isReel ? (
              <Play className="w-8 h-8 sm:w-9 sm:h-9 text-white fill-white ml-1 drop-shadow-md group-hover:text-white" />
            ) : (
              <Instagram className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-md" />
            )}
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white drop-shadow-md bg-black/25 backdrop-blur-xs px-3.5 py-1 rounded-full border border-white/10">
            {isReel ? t("watchOnInstagram") : t("viewOnInstagram")}
          </span>
        </div>

        <div className="w-full relative z-10 text-center">
          <p className="text-[11px] font-medium text-white/80 line-clamp-1 drop-shadow-xs">
            {t("postSharedBy")}
          </p>
        </div>
      </a>
    </div>
  );
}
