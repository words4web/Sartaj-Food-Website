"use client";

import { useMemo } from "react";
import { Typography, ThemedImage } from "@/components/common";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Sparkles,
  Phone,
  Mail,
  Check,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useGetManufacturers } from "@/services/manufacturer/manufacturer.hooks";
import { FeatureCard } from "./_components/FeatureCard";
import { ManufacturersGrid } from "@/components/home/ManufacturersGrid";
import { StoreLocation } from "@/components/home/StoreLocation";

export default function AboutUsPage() {
  const { data: manufacturers = [] } = useGetManufacturers();

  const sartajManufacturer = useMemo(() => {
    return manufacturers?.find((m: any) => m?.name?.toLowerCase()?.includes("sartaj"));
  }, [manufacturers]);

  const sartajSlug = sartajManufacturer?.slug || sartajManufacturer?.id || "sartaj";

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
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
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3"
          >
            About Us
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto font-medium"
          >
            Bringing the Flavours of South Asia Closer to Every Home in Japan
          </Typography>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:py-8 space-y-12">
        {/* Our Story Intro Section */}
        <div className="space-y-6">
          <div className="space-y-4 max-w-full">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-snug">
              Our Journey Since 2006
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
              At Sartaj Foods, we are passionate about making authentic South Asian groceries more
              accessible to individuals, families, and businesses across Japan. Since our
              establishment in 2006, we have focused on importing and distributing a carefully
              selected range of food products that help customers enjoy familiar flavours while
              living abroad.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
              Over the years, we have grown into a well-established importer and distributor,
              offering a diverse portfolio of groceries from India and other South Asian countries.
              Our collection includes everyday kitchen essentials, premium ingredients,
              ready-to-cook products, snacks, beverages, frozen foods, spices, flour, rice, lentils,
              and much more.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
              Whether you are preparing a traditional family meal, discovering new flavours, or
              sourcing ingredients for your restaurant, Sartaj Foods strives to make shopping
              simple, convenient, and reliable.
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

        {/* About Sartaj Foods Introduction */}
        <div className="bg-muted/30 border border-border/40 rounded-3xl p-6 md:p-8 space-y-4">
          <Typography
            variant="overline"
            className="text-primary font-bold text-xs tracking-wider uppercase block"
          >
            ABOUT SARTAJ FOODS
          </Typography>
          <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
            Your South Asian Grocery Partner in Japan
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
            Sartaj Foods serves customers throughout Japan by offering a wide selection of authentic
            South Asian grocery products through our online store and distribution network.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
            Our goal is to simplify grocery shopping by bringing together products from respected
            manufacturers and trusted brands in one convenient place. We continually work to expand
            our product range while maintaining a focus on quality, authenticity, and customer
            convenience.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
            From households to restaurants, retailers, wholesalers, and food service businesses, we
            support a wide variety of customers with products suited to their everyday needs.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-medium">
            Our online platform allows customers to browse, order, and receive groceries delivered
            across Japan, making it easier to access ingredients that may otherwise be difficult to
            find locally.
          </p>
        </div>

        {/* Feature Cards Grid (What We Offer) */}
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground">What We Offer</h3>
            <p className="text-sm text-muted-foreground font-medium">
              A commitment to excellence, quality products, and seamless logistics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              title="Selected Range"
              description="We source products from established manufacturers that comply with safety and import requirements."
              icon={<ShieldCheck className="h-5 w-5" />}
              themeColor="primary"
            />
            <FeatureCard
              title="Nationwide Delivery"
              description="Orders are delivered throughout Japan through established logistics partners."
              icon={<Truck className="h-5 w-5" />}
              themeColor="accent"
            />
            <FeatureCard
              title="Live Inventory"
              description="Our inventory system is updated in real time to help ensure customers can order products that are currently available."
              icon={<CheckCircle2 className="h-5 w-5" />}
              themeColor="emerald"
            />
            <FeatureCard
              title="Growing Portfolio"
              description="We continuously work to introduce new products and expand our catalogue based on customer demand."
              icon={<Sparkles className="h-5 w-5" />}
              themeColor="blue"
            />
          </div>
        </div>

        {/* Sartaj Brand Spotlight */}
        <div className="bg-primary/[0.02] border border-primary/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-sm group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[12px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest w-fit block">
                Featured homegrown Brand
              </span>
              <h3 className="text-2xl font-black text-foreground tracking-tight mt-2">
                Sartaj – Our Homegrown Brand
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                Alongside distributing internationally recognised brands, we are proud to offer
                products under our own Sartaj brand. Developed with our customers in mind, the
                Sartaj range includes a growing selection of spices, rice, flour, pulses, snacks,
                seasonings, and everyday grocery essentials.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                Each product is carefully selected, packaged, and prepared with attention to quality
                and consistency before reaching our customers. Our objective is to provide
                ingredients that help people recreate authentic South Asian cooking while living in
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

        {/* Leadership Section */}
        <div className="border-t border-border/40 pt-10 space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground">Leadership</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Guided by a vision of accessibility and excellence.
            </p>
          </div>
          <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            <div className="shrink-0 relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-md border border-border/60 bg-muted">
              <Image
                src="/shop/Shyam Sir.png"
                alt="Mr. Shyam Rajpurohit"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-xl font-extrabold text-foreground">Mr. Shyam Rajpurohit</h4>
                <p className="text-xs text-primary font-bold">Chairman & Founder</p>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                Mr. Shyam Rajpurohit is the Founder and Chairman of Sartaj Foods. A graduate in
                Bachelor of Pharmacy (B.Pharm.), he has been involved in the import and distribution
                industry for more than two decades. His experience spans international sourcing,
                regulatory compliance, supply chain management, and business development.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
                Under his leadership, Sartaj Foods has developed an extensive distribution network
                throughout Japan while building long-term relationships with manufacturers,
                suppliers, retailers, restaurants, and business partners. His vision continues to
                guide the company's focus on expanding product availability, strengthening
                partnerships, and making authentic South Asian groceries more accessible to
                customers across Japan.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>B.Pharm Graduate</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/30">
                  <Briefcase className="h-4 w-4 text-accent" />
                  <span>20+ Years Industry Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us & Key Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-border/40 pt-10 items-stretch">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Why Choose Sartaj Foods?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Established in Japan since 2006",
                "Wide selection of South Asian grocery products",
                "Importer and distributor serving Japan",
                "Homegrown Sartaj product range",
                "Online ordering with nationwide delivery",
                "Products for households and restaurants",
                "Growing portfolio of leading South Asian brands",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-center bg-muted/30 hover:bg-muted/60 border border-border/20 p-3.5 rounded-2xl transition-all duration-200 group"
                >
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-muted-foreground font-semibold leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-primary/[0.03] to-transparent border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-extrabold text-foreground text-base tracking-tight">
                  Commitment to Integrity
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                  Since 2006, Sartaj Foods has remained committed to transparency and quality. We
                  inspect every single shipment at our customs and logistics hubs to verify that
                  everything matches the strict food standards required in Japan.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/30 mt-4 text-[11px] font-bold text-primary uppercase tracking-wider relative z-10">
              Our Promise To You
            </div>
          </div>
        </div>

        {/* Restaurant & Wholesale Partnerships */}
        <div className="bg-accent/[0.03] border border-accent/20 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-xl md:text-2xl font-extrabold text-foreground">
            Restaurant & Wholesale Partnerships
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
            At Sartaj Foods, we work with a wide range of food service and retail businesses across
            Japan, including restaurants, cafés, hotels, caterers, grocery stores, and wholesalers.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
            Alongside the products available on our website, we offer an expanded range of products
            and packaging options specifically for commercial customers. If you're sourcing
            ingredients for your business or require larger quantities, we'd be happy to discuss the
            options available.
          </p>

          <div className="pt-2 border-t border-accent/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <p className="text-sm text-muted-foreground font-semibold">
              Get in touch with our Business Sales Team:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+81727511975"
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+81 72-751-1975</span>
              </a>
              <a
                href="mailto:info@sartajfoods.jp"
                className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 bg-card text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>info@sartajfoods.jp</span>
              </a>
            </div>
          </div>
        </div>

        <ManufacturersGrid />
      </div>

      <StoreLocation />
    </div>
  );
}
