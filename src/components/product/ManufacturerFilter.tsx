"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useGetManufacturers } from "@/services/manufacturer/manufacturer.hooks";
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

export function ManufacturerFilter() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: manufacturers = [] } = useGetManufacturers();

  const activeManufacturers = useMemo(() => {
    const value = searchParams?.get("manufacturers") || "";
    return value ? value?.split(",")?.filter(Boolean) : [];
  }, [searchParams]);

  const handleManufacturerToggle = (identifier: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params?.delete("page");

    let current = params?.get("manufacturers")?.split(",")?.filter(Boolean) || [];
    if (current.includes(identifier)) {
      current = current?.filter((val) => val !== identifier);
    } else {
      current?.push(identifier);
    }

    if (current?.length > 0) {
      params.set("manufacturers", current?.join(","));
    } else {
      params?.delete("manufacturers");
    }

    router.push(ROUTES.PRODUCTS_WITH_QUERY(params?.toString()));
  };

  if (manufacturers?.length === 0) return null;

  return (
    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/80 hover:bg-muted/50 gap-2 font-medium"
          >
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span>{t("products.brands") || "Brands"}</span>
            {activeManufacturers.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeManufacturers.length}
              </span>
            )}
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 max-h-72 overflow-y-auto rounded-xl shadow-lg border border-border/60"
        >
          <DropdownMenuLabel className="text-xs font-bold text-muted-foreground">
            Filter by Brands
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {manufacturers?.map((m: any) => {
            const mIdentifier = m?.slug || m?.id || m?._id;
            const isChecked = activeManufacturers?.includes(mIdentifier);
            return (
              <DropdownMenuCheckboxItem
                key={m?.id || m?._id}
                checked={isChecked}
                onCheckedChange={() => handleManufacturerToggle(mIdentifier)}
                className="text-sm cursor-pointer rounded-lg mx-1"
              >
                {m?.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
