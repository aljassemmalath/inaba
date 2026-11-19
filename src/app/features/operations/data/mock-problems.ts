import { ProblemRow } from '../models/problem.model';

export const PROBLEMS_MOCK: ProblemRow[] = [
  { id: 'p1', problem: 'تأخر رفع دليل الطواف', requestNumber: '10470', executor: 'سعد المالكي', stage: 'الطواف', reportedAt: '2025/10/05 11:20', status: 'قيد المتابعة', statusTone: 'warning', lastUpdated: '2025/10/06 08:10' },
  { id: 'p2', problem: 'عدم وضوح ملف الفيديو المرفق', requestNumber: '10466', executor: 'ماجد الحربي', stage: 'الإحرام', reportedAt: '2025/10/04 15:05', status: 'مفتوحة', statusTone: 'error', lastUpdated: '2025/10/05 09:30' },
  { id: 'p3', problem: 'تعذر التواصل مع المنفذ', requestNumber: '10461', executor: 'خالد الدوسري', stage: 'السعي', reportedAt: '2025/10/04 10:12', status: 'مفتوحة', statusTone: 'error', lastUpdated: '2025/10/04 16:45' },
  { id: 'p4', problem: 'اختلاف بيانات المستفيد في الطلب', requestNumber: '10458', executor: 'عمر القحطاني', stage: 'الإحرام', reportedAt: '2025/10/03 18:00', status: 'قيد المتابعة', statusTone: 'warning', lastUpdated: '2025/10/04 11:00' },
  { id: 'p5', problem: 'توقف معالجة ملف بعد الرفع', requestNumber: '10452', executor: 'فهد العتيبي', stage: 'الحلق', reportedAt: '2025/10/03 10:40', status: 'مفتوحة', statusTone: 'error', lastUpdated: '2025/10/03 13:15' },
  { id: 'p6', problem: 'ملاحظة على توقيت تنفيذ المرحلة', requestNumber: '10449', executor: 'سعد المالكي', stage: 'السعي', reportedAt: '2025/10/02 14:22', status: 'قيد المتابعة', statusTone: 'warning', lastUpdated: '2025/10/03 08:50' },
];

export const PROBLEMS_SUMMARY = [
  { label: 'قيد المتابعة', value: 3, modifierClass: 'problems-followup', iconSrc: '/assets/images/svg/Problems/under%20review.svg' },
  { label: 'مفتوحة', value: 3, modifierClass: 'problems-open', iconSrc: '/assets/images/svg/Problems/open%20problems.svg' },
  { label: 'إجمالي المشاكل', value: 6, modifierClass: 'problems-total', iconSrc: '/assets/images/svg/Problems/all%20problems.svg' },
];
