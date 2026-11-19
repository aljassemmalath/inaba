import { BadgeTone } from '../../../../shared/components/status-badge/status-badge';

export interface AdminAccountRow extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: string;
  statusTone: BadgeTone;
}
