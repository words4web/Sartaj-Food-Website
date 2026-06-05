import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "lead"
  | "body"
  | "muted"
  | "small"
  | "label"
  | "caption"
  | "overline";

const variantStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-bold tracking-tight text-foreground lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-bold tracking-tight text-foreground",
  h3: "scroll-m-20 text-2xl font-bold tracking-tight text-foreground",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
  h5: "text-lg font-semibold text-foreground",
  h6: "text-base font-semibold text-foreground",
  lead: "text-lg text-muted-foreground leading-relaxed",
  body: "text-base text-foreground leading-relaxed",
  muted: "text-sm text-muted-foreground",
  small: "text-sm font-medium text-foreground",
  label: "text-sm font-medium text-foreground",
  caption: "text-xs text-muted-foreground",
  overline: "text-xs font-semibold uppercase tracking-widest text-primary",
};

const variantElements: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  muted: "p",
  small: "small",
  label: "span",
  caption: "span",
  overline: "span",
};

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /** Override the rendered HTML element */
  as?: ElementType;
}

export function Typography({
  variant = "body",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = as ?? variantElements[variant];
  return (
    <Tag className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
