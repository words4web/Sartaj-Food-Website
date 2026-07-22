"use client";

import { useMemo } from "react";
import { Typography, ThemedImage } from "@/components/common";
import { StoreLocation } from "@/components/home/StoreLocation";
import { ManufacturersGrid } from "@/components/home/ManufacturersGrid";
import { CheckCircle2, ShieldCheck, MapPin, Truck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useGetManufacturers } from "@/services/manufacturer/manufacturer.hooks";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  themeColor: "primary" | "accent" | "emerald";
}

function FeatureCard({ title, description, icon, themeColor }: FeatureCardProps) {
  const styles = {
    primary: {
      bg: "bg-primary/5 dark:bg-primary/10 border-primary/20 hover:border-primary/40",
      iconBg: "bg-primary/10 text-primary",
      glow: "bg-primary/5",
    },
    accent: {
      bg: "bg-accent/5 dark:bg-accent/10 border-accent/20 hover:border-accent/40",
      iconBg: "bg-accent/10 text-accent",
      glow: "bg-accent/5",
    },
    emerald: {
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "bg-emerald-500/5",
    },
  };

  const style = styles[themeColor];

  return (
    <div
      className={`border rounded-3xl p-5 relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group ${style.bg}`}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl pointer-events-none ${style.glow}`}
      />
      <div className="flex gap-4 items-start">
        <div
          className={`p-2 rounded-xl shrink-0 transition-transform group-hover:scale-105 ${style.iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm leading-snug">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  const { data: manufacturers = [] } = useGetManufacturers();

  const sartajManufacturer = useMemo(() => {
    return manufacturers?.find((m: any) => m.name?.toLowerCase()?.includes("sartaj"));
  }, [manufacturers]);

  const sartajSlug = sartajManufacturer?.slug || sartajManufacturer?.id || "sartaj";

  return (
    <div className="min-h-screen bg-background text-foreground pb-0">
      {/* Header Banner */}
      <div className="py-10 md:py-14 text-center relative overflow-hidden bg-background">
        <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <Typography
            variant="overline"
            className="text-primary font-bold text-xs tracking-wider uppercase mb-2 block"
          >
            OUR STORY
          </Typography>
          <Typography
            variant="h1"
            className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3"
          >
            About Us
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto font-medium"
          >
            Authentic South Asian flavors imported directly to Japan for an uncompromising culinary
            experience.
          </Typography>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:py-8 space-y-10">
        {/* Intro Section Layout */}
        <div className="space-y-8">
          {/* Top Text Column */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl md:text-3xl font-extrabold text-foreground tracking-tight leading-snug">
              Your Trusted Grocery Partner in Japan
            </h2>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm font-medium">
              Sartaj Foods is one of the most trusted online grocery stores in Japan, offering an
              authentic range of Indian grocery and green grocery products across all the major
              brands available in Japan. From rice, flour, ready to cook items, and snacks to
              everyday essentials, we deliver everything right to your doorstep.
            </p>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm font-medium">
              Our aim is to make Indian grocery shopping easy, convenient, and reasonable for every
              home. Check out our full range of special offers as you navigate through our website.
            </p>
          </div>

          {/* Bottom Image Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md group">
              <Image
                src="/shop/shop_1.png"
                alt="Sartaj Foods Store Aisles"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md group">
              <Image
                src="/shop/shop_2.png"
                alt="Sartaj Foods Premium Selection"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Grouped Together) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            title="Authentic Selection"
            description="Carefully sourced standard-compliant products from premium South Asian brands."
            icon={<ShieldCheck className="h-5 w-5" />}
            themeColor="primary"
          />
          <FeatureCard
            title="Convenient Delivery"
            description="Delivered directly to your home anywhere in Japan with professional logistics partners."
            icon={<Truck className="h-5 w-5" />}
            themeColor="accent"
          />
          <FeatureCard
            title="Live Inventory System"
            description="We operate a live inventory system which means that you will only receive products that you order and will not receive substitute products unless you have specifically agreed to a substitute product being sent."
            icon={<CheckCircle2 className="h-5 w-5" />}
            themeColor="emerald"
          />
        </div>

        {/* Sartaj Brand Spotlight */}
        <div className="bg-primary/[0.02] border border-primary/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-sm group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest w-fit">
                Featured flagship Brand
              </span>
              <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight mt-2">
                Sartaj - Home Grown Brand
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
                Sartaj is our premium homegrown brand designed to bring you the highest quality
                South Asian ingredients. From aromatic spices and pure basmati rice to everyday
                kitchen essentials, each product is carefully packaged and rigorously inspected to
                ensure it delivers the authentic, rich taste of home directly to your kitchen in
                Japan.
              </p>
              <div className="pt-2">
                <Link
                  href={ROUTES.PRODUCTS_WITH_QUERY(`manufacturers=${sartajSlug}`)}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-extrabold px-4.5 py-2.5 rounded-xl transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer select-none"
                >
                  <span>View Products</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-card border border-border/80 p-2.5 shadow-md flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <ThemedImage
                  src="https://www.sartajfoods.jp/sartaj_logo.svg"
                  alt="Sartaj Brand Logo"
                  className="h-full w-full object-contain rounded-full"
                  fallbackType="manufacturer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturers Carousel Grid */}
        <div className="border-t border-border/40 pt-10">
          <ManufacturersGrid />
        </div>

        {/* Delivery Details */}
        <div className="border-t border-border/40 pt-10 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-lg md:text-xl font-extrabold text-foreground">
            We Deliver Across All of Japan
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
            We deliver all over Japan, so please enter your postcode in the postcode section of the
            homepage before you start shopping, to confirm that we deliver to your area.
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
            Our delivery drivers and courier partners are always professional and will keep you
            updated of timings prior to your delivery. Please ensure that you confirm your delivery
            details prior to shopping.
          </p>
        </div>
      </div>

      {/* Embedded Map Section */}
      <StoreLocation />
    </div>
  );
}
