export interface PageErrorProps {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export type ParticleType = "sakura" | "snowflake" | "diwali-light" | "none";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color?: string;
  rotation?: number;
  rotationSpeed?: number;
}

export interface ParticleCanvasProps {
  type: ParticleType;
  className?: string;
}

export interface ThemedImageProps {
  src?: string;
  alt?: string;
  emoji?: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackType?: "product" | "category" | "avatar";
  aspectRatio?: "square" | "video" | "auto";
}
