export interface SettlementRow extends Record<string, unknown> {
  id: string;
  amount: string; // e.g. '+ ₪ 30', '- ₪ 50', '₪ 450'
  type: string;
}

export interface DueRow extends Record<string, unknown> {
  id: string;
  executor: string;
  productStage: string;
  baseAmount: string;
  netAdjustments: string;
  finalDue: string;
  completedOrders?: number;
  settlements?: SettlementRow[];
}
