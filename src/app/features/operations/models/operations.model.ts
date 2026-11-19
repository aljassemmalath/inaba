import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export type OperationTab = 'action' | 'requests' | 'issues';

export interface OperationRow {
  id: string;
  reference: string;
  title: string;
  entity: string;
  assignee: string;
  date: string;
  statusLabel: string;
  statusTone: BadgeTone;
  priorityLabel: string;
  priorityTone: BadgeTone;
}
