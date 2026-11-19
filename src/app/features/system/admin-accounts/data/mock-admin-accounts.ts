import { AdminAccountRow } from '../models/admin-account.model';

export const ADMIN_ACCOUNTS_MOCK: AdminAccountRow[] = [
  { id: 'u1', name: 'أحمد السالم', email: 'admin@inaba.sa', role: 'مدير النظام', lastLogin: '2025/10/06 09:12', status: 'نشط', statusTone: 'success' },
  { id: 'u2', name: 'سارة الحربي', email: 'sara@inaba.sa', role: 'مشرف عمليات', lastLogin: '2025/10/06 08:45', status: 'نشط', statusTone: 'success' },
  { id: 'u3', name: 'نورة القحطاني', email: 'noura@inaba.sa', role: 'محاسب', lastLogin: '2025/10/05 14:20', status: 'نشط', statusTone: 'success' },
  { id: 'u4', name: 'خالد المالكي', email: 'khaled@inaba.sa', role: 'مشرف منطقة', lastLogin: '2025/09/28 11:03', status: 'غير نشط', statusTone: 'neutral' },
  { id: 'u5', name: 'محمد العتيبي', email: 'm.otb@inaba.sa', role: 'دعم فني', lastLogin: '—', status: 'موقوف', statusTone: 'error' },
];
