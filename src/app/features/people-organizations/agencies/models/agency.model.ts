import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

export interface AgencyRow extends Record<string, unknown> {
  id: string;
  agency: string;
  email: string;
  requestsCount: number;
  inProgressCount: number;
  completedCount?: number;
  status: string;
  statusTone: BadgeTone;
  code?: string;
  createdAt?: string;
  source?: string;
  mobile?: string;
}
