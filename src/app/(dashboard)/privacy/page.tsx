"use client";

import { Typography } from "@/components/common";
import { useLocale } from "next-intl";
import { ShieldCheck, Info, Share2, KeyRound, RefreshCw, Mail } from "lucide-react";
import privacyData from "@/data/privacy-policy.json";

export default function PrivacyPolicyPage() {
  const locale = useLocale() as "en" | "ja" | "hi" | "bn" | "ne";
  const policy = privacyData[locale] || privacyData.en;

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <ShieldCheck className="w-6 h-6" />;
      case 2:
        return <Info className="w-6 h-6" />;
      case 3:
        return <Share2 className="w-6 h-6" />;
      case 4:
        return <KeyRound className="w-6 h-6" />;
      case 5:
        return <RefreshCw className="w-6 h-6" />;
      default:
        return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />

      <div className="relative border-b border-border/40 py-16 md:py-24 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <Typography
            variant="overline"
            className="text-primary font-bold text-sm tracking-wider uppercase mb-3 block"
          >
            {policy?.trustAndSecurity}
          </Typography>
          <Typography
            variant="h1"
            className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6"
          >
            {policy?.title}
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            {policy?.description}
          </Typography>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="space-y-12">
          <div className="bg-card border border-border/80 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] rounded-3xl p-5 sm:p-10 md:p-16 space-y-10 relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              {policy?.lastUpdatedLabel}: 2026/07/17
            </div>

            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              <p
                className="text-foreground font-medium text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: policy?.scope1 || "" }}
              />
              <p>{policy?.scope2}</p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-10">
              {policy?.sections?.map((section) => (
                <div key={section?.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {getIcon(section?.id)}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{section?.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {section?.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-3xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <Typography
              variant="body"
              className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
            >
              {policy?.footerText}
            </Typography>
            <Typography
              variant="small"
              className="text-lg font-bold text-primary block hover:underline cursor-pointer transition-all duration-200"
            >
              <a href="mailto:info@sartajfoods.jp">info@sartajfoods.jp</a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
