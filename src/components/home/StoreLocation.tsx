"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoreLocation() {
  const t = useTranslations();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);

  // Theme-specific styles matching the site's rich aesthetics
  const themeStyles: Record<
    string,
    { border: string; glow: string; text: string; bg: string; accent: string }
  > = {
    sakura: {
      border: "border-pink-200/55 dark:border-pink-900/40",
      glow: "shadow-[0_12px_30px_-8px_rgba(249,168,212,0.15)]",
      text: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50/80 dark:bg-pink-950/20",
      accent: "from-pink-500 to-rose-400",
    },
    snowfall: {
      border: "border-blue-200/55 dark:border-blue-900/40",
      glow: "shadow-[0_12px_30px_-8px_rgba(147,197,253,0.15)]",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50/80 dark:bg-blue-950/20",
      accent: "from-blue-500 to-cyan-400",
    },
    diwali: {
      border: "border-amber-200/55 dark:border-amber-900/40",
      glow: "shadow-[0_12px_30px_-8px_rgba(245,158,11,0.15)]",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50/80 dark:bg-amber-950/20",
      accent: "from-amber-500 to-orange-400",
    },
    default: {
      border: "border-border/60",
      glow: "shadow-[0_12px_30px_-8px_rgba(36,59,135,0.08)]",
      text: "text-primary dark:text-primary-foreground",
      bg: "bg-primary/5 dark:bg-primary/10",
      accent: "from-primary to-accent",
    },
  };

  const style = themeStyles[currentTheme] || themeStyles.default;

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.9419409890693!2d135.42615757626922!3d34.80988497607738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f0ea898962a7%3A0xffad651a0bf33e66!2sSARTAJ%20FOODS!5e0!3m2!1sen!2sjp!4v1711200000000!5m2!1sen!2sjp";
  const mapExternalUrl =
    "https://www.google.com/maps/place/SARTAJ+FOODS/@34.8098806,135.4287325,17z/data=!3m1!4b1!4m6!3m5!1s0x6000f0ea898962a7:0xffad651a0bf33e66!8m2!3d34.8098806!4d135.4287325!16s%2Fg%2F11bwnbyl_8?hl=en&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="py-20 relative z-20 overflow-hidden border-b border-border/10 bg-background/30 backdrop-blur-[2px]">
      {/* Decorative gradient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Map & Card Flex Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Store Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-3xl bg-card border border-border/60 shadow-lg relative overflow-hidden group">
            {/* Hover decorative border accent */}
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${style.accent}`} />

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-extrabold text-foreground mb-1">Sartaj Foods Osaka</h3>
                <p className="text-xs text-muted-foreground font-semibold">
                  Main Store & Headquarters
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shrink-0`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {t("footer.addressLabel")}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed font-medium">
                      {t("footer.addressValue")}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shrink-0`}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("footer.hoursLabel")}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed font-medium">
                      {t("footer.hoursValue")}
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shrink-0`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("footer.callUsLabel")}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed font-medium">
                      {t("footer.callUsValue")}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shrink-0`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("footer.emailLabel")}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed font-medium">
                      {t("footer.emailValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-border/40">
              <a
                href={mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block"
              >
                <Button className="w-full flex items-center justify-center gap-2 group/btn cursor-pointer rounded-2xl py-6 font-bold shadow-md hover:shadow-xl transition-all">
                  <span>Get Directions</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Interactive Google Map iframe container */}
          <div
            className={`lg:col-span-8 rounded-3xl overflow-hidden border border-border/60 ${style.glow} min-h-[350px] lg:min-h-auto relative`}
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover dark:invert dark:opacity-85 dark:contrast-[95%]"
              title="Sartaj Foods Google Map Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
