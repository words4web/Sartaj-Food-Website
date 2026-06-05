"use client";

import { Typography } from "@/components/common";
import { Eye, ShieldCheck, Database, Key } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Information We Collect",
      content:
        "We collect personal information that you provide to us, such as your full name, email address, mobile number, delivery address, and billing information when registering or placing orders.",
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "How We Use Information",
      content:
        "Your information is used to process orders, verify authentication codes (OTP), improve our customer services, deliver your shipments, and send promotional offers (if consented to).",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Data Security & Storage",
      content:
        "We implement rigorous technical security measures to protect your sensitive data. Personal information is stored securely and is only accessible by authorized personnel.",
    },
    {
      icon: <Key className="h-6 w-6 text-primary" />,
      title: "Cookies & Analytics",
      content:
        "We use cookies and similar tracking technologies to enhance user experiences, remember preferences, and analyze platform traffic to optimize our services in Japan.",
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
            Data Protection
          </Typography>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Privacy Policy
          </Typography>
          <Typography variant="muted" className="text-muted-foreground text-base max-w-xl mx-auto">
            Your privacy is important to us. Learn how Sartaj Foods collects, protects, and handles
            your information.
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
              At Sartaj Foods, we are committed to safeguarding your privacy. This policy explains
              our digital practices and outlines the choices you can make regarding the way your
              personal information is stored and utilized across our platforms.
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
              Have questions or requests regarding your personal data? Feel free to contact our
              privacy team.
            </Typography>
            <Typography variant="small" className="text-sm font-semibold text-primary block mt-2">
              privacy@sartajfoods.com
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
