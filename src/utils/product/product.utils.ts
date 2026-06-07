export const getLocalizedValue = (val: any, locale: string): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[locale] || val?.en || "";
};
