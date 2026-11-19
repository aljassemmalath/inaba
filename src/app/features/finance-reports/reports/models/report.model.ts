import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

export interface ReportCard {
  key: string;
  title: string;
  description: string;
  category: string;
  categoryTone: BadgeTone;
}

export interface OrdersReportRow extends Record<string, unknown> {
  id: string;
  createdAt: string;
  source: string;
  currentExecutor: string;
  status: string;
  statusTone: BadgeTone;
  product: string;
  beneficiary: string;
  requestNumber: string;
}

export interface ProductsReportRow extends Record<string, unknown> {
  id: string;
  product: string;
  totalOrders: number;
  completedOrders: number;
  delayedOrders: number;
  totalSales: string;
  executorDues: string;
  profit: string;
  // extra details for modal (all available info)
  salePrice?: string;
  expectedDuration?: string;
  activeStatus?: string;
}

export interface ExecutorsReportRow extends Record<string, unknown> {
  id: string;
  executor: string;
  dutyStatus: string;
  dutyTone: BadgeTone;
  completedOrders: number;
  delayedOrders: number;
  avgExecutionTime: string;
  assignmentRejections: number;
  netDues: string;
}

export interface SupervisorsReportRow extends Record<string, unknown> {
  id: string;
  supervisor: string;
  linkedExecutors: number;
  completed: number;
  delayed: number;
  avgExecutionTime: string;
}

export interface AgenciesReportRow extends Record<string, unknown> {
  id: string;
  agency: string;
  totalOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  delayedOrders: number;
  status: string;
  statusTone: BadgeTone;
}

export interface EntitlementsReportRow extends Record<string, unknown> {
  id: string;
  executor: string;
  completedOrders: number;
  orderDues: string;
  netAdjustments: string;
  finalTotal: string;
}

export interface ProfitsReportRow extends Record<string, unknown> {
  id: string;
  product: string;
  completedOrders: number;
  totalSales: string;
  executorDues: string;
  profit: string;
}