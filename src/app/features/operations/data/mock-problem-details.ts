import { ProblemDetails } from '../models/problem-details.model';
import { PROBLEMS_MOCK } from './mock-problems';

export function getProblemDetails(id: string): ProblemDetails {
  const base = PROBLEMS_MOCK.find((p) => p.id === id) ?? PROBLEMS_MOCK[0];

  // Spec-specified example content (used as the canonical detail view for ISS-00128 / ازدحام)
  if (id === 'p1' || base.id === 'p1') {
    return {
      id: 'p1',
      title: 'ازدحام',
      status: 'مفتوحة',
      statusTone: 'error',
      issueNumber: 'ISS-00128',
      registeredAt: '7 أكتوبر 2026، 10:30 ص',
      type: 'ازدحام',
      source: 'تطبيق المنفذ',
      stage: 'الطواف',
      description: 'تعذر استكمال مرحلة الطواف بسبب عدم توفر دليل مطابق للمتطلبات المحددة.',
      attachmentName: 'evidence-10470.mp4',
      relatedRequest: {
        id: '10470',
        requestNumber: '10470',
        executor: 'سعد المالكي',
        service: 'عمرة بالإنابة',
        status: 'قيد التنفيذ',
        statusTone: 'info',
        currentStage: 'الطواف',
        beneficiaryName: 'فاطمة أحمد',
      },
    };
  }

  // Fallback derived from existing problem row (preserves actual data structure)
  return {
    id: base.id,
    title: base.problem,
    status: base.status,
    statusTone: base.statusTone,
    issueNumber: `ISS-${base.id.replace(/\D/g, '').padStart(5, '0') || '00000'}`,
    registeredAt: base.reportedAt,
    type: base.problem,
    source: 'تطبيق المنفذ',
    stage: base.stage,
    description: base.problem,
    attachmentName: `evidence-${base.requestNumber}.mp4`,
    relatedRequest: {
      id: base.requestNumber,
      requestNumber: base.requestNumber,
      executor: base.executor,
      service: 'عمرة بالإنابة',
      status: 'قيد التنفيذ',
      statusTone: 'info',
      currentStage: base.stage,
      beneficiaryName: '—',
    },
  };
}