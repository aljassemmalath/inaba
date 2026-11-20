import { RequestListRow } from '../models/request-list.model';

export const REQUESTS_LIST_MOCK: RequestListRow[] = [
  // Case 1: بانتظار الإسناد, indicator -
  { id: '4783287', requestNumber: '4783287', beneficiary: 'فاطمة أحمد', customerName: 'عبدالرحمن أحمد', product: 'عمرة بالإنابة', source: 'فرد مباشر', executor: '—', status: 'بانتظار الإسناد', statusTone: 'warning', indicators: [], lastExecution: '—', requestDate: '2025/10/01' },
  // Case 2: بانتظار الإسناد, رفض المنفذ
  { id: '4783286', requestNumber: '4783286', beneficiary: 'سلمان العتيبي', customerName: 'شركة مسار', product: 'حج مفرد', source: 'فرد مباشر', executor: '—', status: 'بانتظار الإسناد', statusTone: 'warning', indicators: ['رفض المنفذ'], lastExecution: '—', requestDate: '2025/09/28' },
  // Case 3: بانتظار الإسناد, تنفيذ سابق ملغي
  { id: '4783285', requestNumber: '4783285', beneficiary: 'نورة القحطاني', customerName: 'نورة القحطاني', product: 'طواف بالإنابة', source: 'فرد مباشر', executor: '—', status: 'بانتظار الإسناد', statusTone: 'warning', indicators: ['تنفيذ سابق ملغي'], lastExecution: '—', requestDate: '2025/10/06' },
  // Case 4: مُسند, بانتظار رد المنفذ + لم يشاهد الإشعار
  { id: '4783284', requestNumber: '4783284', beneficiary: 'خالد الدوسري', customerName: 'مؤسسة الخير', product: 'عمرة بالإنابة', source: 'فرد مباشر', executor: 'عمر القحطاني', status: 'مُسند', statusTone: 'info', indicators: ['بانتظار رد المنفذ', 'لم يشاهد الإشعار'], lastExecution: '—', requestDate: '2025/10/05' },
  // Case 5: قيد التنفيذ, -
  { id: '4783283', requestNumber: '4783283', beneficiary: 'ريم الشمري', customerName: 'ريم الشمري', product: 'عمرة بالإنابة', source: 'فرد مباشر', executor: 'فهد العتيبي', status: 'قيد التنفيذ', statusTone: 'info', indicators: [], lastExecution: '2025/10/02 11:00', requestDate: '2025/09/25' },
  // Case 6: قيد التنفيذ, متأخر
  { id: '4783282', requestNumber: '4783282', beneficiary: 'أحمد الغامدي', customerName: 'وكالة السفر', product: 'حج مفرد', source: 'وكالة', sourceDetail: 'وكالة البركة', executor: 'سعد المالكي', status: 'قيد التنفيذ', statusTone: 'info', indicators: ['متأخر'], lastExecution: '2025/10/04 16:20', requestDate: '2025/09/30' },
  // Case 7: قيد التنفيذ, ملف عليه تنبيه
  { id: '4783281', requestNumber: '4783281', beneficiary: 'محمد سالم', customerName: 'محمد سالم', product: 'طواف بالإنابة', source: 'فرد مباشر', executor: 'ماجد الحربي', status: 'قيد التنفيذ', statusTone: 'info', indicators: ['ملف عليه تنبيه'], lastExecution: '2025/10/03 10:05', requestDate: '2025/09/29' },
  // Case 8: مُكتمل, -
  { id: '4783280', requestNumber: '4783280', beneficiary: 'سارة الحربي', customerName: 'سارة الحربي', product: 'عمرة بالإنابة', source: 'فرد مباشر', executor: 'خالد الدوسري', status: 'مُكتمل', statusTone: 'success', indicators: [], lastExecution: '2025/10/01 13:45', requestDate: '2025/09/20' },
  // Case 9: مُكتمل, حُذف الدليل بعد الاحتفاظ
  { id: '4783279', requestNumber: '4783279', beneficiary: 'عبدالله المطيري', customerName: 'عبدالله المطيري', product: 'عمرة بالإنابة', source: 'فرد مباشر', executor: 'سعد المالكي', status: 'مُكتمل', statusTone: 'success', indicators: ['حُذف الدليل بعد الاحتفاظ'], lastExecution: '2025/09/30 10:00', requestDate: '2025/09/18' },
];

export const REQUESTS_SUMMARY = [
  { label: 'طلبات جديدة', value: 12, modifierClass: 'req-new' },
  { label: 'ملغى سابق التنفيذ', value: 3, modifierClass: 'req-canceled-prev' },
  { label: 'قيد التنفيذ', value: 24, modifierClass: 'req-in-progress' },
  { label: 'بانتظار الإسناد', value: 17, modifierClass: 'req-pending' },
];