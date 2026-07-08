"use client";

import { LanguageSelector } from "@/components/common";
import Link from "next/link";

export function AuthHeader() {
  return (
    <div className="flex justify-between items-center w-full mb-8 sm:mb-12">
      {/* Logo visible on Mobile layout */}
      <Link href="/" className="flex items-center gap-2.5 lg:hidden group">
        <img
          src="/sartaj_logo.svg"
          className="w-12 h-12 drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
          alt="Sartaj Foods"
        />
        <span className="font-bold text-lg tracking-tight text-foreground">Sartaj Foods</span>
      </Link>

      <div className="flex items-center gap-3 ml-auto">
        <LanguageSelector variant="light" />
        {/* <ThemeSelector variant="light" /> */}
      </div>
    </div>
  );
}
