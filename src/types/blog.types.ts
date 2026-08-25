export interface BlogContentBlock {
  type: "paragraph" | "heading" | "image";
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogCta {
  label: string;
  href: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  author: string;
  date: string;
  headerImage: string;
  content: BlogContentBlock[];
  faqs: FAQItem[];
  citations?: string[];
  cta?: BlogCta;
}
