import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export type RequestTypeKey =
  | 'pending-assignment'
  | 'executor-unseen'
  | 'executor-no-response'
  | 'overdue'
  | 'evidence-stalled'
  | 'open-issue'
  | 'file-processing-failed'
  | 'file-flagged';

export interface RequestAction {
  label: string;
  variant: 'primary' | 'secondary' | 'neutral';
  key: string;
}

export interface NeedsActionRequest {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  beneficiaryName: string;
  beneficiaryEmail: string;
  status: string;
  statusTone: BadgeTone;
  requestType: RequestTypeKey;
  requestTypeLabel: string;
  lastUpdated: string;
  actions: RequestAction[];
}
