"use client";

import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IAreaSelectionModalState, IZipCloudResult } from "@/types/address/address.types";
import { MapPin } from "lucide-react";

export function AreaSelectionModal({
  modalState,
  onSelectArea,
  onClose,
}: {
  modalState: IAreaSelectionModalState;
  onSelectArea: (result: IZipCloudResult) => void;
  onClose: () => void;
}) {
  const t = useTranslations("profile");
  const formattedZip = modalState?.zipcode
    ? `${modalState?.zipcode?.slice(0, 3)}-${modalState?.zipcode?.slice(3)}`
    : "";

  return (
    <Dialog open={modalState?.isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl p-6 bg-card text-card-foreground shadow-2xl border border-border">
        <DialogHeader className="pb-3 border-b border-border/50">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{t("selectArea")}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-3 space-y-3 max-h-[320px] overflow-y-auto pr-1">
          <p className="text-xs text-muted-foreground">
            {t("selectAreaHelp", { zipcode: formattedZip })}
          </p>

          <div className="space-y-2">
            {modalState?.results?.map((res, rIdx) => (
              <button
                key={rIdx}
                type="button"
                onClick={() => onSelectArea(res)}
                className="w-full text-left p-3 rounded-xl border border-border/60 hover:border-primary hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {res?.address3 || t("streetAddress")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {res?.address1} {res?.address2}
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border border-muted-foreground/30 group-hover:border-primary flex items-center justify-center shrink-0 mt-1 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
