import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

export interface ExecutorPerformanceItem {
  label: string;
  value: string | number;
  iconSrc: string;
}

export interface ExecutorOrderRow extends Record<string, unknown> {
  id: string;
  requestNumber: string;
  product: string;
  assignmentResult: string;
  assignmentTone: BadgeTone;
  status: string;
  statusTone: BadgeTone;
  assignmentDate: string;
  completionDate: string;
}

export interface ExecutorDetails {
  id: string;
  name: string;
  supervisor: string;
  phone: string;
  dutyStatus: string;
  dutyTone: BadgeTone;
  addedAt: string;
  currentRequest: {
    id: string;
    requestNumber: string;
    completedStages: number;
    totalStages: number;
  } | null;
  performance: ExecutorPerformanceItem[];
  orderHistory: ExecutorOrderRow[];
}
