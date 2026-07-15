export type Theme =
  | "default"
  | "sakura"
  | "snowfall"
  | "diwali"
  | "emerald"
  | "midnight"
  | "sunset"
  | "lavender"
  | "cyberpunk"
  | "forest"
  | "monochrome"
  | "royal"
  | "crimson"
  | "nordic"
  | "terracotta"
  | "peachy";

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

  emerald: {
    name: "emerald",
    label: "Emerald Garden",
    description: "Rich forest green vibes with fresh lime accents",
    cssVars: {
      primary: "oklch(0.45 0.16 150)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.96 0.03 150)",
      secondaryForeground: "oklch(0.2 0.08 150)",
      accent: "oklch(0.65 0.18 110)",
      accentForeground: "oklch(0.15 0.08 110)",
      background: "oklch(0.99 0.01 150)",
      foreground: "oklch(0.15 0.05 150)",
      card: "oklch(1 0.005 150)",
      cardForeground: "oklch(0.15 0.05 150)",
      border: "oklch(0.9 0.04 150)",
      input: "oklch(0.9 0.04 150)",
      ring: "oklch(0.45 0.16 150)",
      muted: "oklch(0.95 0.04 150)",
      mutedForeground: "oklch(0.5 0.06 150)",
    },
  },

  midnight: {
    name: "midnight",
    label: "Midnight Ocean",
    description: "Vibrant deep oceanic blue with cyan accents",
    cssVars: {
      primary: "oklch(0.35 0.14 245)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.96 0.02 245)",
      secondaryForeground: "oklch(0.15 0.06 245)",
      accent: "oklch(0.55 0.18 200)",
      accentForeground: "oklch(0.985 0 0)",
      background: "oklch(0.995 0.005 245)",
      foreground: "oklch(0.15 0.03 245)",
      card: "oklch(1 0.002 245)",
      cardForeground: "oklch(0.15 0.03 245)",
      border: "oklch(0.92 0.01 245)",
      input: "oklch(0.92 0.01 245)",
      ring: "oklch(0.35 0.14 245)",
      muted: "oklch(0.96 0.02 245)",
      mutedForeground: "oklch(0.5 0.03 245)",
    },
  },

  sunset: {
    name: "sunset",
    label: "Golden Sunset",
    description: "Vibrant tangerine and amber glow",
    cssVars: {
      primary: "oklch(0.6 0.22 35)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.03 40)",
      secondaryForeground: "oklch(0.25 0.08 40)",
      accent: "oklch(0.82 0.18 80)",
      accentForeground: "oklch(0.2 0.08 50)",
      background: "oklch(0.99 0.01 45)",
      foreground: "oklch(0.16 0.05 40)",
      card: "oklch(1 0.005 45)",
      cardForeground: "oklch(0.16 0.05 40)",
      border: "oklch(0.92 0.04 45)",
      input: "oklch(0.92 0.04 45)",
      ring: "oklch(0.6 0.22 35)",
      muted: "oklch(0.97 0.03 40)",
      mutedForeground: "oklch(0.52 0.07 45)",
    },
  },

  lavender: {
    name: "lavender",
    label: "Lavender Dream",
    description: "Serene pastel lilac with vibrant orchid pops",
    cssVars: {
      primary: "oklch(0.55 0.18 290)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.96 0.02 290)",
      secondaryForeground: "oklch(0.25 0.08 290)",
      accent: "oklch(0.7 0.22 330)",
      accentForeground: "oklch(0.98 0 0)",
      background: "oklch(0.99 0.01 290)",
      foreground: "oklch(0.18 0.04 290)",
      card: "oklch(1 0.005 290)",
      cardForeground: "oklch(0.18 0.04 290)",
      border: "oklch(0.92 0.04 290)",
      input: "oklch(0.92 0.04 290)",
      ring: "oklch(0.55 0.18 290)",
      muted: "oklch(0.96 0.02 290)",
      mutedForeground: "oklch(0.55 0.06 290)",
    },
  },

  cyberpunk: {
    name: "cyberpunk",
    label: "Cyber Matrix",
    description: "Vibrant neon magenta with bright cyber cyan accents",
    cssVars: {
      primary: "oklch(0.55 0.22 320)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.01 320)",
      secondaryForeground: "oklch(0.15 0.05 320)",
      accent: "oklch(0.6 0.2 195)",
      accentForeground: "oklch(0.98 0 0)",
      background: "oklch(0.995 0.005 320)",
      foreground: "oklch(0.15 0.05 320)",
      card: "oklch(1 0.002 320)",
      cardForeground: "oklch(0.15 0.05 320)",
      border: "oklch(0.92 0.02 320)",
      input: "oklch(0.92 0.02 320)",
      ring: "oklch(0.55 0.22 320)",
      muted: "oklch(0.97 0.01 320)",
      mutedForeground: "oklch(0.5 0.02 320)",
    },
  },

  forest: {
    name: "forest",
    label: "Autumn Maple",
    description: "Deep rustic forest tones with maple orange accents",
    cssVars: {
      primary: "oklch(0.42 0.16 30)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.03 60)",
      secondaryForeground: "oklch(0.2 0.05 60)",
      accent: "oklch(0.48 0.15 110)",
      accentForeground: "oklch(0.98 0 0)",
      background: "oklch(0.985 0.02 85)",
      foreground: "oklch(0.14 0.04 120)",
      card: "oklch(1 0.005 85)",
      cardForeground: "oklch(0.14 0.04 120)",
      border: "oklch(0.89 0.04 120)",
      input: "oklch(0.89 0.04 120)",
      ring: "oklch(0.42 0.16 30)",
      muted: "oklch(0.97 0.03 60)",
      mutedForeground: "oklch(0.48 0.05 120)",
    },
  },

  monochrome: {
    name: "monochrome",
    label: "Sleek Slate",
    description: "Modern professional cool slate gray",
    cssVars: {
      primary: "oklch(0.25 0.03 240)",
      primaryForeground: "oklch(0.99 0 0)",
      secondary: "oklch(0.95 0.01 240)",
      secondaryForeground: "oklch(0.2 0 0)",
      accent: "oklch(0.45 0.1 240)",
      accentForeground: "oklch(0.99 0 0)",
      background: "oklch(0.99 0 0)",
      foreground: "oklch(0.15 0 0)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.15 0 0)",
      border: "oklch(0.91 0 0)",
      input: "oklch(0.91 0 0)",
      ring: "oklch(0.25 0.03 240)",
      muted: "oklch(0.95 0.01 240)",
      mutedForeground: "oklch(0.5 0 0)",
    },
  },

  royal: {
    name: "royal",
    label: "Royal Velvet",
    description: "Deep regal violet with bright gold highlights",
    cssVars: {
      primary: "oklch(0.42 0.2 300)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.96 0.03 300)",
      secondaryForeground: "oklch(0.2 0.08 300)",
      accent: "oklch(0.72 0.18 70)",
      accentForeground: "oklch(0.18 0.05 70)",
      background: "oklch(0.99 0.01 300)",
      foreground: "oklch(0.15 0.05 300)",
      card: "oklch(1 0.005 300)",
      cardForeground: "oklch(0.15 0.05 300)",
      border: "oklch(0.9 0.04 300)",
      input: "oklch(0.9 0.04 300)",
      ring: "oklch(0.42 0.2 300)",
      muted: "oklch(0.96 0.03 300)",
      mutedForeground: "oklch(0.5 0.06 300)",
    },
  },

  crimson: {
    name: "crimson",
    label: "Crimson Velvet",
    description: "Velvety rose crimson with sweet pink accents",
    cssVars: {
      primary: "oklch(0.52 0.22 18)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.02 20)",
      secondaryForeground: "oklch(0.2 0.08 18)",
      accent: "oklch(0.85 0.12 355)",
      accentForeground: "oklch(0.2 0.05 18)",
      background: "oklch(0.99 0.01 20)",
      foreground: "oklch(0.16 0.05 18)",
      card: "oklch(1 0.005 20)",
      cardForeground: "oklch(0.16 0.05 18)",
      border: "oklch(0.91 0.03 20)",
      input: "oklch(0.91 0.03 20)",
      ring: "oklch(0.52 0.22 18)",
      muted: "oklch(0.97 0.02 20)",
      mutedForeground: "oklch(0.52 0.06 18)",
    },
  },

  nordic: {
    name: "nordic",
    label: "Nordic Frost",
    description: "Clean polar sky blue with refreshing cyan accents",
    cssVars: {
      primary: "oklch(0.48 0.16 230)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.95 0.03 220)",
      secondaryForeground: "oklch(0.2 0.05 230)",
      accent: "oklch(0.68 0.18 190)",
      accentForeground: "oklch(0.1 0.05 190)",
      background: "oklch(0.99 0.01 220)",
      foreground: "oklch(0.15 0.03 220)",
      card: "oklch(1 0.005 220)",
      cardForeground: "oklch(0.15 0.03 220)",
      border: "oklch(0.92 0.02 220)",
      input: "oklch(0.92 0.02 220)",
      ring: "oklch(0.48 0.16 230)",
      muted: "oklch(0.95 0.03 220)",
      mutedForeground: "oklch(0.5 0.03 220)",
    },
  },

  terracotta: {
    name: "terracotta",
    label: "Warm Clay",
    description: "Earthy Tuscan clay terracotta with rich sand accents",
    cssVars: {
      primary: "oklch(0.55 0.16 52)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.03 65)",
      secondaryForeground: "oklch(0.2 0.06 52)",
      accent: "oklch(0.75 0.14 85)",
      accentForeground: "oklch(0.2 0.05 85)",
      background: "oklch(0.99 0.01 65)",
      foreground: "oklch(0.16 0.05 52)",
      card: "oklch(1 0.005 65)",
      cardForeground: "oklch(0.16 0.05 52)",
      border: "oklch(0.92 0.03 65)",
      input: "oklch(0.92 0.03 65)",
      ring: "oklch(0.55 0.16 52)",
      muted: "oklch(0.97 0.03 65)",
      mutedForeground: "oklch(0.52 0.05 52)",
    },
  },

  peachy: {
    name: "peachy",
    label: "Sweet Peach",
    description: "Coral peach tones with refreshing mint accents",
    cssVars: {
      primary: "oklch(0.65 0.14 45)",
      primaryForeground: "oklch(0.98 0 0)",
      secondary: "oklch(0.97 0.03 50)",
      secondaryForeground: "oklch(0.2 0.06 45)",
      accent: "oklch(0.78 0.12 165)",
      accentForeground: "oklch(0.15 0.05 165)",
      background: "oklch(0.99 0.01 50)",
      foreground: "oklch(0.16 0.05 45)",
      card: "oklch(1 0.005 50)",
      cardForeground: "oklch(0.16 0.05 45)",
      border: "oklch(0.93 0.02 50)",
      input: "oklch(0.93 0.02 50)",
      ring: "oklch(0.65 0.14 45)",
      muted: "oklch(0.97 0.03 50)",
      mutedForeground: "oklch(0.52 0.05 45)",
    },
  },
};

/** Colors shown in the theme picker swatches (hex for canvas gradients) */
export const themeSwatchColors: Record<Theme, [string, string]> = {
  default: ["#243b87", "#006e1c"],
  sakura: ["#d4507a", "#f9a8c9"],
  snowfall: ["#4a7ba7", "#93c5fd"],
  diwali: ["#d4771a", "#f59e0b"],
  emerald: ["#0f5132", "#a3e635"],
  midnight: ["#0f172a", "#38bdf8"],
  sunset: ["#ea580c", "#fbbf24"],
  lavender: ["#7c3aed", "#e879f9"],
  cyberpunk: ["#111827", "#84cc16"],
  forest: ["#7f1d1d", "#65a30d"],
  monochrome: ["#334155", "#cbd5e1"],
  royal: ["#581c87", "#eab308"],
  crimson: ["#be123c", "#fda4af"],
  nordic: ["#1d4ed8", "#38bdf8"],
  terracotta: ["#9a3412", "#fed7aa"],
  peachy: ["#f97316", "#86efac"],
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
