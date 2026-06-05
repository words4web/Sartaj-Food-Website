"use client";

import { Typography } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function AuthFooter() {
  const t = useTranslations("auth");

  return (
    <div className="text-center pt-8 border-t border-border/40">
      <Typography variant="caption" className="text-xs text-muted-foreground leading-relaxed">
        {t.rich("agreeDisclaimer", {
          terms: (chunks) => (
            <Link href={ROUTES.TERMS} className="font-semibold text-foreground hover:underline">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link href={ROUTES.PRIVACY} className="font-semibold text-foreground hover:underline">
              {chunks}
            </Link>
          ),
        })}
      </Typography>
    </div>
  );
}
