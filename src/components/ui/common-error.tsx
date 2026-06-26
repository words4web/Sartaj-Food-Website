"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common/common.utils";
import { useTranslations } from "next-intl";

interface CommonErrorProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
  className?: string;
  compact?: boolean;
}

export function CommonError({
  message,
  onRetry,
  fullScreen = false,
  className,
  compact = false,
}: CommonErrorProps) {
  const t = useTranslations();
  const finalMessage =
    message || t("common.somethingWentWrong") || "Something went wrong. Please try again.";

  if (compact) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-4 text-center border border-dashed border-border bg-card rounded-xl w-full min-h-[120px] animate-in fade-in duration-200",
          className,
        )}
      >
        <AlertCircle className="h-5 w-5 text-destructive mb-1.5" />
        <h4 className="text-xs font-semibold text-foreground mb-1">
          {t("common.error") || "Error"}
        </h4>
        <p className="text-[11px] text-muted-foreground mb-2 max-w-[200px] leading-normal">
          {finalMessage}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center gap-1 cursor-pointer rounded-lg text-[10px] h-6 px-2.5"
            size="sm"
          >
            <RefreshCcw className="h-3 w-3" />
            {t("common.tryAgain") || "Try Again"}
          </Button>
        )}
      </div>
    );
  }

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{t("common.error") || "Error"}</h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">{finalMessage}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex items-center gap-2 cursor-pointer rounded-xl"
          size="sm"
        >
          <RefreshCcw className="h-4 w-4" />
          {t("common.tryAgain") || "Try Again"}
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-[250px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-card">
      {content}
    </div>
  );
}
