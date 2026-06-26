import { useState, useEffect } from "react";

export function useCachedSkeletonCount(
  key: string,
  realCount: number,
  defaultCount: number = 8,
): number {
  const [cachedCount, setCachedCount] = useState<number>(defaultCount);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setCachedCount(parsed);
        }
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined" && realCount > 0) {
      localStorage.setItem(key, String(realCount));
    }
  }, [key, realCount]);

  return realCount > 0 ? realCount : cachedCount;
}
