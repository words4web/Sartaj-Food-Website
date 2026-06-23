"use client";

import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CheckoutNotesProps {
  notes: string;
  onChange: (notes: string) => void;
}

export function CheckoutNotes({ notes, onChange }: CheckoutNotesProps) {
  const t = useTranslations("checkout");

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary shrink-0" />
        <h3 className="text-base font-bold text-foreground">
          {t("orderNotes") || "Order Notes (Optional)"}
        </h3>
      </div>

      <div>
        <Textarea
          placeholder={
            t("notesPlaceholder") ||
            "Add special instructions for your delivery, or any other notes..."
          }
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          maxLength={1000}
          className="w-full min-h-[100px] text-sm rounded-xl p-3 bg-background border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
        />
        <div className="flex justify-end text-[10px] text-muted-foreground mt-1.5 font-medium">
          {notes?.length}/1000
        </div>
      </div>
    </div>
  );
}
