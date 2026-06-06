export function formatYen(amount: number, includeSymbol = true): string {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatted = formatter.format(amount);
  return includeSymbol ? formatted : formatted.replace(/¥\s?/, "");
}

export function formatDate(date: string | Date, locale = "en-US"): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatTime(date: string | Date, locale = "en-US"): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function truncateText(text: string, length: number): string {
  if (text?.length <= length) return text;
  return text?.substring(0, length) + "...";
}

export function capitalizeFirstLetter(text: string): string {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
}

export function formatPostalCode(val: string): string {
  if (!val) return "";
  let cleaned = val?.replace(/[^\d]/g, "");
  if (cleaned?.length > 7) cleaned = cleaned?.slice(0, 7);
  if (cleaned?.length > 3) {
    return `${cleaned?.slice(0, 3)}-${cleaned?.slice(3)}`;
  }
  return cleaned;
}

export function formatJapanPhone(val: string): string {
  if (!val) return "";
  let cleaned = val?.replace(/[^\d]/g, "");
  if (cleaned?.startsWith("0")) {
    cleaned = cleaned?.slice(1);
  }
  return cleaned ? `+81${cleaned}` : "";
}
