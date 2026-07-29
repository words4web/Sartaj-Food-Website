import * as React from "react";

export interface ICmsResponse {
  _id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  themeColor: "primary" | "accent" | "emerald" | "blue";
}
