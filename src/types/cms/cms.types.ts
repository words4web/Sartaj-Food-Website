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
