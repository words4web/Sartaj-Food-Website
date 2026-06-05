"use client";

import { Typography } from "@/components/common";
import { FileText, ShieldAlert, Scale, HelpCircle } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: <Scale className="h-6 w-6 text-primary" />,
      title: "1. Acceptance of Terms",
      content:
        "By accessing, browsing, or using the Sartaj Foods website and ordering systems, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please refrain from using our systems.",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "2. Accounts & Security",
      content:
        "To place orders, you may need to register an account via email and OTP verification. You are entirely responsible for maintaining the confidentiality of your session and account details, and all activities that occur under your account.",
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-primary" />,
      title: "3. Products, Pricing & Delivery",
      content:
        "We make every effort to display accurate product details, pricing, and availability. Prices are subject to change without notice. Delivery times are estimates and may vary based on location and logistics partners in Japan.",
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      title: "4. Limitation of Liability",
      content:
        "Sartaj Foods shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our website, services, or purchased products.",
    },
  ];

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
            Legal Agreement
          </Typography>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Terms of Service
          </Typography>
          <Typography variant="muted" className="text-muted-foreground text-base max-w-xl mx-auto">
            Please read these terms carefully before accessing or using the services provided by
            Sartaj Foods.
          </Typography>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Card Overview */}
          <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 md:p-8">
            <Typography variant="h4" className="text-lg font-bold mb-3 text-foreground">
              Last Updated: June 5, 2026
            </Typography>
            <Typography variant="body" className="text-muted-foreground text-sm leading-relaxed">
              These terms govern the use of the website, mobile applications, and online portals
              operated by Sartaj Foods. We reserve the right to modify these terms at any time. Your
              continued use of the systems following any changes signifies your acceptance of the
              updated terms.
            </Typography>
          </div>

          {/* Section Items */}
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-card border border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit">{sec.icon}</div>
                  <Typography variant="h3" className="text-lg font-bold text-foreground">
                    {sec.title}
                  </Typography>
                  <Typography
                    variant="body"
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {sec.content}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="text-center pt-8 border-t border-border/40">
            <Typography variant="body" className="text-sm text-muted-foreground">
              Have questions about our Terms of Service? Please reach out to our legal department.
            </Typography>
            <Typography variant="small" className="text-sm font-semibold text-primary block mt-2">
              support@sartajfoods.com
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
