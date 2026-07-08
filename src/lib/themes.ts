export type Theme = "default" | "sakura" | "snowfall" | "diwali";

export interface ThemeConfig {
  name: string;
  label: string;
  description: string;
  /** oklch CSS variable values mapped to the shadcn/tailwind var names */
  cssVars: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    border: string;
    input: string;
    ring: string;
    muted: string;
    mutedForeground: string;
  };
  particles?: {
    enabled: boolean;
    type: "sakura" | "snowflake" | "diwali-light" | "none";
  };
}

export const themes: Record<Theme, ThemeConfig> = {
  default: {
    name: "default",
    label: "Default",
    description: "Classic professional design",
    cssVars: {
      primary: "oklch(0.32 0.18 264)", // deep blue
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      secondaryForeground: "oklch(0.205 0 0)",
      accent: "oklch(0.97 0 0)",
      accentForeground: "oklch(0.205 0 0)",
      background: "oklch(0.99 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.145 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.32 0.18 264)",
      muted: "oklch(0.97 0 0)",
      mutedForeground: "oklch(0.556 0 0)",
    },
  },

  sakura: {
    name: "sakura",
    label: "Sakura Spring",
    description: "Soft pink cherry blossom aesthetic",
    cssVars: {
      primary: "oklch(0.58 0.2 0)", // rose-pink
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.94 0.04 355)",
      secondaryForeground: "oklch(0.4 0.1 0)",
      accent: "oklch(0.92 0.06 350)",
      accentForeground: "oklch(0.45 0.15 0)",
      background: "oklch(0.99 0.01 355)",
      foreground: "oklch(0.2 0.05 0)",
      card: "oklch(1 0.005 355)",
      cardForeground: "oklch(0.2 0.05 0)",
      border: "oklch(0.88 0.06 355)",
      input: "oklch(0.88 0.06 355)",
      ring: "oklch(0.58 0.2 0)",
      muted: "oklch(0.94 0.04 355)",
      mutedForeground: "oklch(0.5 0.07 355)",
    },
    particles: { enabled: true, type: "sakura" },
  },

  snowfall: {
    name: "snowfall",
    label: "Snowfall Winter",
    description: "Cool icy winter theme",
    cssVars: {
      primary: "oklch(0.52 0.14 230)", // steel blue
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.93 0.04 220)",
      secondaryForeground: "oklch(0.28 0.1 220)",
      accent: "oklch(0.9 0.06 215)",
      accentForeground: "oklch(0.3 0.12 220)",
      background: "oklch(0.975 0.01 220)",
      foreground: "oklch(0.18 0.06 225)",
      card: "oklch(1 0.005 220)",
      cardForeground: "oklch(0.18 0.06 225)",
      border: "oklch(0.86 0.05 220)",
      input: "oklch(0.86 0.05 220)",
      ring: "oklch(0.52 0.14 230)",
      muted: "oklch(0.93 0.04 220)",
      mutedForeground: "oklch(0.5 0.07 220)",
    },
    particles: { enabled: true, type: "snowflake" },
  },

  diwali: {
    name: "diwali",
    label: "Diwali Festival",
    description: "Vibrant festival celebration colors",
    cssVars: {
      primary: "oklch(0.65 0.19 55)", // warm amber/gold
      primaryForeground: "oklch(0.15 0 0)",
      secondary: "oklch(0.95 0.07 60)",
      secondaryForeground: "oklch(0.3 0.1 50)",
      accent: "oklch(0.92 0.1 55)",
      accentForeground: "oklch(0.3 0.12 45)",
      background: "oklch(0.99 0.02 70)",
      foreground: "oklch(0.18 0.05 45)",
      card: "oklch(1 0.01 60)",
      cardForeground: "oklch(0.18 0.05 45)",
      border: "oklch(0.88 0.09 55)",
      input: "oklch(0.88 0.09 55)",
      ring: "oklch(0.65 0.19 55)",
      muted: "oklch(0.95 0.07 60)",
      mutedForeground: "oklch(0.5 0.08 55)",
    },
    particles: { enabled: true, type: "diwali-light" },
  },
};

/** Colors shown in the theme picker swatches (hex for canvas gradients) */
export const themeSwatchColors: Record<Theme, [string, string]> = {
  default: ["#243b87", "#006e1c"],
  sakura: ["#d4507a", "#f9a8c9"],
  snowfall: ["#4a7ba7", "#93c5fd"],
  diwali: ["#d4771a", "#f59e0b"],
};

export function applyTheme(theme: Theme) {
  const config = themes[theme];
  const root = document.documentElement;
  const v = config.cssVars;

  // These are the actual variables Tailwind v4 / shadcn reads
  root.style.setProperty("--primary", v.primary);
  root.style.setProperty("--primary-foreground", v.primaryForeground);
  root.style.setProperty("--secondary", v.secondary);
  root.style.setProperty("--secondary-foreground", v.secondaryForeground);
  root.style.setProperty("--accent", v.accent);
  root.style.setProperty("--accent-foreground", v.accentForeground);
  root.style.setProperty("--background", v.background);
  root.style.setProperty("--foreground", v.foreground);
  root.style.setProperty("--card", v.card);
  root.style.setProperty("--card-foreground", v.cardForeground);
  root.style.setProperty("--border", v.border);
  root.style.setProperty("--input", v.input);
  root.style.setProperty("--ring", v.ring);
  root.style.setProperty("--muted", v.muted);
  root.style.setProperty("--muted-foreground", v.mutedForeground);

  // Also set a data attribute so CSS can do per-theme overrides if needed
  root.setAttribute("data-theme", theme);

  localStorage.setItem("sartaj-theme", theme);
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("sartaj-theme");
  if (!saved) {
    localStorage.setItem("sartaj-theme", "default");
    return "default";
  }
  return saved as Theme;
}
