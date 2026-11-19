export interface AuditRow extends Record<string, unknown> {
  id: string;
  event: string;
  actor: string;
  entity: string;
  time: string;
}
