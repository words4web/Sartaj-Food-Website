"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyTheme, getStoredTheme, themes, type Theme } from "@/lib/themes";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { ParticleCanvas } from "./ParticleCanvas";
import { ParticleType } from "@/types/common.types";

/**
 * Reads the saved theme from localStorage on first render and applies it
 * both visually (CSS variables) and to Redux state.
 * Also renders the persistent ambient ParticleCanvas for the active theme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);

  // Restore theme from localStorage on mount
  useEffect(() => {
    const saved = getStoredTheme();
    applyTheme(saved);
    dispatch(setTheme(saved as Theme));
  }, [dispatch]);

  // Re-apply CSS vars whenever Redux theme changes
  // (handles the case where theme is changed from any component)
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // Derive particle type from current theme — persistent, not a timed burst
  const particleType: ParticleType =
    (themes[currentTheme]?.particles?.type as ParticleType) ?? "none";

  return (
    <>
      <ParticleCanvas type={particleType} />
      {children}
    </>
  );
}
