import { BadgeTone } from '../../../shared/components/status-badge/status-badge';

export interface ProblemDetails {
  id: string;
  title: string;
  status: string;
  statusTone: BadgeTone;
  issueNumber: string;
  registeredAt: string;
  type: string;
  source: string;
  stage: string;
  description: string;
  attachmentName: string;
  relatedRequest: {
    id: string;
    requestNumber: string;
    executor: string;
    service: string;
    status: string;
    statusTone: BadgeTone;
    currentStage: string;
    beneficiaryName: string;
  };
}