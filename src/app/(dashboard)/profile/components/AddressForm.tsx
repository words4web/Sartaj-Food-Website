import React from "react";
import { useTranslations } from "next-intl";
import { PREFECTURES } from "@/constants/prefectures";
import { Button } from "@/components/ui/button";
import { isErrorKey } from "@/utils/auth/auth.utils";
import { IAddress, AddressFormProps } from "@/types/address/address.types";
import { usePostalCodeLookup } from "@/hooks/usePostalCodeLookup";
import { AreaSelectionModal } from "@/components/address/AreaSelectionModal";
import { Loader2, Search } from "lucide-react";

export function AddressForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  onAutoFillAddress,
  formError,
  isPending = false,
  isEditing = false,
}: AddressFormProps) {
  const t = useTranslations();

  const {
    isLoading: isSearchingZip,
    modalState,
    searchPostalCode,
    handleSelectArea,
    closeModal,
  } = usePostalCodeLookup({
    onAutoFill: onAutoFillAddress,
  });

  const handleLookupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formData?.postalCode) {
      searchPostalCode(formData?.postalCode);
    }
  };

  const rawZipLength = (formData?.postalCode || "")?.replace(/[^\d]/g, "")?.length;

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-6 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
      <h3 className="text-lg font-bold text-foreground mb-4">
        {isEditing ? t("profile.editAddress") : t("profile.addNewAddress")}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData?.fullName || ""}
              onChange={onChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.phoneNumber")}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm text-muted-foreground font-medium border-r border-border pr-2">
                +81
              </span>
              <input
                type="tel"
                name="phone"
                required
                value={
                  formData?.phone?.startsWith("+81")
                    ? formData.phone?.slice(3)
                    : formData?.phone || ""
                }
                onChange={onChange}
                placeholder="9012345678"
                className="w-full pl-12 pr-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.zipCode")}
            </label>
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                name="postalCode"
                required
                value={formData?.postalCode || ""}
                onChange={onChange}
                placeholder="123-4567"
                className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={isSearchingZip || rawZipLength !== 7}
                onClick={handleLookupClick}
                className="shrink-0 h-9.5 px-3 rounded-xl flex items-center gap-1.5 font-medium text-xs border border-border shadow-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearchingZip ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    <span>{t("profile.checking")}</span>
                  </>
                ) : (
                  <>
                    <Search className="h-3.5 w-3.5" />
                    <span>{t("profile.check")}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.prefecture")}
            </label>
            <select
              name="prefecture"
              value={formData?.prefecture || "JP-13"}
              onChange={onChange}
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none cursor-pointer"
            >
              {PREFECTURES.map((pref) => (
                <option key={pref.code} value={pref.code}>
                  {pref.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.city")}
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData?.city || ""}
              onChange={onChange}
              placeholder="Shinjuku"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.streetAddress")}
            </label>
            <input
              type="text"
              name="streetAddress"
              required
              value={formData?.streetAddress || ""}
              onChange={onChange}
              placeholder="3-24-1 Okubo"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              {t("profile.building")}
            </label>
            <input
              type="text"
              name="building"
              value={formData?.building || ""}
              onChange={onChange}
              placeholder="Green Heights 201"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-left w-full md:w-auto">
            {formError && (
              <p className="text-xs text-destructive font-semibold">
                {isErrorKey(formError) ? t(`auth.${formError}` as any) : formError}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="rounded-xl cursor-pointer"
            >
              {t("profile.cancel")}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="rounded-xl cursor-pointer"
            >
              {isEditing ? t("profile.update") : t("profile.save")}
            </Button>
          </div>
        </div>
      </form>

      <AreaSelectionModal
        modalState={modalState}
        onSelectArea={handleSelectArea}
        onClose={closeModal}
      />
    </div>
  );
}
