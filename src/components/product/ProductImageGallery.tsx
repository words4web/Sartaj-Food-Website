"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Sparkles, ShieldAlert, X, ZoomIn, ZoomOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import type { ProductImageGalleryProps } from "@/types/product/product.types";
import { ThemedImage } from "@/components/common";

const LENS_SIZE = 40;

export function ProductImageGallery({
  product,
  name,
  activeImage,
  onSetActiveImage,
}: ProductImageGalleryProps) {
  const t = useTranslations();

  // DOM refs — zoom controlled entirely via direct DOM writes, no React state
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  // Cache the container bounding rect for the entire hover session
  // to avoid calling getBoundingClientRect() on every mousemove
  const cachedRectRef = useRef<DOMRect | null>(null);

  // isDesktop IS state because it controls JSX rendering of popup/lens elements
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when lightbox is open on mobile
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const check = () => setIsDesktop(window.innerWidth >= 768);
    const onResize = () => {
      // Invalidate the cached rect whenever the window resizes
      cachedRectRef.current = null;
      clearTimeout(timeout);
      // Debounce: only update React state after the user stops resizing
      timeout = setTimeout(check, 100);
    };
    check(); // initial check — synchronous, no debounce needed
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, []);

  // Toggle zoom visuals via direct DOM writes — zero React re-renders
  const applyZoom = useCallback((active: boolean) => {
    if (popupRef.current) popupRef.current.style.opacity = active ? "1" : "0";
    if (lensRef.current) lensRef.current.style.opacity = active ? "1" : "0";
  }, []);

  // Write CSS custom properties for the magnified image position
  const updateCoords = useCallback((clientX: number, clientY: number) => {
    // Use cached rect — getBoundingClientRect() runs once per hover session, not per mousemove
    if (!cachedRectRef.current && containerRef.current) {
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
    const rect = cachedRectRef.current;
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    galleryRef.current?.style.setProperty("--zoom-x", `${x}%`);
    galleryRef.current?.style.setProperty("--zoom-y", `${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Measure once on enter — the single forced layout reflow per hover session
    if (containerRef.current) {
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
    applyZoom(true);
  }, [applyZoom]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => updateCoords(e.clientX, e.clientY),
    [updateCoords],
  );

  const handleMouseLeave = useCallback(() => {
    applyZoom(false);
    cachedRectRef.current = null;
    galleryRef.current?.style.setProperty("--zoom-x", "50%");
    galleryRef.current?.style.setProperty("--zoom-y", "50%");
  }, [applyZoom]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        cachedRectRef.current = containerRef.current.getBoundingClientRect();
      }
      applyZoom(true);
      const touch = e?.touches?.[0];
      if (touch) updateCoords(touch.clientX, touch.clientY);
    },
    [applyZoom, updateCoords],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e?.touches?.[0];
      if (touch) {
        if (e?.cancelable) e.preventDefault?.();
        updateCoords(touch.clientX, touch.clientY);
      }
    },
    [updateCoords],
  );

  const handleTouchEnd = useCallback(() => {
    applyZoom(false);
    cachedRectRef.current = null;
    galleryRef.current?.style.setProperty("--zoom-x", "50%");
    galleryRef.current?.style.setProperty("--zoom-y", "50%");
  }, [applyZoom]);

  const mainImage = activeImage || product?.images?.[0] || product?.image;
  const emoji = product?.emoji;
  const activeBadge = product?.badge || product?.badges?.[0];
  const badgeLower = activeBadge?.toLowerCase();

  return (
    <div
      ref={galleryRef}
      className="flex flex-col gap-4 relative"
      style={{
        ["--zoom-x" as any]: "50%",
        ["--zoom-y" as any]: "50%",
      }}
    >
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className={`relative flex items-center justify-center bg-muted/30 rounded-xl p-4 aspect-square overflow-hidden border border-border/50 ${isDesktop ? "cursor-zoom-in" : "cursor-pointer"}`}
        onMouseMove={isDesktop ? handleMouseMove : undefined}
        onMouseEnter={isDesktop ? handleMouseEnter : undefined}
        onMouseLeave={isDesktop ? handleMouseLeave : undefined}
        onTouchStart={isDesktop ? handleTouchStart : undefined}
        onTouchMove={isDesktop ? handleTouchMove : undefined}
        onTouchEnd={isDesktop ? handleTouchEnd : undefined}
        onClick={!isDesktop ? () => setIsLightboxOpen(true) : undefined}
      >
        <ThemedImage
          ref={imgRef}
          src={mainImage}
          alt={name}
          emoji={emoji}
          className="w-full h-full object-contain pointer-events-none transition-transform duration-200 ease-out"
          style={{
            transformOrigin: `var(--zoom-x, 50%) var(--zoom-y, 50%)`,
          }}
          fallbackType="product"
        />

        {isDesktop && (
          <div
            ref={lensRef}
            className="absolute border border-primary/30 bg-primary/5 pointer-events-none shadow-sm"
            style={{
              width: `${LENS_SIZE}%`,
              height: `${LENS_SIZE}%`,
              left: `clamp(0%, var(--zoom-x, 50%) - 20%, 60%)`,
              top: `clamp(0%, var(--zoom-y, 50%) - 20%, 60%)`,
              zIndex: 5,
              opacity: 0,
            }}
          />
        )}

        {/* Float Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {badgeLower === PRODUCT_BADGES.FEATURED && (
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {t("home.featured")}
            </span>
          )}
          {badgeLower === PRODUCT_BADGES.HOT && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {t("home.hot")}
            </span>
          )}
          {badgeLower === PRODUCT_BADGES.NEW_ARRIVAL && (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {t("home.new")}
            </span>
          )}
          {product?.restrictions?.age20Plus && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {t("products.ageRestrictionBadge") || "Age 20+ Only"}
            </span>
          )}
        </div>
      </div>

      {isDesktop && (
        <div
          ref={popupRef}
          className="absolute left-[calc(100%+1.5rem)] top-0 w-full aspect-square border border-border bg-card shadow-2xl rounded-2xl overflow-hidden z-50 hidden md:block pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.2s ease-in-out" }}
        >
          <ThemedImage
            src={mainImage}
            alt={name}
            emoji={emoji}
            className="absolute max-w-none pointer-events-none"
            style={{
              width: `${100 / (LENS_SIZE / 100)}%`,
              height: `${100 / (LENS_SIZE / 100)}%`,
              left: `calc(clamp(0%, var(--zoom-x, 50%) - 20%, 60%) * -2.5)`,
              top: `calc(clamp(0%, var(--zoom-y, 50%) - 20%, 60%) * -2.5)`,
            }}
            fallbackType="product"
          />
        </div>
      )}

      {/* Thumbnails Row */}
      {product?.images && product?.images?.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border/30">
          {product?.images?.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => onSetActiveImage(img)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 bg-muted/40 p-1 flex items-center justify-center shrink-0 cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary outline-none ${
                mainImage === img
                  ? "border-primary shadow-sm ring-1 ring-primary/20"
                  : "border-transparent hover:border-border"
              }`}
            >
              <ThemedImage
                src={img}
                className="max-w-full max-h-full object-contain pointer-events-none"
                alt={`${name} thumbnail ${index + 1}`}
                emoji={emoji}
                fallbackType="product"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal for Mobile Zoom - Rendered at body root level via Portal */}
      {mounted &&
        typeof document !== "undefined" &&
        !isDesktop &&
        isLightboxOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none">
            {/* Header Controls */}
            <div className="flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
              <span className="text-white text-sm font-semibold truncate max-w-[65%]">{name}</span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setLightboxScale((prev) => (prev === 1 ? 2 : 1))}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm active:bg-white/20 transition-all cursor-pointer"
                  aria-label="Toggle zoom"
                >
                  {lightboxScale === 1 ? (
                    <ZoomIn className="h-5 w-5" />
                  ) : (
                    <ZoomOut className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setLightboxScale(1);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm active:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Interactive Image Box */}
            <div className="flex-1 w-full flex items-center justify-center p-4 overflow-auto">
              <div
                className="relative transition-transform duration-300 ease-out origin-center cursor-pointer"
                style={{
                  transform: `scale(${lightboxScale})`,
                }}
                onClick={() => setLightboxScale((prev) => (prev === 1 ? 2 : 1))}
              >
                <ThemedImage
                  src={mainImage}
                  alt={name}
                  emoji={emoji}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  fallbackType="product"
                />
              </div>
            </div>

            {/* Footer Thumbnails navigation inside lightbox */}
            {product?.images && product?.images?.length > 1 && (
              <div className="p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar justify-center">
                  {product?.images?.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        onSetActiveImage(img);
                        setLightboxScale(1); // Reset zoom on image change
                      }}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 bg-neutral-900/60 p-1 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                        mainImage === img ? "border-primary shadow-sm" : "border-transparent"
                      }`}
                    >
                      <ThemedImage
                        src={img}
                        className="max-w-full max-h-full object-contain pointer-events-none"
                        alt={`${name} thumbnail ${index + 1}`}
                        emoji={emoji}
                        fallbackType="product"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
