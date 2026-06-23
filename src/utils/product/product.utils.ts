export const getLocalizedValue = (val: any, locale: string): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[locale] || val?.en || "";
};

export interface CategorySizeClasses {
  sizeClasses: string;
  innerSizeClasses: string;
  textClasses: string;
  subTextClasses: string;
  textSkeletonClasses: string;
  subTextSkeletonClasses: string;
}

export const getCategorySizeClasses = (size?: "sm" | "md" | "lg"): CategorySizeClasses => {
  const isSmall = size === "sm";
  const isLarge = size === "lg";

  let sizeClasses = "w-[150px] h-[150px] p-4";
  if (isSmall) {
    sizeClasses = "w-[120px] h-[120px] p-2.5";
  } else if (isLarge) {
    sizeClasses = "w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] p-4 sm:p-5";
  }

  let innerSizeClasses = "h-16 w-16";
  if (isSmall) {
    innerSizeClasses = "h-13 w-13";
  } else if (isLarge) {
    innerSizeClasses = "h-20 w-20 sm:h-24 sm:w-24";
  }

  let textClasses = "text-xs";
  let textSkeletonClasses = "h-3.5 w-16";
  if (isSmall) {
    textClasses = "text-[10px]";
    textSkeletonClasses = "h-3 w-12";
  } else if (isLarge) {
    textClasses = "text-xs sm:text-sm font-bold";
    textSkeletonClasses = "h-3.5 w-20";
  }

  let subTextClasses = "text-[10px]";
  let subTextSkeletonClasses = "h-3 w-10";
  if (isSmall) {
    subTextClasses = "text-[9px]";
    subTextSkeletonClasses = "h-2.5 w-8";
  } else if (isLarge) {
    subTextClasses = "text-[10px] sm:text-xs";
    subTextSkeletonClasses = "h-3 w-12";
  }

  return {
    sizeClasses,
    innerSizeClasses,
    textClasses,
    subTextClasses,
    textSkeletonClasses,
    subTextSkeletonClasses,
  };
};
