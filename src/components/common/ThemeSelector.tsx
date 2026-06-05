"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { themes, applyTheme, themeSwatchColors, type Theme } from "@/lib/themes";
import { Palette, ChevronDown, Check } from "lucide-react";

interface ThemeSelectorProps {
  variant?: "light" | "dark";
}

export function ThemeSelector({ variant = "light" }: ThemeSelectorProps) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentConfig = themes[currentTheme];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeSelect = (theme: Theme) => {
    dispatch(setTheme(theme));
    // ThemeProvider listens to Redux state and calls applyTheme automatically
    // but we also call it here for instant response
    applyTheme(theme);
    setIsOpen(false);
  };

  const buttonClasses =
    variant === "light"
      ? "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-all duration-200 cursor-pointer"
      : "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200 cursor-pointer";

  const dropdownClasses =
    variant === "light"
      ? "absolute right-0 top-full mt-2 w-52 rounded-lg bg-card border border-border shadow-lg py-1.5 z-50"
      : "absolute right-0 bottom-full mb-2 w-52 rounded-lg bg-zinc-950 border border-white/10 shadow-xl py-1.5 z-50";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={buttonClasses}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Small color swatch showing active theme primary color */}
        <span
          className="h-3.5 w-3.5 rounded-full flex-shrink-0 ring-1 ring-black/10"
          style={{ background: themeSwatchColors[currentTheme][0] }}
        />
        <Palette className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{currentConfig.label}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className={dropdownClasses} role="menu">
          {(Object.entries(themes) as [Theme, (typeof themes)[Theme]][]).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              className={`w-full text-left px-3 py-2.5 text-sm transition-colors cursor-pointer flex items-center gap-3 ${
                variant === "light"
                  ? currentTheme === key
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted/50 hover:text-foreground"
                  : currentTheme === key
                    ? "bg-white/20 text-white font-semibold"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              role="menuitem"
            >
              {/* Gradient swatch */}
              <span
                className="h-5 w-5 rounded-full flex-shrink-0 ring-1 ring-black/10"
                style={{
                  background: `linear-gradient(135deg, ${themeSwatchColors[key][0]}, ${themeSwatchColors[key][1]})`,
                }}
              />
              <span className="flex-1">{config.label}</span>
              {currentTheme === key && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
