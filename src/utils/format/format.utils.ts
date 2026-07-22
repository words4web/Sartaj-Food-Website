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

  // Allow user to clear completely if they backspace through the prefix
  if (val === "+" || val === "+8" || val === "+81") return "";

  let cleaned = val?.replace(/[^\d]/g, "");

  // Strip country code if present at the start of digits
  if (cleaned?.startsWith("81")) {
    cleaned = cleaned?.slice(2);
  }

  // Strip leading zero for local JP numbers
  if (cleaned?.startsWith("0")) {
    cleaned = cleaned?.slice(1);
  }

  return cleaned ? `+81${cleaned}` : "";
}

export function getAvatarInitials(name: string): string {
  return (
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2) || "U"
  );
}

export function getAvatarColor(name: string): string {
  const colors = [
    "bg-red-100 text-red-700",
    "bg-orange-100 text-orange-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-teal-100 text-teal-700",
    "bg-cyan-100 text-cyan-700",
    "bg-sky-100 text-sky-700",
    "bg-indigo-100 text-indigo-700",
    "bg-violet-100 text-violet-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-pink-100 text-pink-700",
    "bg-rose-100 text-rose-700",
  ];
  let sum = 0;
  for (let i = 0; i < name?.length; i++) {
    sum += name?.charCodeAt(i);
  }
  return colors[sum % colors?.length];
}
