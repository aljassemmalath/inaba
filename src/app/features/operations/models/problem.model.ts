import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export interface ProblemRow extends Record<string, unknown> {
  id: string;
  problem: string;
  problemDetail: string;
  problemIcon: string;
  requestNumber: string;
  executor: string;
  stage: string;
  reportedAt: string;
  reportedAtDate: string;
  reportedAtTime: string;
  status: string;
  statusTone: BadgeTone;
  lastUpdated: string;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
}
