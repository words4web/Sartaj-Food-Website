"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyTheme, getStoredTheme, themes, type Theme } from "@/lib/themes";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { ParticleCanvas } from "./ParticleCanvas";
import { ParticleType } from "@/types/common.types";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);

  useEffect(() => {
    const saved = getStoredTheme();
    applyTheme(saved);
    dispatch(setTheme(saved as Theme));
  }, [dispatch]);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const particleType: ParticleType =
    (themes[currentTheme]?.particles?.type as ParticleType) ?? "none";

  return (
    <>
      <ParticleCanvas type={particleType} />
      {children}
    </>
  );
}
