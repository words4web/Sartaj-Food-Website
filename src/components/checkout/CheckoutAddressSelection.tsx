"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { CheckoutAddressSelectionProps } from "@/types/checkout/checkout.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CheckoutAddressSelection({
  addresses = [],
  selectedAddressId,
  onSelectAddress,
}: CheckoutAddressSelectionProps) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const selectedAddress = addresses?.find((addr) => addr?._id === selectedAddressId);

  const handleSelectAddress = (id: string) => {
    onSelectAddress(id);
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 space-y-4 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-base font-bold text-foreground">
              {t("shippingAddress") || "Shipping Address"}
            </h2>
          </div>
          {addresses?.length > 0 && (
            <Button
              asChild
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-primary hover:text-primary/95 text-xs font-semibold cursor-pointer rounded-xl"
            >
              <Link href={ROUTES.PROFILE}>
                {t("manageAddresses") || "Manage Addresses"}
                <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
              </Link>
            </Button>
          )}
        </div>

        {selectedAddress ? (
          /* Collapsed Selected Card View */
          <div className="relative border border-primary/20 bg-primary/[0.01] hover:bg-primary/[0.02] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200">
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <p className="font-bold text-foreground text-base leading-snug">
                  {selectedAddress?.fullName}
                </p>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full select-none">
                  {t("selected") || "Selected"}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-2 font-semibold">
                〒{selectedAddress?.postalCode}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                {selectedAddress?.prefecture}, {selectedAddress?.city},
                {selectedAddress?.streetAddress} {selectedAddress?.building || ""}
              </p>
              <p className="text-muted-foreground text-xs mt-2 font-medium flex items-center gap-1">
                <span>📞</span>
                <span>{selectedAddress?.phone}</span>
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="rounded-xl font-semibold text-xs cursor-pointer shadow-sm"
              >
                {t("changeAddress") || "Change Address"}
              </Button>
            </div>
          </div>
        ) : (
          /* Empty Placeholder Card View */
          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/5 transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-foreground leading-snug">
                  {addresses?.length === 0
                    ? t("noSavedAddresses") || "No Saved Addresses"
                    : t("chooseShippingAddress") || "Choose a shipping address"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {addresses?.length === 0
                    ? t("noSavedAddressesDesc") ||
                      "You must add a shipping address in your profile before you can proceed with checkout."
                    : "Please select an address for shipping."}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {addresses?.length === 0 ? (
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl font-semibold text-xs cursor-pointer shadow-sm"
                >
                  <Link href={ROUTES.PROFILE} className="flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" />
                    {t("addNewAddress") || "Add Address"}
                  </Link>
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  className="rounded-xl font-semibold text-xs cursor-pointer shadow-sm"
                >
                  {t("selectAddress") || "Select Address"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Popover / Dialog Popup Selector */}
      {addresses?.length > 0 && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            aria-describedby={undefined}
            className="max-w-2xl max-h-[85vh] flex flex-col p-6 overflow-hidden rounded-2xl"
          >
            <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
              <DialogTitle className="text-lg font-bold text-foreground">
                {t("chooseShippingAddress") || "Choose a shipping address"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses?.map((addr) => {
                  const id = addr?._id || "";
                  const isSelected = selectedAddressId === id;

                  return (
                    <div
                      key={id}
                      onClick={() => handleSelectAddress(id)}
                      className={`relative border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 select-none ${
                        isSelected
                          ? "border-primary bg-primary/[0.02] ring-1 ring-primary shadow-xs"
                          : "border-border/60 hover:border-muted-foreground/25 hover:shadow-xs bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="popupSelectedAddress"
                          checked={isSelected}
                          readOnly
                          className="mt-1 h-4 w-4 cursor-pointer accent-primary shrink-0"
                        />
                        <div className="text-sm">
                          <p className="font-semibold text-foreground leading-snug">
                            {addr?.fullName}
                          </p>
                          <p className="text-muted-foreground text-xs mt-1.5 font-medium">
                            〒{addr?.postalCode}
                          </p>
                          <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                            {addr?.prefecture}, {addr?.city}, {addr?.streetAddress}
                            {addr?.building || ""}
                          </p>
                          <p className="text-muted-foreground text-xs mt-2 font-semibold flex items-center gap-1">
                            <span>📞</span>
                            <span>{addr?.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 shrink-0 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="rounded-xl text-xs font-semibold"
              >
                {tCommon("close") || "Close"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
