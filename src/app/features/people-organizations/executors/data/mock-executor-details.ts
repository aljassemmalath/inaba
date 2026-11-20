import { EXECUTORS_MOCK } from './mock-executors';
import { ExecutorDetails, ExecutorOrderRow } from '../models/executor-details.model';

const ORDER_HISTORY: ExecutorOrderRow[] = [
  {
    id: '4783287',
    requestNumber: '4783287',
    product: 'عمرة بالإنابة',
    assignmentResult: 'مقبول',
    assignmentTone: 'success',
    status: 'مكتمل',
    statusTone: 'success',
    assignmentDate: '12 سبتمبر 2026',
    completionDate: '15 سبتمبر 2026',
  },
  {
    id: '4783282',
    requestNumber: '4783282',
    product: 'حج مفرد',
    assignmentResult: 'مقبول',
    assignmentTone: 'success',
    status: 'قيد التنفيذ',
    statusTone: 'info',
    assignmentDate: '18 سبتمبر 2026',
    completionDate: '—',
  },
  {
    id: '4783276',
    requestNumber: '4783276',
    product: 'طواف بالإنابة',
    assignmentResult: 'مرفوض',
    assignmentTone: 'error',
    status: 'مُسند',
    statusTone: 'neutral',
    assignmentDate: '05 سبتمبر 2026',
    completionDate: '—',
  },
  {
    id: '4783268',
    requestNumber: '4783268',
    product: 'عمرة بالإنابة',
    assignmentResult: 'مقبول',
    assignmentTone: 'success',
    status: 'مكتمل',
    statusTone: 'success',
    assignmentDate: '28 أغسطس 2026',
    completionDate: '01 سبتمبر 2026',
  },
];

export function getExecutorDetails(id: string): ExecutorDetails {
  const base = EXECUTORS_MOCK.find((e) => e.id === id) ?? EXECUTORS_MOCK[0];
  const hasRequest = base.currentRequest && base.currentRequest !== '—';
  const reqNum = hasRequest ? base.currentRequest.replace(/^#/, '') : '';
  return {
    id: base.id,
    name: base.executor,
    supervisor: base.supervisor,
    phone: base.phone,
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
    performance: [
      { label: 'عدد الطلبات المنفذة', value: base.completed, iconSrc: 'assets/images/svg/Home-page/completed-requests.svg' },
      { label: 'متوسط مدة التنفيذ', value: '2.4 ساعة', iconSrc: 'assets/images/svg/Home-page/requests-in-progress.svg' },
      { label: 'طلب متأخر', value: 1, iconSrc: 'assets/images/svg/Problems/under%20review.svg' },
      { label: 'رفض الإسناد', value: 0, iconSrc: 'assets/images/svg/Buttons/unassign.svg' },
      { label: 'الخروج من الدوام', value: 2, iconSrc: 'assets/images/svg/Executers/off.svg' },
    ],
    orderHistory: ORDER_HISTORY,
  };
}
