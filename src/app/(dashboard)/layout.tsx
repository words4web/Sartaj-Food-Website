"use client";

import React, { ReactNode } from "react";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
