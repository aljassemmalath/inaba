import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export interface RequestListRow extends Record<string, unknown> {
  id: string;
  requestNumber: string;
  beneficiary: string;
  customerName: string;
  product: string;
  source: string;
  /** Agency name shown as a tertiary sub-label when source is وكالة. */
  sourceDetail?: string;
  executor: string;
  status: string;
  statusTone: BadgeTone;
  /** Display indicators for the مؤشرات column. Empty array means show "-". */
  indicators: string[];
  lastExecution: string;
  requestDate: string;
}
