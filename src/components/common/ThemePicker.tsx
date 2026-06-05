"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { themes, applyTheme, themeSwatchColors, type Theme } from "@/lib/themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ParticleCanvas } from "./ParticleCanvas";
import { ParticleType } from "@/types/common.types";

export function ThemePicker() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
  const [particleType, setParticleType] = useState<ParticleType>("none");

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    dispatch(setTheme(theme));
    applyTheme(theme);

    // Show particles for a few seconds
    const config = themes[theme];
    if (config.particles?.enabled) {
      setParticleType(config.particles.type);
      setTimeout(() => setParticleType("none"), 3000);
    }
  };

  return (
    <>
      <ParticleCanvas type={particleType} />
      <Card className="border-outline">
        <CardHeader>
          <CardTitle>{t("settings.seasonalTheme")}</CardTitle>
          <CardDescription>{t("settings.selectTheme")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.entries(themes) as [Theme, (typeof themes)[Theme]][]).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeSelect(key)}
                className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                  selectedTheme === key ? "border-primary" : "border-outline-variant"
                }`}
              >
                <div
                  className="h-24 flex flex-col justify-center items-center text-white font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${themeSwatchColors[key][0]}, ${themeSwatchColors[key][1]})`,
                  }}
                >
                  <div className="text-sm font-bold">{t(`settings.${key}`)}</div>
                </div>
                <div className="p-3 bg-background">
                  <p className="text-xs text-on-surface-variant text-center">{theme.description}</p>
                </div>
                {selectedTheme === key && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={() => {
              handleThemeSelect(selectedTheme);
            }}
            className="w-full bg-primary hover:bg-surface-tint text-on-primary"
          >
            {t("settings.themeApplied")}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
