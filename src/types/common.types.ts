export interface PageErrorProps {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export type ParticleType = "sakura" | "snowflake" | "diwali-light" | "independence" | "none";

export interface ParticleCanvasProps {
  type: ParticleType;
  className?: string;
  density?: number;
}

export interface ThemedImageProps {
  src?: string;
  alt?: string;
  emoji?: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackType?: "product" | "category" | "avatar" | "manufacturer";
  aspectRatio?: "square" | "video" | "auto";
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface CountdownTimerProps {
  targetDate: string; // ISO format or valid date string (e.g., '2026-08-10T00:00:00')
  title?: string;
  subTitle?: string;
}
