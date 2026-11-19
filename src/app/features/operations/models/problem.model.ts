import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export interface ProblemRow extends Record<string, unknown> {
  id: string;
  problem: string;
  requestNumber: string;
  executor: string;
  stage: string;
  reportedAt: string;
  status: string;
  statusTone: BadgeTone;
  lastUpdated: string;
}
