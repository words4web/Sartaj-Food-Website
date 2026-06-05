"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageErrorProps } from "@/types/common.types";

export function PageError({ message, onRetry, showRetryButton = true }: PageErrorProps) {
  const t = useTranslations();
  const displayMessage = message || t("common.somethingWentWrong");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="w-12 h-12 text-error mb-4" />
      <h3 className="text-lg font-semibold text-on-surface mb-2">{t("common.error")}</h3>
      <p className="text-sm text-on-surface-variant mb-6 max-w-md">{displayMessage}</p>
      {showRetryButton && onRetry && (
        <Button onClick={onRetry} variant="default" size="sm">
          {t("common.tryAgain")}
        </Button>
      )}
    </div>
  );
}
