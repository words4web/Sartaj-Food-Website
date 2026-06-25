"use client";

import { useMemo } from "react";
import { Typography } from "@/components/common";
import { useGetCmsPage } from "@/services/cms/cms.hooks";
import { CommonLoader } from "@/components/ui/common-loader";
import { CommonError } from "@/components/ui/common-error";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, PhoneCall } from "lucide-react";
import { FAQItem } from "@/types/cms/cms.types";

export default function FAQPage() {
  const t = useTranslations();
  const { data: pageData, isLoading, error, refetch } = useGetCmsPage("faq");

  // Parse HTML content from CMS to extract structured Q&A
  const faqs = useMemo<FAQItem[]>(() => {
    if (!pageData?.content) return [];

    // Clean &nbsp; first
    const cleanHtml = pageData?.content?.replace(/&nbsp;/g, " ")?.replace(/\u00a0/g, " ");

    if (typeof window === "undefined") {
      // Server-side fallback: regex parsing
      const matches: FAQItem[] = [];
      const regex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gi;
      let match;
      while ((match = regex.exec(cleanHtml)) !== null) {
        matches.push({
          question: match[1]?.replace(/<[^>]*>/g, ""),
          answer: match[2],
        });
      }
      return matches;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanHtml, "text/html");
      const h3s = doc.querySelectorAll("h3");
      const parsed: FAQItem[] = [];

      h3s?.forEach((h3) => {
        const question = h3?.textContent?.trim() || "";
        let nextSib = h3?.nextElementSibling;
        let answerHtml = "";

        while (nextSib && nextSib.tagName !== "H3") {
          answerHtml += nextSib?.outerHTML;
          nextSib = nextSib.nextElementSibling;
        }

        if (question) {
          parsed.push({
            question,
            answer: answerHtml || "<p>No details provided.</p>",
          });
        }
      });

      return parsed;
    } catch (e) {
      console.error("Failed to parse FAQ HTML content:", e);
      return [];
    }
  }, [pageData?.content]);

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
        <CommonError message="Could not load FAQ content." onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-card via-background to-muted/20 text-foreground pb-20">
      {/* Header Banner */}
      <div className="relative bg-muted/30 border-b border-border/60 py-10 md:py-20 text-center overflow-hidden">
        {/* Animated Glow Pools */}
        <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse pointer-events-none duration-5000" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-pulse pointer-events-none duration-5000" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <Typography
            variant="h1"
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            {pageData?.title}
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto"
          >
            Got questions? We've got answers. Browse our frequently asked questions.
          </Typography>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {faqs?.length > 0 ? (
          <div className="bg-card border border-border/60 rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-muted/10 backdrop-blur-sm transition-all duration-300">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs?.map((faq, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border border-border/60 rounded-xl px-4 sm:px-5 py-2 bg-muted/10 hover:bg-muted/20 hover:border-primary/30 transition-all duration-200"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground/90 hover:text-primary transition-colors py-3">
                    {faq?.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pt-2 pb-4">
                    <div
                      className="prose dark:prose-invert max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: faq?.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/10 border border-dashed border-border rounded-3xl">
            <MessageSquare className="size-12 text-muted-foreground/60 mx-auto mb-4" />
            <Typography variant="body" className="text-muted-foreground">
              No FAQs available.
            </Typography>
          </div>
        )}

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <a
            href="mailto:info@sartajfoods.jp"
            className="flex items-center gap-4 p-6 bg-card border border-border/60 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <MessageSquare className="size-6" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Email Support</h4>
              <p className="text-xs text-muted-foreground">info@sartajfoods.jp</p>
            </div>
          </a>

          <a
            href="tel:0727511975"
            className="flex items-center gap-4 p-6 bg-card border border-border/60 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <PhoneCall className="size-6" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Call Us Directly</h4>
              <p className="text-xs text-muted-foreground">072-751-1975</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
