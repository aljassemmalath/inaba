export interface SupervisorRow extends Record<string, unknown> {
  id: string;
  supervisor: string;
  mobile: string;
  executorsCount: number;
}
