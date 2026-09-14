"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerLoyaltyStatus } from "@/services/loyalty/loyalty.hooks";
import { ROUTES } from "@/constants/routes";

export function HeaderLoyaltyBadge() {
  const { isAuthenticated } = useAuth();
  const { data: loyalty } = useCustomerLoyaltyStatus(isAuthenticated);

  if (!isAuthenticated || !loyalty) {
    return null;
  }

  if (loyalty?.isActive) {
    return (
      <Link
        href={ROUTES.LOYALTY}
        className="hidden md:inline-flex items-center justify-center p-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 hover:scale-105 transition-all shadow-sm"
        title="Sartaj Family VIP Member - View Benefits"
      >
        <Crown className="h-4 w-4 text-amber-500 fill-amber-500/20" />
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.LOYALTY}
      className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-all text-xs font-semibold"
      title="Track Sartaj Family Loyalty Status"
    >
      <Crown className="h-3.5 w-3.5 text-amber-500" />
      <span>{loyalty?.progressPercentage}%</span>
    </Link>
  );
}
