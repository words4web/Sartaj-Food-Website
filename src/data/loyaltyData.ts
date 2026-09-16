import { Truck, Coins, Package, Gift, Tag, Mail, LucideIcon } from "lucide-react";

export interface LoyaltyFaq {
  q: string;
  a: string;
}

export interface LoyaltyBenefit {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
}

export const LOYALTY_FAQS: LoyaltyFaq[] = [
  {
    q: "How do I qualify for the Sartaj Family Loyalty Program?",
    a: "Qualification is automatic! Once your cumulative delivered orders reach the threshold (e.g., ¥50,000), your account is instantly upgraded to Sartaj Family VIP status.",
  },
  {
    q: "When does my cumulative order spend update?",
    a: "Your total progress spend updates automatically as soon as an order status changes to 'DELIVERED'. Cancelled or pending orders do not count toward your loyalty qualification.",
  },
  {
    q: "How do the 4 Free Shipping Vouchers work?",
    a: "As a VIP member, you receive 4 Free Delivery Vouchers every year. During checkout, simply toggle the 'Apply Free Shipping' switch to waive shipping fees on your order.",
  },
  {
    q: "When do my Free Delivery Vouchers reset?",
    a: "Vouchers reset automatically at the start of every calendar year (January 1st) giving you 4 fresh free shipping vouchers for the new year.",
  },
  {
    q: "What is Double Points Weekend?",
    a: "When Double Points Weekend is active, VIP members earn 2X wallet coin rewards on all delivered orders placed during the weekend promotion.",
  },
];

export const LOYALTY_BENEFITS: LoyaltyBenefit[] = [
  {
    icon: Truck,
    badge: "SHIPPING",
    title: "4 Annual Free Shipping Vouchers",
    description: "Waive standard delivery fees 4 times every calendar year across Japan.",
  },
  {
    icon: Coins,
    badge: "POINTS",
    title: "Double Points Weekends",
    description: "Earn 2X coin rewards on weekend promotional campaigns.",
  },
  {
    icon: Package,
    badge: "WELCOME GIFT",
    title: "VIP Welcome Hamper",
    description:
      "One-time gift box of festive snacks included in your first order after qualifying.",
  },
  {
    icon: Gift,
    badge: "SAMPLES",
    title: "Free Product Samples",
    description: "Receive 3 free new product samples automatically with your grocery orders.",
  },
  {
    icon: Tag,
    badge: "OCCASIONS",
    title: "We Celebrate You",
    description:
      "Get an exclusive 10% OFF coupon on 1 order during your birthday month (valid for orders between ¥4,000 – ¥10,000).",
  },
  {
    icon: Mail,
    badge: "EARLY ACCESS",
    title: "Flash Sales & Early Bird Deals",
    description: "Advance notifications for major sale events and exclusive VIP festive discounts.",
  },
];
