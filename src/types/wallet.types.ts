export interface IWalletBalance {
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface ITransaction {
  id: string;
  transactionId: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  description: string;
  balanceBefore: number;
  balanceAfter: number;
  orderId?: string;
  refundId?: string;
  createdAt: string;
}

export interface IWallet {
  balance: IWalletBalance;
  transactions: ITransaction[];
}

export interface IWalletState {
  wallet: IWallet | null;
  isLoading: boolean;
  error: string | null;
}

export interface WalletStatsCardsProps {
  balance: number;
  total: number;
  transactionsCount: number;
  isBalanceLoading: boolean;
  isTxLoading: boolean;
}

export interface WalletTransactionListProps {
  transactions: any[];
  isTxLoading: boolean;
}
