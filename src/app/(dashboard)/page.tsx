"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ThemedProductZone } from "@/components/home/ThemedProductZone";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-card">
      <HeroSection />
      <ThemedProductZone />
    </main>
  );
}
