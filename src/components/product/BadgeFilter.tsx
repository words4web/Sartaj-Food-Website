"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Award, ChevronDown } from "lucide-react";
import { PRODUCT_BADGES } from "@/constants/product.constants";
import { ROUTES } from "@/constants/routes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function BadgeFilter() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeBadge = useMemo(() => {
    return searchParams?.get("badge") || "";
  }, [searchParams]);

  const handleBadgeSelect = (badgeValue: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params?.delete("page");

    if (activeBadge === badgeValue) {
      params?.delete("badge");
    } else {
      params?.set("badge", badgeValue);
    }

    router.push(ROUTES.PRODUCTS_WITH_QUERY(params?.toString()));
  };

  const badgeOptions = [
    { value: PRODUCT_BADGES.NEW_ARRIVAL, label: t("home.newArrivals") || "New Arrivals" },
    { value: PRODUCT_BADGES.FEATURED, label: t("home.featuredProducts") || "Featured Products" },
    { value: PRODUCT_BADGES.HOT, label: t("home.hotProducts") || "Hot Products" },
  ];

  const activeOptionLabel = useMemo(() => {
    const found = badgeOptions?.find((opt) => opt?.value === activeBadge);
    return found ? found?.label : null;
  }, [activeBadge, badgeOptions]);

  return (
    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/80 hover:bg-muted/50 gap-2 font-medium"
          >
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>{activeOptionLabel || "Tags"}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 overflow-y-auto rounded-xl shadow-lg border border-border/60"
        >
          <DropdownMenuLabel className="text-xs font-bold text-muted-foreground">
            Filter by Tags
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {badgeOptions?.map((opt) => {
            const isChecked = activeBadge === opt?.value;
            return (
              <DropdownMenuCheckboxItem
                key={opt.value}
                checked={isChecked}
                onCheckedChange={() => handleBadgeSelect(opt.value)}
                className="text-sm cursor-pointer rounded-lg mx-1"
              >
                {opt.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
