export interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    date: "May 28, 2024",
    status: "Delivered",
    total: "¥2,449.99",
    items: 5,
  },
  {
    id: "ORD-002",
    date: "May 15, 2024",
    status: "Delivered",
    total: "¥899.99",
    items: 3,
  },
];
