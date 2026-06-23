export interface PageErrorProps {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export type ParticleType = "sakura" | "snowflake" | "diwali-light" | "none";

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
