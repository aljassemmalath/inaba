import { EXECUTORS_MOCK } from './mock-executors';
import { ExecutorDetails } from '../models/executor-details.model';

export function getExecutorDetails(id: string): ExecutorDetails {
  const base = EXECUTORS_MOCK.find((e) => e.id === id) ?? EXECUTORS_MOCK[0];
  const hasRequest = base.currentRequest && base.currentRequest !== '—';
  const reqNum = hasRequest ? base.currentRequest.replace(/^#/, '') : '';
  return {
    id: base.id,
    name: base.executor,
    supervisor: base.supervisor,
    phone: '05xxxxxxxx',
    dutyStatus: base.dutyStatus,
    dutyTone: base.dutyTone,
    addedAt: '2025/06/10',
    currentRequest: hasRequest
      ? {
          id: reqNum,
          requestNumber: reqNum,
          completedStages: 2,
          totalStages: 4,
        }
      : null,
  };
}