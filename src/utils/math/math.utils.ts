export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function calculateTax(amount: number, taxRate = 0.1): number {
  return Math.round(amount * taxRate);
}
