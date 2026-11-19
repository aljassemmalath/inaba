import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

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
}