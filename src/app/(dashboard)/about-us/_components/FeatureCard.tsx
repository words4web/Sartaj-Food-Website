import { FeatureCardProps } from "@/types/cms/cms.types";

export function FeatureCard({ title, description, icon, themeColor }: FeatureCardProps) {
  const styles = {
    primary: {
      bg: "bg-primary/5 dark:bg-primary/10 border-primary/20 hover:border-primary/40",
      iconBg: "bg-primary/10 text-primary",
      glow: "bg-primary/5",
    },
    accent: {
      bg: "bg-accent/5 dark:bg-accent/10 border-accent/20 hover:border-accent/40",
      iconBg: "bg-accent/10 text-accent",
      glow: "bg-accent/5",
    },
    emerald: {
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "bg-emerald-500/5",
    },
    blue: {
      bg: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      glow: "bg-blue-500/5",
    },
  };

  const style = styles[themeColor];

  return (
    <div
      className={`border rounded-3xl p-5 relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group ${style.bg}`}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-xl pointer-events-none ${style.glow}`}
      />
      <div className="flex flex-col gap-4 items-start">
        <div
          className={`p-2 rounded-xl shrink-0 transition-transform group-hover:scale-105 ${style.iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-foreground text-base leading-snug">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
