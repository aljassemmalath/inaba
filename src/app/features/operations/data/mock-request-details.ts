import { RequestDetails } from '../models/request-details.model';
import { REQUESTS_LIST_MOCK } from './mock-requests-list';

export const MOCK_REQUEST_DETAILS: RequestDetails = {
  id: '4783287',
  requestNumber: '4783287',
  serviceName: 'عمرة بالإنابة',
  imageLabel: 'صورة الطلب',
  status: 'قيد التنفيذ',
  statusTone: 'info',
  indicators: [],
  createdAt: '2025/10/01 10:20',
  source: 'تطبيق الجوال',
  beneficiaryName: 'فاطمة أحمد',
  beneficiaryStatus: 'نشط',
  expectedDuration: '3 أيام',
  specialRequest: 'يرجى توثيق المراحل بوضوح وإشعار المستفيد عند اكتمال كل مرحلة.',
  executorName: 'سعد المالكي',
  supervisorName: 'أحمد السالم',
  executionStart: '2025/10/01 12:00',
  executorEntitlement: '₪ 450',
  sellingPrice: '₪ 650',
  netProfit: '₪ 200',
  paymentStatus: 'مدفوع',
  paymentStatusTone: 'success',
  steps: [
    { number: 1, name: 'الإحرام', status: 'completed', statusLabel: 'مكتمل' },
    { number: 2, name: 'الطواف', status: 'in-progress', statusLabel: 'جارٍ التنفيذ' },
    { number: 3, name: 'السعي', status: 'pending', statusLabel: 'قيد التنفيذ' },
    { number: 4, name: 'الحلق', status: 'locked', statusLabel: 'مقفل' },
  ],
  stages: [
    { id: 's1', stage: 'الإحرام', evidenceType: 'فيديو', status: 'مكتمل', statusTone: 'success', capturedAt: '2025/10/01 12:45' },
    { id: 's2', stage: 'الطواف', evidenceType: 'فيديو', status: 'جارٍ الرفع', statusTone: 'info', capturedAt: '—' },
    { id: 's3', stage: 'السعي', evidenceType: 'فيديو', status: 'قيد التنفيذ', statusTone: 'warning', capturedAt: '—' },
    { id: 's4', stage: 'الحلق', evidenceType: 'صورة', status: 'مقفل', statusTone: 'neutral', capturedAt: '—' },
  ],
  timeline: [
    { title: 'إنشاء الطلب', dateTime: '2025/10/01 10:20', description: 'تم إنشاء الطلب واستلام بيانات المستفيد والخدمة.', actor: 'النظام', role: 'النظام' },
    { title: 'إسناد الطلب', dateTime: '2025/10/01 11:05', description: 'تم إسناد الطلب إلى المنفذ سعد المالكي.', actor: 'سارة الحربي', role: 'مشرف عمليات' },
    { title: 'مشاهدة إشعار الإسناد', dateTime: '2025/10/01 11:18', description: 'قام المنفذ بمشاهدة إشعار الإسناد.', actor: 'سعد المالكي', role: 'منفذ' },
    { title: 'قبول الإسناد', dateTime: '2025/10/01 11:22', description: 'وافق المنفذ على تنفيذ الطلب.', actor: 'سعد المالكي', role: 'منفذ' },
    { title: 'بدء تنفيذ الطلب', dateTime: '2025/10/01 12:00', description: 'بدأ المنفذ تنفيذ مراحل الخدمة.', actor: 'سعد المالكي', role: 'منفذ' },
    { title: 'وصول دليل الإحرام', dateTime: '2025/10/01 12:45', description: 'تم استلام دليل مرحلة الإحرام ومراجعته.', actor: 'النظام', role: 'النظام' },
  ],
  assignments: [
    { id: 'a1', executor: 'سعد المالكي', assignedAt: '2025/10/01 11:05', notification: 'تمت المشاهدة', response: 'تم القبول', reason: '—', status: 'تم القبول', statusTone: 'success' },
    { id: 'a2', executor: 'ماجد الحربي', assignedAt: '2025/09/30 16:40', notification: 'لم تتم المشاهدة', response: '—', reason: 'خارج وقت الدوام', status: 'خارج الدوام', statusTone: 'warning' },
    { id: 'a3', executor: 'عمر القحطاني', assignedAt: '2025/09/30 14:10', notification: 'تمت المشاهدة', response: 'مرفوض', reason: 'تعذر التنفيذ في الموعد المحدد', status: 'مرفوض', statusTone: 'error' },
  ],
  notes: [
    { id: 'n1', author: 'محمد العتيبي', dateTime: '2025/10/06 09:17', content: 'تم التواصل مع المنفذ، وأكد بدء التنفيذ. توجد كثافة عالية في منطقة السعي، ويجب متابعة الأدلة قبل اعتبار المرحلة مكتملة.' },
  ],
};

export function getRequestDetails(id: string): RequestDetails {
  const listRow = REQUESTS_LIST_MOCK.find((r) => r.id === id || r.requestNumber === id);
  if (listRow) {
    return {
      ...MOCK_REQUEST_DETAILS,
      id,
      requestNumber: listRow.requestNumber,
      status: listRow.status,
      statusTone: listRow.statusTone,
      indicators: listRow.indicators ?? [],
      beneficiaryName: listRow.beneficiary,
      executorName: listRow.executor && listRow.executor !== '—' ? listRow.executor : MOCK_REQUEST_DETAILS.executorName,
      source: listRow.source || MOCK_REQUEST_DETAILS.source,
    };
  }
  return { ...MOCK_REQUEST_DETAILS, id, requestNumber: id, indicators: [] };
}
