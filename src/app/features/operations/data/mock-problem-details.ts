import { TimelineEvent } from '../../../shared/components/timeline/timeline.component';
import { ProblemDetails } from '../models/problem-details.model';
import { PROBLEMS_MOCK } from './mock-problems';

const RESOLUTION_NOTE =
  'مثال على نص ملاحظة الحل مثال على نص ملاحظة الحل مثال على نص ملاحظة الحل مثال على نص ملاحظة الحل مثال على نص ملاحظة الحل مثال على نص ملاحظة الحل';

function buildActionLog(reportedAt: string, description: string, executor: string): TimelineEvent[] {
  return [
    {
      title: 'حل المشكلة',
      dateTime: reportedAt,
      description: 'تم حل المشكلة وإضافة ملاحظة الحل.',
      actor: 'مدير النظام (أحمد)',
      role: 'مدير النظام',
    },
    {
      title: 'بدء المتابعة',
      dateTime: reportedAt,
      description: 'تم بدء متابعة المشكلة وتحديد الإجراءات اللازمة لمعالجتها.',
      actor: 'مدير النظام (أحمد)',
      role: 'مدير النظام',
    },
    {
      title: 'بلاغ المشكلة',
      dateTime: reportedAt,
      description,
      actor: executor,
      role: 'منفذ',
    },
  ];
}

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
      actionLog: buildActionLog('7 أكتوبر 2026، 10:30 ص', 'تعذر استكمال مرحلة الطواف بسبب عدم توفر دليل مطابق للمتطلبات المحددة.', 'سعد المالكي'),
      resolutionNote: { text: RESOLUTION_NOTE, author: 'مدير النظام (أحمد)' },
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
    description: base.problemDetail,
    attachmentName: `evidence-${base.requestNumber}.mp4`,
    actionLog: buildActionLog(base.reportedAt, base.problemDetail, base.executor),
    resolutionNote: { text: RESOLUTION_NOTE, author: 'مدير النظام (أحمد)' },
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
