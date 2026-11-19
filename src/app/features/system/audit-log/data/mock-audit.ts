import { AuditRow } from '../models/audit.model';

export const AUDIT_MOCK: AuditRow[] = [
  { id: 'a1', event: 'تسجيل دخول ناجح', actor: 'أحمد السالم', entity: 'حساب إداري / admin@inaba.sa', time: '2025/10/06 09:12' },
  { id: 'a2', event: 'تحديث حالة الطلب', actor: 'سارة الحربي', entity: 'الطلب #4783287', time: '2025/10/06 09:05' },
  { id: 'a3', event: 'إسناد طلب إلى منفذ', actor: 'سارة الحربي', entity: 'الطلب #4783284 / سعد المالكي', time: '2025/10/05 16:40' },
  { id: 'a4', event: 'تعديل بيانات حساب', actor: 'نورة القحطاني', entity: 'حساب / خالد المالكي', time: '2025/10/05 13:22' },
  { id: 'a5', event: 'تصدير بيانات المستحقات', actor: 'أحمد السالم', entity: 'تقرير المستحقات', time: '2025/10/04 11:10' },
  { id: 'a6', event: 'تسجيل خروج', actor: 'خالد المالكي', entity: 'حساب إداري / khaled@inaba.sa', time: '2025/10/04 10:58' },
];
