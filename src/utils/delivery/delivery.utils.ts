/**
 * Client-side mirrors of the backend delivery date/slot helpers.
 * All time comparisons use Japan Standard Time (JST = UTC+9).
 */

const JAPAN_TZ = "Asia/Tokyo";

/** Extract date/time parts for the current moment in JST using the browser/engine's Intl support */
function nowJSTParts(): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
} {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: JAPAN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now)?.map((p) => [p?.type, p?.value]));
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    year: Number(parts?.year),
    month: Number(parts?.month),
    day: Number(parts?.day),
    hour: Number(parts?.hour === "24" ? 0 : parts?.hour),
    minute: Number(parts?.minute),
    weekday: weekdayMap[parts?.weekday] ?? new Date().getDay(),
  };
}

/**
 * Returns up to 3 upcoming valid delivery dates (non-Sunday).
 * Matches backend `getValidDeliveryDates()`.
 */
export function getValidDeliveryDates(): string[] {
  const dates: string[] = [];
  const { year, month, day } = nowJSTParts();
  const todayStr = `${year}-${String(month)?.padStart(2, "0")}-${String(day)?.padStart(2, "0")}`;

  // Get the 3 dates that the backend's validation accepts (starting from today)
  let cursor = new Date(Date.UTC(year, month - 1, day)); // midnight UTC = same calendar date

  while (dates.length < 3) {
    // Get the weekday for this calendar date *in JST*
    const weekdayInJST = new Intl.DateTimeFormat("en-US", {
      timeZone: JAPAN_TZ,
      weekday: "short",
    }).format(cursor);

    if (weekdayInJST !== "Sun") {
      const y = cursor.getUTCFullYear();
      const m = String(cursor.getUTCMonth() + 1).padStart(2, "0");
      const d = String(cursor.getUTCDate()).padStart(2, "0");
      dates.push(`${y}-${m}-${d}`);
    }
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
  }

  // Filter out today's date so the customer cannot select it, leaving only tomorrow and the day after (1 or 2 valid dates)
  return dates?.filter((d) => d !== todayStr);
}

/** Parse a YYYY-MM-DD string for display — returns a plain UTC-midnight Date so getUTC* reads the correct calendar date. */
export function parseDateJST(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export interface DeliverySlot {
  slot: string; // "1" | "2" | "3" | "4"
  label: string; // e.g. "10:00 – 13:00"
  available: boolean;
}

/** Slot cutoff times in minutes from JST midnight */
const SLOT_CUTOFFS: Record<string, number> = {
  "1": 9 * 60, // 09:00 → order by 09:00
  "2": 12 * 60 + 1, // 12:01
  "3": 15 * 60 + 1, // 15:01
  "4": 18 * 60 + 1, // 18:01
};

export const SLOT_LABELS: Record<string, string> = {
  "1": "9:00 AM – 12:00 PM",
  "2": "12:01 PM – 3:00 PM",
  "3": "3:01 PM – 6:00 PM",
  "4": "6:01 PM – 9:00 PM",
};

/**
 * Returns the 4 delivery slots with availability for a given date string.
 * Availability for today is checked against JST current time.
 */
export function getDeliverySlots(dateStr: string): DeliverySlot[] {
  const { year, month, day, hour, minute } = nowJSTParts();
  const todayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isToday = dateStr === todayStr;
  const currentMinutes = hour * 60 + minute;

  return ["1", "2", "3", "4"].map((slot) => ({
    slot,
    label: SLOT_LABELS[slot],
    available: isToday ? currentMinutes < SLOT_CUTOFFS[slot] : true,
  }));
}

/**
 * Formats a YYYY-MM-DD JST date string safely for display.
 */
export function formatDeliveryDate(deliveryDate?: string | null): string {
  if (!deliveryDate) return "";
  try {
    const d = parseDateJST(deliveryDate);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return deliveryDate;
  }
}

/**
 * Returns the friendly slot label for a given slot ID, or the ID itself if not matched.
 */
export function getSlotLabel(deliverySlot?: string | null): string {
  if (!deliverySlot) return "";
  return SLOT_LABELS[deliverySlot] || deliverySlot;
}
