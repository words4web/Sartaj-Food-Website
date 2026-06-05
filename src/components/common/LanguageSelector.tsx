"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocale } from "@/lib/store/localeSlice";
import { RootState } from "@/lib/store";
import { LANGUAGES } from "@/data/languages";
import { Globe, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "light" | "dark";
}

export function LanguageSelector({ variant = "light" }: LanguageSelectorProps) {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.locale.locale);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find((lang) => lang?.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonClasses =
    variant === "light"
      ? "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-all duration-200 cursor-pointer"
      : "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200 cursor-pointer";

  const dropdownClasses =
    variant === "light"
      ? "absolute right-0 top-full mt-2 w-40 rounded-lg bg-card border border-border shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      : "absolute right-0 bottom-full mb-2 w-40 rounded-lg bg-zinc-950 border border-white/10 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200";

  const itemClasses = (active: boolean) => {
    if (variant === "light") {
      return `w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-foreground hover:bg-muted/50 hover:text-foreground"
      }`;
    } else {
      return `w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
        active
          ? "bg-white/20 text-white font-semibold"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={buttonClasses}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 flex-shrink-0" />
        <span>{currentLanguage.nativeName}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className={dropdownClasses} role="menu">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                dispatch(setLocale(lang?.code as any));
                setIsOpen(false);
              }}
              className={itemClasses(locale === lang?.code)}
              role="menuitem"
            >
              {lang?.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
