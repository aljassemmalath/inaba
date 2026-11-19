import { AgencyRow } from '../models/agency.model';

export const AGENCIES_MOCK: AgencyRow[] = [
  { id: 'a1', code: 'AG-1001', agency: 'وكالة النقل السريع', email: 'ops@fast-transport.sa', mobile: '0512345678', createdAt: '2025/03/10', source: 'يدوي', requestsCount: 124, inProgressCount: 18, completedCount: 98, status: 'نشطة', statusTone: 'success' },
  { id: 'a2', code: 'AG-1002', agency: 'وكالة المدار', email: 'contact@almadar.sa', mobile: '0523456789', createdAt: '2025/04/02', source: 'تكامل', requestsCount: 86, inProgressCount: 9, completedCount: 70, status: 'نشطة', statusTone: 'success' },
  { id: 'a3', code: 'AG-1003', agency: 'الوكالة الوطنية', email: 'info@national-agency.sa', mobile: '0534567890', createdAt: '2025/05/18', source: 'يدوي', requestsCount: 53, inProgressCount: 0, completedCount: 40, status: 'معلقة', statusTone: 'warning' },
  { id: 'a4', code: 'AG-1004', agency: 'وكالة الميدان', email: 'support@almaydan.sa', mobile: '0545678901', createdAt: '2025/01/22', source: 'استيراد', requestsCount: 210, inProgressCount: 27, completedCount: 160, status: 'نشطة', statusTone: 'success' },
];
