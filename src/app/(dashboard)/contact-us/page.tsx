"use client";

import { Typography } from "@/components/common";
import { StoreLocation } from "@/components/home/StoreLocation";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-card text-foreground pb-16">
      <div className="bg-muted/40 border-b border-border/80 py-10 md:py-16 text-center relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <Typography
            variant="overline"
            className="text-primary font-bold text-sm tracking-wider uppercase mb-3 block"
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h1"
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Contact Us
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto"
          >
            Have questions or feedback? Contact our support team directly. We are here to help.
          </Typography>
        </div>
      </div>

      <div className="mt-8">
        <StoreLocation />
      </div>
    </div>
  );
}
