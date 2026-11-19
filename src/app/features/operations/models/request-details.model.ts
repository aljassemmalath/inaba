import { BadgeTone } from '../../../shared/components/status-badge/status-badge';
import { StepItem } from '../../../shared/components/progress-stepper/progress-stepper.component';
import { TimelineEvent } from '../../../shared/components/timeline/timeline.component';

export interface StageRow extends Record<string, unknown> {
  id: string;
  stage: string;
  evidenceType: string;
  status: string;
  statusTone: BadgeTone;
  capturedAt: string;
}

export interface AssignmentRow extends Record<string, unknown> {
  id: string;
  executor: string;
  assignedAt: string;
  notification: string;
  response: string;
  reason: string;
  status: string;
  statusTone: BadgeTone;
}

export interface InternalNote {
  id: string;
  author: string;
  dateTime: string;
  content: string;
}

export interface RequestDetails {
  id: string;
  requestNumber: string;
  serviceName: string;
  imageLabel: string;
  status: string;
  statusTone: BadgeTone;
  indicators: string[];
  createdAt: string;
  source: string;
  beneficiaryName: string;
  beneficiaryStatus: string;
  expectedDuration: string;
  specialRequest?: string;
  executorName: string;
  supervisorName: string;
  executionStart: string;
  executorEntitlement: string;
  sellingPrice: string;
  netProfit: string;
  paymentStatus: string;
  paymentStatusTone: BadgeTone;
  steps: StepItem[];
  stages: StageRow[];
  timeline: TimelineEvent[];
  assignments: AssignmentRow[];
  notes: InternalNote[];
}
