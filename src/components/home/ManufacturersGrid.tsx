"use client";

import { useGetManufacturers } from "@/services/manufacturer/manufacturer.hooks";
import { ManufacturerGridSkeleton } from "@/components/skeletons/ManufacturerSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { IManufacturer } from "@/types/manufacturer/manufacturer.types";
import { useState, useEffect, useRef, memo } from "react";
import { useTranslations } from "next-intl";
import { ThemedImage } from "@/components/common";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const ManufacturerCard = memo(function ManufacturerCard({
  item,
  idx,
  isVisible,
  isDesktop,
}: {
  item: IManufacturer;
  idx: number;
  isVisible: boolean;
  isDesktop: boolean;
}) {
  const name = item?.name || "Brand";
  const image = item?.image || "";
  console.log(name, " => ", image);
  const isSartaj = name?.toLowerCase() === "sartaj";

  const transformValue = !isDesktop
    ? "none"
    : isVisible
      ? "translateY(0) scale(1)"
      : "translateY(30px) scale(0.95)";

  return (
    <div
      style={{
        transform: transformValue,
        opacity: !isDesktop ? 1 : isVisible ? 1 : 0,
        transitionDelay: isDesktop && isVisible ? `${(idx % 5) * 60}ms` : "0ms",
        transitionProperty: isDesktop ? "transform, opacity" : "none",
        transitionDuration: isDesktop ? "800ms" : "0ms",
        transitionTimingFunction: isDesktop ? "cubic-bezier(0.16, 1, 0.3, 1)" : "none",
      }}
      className={
        isDesktop
          ? `relative flex flex-col items-center justify-center p-3 sm:p-4 bg-card hover:bg-primary/[0.02] border rounded-2xl w-full h-full hover:shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--primary)_10%,transparent)] transition-all duration-300 cursor-pointer transform group/mfg-card ${
              isSartaj
                ? "border-primary/60 bg-primary/[0.03] shadow-[0_4px_20px_-4px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                : "border-border/80 hover:border-primary/30"
            }`
          : `relative flex flex-col items-center justify-center p-3 sm:p-4 bg-card border rounded-2xl w-full h-full cursor-pointer ${
              isSartaj ? "border-primary/60 bg-primary/[0.03]" : "border-border/80"
            }`
      }
    >
      {isSartaj && (
        <span className="absolute -top-2 px-2 py-0.5 text-[8.5px] font-extrabold text-white bg-primary rounded-full shadow-sm uppercase tracking-wider scale-90 z-20">
          Our Brand
        </span>
      )}
      <div
        className={`h-12 w-12 sm:h-16 sm:w-16 mb-2 sm:mb-3 overflow-hidden rounded-full bg-muted/30 border border-border/40 p-1 flex items-center justify-center ${isDesktop ? "transition-transform duration-300 lg:group-hover/mfg-card:scale-110 lg:group-hover/mfg-card:rotate-3" : ""}`}
      >
        <ThemedImage
          src={image}
          alt={name}
          className="h-full w-full object-contain rounded-full"
          fallbackType="manufacturer"
        />
      </div>
      <span className="font-semibold text-foreground text-xs sm:text-sm text-center line-clamp-1 leading-tight px-1">
        {name}
      </span>
    </div>
  );
});

export function ManufacturersGrid() {
  const t = useTranslations();
  const { data: manufacturers = [], isLoading, error, refetch } = useGetManufacturers();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDesktop = useIsDesktop();

  const [isTouched, setIsTouched] = useState(false);

  const displayItems =
    manufacturers?.length > 0 ? [...manufacturers, ...manufacturers] : manufacturers;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || manufacturers?.length === 0) return;

    let animationFrameId: number;
    const speed = 0.7; // adjust auto-scroll speed here

    const animate = () => {
      if (!isHovered && !isDownRef.current && !isTouched) {
        container.scrollLeft += speed;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, manufacturers.length, isTouched]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || manufacturers?.length === 0) return;

    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 2;

    // Warp around seamlessly
    if (container.scrollLeft >= singleSetWidth) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += singleSetWidth;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  // We set entry animation visibility to true once content loads
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    if (!isLoading && manufacturers?.length > 0) {
      setHasLoaded(true);
    }
  }, [isLoading, manufacturers.length]);

  return (
    <section className="pt-16 pb-8 bg-muted/10 dark:bg-muted/5 overflow-x-hidden border-b border-border/10">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t("home.shopByBrands") || "Shop by Brands"}
          </h2>
        </div>

        {isLoading ? (
          <ManufacturerGridSkeleton count={10} />
        ) : error ? (
          <CommonError onRetry={refetch} message="Could not load brands" />
        ) : manufacturers?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-xl">
            No brands available.
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            className={`flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-4 px-2 select-none active:cursor-grabbing ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              scrollBehavior: "auto",
            }}
          >
            {displayItems?.map((item: IManufacturer, idx: number) => {
              return (
                <div
                  key={`${item?.id}-${idx}`}
                  className="flex-shrink-0 w-36 sm:w-44 h-28 sm:h-32 transition-transform duration-300 lg:hover:scale-[1.03]"
                >
                  <ManufacturerCard
                    item={item}
                    idx={idx}
                    isVisible={hasLoaded}
                    isDesktop={isDesktop}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
