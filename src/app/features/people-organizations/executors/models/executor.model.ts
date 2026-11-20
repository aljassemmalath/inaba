import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

export interface ExecutorRow extends Record<string, unknown> {
  id: string;
  executor: string;
  phone: string;
  supervisor: string;
  dutyStatus: string;
  dutyTone: BadgeTone;
  currentRequest: string;
  completed: number;
  dues: string;
}
