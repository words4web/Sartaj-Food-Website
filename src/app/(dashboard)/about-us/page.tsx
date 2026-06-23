"use client";

import { Typography } from "@/components/common";
import { useGetCmsPage } from "@/services/cms/cms.hooks";
import { CommonLoader } from "@/components/ui/common-loader";
import { CommonError } from "@/components/ui/common-error";
import { useTranslations } from "next-intl";

export default function AboutUsPage() {
  const t = useTranslations();
  const { data: pageData, isLoading, error, refetch } = useGetCmsPage("about-us");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <CommonLoader fullScreen={false} message={t("common.loading")} />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-card">
        <CommonError message="Could not load About Us content." onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-card text-foreground pb-16">
      {/* Header Banner */}
      <div className="bg-muted/40 border-b border-border/80 py-16 text-center relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Typography
            variant="overline"
            className="text-primary font-bold text-sm tracking-wider uppercase mb-3 block"
          >
            Our Story
          </Typography>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            {pageData?.title}
          </Typography>
          <Typography variant="muted" className="text-muted-foreground text-base max-w-xl mx-auto">
            Authentic South Asian flavors imported directly to Japan for uncompromising culinary
            excellence.
          </Typography>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <Typography variant="small" className="text-muted-foreground text-xs block mb-4">
              Last Updated: {new Date(pageData?.updatedAt)?.toLocaleDateString()}
            </Typography>
            <div
              className="prose dark:prose-invert max-w-none text-foreground text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: pageData?.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
