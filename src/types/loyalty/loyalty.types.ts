export interface ILoyaltyStatus {
  isActive: boolean;
  cumulativeSpend: number;
  qualificationThreshold: number;
  spendNeeded: number;
  progressPercentage: number;
  freeDeliveriesRemaining: number;
  isDoublePointsWeekendActive: boolean;
  qualifiedAt: string | null;
}
