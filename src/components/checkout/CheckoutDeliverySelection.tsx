"use client";

import { useMemo } from "react";
import { CalendarDays, Clock } from "lucide-react";
import {
  getValidDeliveryDates,
  getDeliverySlots,
  parseDateJST,
} from "@/utils/delivery/delivery.utils";
import { useTranslations } from "next-intl";
import { CheckoutDeliverySelectionProps } from "@/types/checkout/checkout.types";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function CheckoutDeliverySelection({
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
}: CheckoutDeliverySelectionProps) {
  const t = useTranslations("checkout");

  const validDates = useMemo(() => getValidDeliveryDates(), []);
  const slots = useMemo(() => (selectedDate ? getDeliverySlots(selectedDate) : []), [selectedDate]);

  const handleDateClick = (date: string) => {
    onSelectDate(date);
    // Reset slot when date changes — previously-chosen slot may now be unavailable
    onSelectSlot("");
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary shrink-0" />
        <h3 className="text-base font-bold text-foreground">
          {t("deliverySchedule") || "Delivery Schedule"}
        </h3>
      </div>

      {/* Date selection */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          {t("selectDeliveryDate") || "Select Delivery Date"}
        </p>
        <div className="flex gap-2 flex-wrap">
          {validDates?.map((date) => {
            const d = parseDateJST(date);
            const dayName = DAY_NAMES[d.getUTCDay()];
            const dayNum = d.getUTCDate();
            const month = MONTH_NAMES[d.getUTCMonth()];
            const isSelected = selectedDate === date;

            return (
              <button
                key={date}
                type="button"
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center justify-center w-16 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/8 text-primary shadow-sm"
                    : "border-border bg-background hover:border-primary/50 hover:text-primary text-foreground"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase text-muted-foreground mb-0.5">
                  {dayName}
                </span>
                <span className="text-base font-black leading-none">{dayNum}</span>
                <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                  {month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot selection — only shown after a date is chosen */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t("selectDeliverySlot") || "Select Time Slot"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {slots.map(({ slot, label, available }) => {
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!available}
                  onClick={() => available && onSelectSlot(slot)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all duration-200 text-center ${
                    !available
                      ? "border-border/40 bg-muted/30 text-muted-foreground/40 line-through cursor-not-allowed"
                      : isSelected
                        ? "border-primary bg-primary/8 text-primary shadow-sm cursor-pointer"
                        : "border-border bg-background hover:border-primary/50 hover:text-primary text-foreground cursor-pointer"
                  }`}
                >
                  {label}
                  {!available && (
                    <span
                      className="block text-[9px] font-semibold mt-0.5 normal-case no-underline"
                      style={{ textDecoration: "none" }}
                    >
                      {t("slotUnavailable") || "Unavailable"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Placeholder when no date selected */}
      {!selectedDate && (
        <p className="text-xs text-muted-foreground italic">
          {t("selectDateFirst") || "Please select a delivery date to see available time slots."}
        </p>
      )}
    </div>
  );
}
